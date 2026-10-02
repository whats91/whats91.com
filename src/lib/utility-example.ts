// Placeholder text only; never executed by the public website.
export const utilityExample = `curl -X POST "https://graph.facebook.com/YOUR_API_VERSION/YOUR_PHONE_ID/messages" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messaging_product": "whatsapp",
    "to": "YOUR_ELIGIBLE_RECIPIENT",
    "type": "template",
    "template": {
      "name": "YOUR_APPROVED_TEMPLATE",
      "language": { "code": "YOUR_APPROVED_LANGUAGE" },
      "components": [{
        "type": "body",
        "parameters": [
          { "type": "text", "text": "YOUR_ORDER_REFERENCE" },
          { "type": "text", "text": "YOUR_TRANSACTION_AMOUNT" },
          { "type": "text", "text": "YOUR_TRANSACTION_DATE" }
        ]
      }]
    }
  }'`;
