"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import ChatUI2 from "./ChatUI2"; // Import the new ChatUI component
import ContactText from "./ContactText"; // Import the new ContactText component

export default function Contact() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);

  return (
    <div className="w-full bg-black p-4 lg:p-8">
      {/* Centered Container */}
      <div className="max-w-4xl mx-auto">
        {/* Two-Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Contact Information */}
          <div className="flex flex-col justify-around md:w-1/2">
            <div>
              <ContactText /> {/* Use the new component here */}
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 flex items-center gap-2">
                <Mail className="text-cyan-300" size={20} />
                Email:{" "}
                <a
                  href="mailto:info@llmgem.com"
                  className="text-cyan-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  info@llmgem.com
                </a>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Phone className="text-cyan-300" size={20} />
                Phone:{" "}
                <a
                  href="tel:+12267902753"
                  className="text-cyan-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  +1 (226) 790-2753
                </a>
              </p>
            </div>
          </div>

          {/* Right Side: Chat UI */}
          <div className="md:w-1/2">
            <ChatUI2
              userInfo={userInfo}
              isUserInfoSubmitted={isUserInfoSubmitted}
              onUserInfoSubmit={(updatedUserInfo) => {
                setUserInfo(updatedUserInfo);
                setIsUserInfoSubmitted(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}