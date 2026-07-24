import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronLeft,
  Clock,
  MapPin,
  Package,
  Phone,
  Truck,
  Users,
} from "lucide-react";
import { useBuyerChat } from "@/contexts/buyer-chat-context";
import dhaaniLogo from "@/assets/dhaani-logo.png";
import farmerAvatar from "@/assets/farmer-avatar.jpg";
import riceStraw from "@/assets/rice-straw.jpg";

export const Route = createFileRoute("/buyer/listings/")({
  component: BuyerListingsPage,
  head: () => ({
    meta: [
      { title: "Dhaani — Browse Listings" },
      {
        name: "description",
        content:
          "Browse verified crop residue listings with farmer details, transport support, and quality metrics.",
      },
      { property: "og:title", content: "Dhaani — Browse Listings" },
      { property: "og:description", content: "Book verified straw offers with reliable logistics and transport details." },
    ],
  }),
});

const listings = [
  {
    id: "harpreet-rice",
    crop: "Rice Straw",
    category: "Verified",
    quality: "12% moisture",
    quantity: "18 tonnes",
    price: "15,500",
    farmer: "Harpreet Singh",
    location: "Karnal, Haryana",
    distance: "38 km away",
    transport: "Tail-lift truck available",
    delivery: "ETA 48 hours",
    pickup: "Farm gate loading",
    certification: ["Verified farmer", "Moisture certified", "Pickup-ready"],
    image: riceStraw,
    description:
      "Fresh harvest, ideal for animal bedding and soil mulching. Delivery support and transparent trackable logistics included.",
  },
  {
    id: "punjab-wheat",
    crop: "Wheat Straw",
    category: "Standard",
    quality: "14% moisture",
    quantity: "22 tonnes",
    price: "14,800",
    farmer: "Punjab Agro Farms",
    location: "Patiala, Punjab",
    distance: "54 km away",
    transport: "Flatbed truck available",
    delivery: "ETA 72 hours",
    pickup: "On-site weighbridge",
    certification: ["Verified transporter", "Labor-ready", "Quality checked"],
    image: riceStraw,
    description:
      "High-fodder value wheat straw with logistics support from farm to your yard. Ideal for cattle feed and biomass use.",
  },
  {
    id: "amandeep-rice",
    crop: "Rice Straw",
    category: "Verified",
    quality: "11% moisture",
    quantity: "26 tonnes",
    price: "16,200",
    farmer: "Amandeep Gill",
    location: "Panipat, Haryana",
    distance: "43 km away",
    transport: "GPS-tracked haulage",
    delivery: "ETA 36 hours",
    pickup: "Stubble-free loading",
    certification: ["Fresh supply", "Inspection passed", "Verified export grade"],
    image: riceStraw,
    description:
      "Low-moisture straw with fast pickup and GPS-tracked transport for high-value buyers.",
  },
];

