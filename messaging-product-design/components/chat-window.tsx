'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, MoreVertical, ArrowLeft, Send, Paperclip, Smile, Mic, CheckCheck, Check } from 'lucide-react';
import OfferCard from './offer-card';
import DealTimeline from './deal-timeline';

interface Message {
  id: string;
  sender: 'buyer' | 'farmer';
  type: 'text' | 'offer';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  offerData?: any;
}

const messages: Message[] = [
  {
    id: '1',
    sender: 'buyer',
    type: 'text',
    content: 'Hi Gurpreet Singh, we are interested in your rice straw.',
    timestamp: '10:30 AM',
    status: 'read',
  },
  {
    id: '2',
    sender: 'buyer',
    type: 'text',
    content: 'Can we schedule pickup this weekend?',
    timestamp: '10:32 AM',
    status: 'read',
  },
  {
    id: '3',
    sender: 'farmer',
    type: 'text',
    content: 'Yes, that works for us. We can arrange pickup on Saturday.',
    timestamp: '10:35 AM',
    status: 'read',
  },
  {
    id: '4',
    sender: 'buyer',
    type: 'offer',
    content: 'Offer for Rice Straw - 22 Tonnes',
    timestamp: '10:40 AM',
    status: 'delivered',
    offerData: {
      product: 'Rice Straw',
      quantity: '22',
      unit: 'Tonnes',
      price: '₹17,000',
      pricePerUnit: '₹17,000/Tonne',
      location: 'Panipat',
      status: 'ACTIVE',
    },
  },
  {
    id: '5',
    sender: 'farmer',
    type: 'text',
    content: 'Thank you for the offer. The price looks good.',
    timestamp: '10:45 AM',
    status: 'read',
  },
  {
    id: '6',
    sender: 'farmer',
    type: 'text',
    content: 'I can confirm the quantity and location.',
    timestamp: '10:46 AM',
    status: 'read',
  },
  {
    id: '7',
    sender: 'buyer',
    type: 'text',
    content: 'Perfect! We will share the truck details 24 hours before pickup.',
    timestamp: '10:50 AM',
    status: 'sent',
  },
];

interface ChatWindowProps {
  conversationId: string;
  onBack?: () => void;
}

export default function ChatWindow({ conversationId, onBack }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState('');
  const [allMessages, setAllMessages] = useState(messages);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: String(allMessages.length + 1),
        sender: 'farmer',
        type: 'text',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
      };
      setAllMessages([...allMessages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header - Glassmorphism */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 py-4 border-b border-border/50 backdrop-blur-md bg-white/70 sticky top-0 z-30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold text-sm relative">
                GE
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-foreground">Green Energy Biogas</h2>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="text-green-600">✓</span>
                  <span>Verified Buyer • Panipat, Haryana • 41 km away</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 group">
              <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 group">
              <Video className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300">
              <MoreVertical className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Listing Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20"
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">🌾</span>
            <div>
              <p className="font-semibold text-foreground">Rice Straw • 22 Tonnes</p>
              <p className="text-xs text-muted-foreground">₹17,000 / Tonne</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">ACTIVE</span>
        </motion.div>
      </motion.div>

      {/* Deal Timeline */}
      <DealTimeline />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        <AnimatePresence>
          {allMessages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'offer' ? (
                <OfferCard offerData={msg.offerData} sender={msg.sender} />
              ) : (
                <div className={`max-w-xs lg:max-w-md ${msg.sender === 'farmer' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-3 rounded-3xl shadow-sm transition-all duration-300 ${
                      msg.sender === 'farmer'
                        ? 'bg-primary text-primary-foreground rounded-br-none hover:shadow-md'
                        : 'bg-secondary text-foreground rounded-bl-none hover:shadow-md hover:bg-secondary/80'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs text-muted-foreground mt-1 ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'farmer' && msg.status && (
                      <>
                        {msg.status === 'sent' && <Check className="w-3 h-3" />}
                        {msg.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                        {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-muted-foreground text-xs"
        >
          <span>Green Energy Biogas is typing</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border bg-background sticky bottom-0">
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 text-primary">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 text-primary">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-3 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 text-primary hover:scale-110"
          >
            {messageInput.trim() ? (
              <Send className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
