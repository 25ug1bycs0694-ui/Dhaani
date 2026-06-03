import { motion } from "framer-motion";
import {
  Award,
  Factory,
  Leaf,
  MapPin,
  MessageCircle,
  Package,
  Sprout,
  Star,
  Truck,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatDistance,
  type BuyerCategory,
  type NearbyBuyer,
} from "@/lib/nearby-buyers";
import { cn } from "@/lib/utils";

const categoryStyle: Record<
  BuyerCategory,
  { icon: typeof Leaf; bg: string; fg: string }
> = {
  biogas: { icon: Leaf, bg: "oklch(0.94 0.06 145)", fg: "oklch(0.38 0.1 148)" },
  paper: { icon: Factory, bg: "oklch(0.92 0.025 235)", fg: "oklch(0.35 0.1 235)" },
  mushroom: { icon: Sprout, bg: "oklch(0.93 0.06 30)", fg: "oklch(0.55 0.16 30)" },
  packaging: { icon: Package, bg: "oklch(0.93 0.05 285)", fg: "oklch(0.5 0.15 285)" },
  cattle: { icon: Wheat, bg: "oklch(0.94 0.06 75)", fg: "oklch(0.55 0.16 75)" },
  ethanol: { icon: Truck, bg: "oklch(0.92 0.04 155)", fg: "oklch(0.32 0.08 155)" },
};

type NearbyBuyersPanelProps = {
  buyers: NearbyBuyer[];
  loading?: boolean;
  radiusKm?: number;
  locationLabel?: string;
};

export function NearbyBuyersPanel({
  buyers,
  loading = false,
  radiusKm = 150,
  locationLabel,
}: NearbyBuyersPanelProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-forest">
      <div className="border-b border-border bg-gradient-to-r from-forest/8 via-cream to-beige/60 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Buyers near you
          </h3>
          <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest">
            {radiusKm} km
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {loading
            ? "Finding verified buyers…"
            : locationLabel
              ? `Within ${radiusKm} km of ${locationLabel}`
              : `Verified buyers within ${radiusKm} km`}
        </p>
      </div>

      <div className="max-h-[420px] space-y-2 overflow-y-auto p-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl bg-muted/60"
            />
          ))
        ) : buyers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-cream/50 px-4 py-8 text-center text-sm text-muted-foreground">
            No buyers in this radius yet. Try detecting your location or widen
            your search area.
          </div>
        ) : (
          buyers.map((buyer, i) => {
            const style = categoryStyle[buyer.category];
            const Icon = style.icon;
            const isBest = i === 0;
            return (
              <motion.div
                key={buyer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "rounded-2xl border p-3.5 transition",
                  isBest
                    ? "border-forest/30 bg-gradient-to-br from-cream to-beige/40 ring-1 ring-forest/15"
                    : "border-border bg-card hover:border-forest/25",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                    style={{ background: style.bg, color: style.fg }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground">
                            {buyer.name}
                          </span>
                          {isBest && (
                            <span className="rounded-full bg-ember/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ember">
                              Best match
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {buyer.type} · {buyer.location}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-foreground">
                        <Star className="h-3 w-3 fill-ember text-ember" />
                        {buyer.rating}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display text-base font-semibold text-forest">
                        ₹{buyer.pricePerTonne.toLocaleString("en-IN")}
                        <span className="text-[10px] font-normal text-muted-foreground">
                          {" "}
                          / tonne
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3 text-forest" />
                        {formatDistance(buyer.distanceKm)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Award className="h-3 w-3 text-forest" /> Verified
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-auto h-7 rounded-full border-forest/20 px-3 text-[11px] text-forest hover:bg-forest/5"
                      >
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
