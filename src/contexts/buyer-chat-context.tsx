import { createContext, useContext, useState, ReactNode } from 'react';

interface FarmerData {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: string;
  price: string;
  listing: string;
  icon?: any;
  initials?: string;
}

interface BuyerChatContextType {
  isModalOpen: boolean;
  selectedConversationId: string | null;
  selectedFarmerData: FarmerData | null;
  openChat: (farmerId: string, farmerData: FarmerData) => void;
  closeChat: () => void;
  selectConversation: (id: string) => void;
}

const BuyerChatContext = createContext<BuyerChatContextType | undefined>(undefined);

export function BuyerChatProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedFarmerData, setSelectedFarmerData] = useState<FarmerData | null>(null);

  const openChat = (farmerId: string, farmerData: FarmerData) => {
    setSelectedConversationId(farmerId);
    setSelectedFarmerData(farmerData);
    setIsModalOpen(true);
    localStorage.setItem('selectedBuyerConversationId', farmerId);
  };

  const closeChat = () => {
    setIsModalOpen(false);
  };

  const selectConversation = (id: string) => {
    setSelectedConversationId(id);
    localStorage.setItem('selectedBuyerConversationId', id);
  };

  return (
    <BuyerChatContext.Provider
      value={{
        isModalOpen,
        selectedConversationId,
        selectedFarmerData,
        openChat,
        closeChat,
        selectConversation,
      }}
    >
      {children}
    </BuyerChatContext.Provider>
  );
}

export function useBuyerChat() {
  const context = useContext(BuyerChatContext);
  if (!context) {
    throw new Error('useBuyerChat must be used within BuyerChatProvider');
  }
  return context;
}
