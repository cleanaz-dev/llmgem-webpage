// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail({
  email,
  name,
  service,
  start_time,
  join_url,
}) {
  const startDate = new Date(start_time);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1-hour duration
  const startUTC =
    startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endUTC = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  // Calendar links
  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${service} Meeting with ${name}`
  )}&dates=${startUTC}/${endUTC}&details=${encodeURIComponent(
    `Join here: ${join_url}`
  )}&location=Zoom`;
  const outlookCalendarLink = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    `${service} Meeting with ${name}`
  )}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(
    `Join here: ${join_url}`
  )}&location=Zoom`;

  // Image URLs
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const googleIconUrl = `${baseUrl}/images/google-calendar.png`;
  const outlookIconUrl = `${baseUrl}/images/outlook-calendar.png`;
  const bannerImageUrl = `${baseUrl}/images/booking-banner.png`;

  const htmlContent = `
<div style="font-family: Arial, Helvetica, sans-serif; background-color: #121212; padding: 20px;">
  <!-- Outer Container -->
  <div style="max-width: 600px; margin: 0 auto; background-color: #1e1e1e; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 1px solid #2d2d2d;">
    <!-- Banner Image -->
    <div style="width: 100%; height: 150px; background-color: #22d3ee;">
      <img src="${bannerImageUrl}" alt="Booking Confirmation" style="width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.9;" />
    </div>

    <!-- Header -->
    <div style="padding: 20px; text-align: center; border-bottom: 1px solid #2d2d2d;">
      <h1 style="font-size: 24px; font-weight: bold; color: #e0e0e0; margin: 0;">Booking Confirmation</h1>
      <p style="font-size: 14px; color: #9e9e9e; margin: 5px 0 0;">Powered by <span style="color: #0d9488; font-weight: bold;">LLM GEM</span></p>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">
      <p style="font-size: 16px; color: #e0e0e0; margin: 0 0 15px;">
        Hi ${name},<br>
        We're excited to connect with you! Your <strong style="color: #0d9488;">${service}</strong> meeting is confirmed.
      </p>
      <p style="font-size: 16px; color: #e0e0e0; margin: 0 0 20px;">
        <strong style="color: #0d9488;">Date & Time:</strong> ${new Date(
          start_time
        ).toLocaleString()}
      </p>
      <div style="text-align: center; margin: 0 0 25px;">
        <a href="${join_url}" style="display: inline-block; padding: 12px 24px; background-color: #22d3ee; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; box-shadow: 0 2px 8px rgba(13,148,136,0.4); transition: all 0.3s ease;">
          Join Meeting
        </a>
      </div>
      <p style="font-size: 14px; color: #9e9e9e; margin: 0 0 10px;">Add it to your calendar for a reminder:</p>
      <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
        <a href="${googleCalendarLink}" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #4285f4; color: #ffffff; text-decoration: none; font-size: 14px; border-radius: 6px; box-shadow: 0 2px 8px rgba(66,133,244,0.4); transition: all 0.3s ease;">
          <img src="${googleIconUrl}" alt="Google Calendar" width="20" height="20" style="margin-right: 8px; filter: brightness(0) invert(1);" />
          Google Calendar
        </a>
        <a href="${outlookCalendarLink}" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #0078d4; color: #ffffff; text-decoration: none; font-size: 14px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,120,212,0.4); transition: all 0.3s ease;">
          <img src="${outlookIconUrl}" alt="Outlook Calendar" width="20" height="20" style="margin-right: 8px; filter: brightness(0) invert(1);" />
          Outlook
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 20px; text-align: center; background-color: #1a1a1a; border-top: 1px solid #2d2d2d;">
      <p style="font-size: 14px; color: #9e9e9e; margin: 0 0 10px;">
        Looking forward to your session! If you need help, just reply to this email.
      </p>
      <p style="font-size: 12px; color: #6d6d6d; margin: 0;">© 2025 Your Booking Team</p>
    </div>
  </div>
</div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_SENDER_EMAIL ||
        "Your Booking Team <no-reply@yourdomain.com>",
      to: email,
      subject: `${service} Meeting Confirmation`,
      html: htmlContent,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
}
