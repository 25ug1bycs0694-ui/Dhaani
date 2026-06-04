import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Truck, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ReactNode;
  timestamp?: string;
}

const timelineSteps: TimelineStep[] = [
  {
    id: 'offer',
    title: 'Offer Sent',
    description: 'Initial offer for Rice Straw',
    status: 'completed',
    icon: <CheckCircle2 className="w-6 h-6" />,
    timestamp: '10:40 AM',
  },
  {
    id: 'accepted',
    title: 'Accepted',
    description: 'Waiting for your confirmation',
    status: 'current',
    icon: <CheckCircle2 className="w-6 h-6" />,
    timestamp: 'Today',
  },
  {
    id: 'pickup',
    title: 'Pickup Scheduled',
    description: 'Saturday, 11:00 AM at Panipat',
    status: 'pending',
    icon: <Truck className="w-6 h-6" />,
  },
  {
    id: 'completed',
    title: 'Deal Completed',
    description: 'Payment & delivery confirmed',
    status: 'pending',
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

export default function DealTimeline() {
  return (
    <div className="px-6 py-4 border-b border-border bg-secondary/30 sticky top-20 z-20">
      <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Deal Timeline</h3>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {timelineSteps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            {/* Step Circle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={cn(
                "relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                step.status === 'completed'
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : step.status === 'current'
                  ? 'bg-primary text-primary-foreground border-2 border-primary animate-pulse'
                  : 'bg-secondary border-2 border-border text-muted-foreground'
              )}
            >
              {step.icon}
            </motion.div>

            {/* Step Info */}
            <div className="min-w-max">
              <p className="text-xs font-semibold text-foreground">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
              {step.timestamp && (
                <p className="text-xs text-primary font-medium">{step.timestamp}</p>
              )}
            </div>

            {/* Connector */}
            {idx < timelineSteps.length - 1 && (
              <div className={cn(
                "w-3 h-0.5 flex-shrink-0",
                step.status === 'completed' || step.status === 'current'
                  ? 'bg-green-400'
                  : 'bg-border'
              )}></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
