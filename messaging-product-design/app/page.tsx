'use client';

import { useState } from 'react';
import ConversationList from '@/components/conversation-list';
import ChatWindow from '@/components/chat-window';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Conversation List */}
      <div className="w-full md:w-1/4 border-r border-border bg-background flex flex-col">
        <ConversationList 
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex w-3/4 flex-col bg-background">
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              <MessageCircle className="w-24 h-24 text-primary relative z-10" strokeWidth={0.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Connect with verified buyers</h2>
              <p className="text-muted-foreground max-w-sm">
                View offers and start conversations with interested buyers for your agricultural products.
              </p>
            </div>
            <button className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              View Offers
            </button>
          </div>
        )}
      </div>

      {/* Mobile Chat Overlay */}
      {selectedConversation && (
        <div className="md:hidden absolute inset-0 z-40 bg-background">
          <ChatWindow conversationId={selectedConversation} onBack={() => setSelectedConversation(null)} />
        </div>
      )}
    </div>
  );
}
