import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    let attachments = [];

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: process.env.ADMIN_EMAILS!,
      subject: "New Sticker Order",
      html: `
        <p>Category: ${formData.get("category")}</p>
        <p>Type: ${formData.get("type")}</p>
        <p>Cutting: ${formData.get("cutting")}</p>
        <p>Email: ${formData.get("email")}</p>
        <p>Phone: ${formData.get("phone")}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}