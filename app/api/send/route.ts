import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    // ✅ SAFE EMAIL PARSING (env + fallback)
    const emails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean)
      : [
          "simrangrover54@gmail.com",
          "diwan.b@gmail.com",
          "escapeskateboardingblr@gmail.com",
        ];

    console.log("📩 Sending emails to:", emails);

    // ✅ TRANSPORTER (GMAIL)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // MUST be App Password
      },
    });

    // ✅ ATTACHMENTS
    let attachments: any[] = [];

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // ✅ SEND MAIL
    await transporter.sendMail({
      from: `"Sticker Orders" <${process.env.EMAIL_USER}>`,
      to: emails,
      subject: "New Sticker Order",
      html: `
        <h2>New Order Received</h2>
        <p><strong>Category:</strong> ${formData.get("category")}</p>
        <p><strong>Type:</strong> ${formData.get("type")}</p>
        <p><strong>Cutting:</strong> ${formData.get("cutting")}</p>
        <p><strong>Email:</strong> ${formData.get("email")}</p>
        <p><strong>Phone:</strong> ${formData.get("phone")}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ MAIL ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Mail failed",
      },
      { status: 500 }
    );
  }
}