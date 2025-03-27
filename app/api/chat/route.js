// app/api/chat/route.js
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic(process.env.ANTHROPIC_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("message received: ", message);

    // 1. Precise intent detection with Haiku
    const { content } = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 10, // Reduced to enforce brevity
      temperature: 0,
      system: "You are a classifier. Analyze the user message and reply with EXACTLY 'BOOKING' or 'CHAT'. If the message mentions scheduling, a call, meeting, or booking, return 'BOOKING'. Otherwise, return 'CHAT'. No other text is allowed.",
      messages: [{
        role: "user",
        content: message // Directly pass the raw message
      }]
    });

    const intent = content[0].text.trim();
    console.log("Detected intent:", intent); // Debug log

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
    console.error("Error:", error);
    return NextResponse.json({
      type: "chat",
      response: "I couldn't process that. Would you like to schedule a call instead?"
    }, { status: 500 });
  }
}