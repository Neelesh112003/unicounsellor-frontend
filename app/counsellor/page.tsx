"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../src/hooks/useAuth";
import api from "../src/lib/api";
import ChatMessage from "../src/components/aicounsellor/ChatMessage";
import ChatInput from "../src/components/aicounsellor/ChatInput";
import SuggestedQuestions from "../src/components/aicounsellor/SuggestedQuestion";
import TypingIndicator from "../src/components/aicounsellor/TypingIndicator";
import { Bot, ArrowLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatPage() {
  useEffect(() => {
    document.title = "AI Chat";
  }, []);

  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  // Welcome message
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm your AI counsellor. I'm here to help you with your university journey. You can ask me about recommended universities, your profile strengths, areas to improve, and more. How can I assist you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (userMessage: string) => {

    const userMsg: Message = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setError("");

    try {

      const response = await api.post("/ai/chat", { message: userMessage });

    
      const aiMsg: Message = {
        role: "assistant",
        content: response.data.reply || "I'm not sure how to respond to that.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setError(err?.response?.data?.reply || "Failed to get response from AI");
      

      const errorMsg: Message = {
        role: "assistant",
        content: err?.response?.data?.reply || "I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };
const handleSelectQuestion = async (question: string) => {
  if (question.includes('university') || question.includes('recommend')) {
    setIsTyping(true);
    
    try {
      const response = await api.post("/api/ai");  
      
      const uniNames = response.data.recommendations.map((u: any) => u.name).join('\n');
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `🎯 **Recommended Universities**:\n\n${uniNames}`,
        timestamp: new Date(),
      }]);
      
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: "assistant", 
        content: "Could not fetch universities right now. Try asking again!",
        timestamp: new Date(),
      }]);
    }
    
    setIsTyping(false);
    return;
  }
  
  handleSendMessage(question);
};





  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-teal-50">
        <div className="text-center p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-teal-50">
      <div className="max-w-5xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <Bot className="text-teal-600" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Counsellor</h1>
                <p className="text-sm text-gray-500">Ask me anything about your journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Suggested Questions (show only at start) */}
          {messages.length === 1 && (
            <SuggestedQuestions
              onSelectQuestion={handleSelectQuestion}
              disabled={isTyping}
            />
          )}

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* Error Message */}
            {error && !isTyping && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Auto scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}