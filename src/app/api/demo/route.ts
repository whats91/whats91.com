import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendDemoNotification } from "@/lib/bot-master";
import { createCrmLeadFromDemo } from "@/lib/crm-leads";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { z } from "zod";

const demoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  source: z.string().optional(),
  recaptchaToken: z.string().optional().default(""),
  recaptchaAction: z.literal("book_demo").optional().default("book_demo"),
});

function logSettledResult<T>(
  label: string,
  successMessage: string,
  result: PromiseSettledResult<T>,
  isFailedResult?: (value: T) => boolean
) {
  if (result.status === "rejected") {
    console.error(`${label} failed:`, result.reason);
    return;
  }

  if (isFailedResult?.(result.value)) {
    console.error(`${label} failed:`, result.value);
    return;
  }

  console.log(`${label} ${successMessage}`);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validationResult = demoSchema.safeParse(body);
    
    if (!validationResult.success) {
      const issues = validationResult.error?.issues || [];
      const errorMessages = issues.map((e: { message: string }) => e.message).join(", ");
      return NextResponse.json({
        success: false,
        message: `Validation failed: ${errorMessages}`,
        errors: issues,
      }, { status: 400 });
    }
    
    const validatedData = validationResult.data;
    const recaptchaResult = await verifyRecaptcha({
      token: validatedData.recaptchaToken,
      expectedAction: validatedData.recaptchaAction,
    });

    if (!recaptchaResult.success) {
      return NextResponse.json({
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
      }, { status: 400 });
    }
    
    const localRecordPromise = db.demo.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        source: validatedData.source || "popup",
      },
    });

    const crmLeadPromise = createCrmLeadFromDemo({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      source: validatedData.source,
    });

    const notificationPromise = sendDemoNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      source: validatedData.source,
    });

    const [localRecordResult, crmLeadResult, notificationResult] = await Promise.allSettled([
      localRecordPromise,
      crmLeadPromise,
      notificationPromise,
    ]);

    logSettledResult("[Demo] Local record", "saved", localRecordResult);
    logSettledResult("[Demo] CRM lead", "created", crmLeadResult, (value) => !value.success);
    logSettledResult("[Demo] WhatsApp notification", "sent", notificationResult, (value) => !value.success);

    const demo = localRecordResult.status === "fulfilled" ? localRecordResult.value : null;
    
    return NextResponse.json({
      success: true,
      message: "Thank you for your interest! We'll contact you shortly to schedule your demo.",
      data: {
        id: demo?.id || null,
        name: demo?.name || validatedData.name,
        email: demo?.email || validatedData.email,
        createdAt: demo?.createdAt || null,
      },
    });
  } catch (error) {
    console.error("Demo form error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const demos = await db.demo.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    
    return NextResponse.json({
      success: true,
      message: "Demo requests fetched successfully",
      data: demos,
    });
  } catch (error) {
    console.error("Get demos error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch demo requests",
    }, { status: 500 });
  }
}
