import { useBuyerChat } from '@/contexts/buyer-chat-context';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import BuyerConversationList from './chat/buyer-conversation-list';
import BuyerChatWindow from './chat/buyer-chat-window';
import { cn } from '@/lib/utils';

export default function BuyerChatModal() {
  const { isModalOpen, closeChat, selectedConversationId, selectConversation, selectedFarmerData } = useBuyerChat();

  return (
    <Dialog open={isModalOpen} onOpenChange={closeChat}>
      <DialogContent className={cn(
        "max-w-6xl h-[85vh] w-[98vw] p-0 gap-0",
        "rounded-2xl overflow-hidden border-border/50",
        "flex flex-col md:flex-row shadow-2xl"
      )}>
        {/* Conversation List - Left Sidebar */}
        <div className={cn(
          "w-full md:w-[340px] border-b md:border-b-0 md:border-r border-border",
          "bg-background flex flex-col flex-shrink-0",
          "overflow-hidden"
        )}>
          <BuyerConversationList selectedId={selectedConversationId} onSelect={selectConversation} />
        </div>

        {/* Chat Window - Main Content */}
        <div className={cn(
          "flex-1 flex flex-col min-h-0",
          "bg-background overflow-hidden"
        )}>
          {selectedConversationId ? (
            <BuyerChatWindow
              conversationId={selectedConversationId}
              farmerName={selectedFarmerData?.name || 'Harpreet Singh'}
              farmerInfo={`Verified Farmer • ${selectedFarmerData?.location || 'Karnal'} • ${selectedFarmerData?.distance || '38 km away'}`}
              onBack={() => closeChat()}
            />
          ) : (
            <div className="flex items-center justify-center h-full flex-1">
              <div className="text-center">
                <div className="text-muted-foreground text-lg mb-2">👋</div>
                <p className="text-muted-foreground font-medium">Select a conversation to start</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