function BuyerListingsPage() {
  const [activeListing, setActiveListing] = useState(0);
  const current = listings[activeListing];
  const { openChat } = useBuyerChat();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/buyer/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-semibold text-forest transition hover:border-forest/60 hover:bg-cream"
            >
              <ChevronLeft className="h-4 w-4" /> Back to dashboard
            </Link>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-border bg-card px-4 py-3 shadow-forest">
            <img src={dhaaniLogo} alt="Dhaani" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-foreground">Listings</div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Verified farmer offers</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-forest">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6 p-8 sm:p-10">
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Browse verified crop residue listings with trusted logistics and quality metrics.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Compare offers by crop, moisture, transport readiness, and farmer location. Book a listing with transparent pickup and delivery support.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-cream/80 p-5">
                  <div className="text-sm font-medium text-muted-foreground">Verified supply</div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">12+ listings</div>
                </div>
                <div className="rounded-3xl border border-border bg-cream/80 p-5">
                  <div className="text-sm font-medium text-muted-foreground">Local transport</div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">Free farm gate loading</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Users, label: "Verified farmers" },
                  { icon: MapPin, label: "Regional coverage" },
                  { icon: Truck, label: "Tracked delivery" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                    <item.icon className="h-5 w-5 text-forest" />
                    <p className="mt-3 text-sm font-semibold text-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/buyer/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-beige"
                >
                  Return to dashboard
                </Link>
                <a
                  href="#active-listing"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero px-5 py-3 text-sm font-semibold text-cream transition hover:opacity-90"
                >
                  Explore listings <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="relative h-96 overflow-hidden bg-black/5">
              <img
                src={riceStraw}
                alt="Straw field"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-border bg-card/90 p-6 shadow-forest">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reliable logistics</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">Transport-ready farm gate pickup</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Fastest local delivery with verified truck partners and GPS tracking for every load.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="active-listing" className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-forest">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Available offers</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">Select the best listing for your purchase.</h2>
                </div>
                <div className="rounded-full bg-forest/10 px-4 py-2 text-sm font-semibold text-forest">
                  {listings.length} listings available
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {listings.map((listing, index) => (
                <button
                  key={listing.id}
                  type="button"
                  onClick={() => setActiveListing(index)}
                  className={`group overflow-hidden rounded-[2rem] border transition-shadow duration-300 ${
                    activeListing === index
                      ? "border-forest bg-forest/10 shadow-forest"
                      : "border-border bg-card hover:shadow-sm"
                  }`}
                >
                  <div className="grid gap-4 p-5 sm:grid-cols-[0.85fr_0.3fr]">
                    <div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="rounded-full bg-cream px-3 py-1 text-xs uppercase tracking-[0.2em] text-forest">{listing.category}</span>
                        <span>{listing.location}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-foreground">{listing.listing}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{listing.description}</p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        <span className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-forest shadow-sm">
                          {listing.quantity}
                        </span>
                        <span className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-forest shadow-sm">
                          {listing.quality}
                        </span>
                        <span className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-forest shadow-sm">
                          {listing.distance}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="rounded-3xl bg-forest px-5 py-4 text-center text-sm font-semibold text-cream shadow-lg">
                        ₹{listing.price}
                        <span className="block text-[10px] font-medium uppercase tracking-[0.2em]">/ tonne</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border/70 bg-cream/80 px-5 py-4 text-sm text-muted-foreground">
                    {listing.transport} · {listing.pickup} · {listing.delivery}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-forest">
              <img
                src={current.image}
                alt={current.listing}
                className="h-72 w-full rounded-[1.5rem] object-cover"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Selected listing</p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">{current.farmer}</h3>
                  </div>
                  <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">{current.crop}</span>
                </div>

                <div className="space-y-3 rounded-[1.75rem] bg-cream/70 p-5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Location</span>
                    <span className="text-foreground">{current.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Transport</span>
                    <span className="text-foreground">{current.transport}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Loading</span>
                    <span className="text-foreground">{current.pickup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-foreground">{current.delivery}</span>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[1.75rem] bg-white/95 p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-forest">
                    <Package className="h-4 w-4" />
                    Quality & logistics
                  </div>
                  {current.certification.map((badge) => (
                    <div key={badge} className="flex items-center gap-2 rounded-2xl border border-border bg-cream px-3 py-2 text-sm text-forest">
                      <CheckCircle2 className="h-4 w-4 text-forest" /> {badge}
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.75rem] border border-border bg-cream/80 p-5">
                  <p className="text-sm font-semibold text-forest">Farmer support</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img src={farmerAvatar} alt="Farmer avatar" className="h-12 w-12 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{current.farmer}</p>
                      <p className="text-sm text-muted-foreground">Available for assignment and on-site coordination.</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() =>
                      openChat(current.id, {
                        id: current.id,
                        name: current.farmer,
                        type: current.category,
                        location: current.location,
                        distance: current.distance,
                        price: current.price,
                        listing: `${current.quantity} ${current.crop}`,
                      })
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-cream"
                  >
                    <Phone className="h-4 w-4" /> Contact farmer
                  </motion.button>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
