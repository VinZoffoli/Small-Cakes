import { NextRequest, NextResponse } from "next/server";
import { transporter, TO, FROM } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const raw = formData.get("data");
    if (!raw || typeof raw !== "string") {
      return NextResponse.json({ error: "Missing form data" }, { status: 400 });
    }

    const d = JSON.parse(raw);
    const {
      firstName, lastName, phone, email,
      pickupDate, pickupLocation, eventTime, guestCount,
      signatureFlavors, specialFlavors, frostingFlavors,
      products, orderDetails,
    } = d;

    if (!firstName || !email || !pickupDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Handle optional image attachment
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    const imageEntry = formData.get("image");
    if (imageEntry && imageEntry instanceof Blob && imageEntry.size > 0) {
      const imageFile = imageEntry as File;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      attachments.push({
        filename: imageFile.name || "reference.jpg",
        content: buffer,
        contentType: imageFile.type || "image/jpeg",
      });
    }

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:6px 0;vertical-align:top;width:40%;">
          <p style="margin:0;font-size:11px;color:#9b5574;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">${label}</p>
        </td>
        <td style="padding:6px 0;vertical-align:top;">
          <p style="margin:0;font-size:15px;color:#3d1a2a;font-weight:500;">${value}</p>
        </td>
      </tr>`;

    const list = (items: string[]) => items.map((i) => `• ${i}`).join("<br>");
    const listTxt = (items: string[]) => items.map((i) => `• ${i}`).join("\n");

    const productRows = (products as { productType: string; quantity: string }[])
      .map((p, i) => row(`Product ${i + 1}`, `${p.productType} — Qty: ${p.quantity}`))
      .join("");

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
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">New Catering Inquiry</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Smallcakes Gwinnett — Custom Order Form</p>
        </td></tr>

        <tr><td style="padding:32px 36px;">

          <!-- Section: Customer -->
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#E32973;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #f0d9e5;padding-bottom:8px;">Customer Info</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${row("Name", `${firstName} ${lastName}`)}
            ${row("Email", `<a href="mailto:${email}" style="color:#E32973;text-decoration:none;">${email}</a>`)}
            ${row("Phone", phone)}
          </table>

          <!-- Section: Event -->
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#E32973;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #f0d9e5;padding-bottom:8px;">Event Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${row("Pickup Date", pickupDate)}
            ${row("Pickup Time", eventTime)}
            ${row("Location", pickupLocation)}
            ${row("Guests", guestCount)}
          </table>

          <!-- Section: Flavors -->
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#E32973;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #f0d9e5;padding-bottom:8px;">Flavors</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${row("Signature Cake", list(signatureFlavors))}
            ${row("Special Cake", list(specialFlavors))}
            ${row("Frosting", list(frostingFlavors))}
          </table>

          <!-- Section: Products -->
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#E32973;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #f0d9e5;padding-bottom:8px;">Products</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${productRows}
          </table>

          <!-- Section: Order Details -->
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#E32973;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #f0d9e5;padding-bottom:8px;">Order Details</p>
          <div style="background:#fdf4f8;border-left:3px solid #E32973;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:${attachments.length ? "20px" : "0"};">
            <p style="margin:0;font-size:15px;color:#3d1a2a;line-height:1.7;white-space:pre-wrap;">${orderDetails}</p>
          </div>

          ${attachments.length ? `<p style="margin:20px 0 0;font-size:13px;color:#9b5574;font-style:italic;">📎 Reference image attached.</p>` : ""}

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

    const text = `New Catering Inquiry

CUSTOMER INFO
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

EVENT DETAILS
Pickup Date: ${pickupDate}
Pickup Time: ${eventTime}
Location: ${pickupLocation}
Guests: ${guestCount}

FLAVORS
Signature Cake: ${listTxt(signatureFlavors)}
Special Cake: ${listTxt(specialFlavors)}
Frosting: ${listTxt(frostingFlavors)}

PRODUCTS
${(products as { productType: string; quantity: string }[]).map((p, i) => `Product ${i + 1}: ${p.productType} — Qty: ${p.quantity}`).join("\n")}

ORDER DETAILS
${orderDetails}`;

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      subject: `[Catering] ${firstName} ${lastName} — ${pickupDate}`,
      html,
      text,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Catering mail error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
