type CrmLeadFieldValue = string | number;

export type CrmLeadFields = Record<string, CrmLeadFieldValue | null | undefined>;

export interface CrmLeadResult {
  success: boolean;
  data?: unknown;
  error?: unknown;
}

interface ContactLeadInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
}

interface DemoLeadInput {
  name: string;
  email: string;
  phone: string;
  source?: string | null;
}

function getCrmLeadConfig() {
  return {
    apiBaseUrl: (process.env.CRM_LEADS_API_BASE_URL || "https://graph.whats91.com").replace(/\/$/, ""),
    companyUid: process.env.CRM_LEADS_COMPANY_UID || "",
  };
}

function cleanFields(fields: CrmLeadFields): Record<string, CrmLeadFieldValue> {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== null && value !== undefined && value !== "")
  ) as Record<string, CrmLeadFieldValue>;
}

export async function createCrmLead(fields: CrmLeadFields): Promise<CrmLeadResult> {
  const { apiBaseUrl, companyUid } = getCrmLeadConfig();

  if (!companyUid) {
    return {
      success: false,
      error: "CRM lead API is not configured",
    };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/v2/crm/companies/${companyUid}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lead: {
          fields: cleanFields(fields),
        },
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
      return {
        success: false,
        data: result,
        error: result?.message || `CRM lead API returned ${response.status}`,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export function createCrmLeadFromContact(data: ContactLeadInput): Promise<CrmLeadResult> {
  return createCrmLead({
    LeadTitle: `Contact: ${data.name}`,
    FullName: data.name,
    Company: data.company,
    Email: data.email,
    MobilePhone: data.phone,
    Description: `Subject: ${data.subject}\n\nMessage:\n${data.message}`,
    Priority: "medium",
    ExternalReferenceType: "whats91_website_contact",
  });
}

export function createCrmLeadFromDemo(data: DemoLeadInput): Promise<CrmLeadResult> {
  return createCrmLead({
    LeadTitle: `Demo Request: ${data.name}`,
    FullName: data.name,
    Email: data.email,
    MobilePhone: data.phone,
    Description: `Book a Demo request from Whats91 website\n\nSource: ${data.source || "popup"}`,
    Priority: "high",
    ExternalReferenceType: "whats91_website_demo",
  });
}

export { getCrmLeadConfig };
