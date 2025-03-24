// app/api/chat/route.js
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();
  
  // 1. Detect booking intent
  const wantsBooking = await anthropic.classify({
    prompt: `Does this message indicate wanting to book a consultation? Answer only YES or NO.\n\nMessage: "${message}"`,
    model: "claude-3-haiku"
  });

  if (wantsBooking === 'YES') {
    return Response.json({
      type: 'booking-form',
      text: "Let's schedule your consultation!"
    });
  }

  // 2. Regular chat response
  const response = await anthropic.messages.create({
    messages: [{ role: "user", content: message }],
    model: "claude-3-haiku-20240307"
  });

  return NextResponse.json({
    type: 'text',
    text: response.content[0].text
  });
}