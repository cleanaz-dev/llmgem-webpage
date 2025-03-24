// app/api/chat/route.js
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic(process.env.ANTHROPIC_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    // 1. Precise intent detection with Haiku
    const { content } = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 50,
      temperature: 0,
      system: "Classify as BOOKING or CHAT only. Be strict.",
      messages: [{
        role: "user",
        content: `Is this a request to schedule a call/meeting? Reply ONLY "BOOKING" or "CHAT":\n\n${message}`
      }]
    });

    const intent = content[0].text.trim();

    // 2. Handle booking intent
    if (intent === "BOOKING") {
      return NextResponse.json({ type: "booking" });
    }

    // 3. Generate chat response
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `Respond concisely, 1 or 2 sentences max, to this message:\n\n${message}`
      }]
    });

    return NextResponse.json({
      type: "chat",
      response: response.content[0].text
    });

  } catch (error) {
    return NextResponse.json({
      type: "chat",
      response: "I couldn't process that. Would you like to schedule a call instead?"
    }, { status: 500 });
  }
}