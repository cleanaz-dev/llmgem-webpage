// app/api/meeting/availability/route.js
import { getAvailability } from "@/lib/hapio";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const locationId = searchParams.get("locationId");

    if (!from || !to || !locationId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Convert ISO dates to Hapio's expected format
    const formatForHapio = (dateStr) => {
      const date = new Date(dateStr);
      return date.toISOString()
        .replace(/\.\d{3}Z$/, '') // Remove milliseconds
        .replace('Z', '+00:00');   // Replace Z with +00:00
    };

    const hapioFrom = formatForHapio(from);
    const hapioTo = formatForHapio(to);

    console.log("Sending to Hapio:", { hapioFrom, hapioTo }); // Debug log

    const availability = await getAvailability(hapioFrom, hapioTo, locationId);
    return NextResponse.json(availability);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability", details: error.message },
      { status: 500 }
    );
  }
}