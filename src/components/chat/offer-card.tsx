import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OfferCardProps {
  offerData: {
    product: string;
    quantity: string;
    unit: string;
    price: string;
    pricePerUnit: string;
    location: string;
    status: string;
  };
  sender: 'buyer' | 'farmer';
}

export default function OfferCard({ offerData, sender }: OfferCardProps) {
  const [actionTaken, setActionTaken] = useState<'accept' | 'counter' | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="max-w-sm"
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br border shadow-lg hover:shadow-xl",
        "transition-all duration-300 p-5",
        "from-primary/10 via-accent/5 to-primary/5 border-primary/20"
      )}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-2">
              Offer Received
            </div>
            <h3 className="font-bold text-lg text-foreground">{offerData.product}</h3>
          </div>

          {/* Price Section - Highlighted */}
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-primary">{offerData.price}</span>
              <span className="text-sm text-muted-foreground">/ {offerData.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">{offerData.pricePerUnit}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Quantity</p>
              <p className="font-semibold text-foreground">{offerData.quantity} {offerData.unit}</p>
            </div>
            <div className="p-2 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Location</p>
              <p className="font-semibold text-foreground">📍 {offerData.location}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200 mb-4">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">{offerData.status}</span>
          </div>

          {/* Action Buttons */}
          {sender === 'farmer' && !actionTaken && (
            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActionTaken('accept')}
                className={cn(
                  "flex-1 px-4 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg",
                  "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                )}
              >
                Accept Offer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActionTaken('counter')}
                className={cn(
                  "flex-1 px-4 py-3 rounded-lg border-2 border-primary text-primary font-semibold text-sm",
                  "hover:bg-primary/5 transition-all duration-300"
                )}
              >
                Counter Offer
              </motion.button>
            </div>
          )}

          {/* Action Feedback */}
          {actionTaken === 'accept' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">Offer Accepted!</p>
                <p className="text-xs text-green-700">We'll contact you with pickup details.</p>
              </div>
            </motion.div>
          )}

          {actionTaken === 'counter' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-2"
            >
              <p className="text-xs text-muted-foreground font-medium">Counter offer price per unit:</p>
              <input
                type="text"
                placeholder="Enter your price..."
                className={cn(
                  "w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                )}
              />
              <button className={cn(
                "w-full px-3 py-2 rounded-lg text-sm font-semibold",
                "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              )}>
                Send Counter Offer
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
