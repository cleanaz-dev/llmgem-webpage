"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming Shadcn UI
import { Send } from "lucide-react";

export default function ChatUI({ userInfo, isUserInfoSubmitted, onUserInfoSubmit }) {
  const [messages, setMessages] = useState([
    { text: "Hey there! How can I assist you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(userInfo); // Local state for inputs
  const chatEndRef = useRef(null);

  const predefinedMessages = [
    {
      text: "Book a Call",
      action: () => addMessage("I’d like to schedule a call!"),
    },
    {
      text: "Ask a Question",
      action: () => addMessage("I have a quick question."),
    },
  ];

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messages.length > 1 && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Sync localUserInfo with prop changes (if needed)
  useEffect(() => {
    setLocalUserInfo(userInfo);
  }, [userInfo]);

  const addMessage = (text, isBot = false) => {
    setMessages((prev) => [...prev, { text, isBot }]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("Please enter a message.");
      return;
    }

    addMessage(input, false);
    setInput("");
    setIsBotTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          name: userInfo.name,
          email: userInfo.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bot response");
      }

      const data = await response.json();
      addMessage(data.response, true);
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

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (!localUserInfo.name || !localUserInfo.email) {
      alert("Please enter your name and email.");
      return;
    }
    onUserInfoSubmit(localUserInfo); // Pass the updated info to the parent
  };

  return (
    <div className="bg-[rgba(10,10,20,0.95)] border border-cyan-500/20 rounded-xl h-[450px] flex flex-col shadow-[0_0_20px_rgba(6,182,212,0.2)]">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <span className="text-cyan-300 font-semibold">Chat Assistant</span>
        <span className="text-xs text-slate-500">Powered by LLM GEM</span>
      </div>

      {/* Chat Messages with Custom Scrollbar */}
      <ScrollArea className="flex-1 h-52 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                msg.isBot ? "justify-start" : "justify-end"
              }`}
            >
              {msg.isBot && (
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">
                  G
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.isBot
                    ? "bg-[rgba(20,20,40,0.9)] text-slate-300 border border-cyan-500/10 text-sm"
                    : "bg-cyan-300 text-slate-900 text-sm"
                }`}
              >
                {msg.text}
              </motion.div>
              {!msg.isBot && (
                <div className="w-8 h-8 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-300 font-bold">
                  U
                </div>
              )}
            </div>
          ))}
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

      {/* User Info Form (if not submitted) */}
      {!isUserInfoSubmitted && (
        <form onSubmit={handleUserInfoSubmit} className="p-4 border-t border-slate-800">
          <div className="space-y-4">
            <input
              type="text"
              value={localUserInfo.name}
              onChange={(e) =>
                setLocalUserInfo({ ...localUserInfo, name: e.target.value })
              }
              className="w-full p-2 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg text-slate-300 focus:border-cyan-300 focus:outline-none placeholder:text-slate-500"
              placeholder="Your Name"
              aria-label="Your Name"
            />
            <input
              type="email"
              value={localUserInfo.email}
              onChange={(e) =>
                setLocalUserInfo({ ...localUserInfo, email: e.target.value })
              }
              className="w-full p-2 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg text-slate-300 focus:border-cyan-300 focus:outline-none placeholder:text-slate-500"
              placeholder="Your Email"
              aria-label="Your Email"
            />
            <button
              type="submit"
              className="w-full p-2 text-cyan-300 bg-[rgba(20,20,40,0.9)] border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors duration-200 cursor-pointer"
            >
              Start Chat
            </button>
          </div>
        </form>
      )}

      {/* Chat Input (if user info is submitted) */}
      {isUserInfoSubmitted && (
        <>
          <div className="p-4 border-t border-slate-800 flex gap-2">
            {predefinedMessages.map((msg, index) => (
              <button
                key={index}
                onClick={msg.action}
                className="px-3 py-1 text-sm text-cyan-300 bg-[rgba(20,20,40,0.9)] rounded-full hover:bg-cyan-500/20 transition-colors duration-200"
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
                aria-label="Type your message"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="p-2 text-cyan-300 hover:text-cyan-400 transition-colors duration-200"
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