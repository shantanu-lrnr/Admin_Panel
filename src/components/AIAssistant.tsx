import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'assistant', 
      text: "Welcome back! I am your autonomous dashboard assistant. How can I help optimize your AI infrastructure today?", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const query = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    // Mock response generation based on dashboard analytics
    setTimeout(() => {
      let reply = "I'm checking the logs for that... Our active node aggregates are operating normally. Is there any particular metric you'd like to dive into?";
      
      if (query.includes('revenue') || query.includes('earn') || query.includes('money')) {
        reply = "Revenue is at $142,384.00, representing a 12.4% MoM expansion. This spike is mainly attributed to the Stripe contract renewal.";
      } else if (query.includes('server') || query.includes('cpu') || query.includes('usage') || query.includes('load')) {
        reply = "Current average server usage is 94.2%. Nodes in US-East-1 are close to threshold (97%), but auto-scaling handles spillover to US-West-2. Latency is optimal at 42ms.";
      } else if (query.includes('ai') || query.includes('model') || query.includes('gpt') || query.includes('claude')) {
        reply = "We handled 1,842,904 AI calls this week, an increase of 28.4%. GPT-4o holds the majority share with 45%, followed closely by Claude 3.5 Sonnet at 35%.";
      } else if (query.includes('user') || query.includes('visitor') || query.includes('traffic')) {
        reply = "Active user count stands at 24,892, with 2,900 new signups registered this week. Conversion rate is highly stable at 3.24%.";
      } else if (query.includes('help') || query.includes('what can you do')) {
        reply = "I can query live metrics for you! Ask me about 'revenue details', 'server cluster health', 'user growth', or 'AI models usage distributions'.";
      }

      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {/* Chat Window Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 w-[360px] h-[480px] rounded-3xl glass-panel border border-slate-200/30 dark:border-indigo-500/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-600/90 to-cyan-600/90 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/10 rounded-xl relative">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide">Gravity AI Copilot</h4>
                  <p className="text-[9px] text-cyan-200 font-medium">System Core Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs flex flex-col gap-1 shadow-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-slate-800/40 text-slate-800 dark:text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[8px] text-right font-mono ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-slate-800/40 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200/10 dark:border-slate-800/30 flex gap-2 items-center bg-white/30 dark:bg-slate-950/30">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about revenue, server load, AI..."
                className="flex-1 pl-3 pr-2 py-2 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center cursor-pointer relative group border border-indigo-400/20"
      >
        <span className="absolute inset-0 rounded-full bg-indigo-400/10 animate-ping group-hover:animate-none pointer-events-none" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <Sparkles className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
