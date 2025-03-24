//api/chat/route.js
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const { message, name, email } = await req.json();
    console.log("Message received:", message, name, email);

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const systemPrompt = 
      `Your a friendly assistant on a AI Agency website LLM GEM. Users will ask you certain questions. Reply as best as you can for now. Replys should be concise and focused, one or two sentences max.`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      temperature: 0.3,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const responseText = response.content[0].text;

    console.log("response:", responseText);


    return NextResponse.json(
      { response: responseText  },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}