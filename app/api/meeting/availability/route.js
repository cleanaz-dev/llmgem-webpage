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
      console.error("Missing parameters");
      return NextResponse.json(
        { error: "Missing required parameters: from, to, locationId" },
        { status: 400 }
      );
    }

    const availability = await getAvailability(from, to, locationId);

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Route handler error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability", details: error.message },
      { status: 500 }
    );
  }
}
