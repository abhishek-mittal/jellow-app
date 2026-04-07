"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem } from "@/components/motion";
import { ChevronLeft, Paperclip, Send } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "support";
  text: string;
  timestamp: string;
}

export default function LiveChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "user",
      text: "Hello! I'm having trouble with my account, I can't update my profile picture correctly?",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      sender: "support",
      text: "Hello Makisi! We have notified the dev team about the bug and now you can update your profile picture with ease.",
      timestamp: "10:00 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Amazing, thanks a lot! It works now, and I can continue my fitness journey with AI 💪🐙",
      timestamp: "10:02 AM",
    },
    {
      id: 4,
      sender: "support",
      text: "No problem!",
      timestamp: "10:03 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <MotionPage className="flex min-h-screen flex-col bg-s-orange">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="relative flex items-center justify-between bg-s-orange px-5 py-6 pt-12">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white active:bg-white/30"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[24px] font-extrabold text-white">Live Chat</h1>
          <div className="h-9 w-9" /> {/* Spacer for alignment */}
        </div>
      </MotionItem>

      {/* ─── Messages Area ─── */}
      <main className="flex-1 overflow-y-auto bg-white px-4 py-6">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <MotionItem
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-s-black text-white rounded-br-none"
                    : "bg-s-gray/30 text-s-black rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`mt-1 text-xs ${
                    message.sender === "user"
                      ? "text-white/50"
                      : "text-s-gray"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </MotionItem>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* ─── Input Area ─── */}
      <MotionItem>
        <div className="border-t border-s-gray/20 bg-white px-4 py-4">
          <div className="flex gap-2">
            <button
              aria-label="Attach file"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-s-gray/20 text-s-gray transition-colors hover:bg-s-gray/30"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Type to start chatting..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1 rounded-full bg-s-gray/20 px-4 py-3 text-s-black placeholder-s-gray focus:outline-none focus:ring-2 focus:ring-s-orange/50"
            />
            <motion.button
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send message"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </MotionItem>
    </MotionPage>
  );
}
