"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input"; 
import BookingForm from "./BookingForm";
import { FaGem } from "react-icons/fa";

export default function ChatUI2({
  userInfo,
  isUserInfoSubmitted,
  onUserInfoSubmit,
}) {
  // State and refs (unchanged)
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([])
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Predefined quick actions (unchanged)
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
  ];

  // Effects (unchanged)
  useEffect(() => {
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setLocalUserInfo(userInfo);
  }, [userInfo]);

   // Add this effect to handle the welcome message when user info is submitted
   useEffect(() => {
    if (isUserInfoSubmitted) {
      setMessages([{ 
        text: `Hey ${userInfo.name}! How can I assist you today?`, 
        isBot: true 
      }]);
    }
  }, [isUserInfoSubmitted, userInfo.name]);

// Helper function to add a message and update history
const addMessage = (text, isBot) => {
  const newMessage = { text, isBot };
  setMessages((prev) => [...prev, newMessage]);
  setHistory((prev) => [...prev, { role: isBot ? "assistant" : "user", content: text }]);
};

const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  // Add user message to messages and history
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
        history: history, // Send the history array
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
    // Booking submit logic (unchanged)
    try {
      setIsBookingLoading(true);
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
        text: `🎉 Your booking for ${new Date(startTime).toLocaleDateString([], {
          month: 'short',
          day: 'numeric'
        })} at ${new Date(startTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })} is confirmed, please look out for our email with details.`,
        isBot: true,
      });
    } catch (error) {
      console.error("Booking error:", error);
      addMessage({
        text: "Failed to complete booking. Please try again.",
        isBot: true,
      });
    } finally {
      setIsBookingLoading(false);
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
            isBookingLoading={isBookingLoading}
            chatEndRef={chatEndRef}
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
      {/* Header (unchanged) */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <span className="text-cyan-300 font-semibold">Chat Assistant</span>
        <span className="text-xs text-slate-500">Powered by LLM GEM</span>
      </div>

     
      {/* Messages */}
      <ScrollArea className="flex-1 h-96 overflow-y-auto">
        <div className="p-2 md:p-4 space-y-4">
          {!isUserInfoSubmitted ? (
            <div className="h-full flex flex-col items-center mt-auto justify-center py-12 group">
              <FaGem className="text-3xl md:text-7xl text-cyan-500/30 mb-4 shadow-xl group-hover:scale-125 transition-all duration-700" />
              <p className="text-slate-500 text-center max-w-xs group-hover:text-cyan-400 transition-all duration-700">
                Please enter your details to start chatting
              </p>
            </div>
          ) : (
            <>
              {messages.map(renderMessage)}
              {isBotTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">
                    AI
                  </div>
                  <div className="max-w-[70%] p-3 rounded-lg bg-[rgba(20,20,40,0.9)] text-slate-300 border border-cyan-500/10 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>
      </ScrollArea>

      {/* Footer with Shadcn components */}
      {!isUserInfoSubmitted ? (
        <form
          onSubmit={handleUserInfoSubmit}
          className="p-4 border-t border-slate-800"
        >
          <div className="space-y-4">
            <Input
              type="text"
              value={localUserInfo.name}
              onChange={(e) =>
                setLocalUserInfo({ ...localUserInfo, name: e.target.value })
              }
              className="w-full bg-[rgba(20,20,40,0.9)] text-slate-300 placeholder:text-slate-500 border-cyan-500/20 focus:border-cyan-300"
              placeholder="Your Name"
              required
            />
            <Input
              type="email"
              value={localUserInfo.email}
              onChange={(e) =>
                setLocalUserInfo({ ...localUserInfo, email: e.target.value })
              }
              className="w-full bg-[rgba(20,20,40,0.9)] text-slate-300 placeholder:text-slate-500 border-cyan-500/20 focus:border-cyan-300"
              placeholder="Your Email"
              required
            />
            <button
              type="submit"
              className="w-full p-2 text-cyan-300 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors cursor-pointer"
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
              className="px-3 py-1 text-sm text-cyan-300 bg-[rgba(20,20,40,0.9)] rounded-full hover:bg-cyan-500/20 transition-colors cursor-pointer"
            >
              {msg.text}
            </button>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[rgba(20,20,40,0.9)] text-slate-300 placeholder:text-slate-500 border-cyan-500/20 focus:border-cyan-300"
                placeholder="Type your message..."
                required
              />
             <button
                type="submit"
                className="p-2 text-cyan-300 hover:text-cyan-400 transition-colors cursor-pointer"
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