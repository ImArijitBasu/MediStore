"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  order: "To place an order:\n1. Browse or search for medicines\n2. Add items to your cart\n3. Go to checkout\n4. Enter delivery details\n5. Choose payment method\n6. Confirm your order!\n\nYou can track orders from your Dashboard → Orders.",
  track: "You can track your order from your Dashboard. Go to Dashboard → Orders to see real-time status updates for all your orders.",
  return: "Our return policy allows returns within 7 days of delivery for unopened items. Prescription medicines cannot be returned due to regulations. Contact support for return requests.",
  delivery: "We offer:\n• Same-day delivery in metro cities (orders before 2 PM)\n• Standard delivery: 2-3 business days\n• Free shipping on orders above $25",
  payment: "We accept multiple payment methods:\n• Credit/Debit Cards\n• Digital Wallets\n• Cash on Delivery (COD)\n• Net Banking\nAll transactions are secured with 256-bit SSL encryption.",
  prescription: "For prescription (Rx) medicines, you need to upload a valid prescription during checkout. Our pharmacists verify every prescription for your safety. OTC medicines do not require prescriptions.",
  seller: "To become a seller:\n1. Register with the 'I want to become a seller' option\n2. Complete your profile\n3. Add your medicines to inventory\n4. Start receiving orders!\n\nVisit your Seller Dashboard to manage everything.",
  account: "You can manage your account from the Dashboard:\n• Update profile info\n• Change password\n• View order history\n• Manage cart\n\nClick on your profile icon in the navbar to access these options.",
  cart: "Your cart is accessible from the Dashboard → Cart. You can:\n• Add/remove items\n• Adjust quantities\n• View total price\n• Proceed to checkout",
  discount: "We offer regular discounts on medicines! Look for the discount badges on medicine cards. Some sellers offer up to 30% off on selected products.",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|good morning|good evening)/i.test(lower)) {
    return "Hello! 👋 Welcome to MediStore! How can I help you today?\n\nI can help with:\n• How to order medicines\n• Delivery information\n• Payment options\n• Return policy\n• Prescription uploads\n• Account management\n\nJust ask me anything!";
  }

  // Thanks
  if (/thank|thanks|thx/i.test(lower)) {
    return "You're welcome! 😊 Is there anything else I can help you with?";
  }

  // Search for medicine
  if (/find|search|looking for|where.*(?:medicine|drug|tablet|capsule)/i.test(lower)) {
    return "You can search for any medicine using the search bar on the homepage or the Medicines page. Just type the name, brand, or category and we will show you matching results with prices from different sellers!";
  }

  // Check FAQ matches
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Price related
  if (/price|cost|cheap|expensive|afford/i.test(lower)) {
    return "Medicine prices vary by seller. You can compare prices from different sellers on each medicine's detail page. Use the sort and filter options on the Medicines page to find the best deals!";
  }

  // Contact
  if (/contact|support|help|phone|email/i.test(lower)) {
    return "You can reach us through:\n• Email: support@medistore.com\n• Phone: +1 (555) 123-4567\n• Visit our Contact page\n• Use this chat anytime!\n\nOur support team is available 24/7.";
  }

  // Default
  return "I'm not sure about that, but I'm here to help! You can ask me about:\n\n• Ordering medicines\n• Delivery & tracking\n• Payment options\n• Returns & refunds\n• Prescriptions\n• Your account\n\nOr visit our Help Center for more detailed information.";
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 I'm MediBot, your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(input.trim()),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        {/* Pulse animation */}
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col shadow-2xl rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${isMinimized ? "h-14" : "h-[520px]"}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">MediBot</p>
            <p className="text-xs text-blue-200">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Minimize"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {["How to order?", "Delivery info", "Return policy", "Payment options"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); setTimeout(() => { setInput(q); handleSend(); }, 0); }}
                  className="px-3 py-1 text-xs rounded-full border hover:bg-muted transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 text-sm border rounded-xl bg-background focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
