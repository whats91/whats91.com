import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactNotification } from "@/lib/bot-master";
import { createCrmLeadFromContact } from "@/lib/crm-leads";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptchaToken: z.string().optional().default(""),
  recaptchaAction: z.literal("contact_form").optional().default("contact_form"),
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
    
    const validationResult = contactSchema.safeParse(body);
    
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
    
    const localRecordPromise = db.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    const crmLeadPromise = createCrmLeadFromContact({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    const notificationPromise = sendContactNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    const [localRecordResult, crmLeadResult, notificationResult] = await Promise.allSettled([
      localRecordPromise,
      crmLeadPromise,
      notificationPromise,
    ]);

    logSettledResult("[Contact] Local record", "saved", localRecordResult);
    logSettledResult("[Contact] CRM lead", "created", crmLeadResult, (value) => !value.success);
    logSettledResult("[Contact] WhatsApp notification", "sent", notificationResult, (value) => !value.success);

    const contact = localRecordResult.status === "fulfilled" ? localRecordResult.value : null;
    
    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      data: {
        id: contact?.id || null,
        name: contact?.name || validatedData.name,
        email: contact?.email || validatedData.email,
        subject: contact?.subject || validatedData.subject,
        createdAt: contact?.createdAt || null,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    
    return NextResponse.json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch contacts",
    }, { status: 500 });
  }
}
