import React, { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';


const AI_Assistant = ({userDetails}) => {

  if(!userDetails){
    return alert("you might need to login or register to a channel !!")
  }
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: "Hiii👋How can Streamy help you today?😊 ",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Format time to HH:MM AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${import.meta.env.VITE_API_URL}`
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
         messages: [
  { 
    role: "system", 
    content: `
    You are Streamy 🌊, the creative AI assistant for StreamIt. Your personality:
    - Friendly, upbeat, and emoji-savvy 😊✨
    - Think like a content creator AND viewer 🎥👀
    - Prioritize FRESH, viral-ready ideas 💡🔥
    - Format responses CLEANLY:
      • Use bullet points for lists 📋
      • Paragraphs for explanations 📝
      • Bold (**like this**) for key tips and never use the word Youtube  💡
      • Max 1-2 emojis per sentence 🚀
      
    - Always ask engaging follow-ups 🎤 
    The user's channel is about: ${userDetails.channelDescription}
    Provide helpful suggestions related to their channel content.
      === RESPONSE FORMAT ===
    1. LINE BREAKS: Put 2 new lines between sections
    2. BULLET POINTS: Start every item with • and a space
    3. SPACING: Add blank line before/after bullet lists
    4. LENGTH: Keep paragraphs under 3 lines
    `
    },
  { role: "user", content: input }
]
        })
      });

      const data = await res.json();
      const aiResponse = data?.choices?.[0]?.message?.content || "I couldn't generate a response.";
      
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: aiResponse,
        timestamp: new Date()
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "⚠️ Error getting response",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] text-white font-sans overflow-hidden">
       <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-[#E95670] opacity-20 blur-3xl rounded-full animate-pulse-slow z-0" />
      {/* Chat container */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col h-screen px-4">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-xl font-bold">AI Assistant : Streamy </h1>
        </div>

        {/* Conversation area */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            <div className="h-1" /> 
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="text-xs opacity-70">
                    {formatTime(msg.timestamp)}
                  </div>
                  {msg.sender === 'ai' && (
                    <button 
                      onClick={() => copyToClipboard(msg.text, idx)}
                      className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                    >
                      {copiedIndex === idx ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <div
                 className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm
                  ${msg.sender === 'user'
                 ? 'bg-white/90 text-gray-900 rounded-br-none'
                 : 'bg-pink-600/90 text-white rounded-bl-none'}
                  `}
                  dangerouslySetInnerHTML={{
                   __html: msg.sender === 'ai'
                  ? DOMPurify.sanitize(marked.parse(msg.text))
                  : msg.text,
                  }}
              />

              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="sticky bottom-0 pb-6 pt-2 bg-gradient-to-t from-[#432F70] to-transparent">
          <div className="flex items-end gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/10">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Type your message..."
              className="flex-1 resize-none bg-transparent text-white placeholder-white/50 outline-none max-h-32"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`p-2 rounded-lg transition-all
                ${loading || !input.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-700 cursor-pointer'}
              `}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
          <div className="text-xs text-center mt-2 opacity-50">
            AI responses may not always be accurate. Please verify important information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_Assistant;
