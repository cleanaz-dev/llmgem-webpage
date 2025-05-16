import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { companyKnowledgeText } from "@/lib/constants";

const anthropic = new Anthropic(process.env.ANTHROPIC_API_KEY);

export async function POST(req) {
  try {
    const { message, history } = await req.json();
    console.log("Message received:", message);
    console.log("History received:", history); // Debug log for history

    // 1. Precise intent detection with Haiku
    const { content } = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 10,
      temperature: 0,
      system: "You are a classifier. Analyze the user message and reply with EXACTLY 'BOOKING' or 'CHAT'. If the message mentions scheduling, a call, meeting, or booking, return 'BOOKING'. Otherwise, return 'CHAT'. No other text is allowed.",
      messages: [{
        role: "user",
        content: message // Intent detection uses only the current message
      }]
    });

    const intent = content[0].text.trim();
    console.log("Detected intent:", intent);

    // 2. Handle booking intent
    if (intent === "BOOKING") {
      return NextResponse.json({ type: "booking" });
    }

    // 3. Generate chat response with history
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 150,
      temperature: 0.7,
      system: `You are an LLM GEM assistant. Respond to inquiries using ONLY the following knowledge:
      ${companyKnowledgeText}
      
      Response Rules:
      1. STRICT 1-2 sentence limit
      2. Be extremely concise
      3. For complex questions, say: "Let's schedule a call to discuss this in detail."
      4. Never make up information`,
      messages: [
        ...history, // Include conversation history
        { role: "user", content: message } // Append current message
      ]
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