// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail({
  email,
  name,
  service,
  start_time,
  join_url,
  duration,
  organizer = "LLM GEM Team <support@llmgem.com>", // Default organizer
}) {
  // Date handling
  const startDate = new Date(start_time);
  const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
  const startUTC = startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endUTC = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const timestampUTC = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

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

  // .ics content with ORGANIZER
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LLM GEM//Booking Confirmation//EN
BEGIN:VEVENT
UID:${startUTC}-${name}@llmgem.com
DTSTAMP:${timestampUTC}
DTSTART:${startUTC}
DTEND:${endUTC}
SUMMARY:${service} Session with LLM GEM
DESCRIPTION:Join your ${service} session here: ${join_url}
LOCATION:${join_url}
ORGANIZER;CN="${organizer.split("<")[0].trim()}":mailto:${organizer.includes("<") ? organizer.split("<")[1].replace(">", "") : "support@llmgem.com"}
END:VEVENT
END:VCALENDAR
  `.trim();

  // Image URLs
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const googleIconUrl = `${baseUrl}/images/google-calendar.png`;
  const outlookIconUrl = `${baseUrl}/images/outlook-calendar.png`;

  const htmlContent = `
<div style="font-family: Arial, Helvetica, sans-serif; background-color: #121212; padding: 30px 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1e1e1e; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid #2d2d2d;">
    <!-- Header -->
    <div style="padding: 30px 20px 25px; text-align: center; border-bottom: 1px solid #2d2d2d;">
      <h1 style="font-size: 28px; font-weight: 600; color: #ffffff; margin: 0 0 8px; letter-spacing: 0.5px;">Booking Confirmed</h1>
      <p style="font-size: 15px; color: #9e9e9e; margin: 0;">Powered by <span style="color: #22d3ee; font-weight: 500;">LLM GEM</span></p>
    </div>

    <!-- Body -->
    <div style="padding: 0 30px 30px;">
      <!-- Greeting -->
      <div style="margin-bottom: 25px; margin-top: 30px;">
        <p style="font-size: 16px; line-height: 1.6; color: white; color: #ffffff; margin: 0 0 15px;">
          Hi ${name},<br>
          Your <strong style="color: #22d3ee;">${service}</strong> session is confirmed.
        </p>
      </div>

      <!-- Details -->
      <div style="background-color: #252525; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <div>
            <p style="font-size: 14px; color: #9e9e9e; margin: 0 0 3px;">Date & Time</p>
            <p style="font-size: 16px; color: #ffffff; margin: 0; font-weight: 600;">
              ${new Date(start_time).toLocaleString()}
            </p>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <div>
            <p style="font-size: 14px; color: #9e9e9e; margin: 0 0 3px;">Duration</p>
            <p style="font-size: 16px; color: #ffffff; margin: 0; font-weight: 500;">
              ${duration} minutes
            </p>
          </div>
        </div>
        <div style="display: flex; align-items: center;">
          <div>
            <p style="font-size: 14px; color: #9e9e9e; margin: 0 0 3px;">Organizer</p>
            <p style="font-size: 16px; color: #ffffff; margin: 0; font-weight: 500;">
              ${organizer.split("<")[0].trim()}
            </p>
          </div>
        </div>
      </div>

      <!-- Join Meeting Button -->
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${join_url}" style="display: inline-block; padding: 14px 28px; background-color: #22d3ee; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px; box-shadow: 0 4px 12px rgba(13,148,136,0.3); transition: all 0.3s ease; min-width: 150px;">
          Join Meeting
        </a>
      </div>

      <!-- Calendar Buttons -->
      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-size: 14px; color: #9e9e9e; margin: 0 0 15px;">Add to your calendar:</p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <a href="${googleCalendarLink}" style="display: inline-block; padding: 10px 18px; background-color: #DB4437; color: #ffffff; text-decoration: none; font-size: 14px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.1); transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(219,68,55,0.3); min-width: 150px; text-align: center; margin: 5px;">
            <strong style="font-weight: 600;">Google Calendar</strong>
          </a>
          <a href="${outlookCalendarLink}" style="display: inline-block; padding: 10px 18px; background-color: #0078D4; color: #ffffff; text-decoration: none; font-size: 14px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.1); transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,120,212,0.3); min-width: 150px; text-align: center; margin: 5px;">
            <strong style="font-weight: 600;">Outlook</strong>
          </a>
        </div>
      </div>

      <!-- Support Info -->
      <div style="border-top: 1px solid #2d2d2d; padding-top: 25px;">
        <p style="font-size: 14px; line-height: 1.5; color: #9e9e9e; text-align: center; margin: 0;">
          Need to reschedule or have questions?<br>
          Reply to this email or contact us at <a href="mailto:support@llmgem.com" style="color: #22d3ee; text-decoration: none;">support@llmgem.com</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 20px; text-align: center; background-color: #1a1a1a; border-top: 1px solid #2d2d2d;">
      <p style="font-size: 12px; color: #6d6d6d; margin: 0;">© 2025 LLM GEM. All rights reserved.</p>
    </div>
  </div>
</div>
`;

  try {
    // Send to customer with .ics attachment
    const customerEmail = await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL || "Your Booking Team <no-reply@yourdomain.com>",
      to: email,
      subject: `${service} Meeting Confirmation`,
      html: htmlContent,
      attachments: [
        {
          filename: "event.ics",
          content: Buffer.from(icsContent),
          contentType: "text/calendar",
        },
      ],
    });

    // Send internal copy with [INTERNAL] prefix
    const internalEmail = await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL || "Your Booking Team <no-reply@yourdomain.com>",
      to: "meetings@llmgem.com",
      subject: `[INTERNAL] New Booking: ${service} with ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Booking Notification</h2>
          <p><strong>Client:</strong> ${name} (${email})</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Time:</strong> ${new Date(start_time).toLocaleString()}</p>
          <p><strong>Duration:</strong> ${duration} minutes</p>
          <p><strong>Organizer:</strong> ${organizer.split("<")[0].trim()}</p>
          <p><strong>Join URL:</strong> <a href="${join_url}">Meeting Link</a></p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            This booking was created through the LLM GEM booking system.
          </p>
        </div>
      `,
    });

    if (customerEmail.error || internalEmail.error) {
      throw new Error(customerEmail.error?.message || internalEmail.error?.message);
    }

    return customerEmail.data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error(`Failed to send confirmation emails: ${error.message}`);
  }
}