import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const text = prompt.toLowerCase();

  let reply = "";
  let category = "";

  if (
    text.includes("waterproof") ||
    text.includes("bottle") ||
    text.includes("outdoor")
  ) {
    reply =
      "For outdoor or waterproof usage, I recommend PP Non-Tearable Stickers. They are durable and long-lasting.";
    category = "PP Non-Tearable Sticker";
  } else if (
    text.includes("premium") ||
    text.includes("luxury") ||
    text.includes("transparent")
  ) {
    reply =
      "For a premium look, go with Clear Film Screen Printed Stickers. They offer a clean and high-end finish.";
    category = "Clear Film Screen Printed Sticker";
  } else if (
    text.includes("cheap") ||
    text.includes("budget") ||
    text.includes("low cost") ||
    text.includes("economical")
  ) {
    reply =
      "For budget-friendly options, Paper Stickers are best. They are simple and cost-effective.";
    category = "Paper Sticker";
  } else if (text.includes("best")) {
    reply =
      "It depends on usage. For durability choose PP Non-Tearable, for premium look choose Clear Film, and for budget choose Paper Stickers.";
  } else {
    reply =
      "Tell me more about your usage (indoor, outdoor, premium, budget), and I’ll guide you better.";
  }

  return NextResponse.json({ reply, category });
}