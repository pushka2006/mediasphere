"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles, MessageSquare } from "lucide-react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Hello Pushkar! I'm MediaSphere AI. Ask me anything about active campaigns, media availability, proposals, or analytics.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let reply = "I've analyzed your media inventory and active campaigns.";
      if (userMsg.toLowerCase().includes("active") || userMsg.toLowerCase().includes("campaign")) {
        reply = "You currently have 128 total campaigns, with 56 active campaigns generate ₹2.45 Cr revenue this month.";
      } else if (userMsg.toLowerCase().includes("mumbai") || userMsg.toLowerCase().includes("billboard")) {
        reply = "In Mumbai, Western Express Highway Billboard A1 and Phoenix Mall Atrium are top performing assets with over 25L monthly reach.";
      } else if (userMsg.toLowerCase().includes("proposal") || userMsg.toLowerCase().includes("quotation")) {
        reply = "I can auto-generate a comprehensive OOH media proposal for your client. Would you like me to open the AI Planner?";
      }
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Sidebar Widget Banner */}
      <div className="glass-card p-4 relative overflow-hidden gradient-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 animate-pulse">
            <Bot size={22} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              AI Assistant
            </h4>
            <p className="text-[11px] text-slate-400">
              Ask about campaigns, media, reports & performance insights
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full btn-primary text-xs py-2 rounded-xl flex items-center justify-center gap-2 mt-2"
        >
          <MessageSquare size={14} />
          <span>Chat with AI</span>
        </button>
      </div>

      {/* Popup Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden glass border border-white/10 flex flex-col h-[500px]"
            style={{
              background: "rgba(12, 18, 32, 0.95)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            }}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/08 flex items-center justify-between bg-brand-500/10">
              <div className="flex items-center gap-2">
                <Bot className="text-brand-400" size={20} />
                <div>
                  <h3 className="text-sm font-bold text-white">MediaSphere AI Assistant</h3>
                  <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online & ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand-600 text-white rounded-br-none"
                        : "bg-white/08 text-slate-200 border border-white/08 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-white/06 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              {["Show active campaigns", "Suggest media plan", "Generate report"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setInput(chip);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/05 hover:bg-white/10 text-slate-400 hover:text-white border border-white/08 whitespace-nowrap transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/08 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask MediaSphere AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-white/05 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                onClick={handleSend}
                className="btn-primary p-2.5 rounded-xl shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
