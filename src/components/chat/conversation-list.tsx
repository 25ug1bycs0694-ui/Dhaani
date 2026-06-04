import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  name: string;
  company: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  verified: boolean;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Green Energy',
    company: 'Biogas Plant',
    lastMessage: 'We can pick up this weekend.',
    time: '2m ago',
    unread: 0,
    avatar: 'GE',
    verified: true,
  },
  {
    id: '2',
    name: 'Dilli Paper',
    company: 'Paper Mills',
    lastMessage: 'Please share more photos.',
    time: '1h ago',
    unread: 1,
    avatar: 'DP',
    verified: true,
  },
  {
    id: '3',
    name: 'Sharma',
    company: 'Mushroom Farms',
    lastMessage: 'Offer updated for your listing',
    time: '3h ago',
    unread: 0,
    avatar: 'SM',
    verified: false,
  },
  {
    id: '4',
    name: 'Biofuel',
    company: 'Solutions Pvt. Ltd.',
    lastMessage: "Thank's! Let's proceed.",
    time: '5h ago',
    unread: 0,
    avatar: 'BS',
    verified: true,
  },
  {
    id: '5',
    name: 'Khurana',
    company: 'Agro Traders',
    lastMessage: 'Pickup location confirmed.',
    time: '1d ago',
    unread: 0,
    avatar: 'KA',
    verified: true,
  },
];

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/40 bg-white/60 backdrop-blur-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-foreground">Messages</h1>
          <button className="p-2 hover:bg-secondary/60 rounded-full transition-colors duration-200">
            <Plus className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-full bg-secondary/60 border border-border text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="space-y-1 p-3">
          {filtered.length > 0 ? (
            filtered.map((conversation, idx) => (
              <motion.button
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ x: 2 }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl transition-all duration-200 group text-left hover:bg-secondary/40",
                  selectedId === conversation.id
                    ? 'bg-primary/12 border-l-3 border-primary'
                    : ''
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div className={cn(
                    "relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200",
                    selectedId === conversation.id
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                      : 'bg-gradient-to-br from-primary to-primary/70 text-white'
                  )}>
                    {conversation.avatar}
                    {conversation.verified && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 justify-between">
                      <h3 className="font-semibold text-sm text-foreground truncate">{conversation.name}</h3>
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full flex-shrink-0 ml-1">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate font-medium">{conversation.company}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5 line-clamp-1">{conversation.lastMessage}</p>
                  </div>

                  {/* Time */}
                  <div className="flex-shrink-0 text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.time}</div>
                </div>
              </motion.button>
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p className="text-sm">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-border/40 bg-secondary/30 p-4">
        <p className="text-xs text-muted-foreground text-center">
          Dhaani • Connecting farmers with buyers
        </p>
      </div>
    </div>
  );
}
