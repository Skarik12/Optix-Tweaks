import { google } from "googleapis";

function getGmailClient() {
  const clientEmail = process.env.GMAIL_CLIENT_EMAIL;
  const privateKey = process.env.GMAIL_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const impersonatedUser = process.env.GMAIL_IMPERSONATED_USER;

  if (!clientEmail || !privateKey || !impersonatedUser) {
    throw new Error("Missing Gmail API environment variables");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
    subject: impersonatedUser
  });

  return google.gmail({ version: "v1", auth });
}

function encodeMessage(raw: string) {
  return Buffer.from(raw)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const gmail = getGmailClient();
  const from = process.env.GMAIL_IMPERSONATED_USER!;

  const raw = [
    `From: OptiX <${from}>`,
    `To: ${to}`,
    "Subject: Reset your OptiX password",
    "Content-Type: text/html; charset=utf-8",
    "",
    `<p>You requested a password reset.</p>
     <p><a href="${resetUrl}">Click here to reset your password</a></p>
     <p>If you did not request this, you can ignore this email.</p>`
  ].join("\r\n");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodeMessage(raw) }
  });
}
