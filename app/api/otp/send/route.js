// /api/otp/send/route.js
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendOTP } from "@/lib/email"; 

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10; // bcrypt salt rounds

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  // Optionally throw an error during build or startup in development
}

function generateOtp(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export async function POST(request) {
  if (!JWT_SECRET) {
    return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
  }
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const otp = generateOtp();

    // --- JWT Logic ---
    // Hash the OTP before putting it in the token
    const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);

    // Create the JWT payload
    const payload = { email, otpHash };
    const expiresIn = '5m'; // Token valid for 5 minutes

    // Sign the JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    // --- End JWT Logic ---

    // Send the *actual* OTP via email
    // Ensure your sendOTP utility is correctly imported and working
    await sendOTP({ emailAddress: email, otp: otp });
    console.log(`OTP email initiated for ${email}`); // Log for debugging

    // Return success and the token to the client
    return NextResponse.json({ message: "OTP sent successfully", token: token });

  } catch (error) {
    console.error("Failed to send OTP or generate token:", error);
    // Handle specific errors like email sending failure if needed
    if (error.message.includes('Failed to send OTP email')) {
         return NextResponse.json({ message: "Failed to send OTP email. Please check the address and try again." }, { status: 500 });
    }
    return NextResponse.json({ message: "An internal error occurred." }, { status: 500 });
  }
}