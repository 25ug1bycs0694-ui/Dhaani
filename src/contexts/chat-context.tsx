import { createContext, useContext, useState, ReactNode } from 'react';

interface BuyerData {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: string;
  price: string;
  listing: string;
  icon?: any;
  best?: boolean;
  iconBg?: string;
  iconFg?: string;
}

interface ChatContextType {
  isModalOpen: boolean;
  selectedConversationId: string | null;
  selectedBuyerData: BuyerData | null;
  openChat: (buyerId: string, buyerData: BuyerData) => void;
  closeChat: () => void;
  selectConversation: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedBuyerData, setSelectedBuyerData] = useState<BuyerData | null>(null);

  const openChat = (buyerId: string, buyerData: BuyerData) => {
    setSelectedConversationId(buyerId);
    setSelectedBuyerData(buyerData);
    setIsModalOpen(true);
    localStorage.setItem('selectedConversationId', buyerId);
  };

  const closeChat = () => {
    setIsModalOpen(false);
  };

  const selectConversation = (id: string) => {
    setSelectedConversationId(id);
    localStorage.setItem('selectedConversationId', id);
  };

  return (
    <ChatContext.Provider
      value={{
        isModalOpen,
        selectedConversationId,
        selectedBuyerData,
        openChat,
        closeChat,
        selectConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
