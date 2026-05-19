import { NextRequest, NextResponse } from "next/server";
import { transporter, TO, FROM } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, email, inquiryType, specialRequests, message } = body;

    if (!firstName || !lastName || !email || !inquiryType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const specialList =
      Array.isArray(specialRequests) && specialRequests.length > 0
        ? specialRequests.map((r: { value: string }) => `• ${r.value}`).join("\n")
        : null;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f1f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f1f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(227,41,115,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#E32973 0%,#C41254 100%);padding:28px 36px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">New Contact Message</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Smallcakes Gwinnett — Contact Form</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px 36px;">

          <!-- Inquiry type badge -->
          <p style="margin:0 0 20px;"><span style="display:inline-block;background:#fde8f2;color:#C41254;font-size:13px;font-weight:700;padding:4px 14px;border-radius:20px;letter-spacing:0.3px;">${inquiryType}</span></p>

          <!-- Customer info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;color:#9b5574;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Name</p>
                <p style="margin:0;font-size:15px;color:#3d1a2a;font-weight:600;">${firstName} ${lastName}</p>
              </td>
              <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                <p style="margin:0 0 3px;font-size:11px;color:#9b5574;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Email</p>
                <p style="margin:0;font-size:15px;color:#3d1a2a;"><a href="mailto:${email}" style="color:#E32973;text-decoration:none;">${email}</a></p>
              </td>
            </tr>
            ${phone ? `<tr><td colspan="2" style="padding-bottom:12px;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:11px;color:#9b5574;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Phone</p>
              <p style="margin:0;font-size:15px;color:#3d1a2a;">${phone}</p>
            </td></tr>` : ""}
          </table>

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid #f0d9e5;margin:0 0 24px;">

          <!-- Message -->
          <p style="margin:0 0 8px;font-size:11px;color:#9b5574;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Message</p>
          <div style="background:#fdf4f8;border-left:3px solid #E32973;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:${specialList ? "24px" : "0"};">
            <p style="margin:0;font-size:15px;color:#3d1a2a;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>

          ${specialList ? `
          <!-- Special requests -->
          <p style="margin:0 0 8px;font-size:11px;color:#9b5574;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Special Requests</p>
          <div style="background:#fdf4f8;border-radius:8px;padding:14px 20px;">
            <p style="margin:0;font-size:14px;color:#3d1a2a;line-height:1.8;white-space:pre-wrap;">${specialList}</p>
          </div>` : ""}

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#fdf4f8;padding:18px 36px;text-align:center;border-top:1px solid #f0d9e5;">
          <p style="margin:0;font-size:12px;color:#9b5574;">Reply directly to this email to respond to ${firstName}.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const text = `New contact message — ${inquiryType}

From: ${firstName} ${lastName}
Email: ${email}${phone ? `\nPhone: ${phone}` : ""}

Message:
${message}${specialList ? `\n\nSpecial Requests:\n${specialList}` : ""}`;

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      subject: `[Contact] ${inquiryType} — ${firstName} ${lastName}`,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact mail error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
