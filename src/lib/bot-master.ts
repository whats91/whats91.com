/**
 * Bot Master Sender API Service
 * Used to send WhatsApp messages via Bot Master Sender API
 */

interface BotMasterConfig {
  apiUrl: string;
  senderId: string;
  receiverId: string;
  authToken: string;
}

interface SendMessageParams {
  receiverId?: string;
  messageText: string;
}

interface SendMessageResult {
  success: boolean;
  data?: unknown;
  error?: unknown;
}

// Get configuration from environment variables
function getConfig(): BotMasterConfig {
  return {
    apiUrl: process.env.BOT_MASTER_API_URL || "https://api.botmastersender.com/api/v1/?action=send",
    senderId: process.env.BOT_MASTER_SENDER_ID || "919425004029",
    receiverId: process.env.BOT_MASTER_RECEIVER_ID || "917000782082",
    authToken: process.env.BOT_MASTER_AUTH_TOKEN || "",
  };
}

/**
 * Send a WhatsApp message via Bot Master Sender API
 * @param params - Message parameters
 * @param params.receiverId - Optional custom receiver ID (defaults to env variable)
 * @param params.messageText - The message to send
 * @returns Result object with success status and data/error
 */
export async function sendWhatsAppMessage(
  params: SendMessageParams
): Promise<SendMessageResult> {
  const config = getConfig();

  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: config.senderId,
        receiverId: params.receiverId || config.receiverId,
        messageText: params.messageText,
        authToken: config.authToken,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[Bot Master] API error:", result);
      return { success: false, error: result };
    }

    console.log("[Bot Master] Message sent successfully");
    return { success: true, data: result };
  } catch (error) {
    console.error("[Bot Master] Error sending message:", error);
    return { success: false, error };
  }
}

/**
 * Send contact form notification via WhatsApp
 * @param data - Contact form data
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
}): Promise<SendMessageResult> {
  const messageText = `🔔 *New Contact Form Submission*

📋 *Details:*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone || "Not provided"}
🏢 *Company:* ${data.company || "Not provided"}
📝 *Subject:* ${data.subject}
━━━━━━━━━━━━━━━━━━━━

💬 *Message:*
${data.message}

📅 *Submitted:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  return sendWhatsAppMessage({ messageText });
}

/**
 * Send demo request notification via WhatsApp
 * @param data - Demo request data
 */
export async function sendDemoNotification(data: {
  name: string;
  email: string;
  phone: string;
  source?: string;
}): Promise<SendMessageResult> {
  const messageText = `🎯 *New Demo Request*

📋 *Details:*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🔗 *Source:* ${data.source || "Website Popup"}
━━━━━━━━━━━━━━━━━━━━

📅 *Requested:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

⚡ *Action Required:* Please follow up within 24 hours.`;

  return sendWhatsAppMessage({ messageText });
}

// Export configuration getter for testing
export { getConfig };
