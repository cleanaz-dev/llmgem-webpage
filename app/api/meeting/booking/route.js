// api/meeting/booking/route.js
import { createBooking } from '@/lib/hapio';
import { NextResponse } from 'next/server';
import { createZoomMeeting } from '@/lib/zoom';
import { sendBookingEmail } from '@/lib/email';

export async function POST(request) {
  const data = await request.json();
  console.log("data:", data);

  if (!data || !data.start_time || !data.email || !data.name || !data.service) {
    return NextResponse.json(
      { error: 'Missing required fields: start_time, email, name, or service' },
      { status: 400 }
    );
  }

  try {
    const booking = await createBooking(data);
    console.log("Booking created:", booking);

    const zoomMeeting = await createZoomMeeting({
      start_time: data.start_time,
      service: data.service,
      name: data.name,
      email: data.email,
    });
    console.log("Zoom meeting created:", zoomMeeting);

    // Send the email using Resend
    await sendBookingEmail({
      email: data.email,
      name: data.name,
      service: data.service,
      start_time: data.start_time,
      join_url: zoomMeeting.join_url,
    });

    const response = {
      status: 200,
      booking,
      zoom: {
        meeting_id: zoomMeeting.meeting_id,
        join_url: zoomMeeting.join_url,
        start_url: zoomMeeting.start_url,
      },
    };
    console.log("Final API response:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}