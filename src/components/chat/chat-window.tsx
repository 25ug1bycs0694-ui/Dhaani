import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, MoreVertical, ArrowLeft, Send, Paperclip, Smile, Mic, CheckCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
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

const defaultMessages: Message[] = [
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
  buyerName?: string;
  buyerInfo?: string;
  onBack?: () => void;
}

export default function ChatWindow({ conversationId, buyerName = 'Green Energy Biogas', buyerInfo = 'Verified Buyer • Panipat, Haryana • 41 km away', onBack }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState('');
  const [allMessages, setAllMessages] = useState(defaultMessages);

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
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-shrink-0 border-b border-border/40 bg-white/60 backdrop-blur-sm"
      >
        {/* Top Header Bar with Buyer Info */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back Button + Buyer Info */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {onBack && (
                <button onClick={onBack} className="md:hidden p-1.5 hover:bg-secondary rounded-lg transition-colors flex-shrink-0">
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
              )}
              <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm relative bg-gradient-to-br from-primary to-primary/70">
                GE
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-foreground text-base truncate">{buyerName}</h2>
                <p className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                  <span className="text-green-600">✓</span>
                  <span className="truncate">{buyerInfo}</span>
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200 group">
                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200 group">
                <Video className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200">
                <MoreVertical className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Listing Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 pb-4"
        >
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/8 via-primary/5 to-accent/5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">🌾</span>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm">Rice Straw • 22 Tonnes</p>
                <p className="text-xs text-muted-foreground">₹17,000 / Tonne</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100/70 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap ml-3 flex-shrink-0">
              ACTIVE
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Deal Timeline */}
      <div className="flex-shrink-0 border-b border-border/40 bg-secondary/20">
        <DealTimeline />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col px-6 py-5 space-y-5">
          <AnimatePresence>
            {allMessages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.02 }}
                className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'offer' ? (
                  <div className={msg.sender === 'farmer' ? 'order-2' : 'order-1'}>
                    <OfferCard offerData={msg.offerData} sender={msg.sender} />
                  </div>
                ) : (
                  <div className={`flex flex-col gap-1 ${msg.sender === 'farmer' ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                    <div
                      className={cn(
                        "px-4 py-2.5 rounded-2xl shadow-sm transition-all duration-200",
                        msg.sender === 'farmer'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-secondary/80 text-foreground rounded-bl-sm hover:bg-secondary'
                      )}
                    >
                      <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1.5 text-xs text-muted-foreground px-1",
                      msg.sender === 'farmer' ? 'justify-end' : 'justify-start'
                    )}>
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
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-muted-foreground text-xs mt-2"
          >
            <span>Green Energy Biogas is typing</span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-border/40 bg-white/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-secondary/60 rounded-lg transition-colors duration-200 text-primary flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary/60 rounded-lg transition-colors duration-200 text-primary flex-shrink-0">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-full bg-secondary/60 border border-border text-foreground",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            )}
          />
          <button
            onClick={handleSendMessage}
            className={cn(
              "p-2.5 rounded-full transition-all duration-200 text-primary flex-shrink-0",
              "hover:bg-primary hover:text-primary-foreground hover:scale-110"
            )}
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
