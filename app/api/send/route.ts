import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    const customerEmail = formData.get("email") as string;

    // ✅ ADMIN EMAIL LIST
    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim()).filter(Boolean)
      : [
          "simrangrover54@gmail.com",
          "diwan.b@gmail.com",
          "escapeskateboardingblr@gmail.com",
        ];

    // ✅ MAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ ATTACHMENT
    let attachments: any[] = [];

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // =========================
    // 📩 1. ADMIN EMAIL
    // =========================
    await transporter.sendMail({
      from: `"NEW ORDER 🚨" <${process.env.EMAIL_USER}>`,
      to: adminEmails,
      subject: `🚨 New Order from ${customerEmail}`,
      html: `
        <h2>New Order Received</h2>

        <p><strong>Category:</strong> ${formData.get("category")}</p>
        <p><strong>Type:</strong> ${formData.get("type")}</p>
        <p><strong>Cutting:</strong> ${formData.get("cutting")}</p>

        <hr />

        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${formData.get("phone")}</p>
      `,
      attachments,
    });

    // =========================
    // 📩 2. CUSTOMER EMAIL
    // =========================
    if (customerEmail) {
      await transporter.sendMail({
        from: `"D4Designism" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: "Your Order Confirmation 🎉",
        html: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Thank you for your order! 🙌</h2>

            <p>We’ve received your sticker request. Here are your details:</p>

            <hr />

            <p><strong>Category:</strong> ${formData.get("category")}</p>
            <p><strong>Type:</strong> ${formData.get("type")}</p>
            <p><strong>Cutting:</strong> ${formData.get("cutting")}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${formData.get("phone")}</p>

            <hr />

            <p>We’ll get back to you shortly 🚀</p>
            <p>For queries: 9341235488</p>

            <p style="margin-top:20px;">
              – D4Designism
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("❌ MAIL ERROR:", err);

    return NextResponse.json(
      { success: false, error: err?.message },
      { status: 500 }
    );
  }
}