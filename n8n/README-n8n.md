# Contact form workflow (n8n)

`portfolio-contact-workflow.json` receives the website's contact form and:

1. **Validates** the submission (spam trap, too-fast submits, email format, message length)
2. **Responds** to the website straight away
3. **Emails you** with the message (reply-to is set to the sender)
4. **Pings Telegram** (optional, disabled by default)
5. **Logs the lead** to Google Sheets (optional, disabled by default)
6. **Auto-replies** to the sender to confirm you got it

## Setup

1. In n8n: **Workflows → Import from file** → choose `portfolio-contact-workflow.json`.
2. Open **Email Me** and **Auto-reply to Sender** and select your Gmail credential (create one if needed).
3. Optional: right-click **Telegram Ping** / **Log Lead to Sheet** → *Activate*, then add credentials.
   - Telegram: create a bot with @BotFather, send it a message, and put your chat ID in the node.
   - Sheets: create a sheet with a tab named `Leads` and headers in row 1:
     `valid, status, reason, name, email, type, message, messageHtml, nameHtml, page, submittedAt`
4. Open **Contact Form Webhook** → Options → **Allowed Origins (CORS)** and set your live domain,
   e.g. `https://thameem.dev,http://localhost:4321`.
5. **Activate** the workflow, copy the **Production URL** of the webhook, and set it as
   `PUBLIC_CONTACT_WEBHOOK_URL` in `.env` and in GitHub → Settings → Variables.

n8n must be reachable on the public internet (n8n Cloud, or self-hosted behind HTTPS).

## Testing

```bash
curl -X POST "$PUBLIC_CONTACT_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","type":"Hiring","message":"Testing the portfolio form","elapsedMs":8000}'
```

You should get `{"ok":true}` and an email within seconds.
