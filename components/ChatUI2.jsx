"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import BookingForm from "./BookingForm";

export default function ChatUI2({
  userInfo,
  isUserInfoSubmitted,
  onUserInfoSubmit,
}) {
  // State and refs
  const [messages, setMessages] = useState([
    { text: "Hey there! How can I assist you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Predefined quick actions
  const predefinedMessages = [
    {
      text: "Book a Call",
      action: () =>
        addMessage({
          text: "Let's schedule your call! Please select a service and available time.",
          isBot: true,
          isBooking: true,
        }),
    },
    {
      text: "Ask a Question",
      action: () => addMessage("I have a quick question."),
    },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Sync user info
  useEffect(() => {
    setLocalUserInfo(userInfo);
  }, [userInfo]);

  // Core message functions
  const addMessage = (content, isBot = false) => {
    setMessages((prev) => [
      ...prev,
      typeof content === "string" ? { text: content, isBot } : content,
    ]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input, false);
    setInput("");
    setIsBotTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          name: userInfo.name,
          email: userInfo.email,
        }),
      });

      const data = await response.json();

      if (data.type === "booking") {
        addMessage({
          text: "Let's schedule your call! Please select a service and available time.",
          isBot: true,
          isBooking: true,
        });
      } else {
        addMessage(data.response || "Sorry, I couldn't process that.", true);
      }
    } catch (error) {
      console.error("Error:", error);
      addMessage(
        "Sorry, I couldn't process your request. Please try again.",
        true
      );
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleBookingSubmit = async (
    serviceType,
    startTime,
    endTime,
    { locationId, resourceId, serviceId }
  ) => {
    try {
      setIsBookingLoading(true); // Set loading state
      if (!startTime) {
        throw new Error("No time slot selected");
      }

      const response = await fetch("/api/meeting/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_time: startTime,
          end_time: endTime,
          email: userInfo.email,
          name: userInfo.name,
          service: serviceType,
          location_id: locationId,
          resource_id: resourceId,
          service_id: serviceId,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      const { confirmation } = await response.json();
      setIsBookingConfirmed(true);
      addMessage({
        text: `Your booking for ${new Date(
          startTime
        ).toLocaleString()} is confirmed, please look out for our email with details.`,
        isBot: true,
      });
    } catch (error) {
      console.error("Booking error:", error);
      addMessage({
        text: "Failed to complete booking. Please try again.",
        isBot: true,
      });
    } finally {
      setIsBookingLoading(false); // Reset loading state
    }
  };

  const renderMessage = (msg, index) => (
    <div
      key={index}
      className={`flex flex-col gap-1 ${
        msg.isBot ? "items-start" : "items-end"
      }`}
    >
      <div
        className={`text-xs font-bold ${
          msg.isBot ? "text-cyan-300" : "text-slate-300"
        }`}
      >
        {msg.isBot ? "AI" : "You"}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${
          msg.isBooking ? "w-full" : "max-w-[85%]"
        } p-3 rounded-lg ${
          msg.isBot
            ? "bg-[rgba(20,20,40,0.9)] text-slate-300 border border-cyan-500/10 text-sm"
            : "bg-cyan-300 text-slate-900 text-sm"
        }`}
      >
        {msg.text}
        {msg.isBooking && (
          <BookingForm
            onSubmit={handleBookingSubmit}
            userInfo={userInfo}
            isBookingConfirmed={isBookingConfirmed}
            isBookingLoading={isBookingLoading} // Pass loading state
          />
        )}
      </motion.div>
    </div>
  );

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (!localUserInfo.name || !localUserInfo.email) {
      alert("Please enter your name and email.");
      return;
    }
    onUserInfoSubmit(localUserInfo);
  };

  return (
    <div className="bg-[rgba(10,10,20,0.95)] border border-cyan-500/20 rounded-xl h-[550px] md:h-[650px] flex flex-col shadow-[0_0_20px_rgba(6,182,212,0.2)]">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <span className="text-cyan-300 font-semibold">Chat Assistant</span>
        <span className="text-xs text-slate-500">Powered by LLM GEM</span>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 h-96 overflow-y-auto">
        <div className="p-2 md:p-4 space-y-4">
          {messages.map(renderMessage)}
          {isBotTyping && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">
                G
              </div>
              <div className="max-w-[70%] p-3 rounded-lg bg-[rgba(20,20,40,0.9)] text-slate-300 border border-cyan-500/10 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isUserInfoSubmitted ? (
        <form
          onSubmit={handleUserInfoSubmit}
          className="p-4 border-t border-slate-800"
        >
          <div className="space-y-4">
            <input
              type="text"
              value={localUserInfo.name}
              onChange={(e) =>
                setLocalUserInfo({ ...localUserInfo, name: e.target.value })
              }
              className="w-full p-2 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg text-slate-300 focus:border-cyan-300 focus:outline-none placeholder:text-slate-500"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              value={localUserInfo.email}
              onChange={(e) =>
                setLocalUserInfo({ ...localUserInfo, email: e.target.value })
              }
              className="w-full p-2 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg text-slate-300 focus:border-cyan-300 focus:outline-none placeholder:text-slate-500"
              placeholder="Your Email"
              required
            />
            <button
              type="submit"
              className="w-full p-2 text-cyan-300 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors"
            >
              Start Chat
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="p-4 border-t border-slate-800 flex gap-2">
            {predefinedMessages.map((msg, i) => (
              <button
                key={i}
                onClick={msg.action}
                className="px-3 py-1 text-sm text-cyan-300 bg-[rgba(20,20,40,0.9)] rounded-full hover:bg-cyan-500/20 transition-colors"
              >
                {msg.text}
              </button>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg text-slate-300 focus:border-cyan-300 focus:outline-none placeholder:text-slate-500"
                placeholder="Type your message..."
                required
              />
              <button
                type="submit"
                className="p-2 text-cyan-300 hover:text-cyan-400 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
