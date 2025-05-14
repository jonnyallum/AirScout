"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal, Bot, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AirScout Travel Assistant. How can I help you plan your next trip?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);
    
    // Simulate response delay
    setTimeout(() => {
      const responses = [
        "I'd recommend checking out our beach properties in Miami for a sunny getaway!",
        "For digital nomads, Bali has some amazing stays with great WiFi and co-working spaces nearby.",
        "If you're looking for a family-friendly destination, consider our properties with multiple bedrooms and kid-friendly amenities.",
        "The best time to book is typically 2-3 months in advance for the best selection and prices.",
        "Our mountain retreats in Colorado are perfect for hiking and outdoor adventures!",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-12 mb-8">
      <div className="bg-card shadow-lg rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full transform translate-x-1/3" />
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
              <Bot className="h-4 w-4 mr-2" />
              AI-Powered
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Meet Your Smart Travel Assistant
            </h2>
            <p className="text-muted-foreground mb-6">
              Get personalized travel recommendations, find the perfect stay based on your preferences, and get answers to all your travel questions instantly.
            </p>
            <Button size="lg" onClick={() => setIsOpen(true)}>
              Try it now
            </Button>
          </div>
          
          <div className="relative h-[300px] rounded-xl overflow-hidden border shadow-sm">
            <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-medium">Travel Assistant</span>
              </div>
            </div>
            <div className="p-4 h-[calc(300px-116px)] overflow-y-auto bg-white dark:bg-gray-900 space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Hi there! I'm your AirScout Travel Assistant. How can I help you plan your next trip?</p>
                </div>
              </div>
              <div className="flex items-start justify-end">
                <div className="bg-secondary rounded-lg p-3 max-w-xs">
                  <p className="text-sm">I'm looking for a beach vacation in July</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Great choice! For July, I'd recommend our beach properties in Florida, California, or the Caribbean. Would you prefer a quiet spot or something more lively with nightlife?</p>
                </div>
              </div>
            </div>
            <div className="border-t p-3 bg-white dark:bg-gray-900 flex items-center gap-2">
              <div className="flex-1 relative">
                <div className="border rounded-full pl-4 pr-10 py-2 flex items-center w-full">
                  <span className="truncate text-muted-foreground text-sm">Ask about your next trip...</span>
                </div>
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Assistant Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] bg-card shadow-xl rounded-xl z-50 flex flex-col overflow-hidden"
          >
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-medium">Travel Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.role === "assistant" ? "" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-primary/10"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t p-3 flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="border rounded-full pl-4 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}