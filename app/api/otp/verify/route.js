// /api/otp/verify/route.js
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
}


export async function POST(request) {
    if (!JWT_SECRET) {
        return NextResponse.json({ verified: false, message: "Server configuration error." }, { status: 500 });
    }
  try {
    // Get token and submitted OTP from client
    const { submittedOtp, token } = await request.json();

    if (!submittedOtp || !token) {
      return NextResponse.json(
        { verified: false, message: "OTP and token are required" },
        { status: 400 }
      );
    }

    let payload;
    try {
        // Verify the token signature & expiry
        payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        // Handle expired tokens, invalid signatures, etc.
        console.warn("JWT Verification failed:", error.message);
        let message = "Invalid or expired OTP session.";
        if (error.name === 'TokenExpiredError') {
            message = "OTP has expired. Please request a new one.";
        } else if (error.name === 'JsonWebTokenError') {
            message = "Invalid OTP session.";
        }
        return NextResponse.json(
            { verified: false, message: message },
            { status: 401 } // Unauthorized
        );
    }

    // Extract data from valid token
    const { email, otpHash } = payload; // Assuming these were in the payload

    if (!email || !otpHash) {
         console.error("JWT payload missing expected fields", payload);
         return NextResponse.json({ verified: false, message: "Invalid token payload." }, { status: 400 });
    }

    // Compare the submitted OTP with the hash from the token
    const isMatch = await bcrypt.compare(submittedOtp, otpHash);

    if (isMatch) {
      // OTP is correct!
      return NextResponse.json({ verified: true, message: "OTP verified successfully" });
    } else {
      // OTP is incorrect
      return NextResponse.json(
        { verified: false, message: "Invalid OTP." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    return NextResponse.json(
      { verified: false, message: "An internal error occurred during verification." },
      { status: 500 }
    );
  }
}