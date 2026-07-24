import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wheat,
  Sprout,
  Leaf,
  Award,
  ShieldCheck,
  CircleCheck,
  Upload,
  X,
  MapPin,
  Navigation,
  Loader2,
  TrendingUp,
  Phone,
  MessageCircle,
  HelpCircle,
  Truck,
  Users,
  Sparkles,
  Camera,
  IndianRupee,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import strawHero from "../../../src/assets/post-straw/straw-hero.jpg";
import banner from "../../../src/assets/post-straw/banner.jpg";
import farmer from "../../../src/assets/post-straw/farmer.jpg";
import wheatImg from "../../../src/assets/post-straw/wheat.jpg";
import paddyImg from "../../../src/assets/post-straw/paddy.jpg";
import sugarcaneImg from "../../../src/assets/post-straw/sugarcane.jpg";
import maizeImg from "../../../src/assets/post-straw/maize.jpg";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/post-straw")({
  head: () => ({
    meta: [
      { title: "Post Your Straw — Dhaani" },
      {
        name: "description",
        content:
          "List your crop residue on Dhaani. Get the best offers from verified buyers in your area — straight from your field.",
      },
      { property: "og:title", content: "Post Your Straw — Dhaani" },
      {
        property: "og:description",
        content:
          "From stubble to sustainability. Post your straw and connect with verified buyers across India.",
      },
      { property: "og:image", content: banner },
    ],
  }),
  component: PostStrawPage,
});

type StrawId = "rice" | "wheat" | "paddy" | "sugarcane" | "maize";
type QualityId = "premium" | "standard" | "basic";

const strawTypes: {
  id: StrawId;
  label: string;
  sub: string;
  icon: typeof Wheat;
  img: string;
}[] = [
  { id: "rice", label: "Rice Straw", sub: "Most in-demand", icon: Wheat, img: strawHero },
  { id: "wheat", label: "Wheat Straw", sub: "High fodder value", icon: Sprout, img: wheatImg },
  { id: "paddy", label: "Paddy Straw", sub: "Bioenergy ready", icon: Leaf, img: paddyImg },
  { id: "sugarcane", label: "Sugarcane Residue", sub: "Ethanol grade", icon: Sprout, img: sugarcaneImg },
  { id: "maize", label: "Maize Residue", sub: "Industrial use", icon: Wheat, img: maizeImg },
];

const qualities: { id: QualityId; label: string; sub: string; icon: typeof Award }[] = [
  { id: "premium", label: "Premium", sub: "Top market price", icon: Award },
  { id: "standard", label: "Standard", sub: "Fair market rates", icon: ShieldCheck },
  { id: "basic", label: "Basic", sub: "Quick liquidation", icon: CircleCheck },
];

function PostStrawPage() {
  const [strawType, setStrawType] = useState<StrawId>("rice");
  const [quality, setQuality] = useState<QualityId>("premium");
  const [quantity, setQuantity] = useState(22);
  const [price, setPrice] = useState(17000);
  const [minPrice, setMinPrice] = useState(16000);
  const [priceType, setPriceType] = useState<"fixed" | "open">("open");
  const [photos, setPhotos] = useState<string[]>([strawHero, wheatImg, paddyImg]);
  const [location, setLocation] = useState<{ label: string; coords?: [number, number] } | null>(null);
  const [locating, setLocating] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [posting, setPosting] = useState(false);

  const strawMeta = strawTypes.find((s) => s.id === strawType)!;
  const qualityMeta = qualities.find((q) => q.id === quality)!;

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation not supported on this device");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          label: "Amritsar, Punjab",
          coords: [pos.coords.latitude, pos.coords.longitude],
        });
        setLocating(false);
        toast.success("GPS location detected");
      },
      () => {
        setLocation({ label: "Amritsar, Punjab", coords: [31.634, 74.8723] });
        setLocating(false);
        toast.success("Location set");
      },
      { timeout: 8000 }
    );
  };

  const handlePost = () => {
    if (!agreed) {
      toast.error("Please confirm the details are correct");
      return;
    }
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      toast.success("Your listing has been published successfully", {
        description: "Verified buyers in your area will be notified.",
      });
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background bg-grain">
      <TopBar />
      <HeroBanner />
      <main className="mx-auto -mt-20 max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
        <PageHeader />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <StrawDetailsSection
              strawType={strawType}
              setStrawType={setStrawType}
              quality={quality}
              setQuality={setQuality}
            />
            <PickupSection location={location} locating={locating} detect={detectLocation} />
            <PhotosQuantitySection photos={photos} setPhotos={setPhotos} quantity={quantity} setQuantity={setQuantity} />
            <PricingSection price={price} setPrice={setPrice} minPrice={minPrice} setMinPrice={setMinPrice} priceType={priceType} setPriceType={setPriceType} />
            <ReviewSection
              strawMeta={strawMeta}
              qualityMeta={qualityMeta}
              quantity={quantity}
              price={price}
              location={location?.label ?? "Detect to add"}
              agreed={agreed}
              setAgreed={setAgreed}
              posting={posting}
              onPost={handlePost}
            />
          </div>
          <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
            <LivePreview strawMeta={strawMeta} qualityMeta={qualityMeta} quantity={quantity} price={price} location={location?.label ?? "Add location"} photo={photos[0]} />
            <WhyCard />
            <SupportedCrops />
            <SupportCard />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- top bar ---------- */
function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#196b41] text-primary-foreground shadow-glow">
            <Sprout className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-background" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-primary">Dhaani</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Stubble · to · sustainability
            </div>
          </div>
        </div>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search buyers, listings, messages…"
            className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-12 text-sm outline-none transition focus:border-primary focus:ring-glow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground sm:flex">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-gold-foreground">
              3
            </span>
          </button>
          <div className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 pr-3">
            <img
              src={farmer}
              alt="Farmer avatar"
              className="h-8 w-8 rounded-full object-cover"
              loading="lazy"
              width={32}
              height={32}
            />
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-xs font-semibold text-foreground">Gurpreet Singh</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Farmer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero banner ---------- */
function HeroBanner() {
  return (
    <div className="relative h-56 w-full overflow-hidden sm:h-72">
      <img
        src={banner}
        alt="Golden straw bales at sunrise"
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={640}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background/20 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
    </div>
  );
}

/* ---------- header ---------- */
function PageHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative text-center"
    >
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        New listing · takes under 2 minutes
      </div>
      <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        <span className="mr-2">🌾</span>
        Post Your <span className="bg-gradient-to-r from-primary to-[#196b41] bg-clip-text text-transparent">Straw</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
        Get the best offers from verified buyers in your area.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {[
          { icon: ShieldCheck, label: "Verified buyers" },
          { icon: Sparkles, label: "Secure platform" },
          { icon: Truck, label: "Fast pickup" },
        ].map((t) => (
          <div
            key={t.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
          >
            <t.icon className="h-3.5 w-3.5 text-primary" />
            {t.label}
          </div>
        ))}
      </div>
      <ProgressSteps />
    </motion.section>
  );
}

function ProgressSteps() {
  const steps = ["Straw Details", "Pickup", "Photos", "Pricing", "Review"];
  return (
    <div className="mt-8 hidden items-center justify-center gap-2 sm:flex">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
              i === 0
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                i === 0 ? "bg-primary-foreground/20" : "bg-accent text-primary"
              )}
            >
              {i + 1}
            </span>
            {s}
          </div>
          {i < steps.length - 1 && <div className="mx-1 h-px w-6 bg-border" />}
        </div>
      ))}
    </div>
  );
}

/* ---------- shared card ---------- */
function SectionCard({
  step,
  title,
  desc,
  children,
}: {
  step: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_40px_-16px_rgba(15,81,50,0.12)] sm:p-8"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#196b41] text-sm font-semibold text-primary-foreground shadow-sm">
          {step}
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

/* ---------- straw details ---------- */
function StrawDetailsSection({
  strawType,
  setStrawType,
  quality,
  setQuality,
}: {
  strawType: StrawId;
  setStrawType: (v: StrawId) => void;
  quality: QualityId;
  setQuality: (v: QualityId) => void;
}) {
  return (
    <SectionCard step={1} title="Straw Details" desc="Select the type and quality grade of your harvest.">
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">Type of Straw</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {strawTypes.map((s) => {
            const active = strawType === s.id;
            return (
              <motion.button
                key={s.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStrawType(s.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card text-left transition-all",
                  active
                    ? "border-primary ring-glow"
                    : "border-border hover:border-primary/40"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  {active && (
                    <motion.div
                      layoutId="straw-check"
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow"
                    >
                      <CircleCheck className="h-4 w-4" />
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-2 p-3">
                  <div
                    className={cn(
                      "flex h-7 w-7 flex-none items-center justify-center rounded-lg",
                      active ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                    )}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-7 space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="text-sm font-medium text-foreground">Quality Grade</div>
          <div className="text-xs text-muted-foreground">Better quality fetches better offers</div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {qualities.map((q) => {
            const active = quality === q.id;
            return (
              <motion.button
                key={q.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuality(q.id)}
                className={cn(
                  "relative flex items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-all",
                  active ? "border-primary bg-accent/60 ring-glow" : "border-border hover:border-primary/40"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    active
                      ? "bg-gradient-to-br from-primary to-[#196b41] text-primary-foreground"
                      : "bg-cream text-gold"
                  )}
                >
                  <q.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{q.label}</div>
                  <div className="text-[11px] text-muted-foreground">{q.sub}</div>
                </div>
                {active && (
                  <CircleCheck className="absolute right-3 top-3 h-4 w-4 text-primary" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

/* ---------- pickup ---------- */
function PickupSection({
  location,
  locating,
  detect,
}: {
  location: { label: string; coords?: [number, number] } | null;
  locating: boolean;
  detect: () => void;
}) {
  const [lat, lng] = location?.coords ?? [31.634, 74.8723];
  const mapSrc = location
    ? `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=11&size=800x420&maptype=mapnik&markers=${lat},${lng},red-pushpin`
    : null;

  return (
    <SectionCard step={2} title="Pickup & Location" desc="We auto-detect your GPS so buyers can reach you easily.">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr]">
        <div>
          <AnimatePresence mode="wait">
            {!location ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col items-start gap-4 rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-accent/60 to-cream p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">Detect My Location</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We use your phone's GPS to set an accurate pickup point. Your address is never
                    shared without your consent.
                  </p>
                </div>
                <Button
                  onClick={detect}
                  disabled={locating}
                  className="rounded-full bg-gradient-to-r from-primary to-[#196b41] px-5 text-primary-foreground hover:opacity-95"
                >
                  {locating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Navigation className="mr-2 h-4 w-4" />
                  )}
                  {locating ? "Detecting…" : "Detect My Location"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="loc"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
                  <CircleCheck className="h-3.5 w-3.5" /> GPS Location Detected
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="font-display text-lg font-semibold text-foreground">{location.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Near Khasa Kalan · Pin 143001 · India</div>
                  <Button
                    variant="ghost"
                    onClick={detect}
                    className="mt-3 h-8 rounded-full px-3 text-xs text-primary hover:bg-accent"
                  >
                    <Navigation className="mr-1.5 h-3.5 w-3.5" /> Re-detect
                  </Button>
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-border bg-cream p-3 text-xs text-foreground">
                  <Leaf className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span>
                    Nearby verified buyers within <span className="font-semibold text-primary">50&nbsp;km</span> will be notified
                    when you post.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[280px] overflow-hidden rounded-2xl border border-border bg-accent/40 sm:h-[320px]"
        >
          {mapSrc ? (
            <img
              src={mapSrc}
              alt="Pickup location map"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute -inset-16 rounded-full bg-primary/20"
              />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                className="absolute -inset-28 rounded-full bg-primary/15"
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-card/85 px-3 py-2 text-[11px] backdrop-blur">
            <span className="font-medium text-foreground">Pickup radius · 50 km</span>
            <span className="text-muted-foreground">{location?.label ?? "Awaiting GPS"}</span>
          </div>
        </motion.div>
      </div>
    </SectionCard>
  );
}

/* ---------- photos & quantity ---------- */
function PhotosQuantitySection({
  photos,
  setPhotos,
  quantity,
  setQuantity,
}: {
  photos: string[];
  setPhotos: (v: string[]) => void;
  quantity: number;
  setQuantity: (v: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 8)
      .map((f) => URL.createObjectURL(f));
    setPhotos([...photos, ...urls].slice(0, 8));
  };

  return (
    <SectionCard step={3} title="Photos & Quantity" desc="Clear photos build trust and bring more offers.">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all",
          drag ? "border-primary bg-accent/60" : "border-border bg-cream/60 hover:border-primary/40"
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Upload className="h-6 w-6" />
        </div>
        <div className="mt-3 font-display text-lg font-semibold text-foreground">Drag & drop photos here</div>
        <p className="mt-1 text-sm text-muted-foreground">JPG, PNG up to 10MB · Add at least 3 photos for best results</p>
        <Button onClick={() => inputRef.current?.click()} className="mt-4 rounded-full bg-gradient-to-r from-primary to-[#196b41] px-5 text-primary-foreground hover:opacity-95">
          <Camera className="mr-2 h-4 w-4" /> Choose Photos
        </Button>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      <AnimatePresence>
        {photos.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {photos.map((p, i) => (
              <motion.div key={p + i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="group relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm">
                <img src={p} alt={`Straw ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-card/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">Cover</span>
                )}
                <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cream to-accent/40 p-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Quantity Available</div>
            <p className="text-xs text-muted-foreground">Drag to adjust · 1 to 100 tonnes</p>
          </div>
          <AnimatedNumber value={quantity} suffix=" Tonnes" />
        </div>
        <div className="mt-5">
          <Slider min={1} max={100} step={1} value={[quantity]} onValueChange={(v) => setQuantity(v[0])} />
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>1 T</span>
            <span>25 T</span>
            <span>50 T</span>
            <span>75 T</span>
            <span>100 T</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = display;
    const end = value;
    const dur = 350;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
      {display}
      <span className="ml-1 text-base font-medium text-muted-foreground">{suffix.trim()}</span>
    </div>
  );
}

/* ---------- pricing ---------- */
function PricingSection({
  price,
  setPrice,
  minPrice,
  setMinPrice,
  priceType,
  setPriceType,
}: {
  price: number;
  setPrice: (v: number) => void;
  minPrice: number;
  setMinPrice: (v: number) => void;
  priceType: "fixed" | "open";
  setPriceType: (v: "fixed" | "open") => void;
}) {
  return (
    <SectionCard step={4} title="Set Your Price" desc="You're in control — set your expectations.">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PriceField label="Expected Price" hint="Per tonne" value={price} onChange={setPrice} />
        <PriceField label="Minimum Acceptable" hint="Optional · Per tonne" value={minPrice} onChange={setMinPrice} />
      </div>

      <div className="mt-6 space-y-2">
        <div className="text-sm font-medium text-foreground">Price Type</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { id: "fixed", label: "Fixed Price", sub: "No negotiation" },
            { id: "open", label: "Open to Offers", sub: "Buyers can negotiate" },
          ].map((opt) => {
            const active = priceType === opt.id;
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPriceType(opt.id as "fixed" | "open")}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-card p-4 text-left transition",
                  active ? "border-primary bg-accent/60 ring-glow" : "border-border hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border-2",
                    active ? "border-primary bg-primary" : "border-border"
                  )}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{opt.label}</div>
                  <div className="text-xs text-muted-foreground">{opt.sub}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-cream via-cream to-accent/40 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gold/15 text-gold">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-foreground">Market Insight</div>
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">Live</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Current rates in your area range between <span className="font-semibold text-primary">₹16,000</span>
              <span className="text-muted-foreground"> – </span>
              <span className="font-semibold text-primary">₹19,000</span> / tonne.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function PriceField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{hint}</span>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 transition focus-within:border-primary focus-within:ring-glow">
        <IndianRupee className="h-4 w-4 text-muted-foreground" />
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} className="flex-1 bg-transparent font-display text-xl font-semibold text-foreground outline-none" />
        <span className="text-xs text-muted-foreground">/ tonne</span>
      </div>
    </label>
  );
}

/* ---------- review ---------- */
function ReviewSection({
  strawMeta,
  qualityMeta,
  quantity,
  price,
  location,
  agreed,
  setAgreed,
  posting,
  onPost,
}: {
  strawMeta: (typeof strawTypes)[number];
  qualityMeta: (typeof qualities)[number];
  quantity: number;
  price: number;
  location: string;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  posting: boolean;
  onPost: () => void;
}) {
  const summary = [
    { label: "Type", value: strawMeta.label, icon: Wheat },
    { label: "Quality", value: qualityMeta.label, icon: Award },
    { label: "Quantity", value: `${quantity} Tonnes`, icon: TrendingUp },
    { label: "Price", value: `₹${price.toLocaleString("en-IN")}`, icon: IndianRupee },
    { label: "Location", value: location, icon: MapPin },
  ];
  return (
    <SectionCard step={5} title="Review & Post" desc="Final check before your listing goes live.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {summary.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-cream/60 p-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <s.icon className="h-3 w-3" /> {s.label}
            </div>
            <div className="mt-1.5 truncate text-sm font-semibold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-accent/40 p-4">
        <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(Boolean(v))} className="mt-0.5 border-primary data-[state=checked]:bg-primary" />
        <div className="text-sm text-foreground">
          I confirm that the details provided are accurate, and I authorise Dhaani to share this
          listing with verified buyers in my area.
        </div>
      </label>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onPost}
        disabled={posting}
        className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#196b41] py-4 font-display text-lg font-semibold text-primary-foreground shadow-glow transition disabled:opacity-80"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        {posting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Publishing your listing…
          </>
        ) : (
          <>
            🌾 Post My Listing <ChevronRight className="h-5 w-5" />
          </>
        )}
      </motion.button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Your listing will only be visible to verified buyers
      </p>
    </SectionCard>
  );
}

/* ---------- right side ---------- */
function LivePreview({
  strawMeta,
  qualityMeta,
  quantity,
  price,
  location,
  photo,
}: {
  strawMeta: (typeof strawTypes)[number];
  qualityMeta: (typeof qualities)[number];
  quantity: number;
  price: number;
  location: string;
  photo?: string;
}) {
  const cover = photo ?? strawMeta.img;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border bg-cream/60 px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span>Live Listing Preview</span>
        <span className="inline-flex items-center gap-1 text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Live
        </span>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={cover} alt="Straw preview" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
          <MapPin className="h-3 w-3 text-primary" /> {location}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-foreground">{strawMeta.label}</h3>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary">{qualityMeta.label}</span>
        </div>
        <Row icon={Wheat} label="Quantity" value={`${quantity} Tonnes`} />
        <Row icon={MapPin} label="Pickup" value={location} />
        <Row
          icon={IndianRupee}
          label="Asking"
          value={
            <span>
              <span className="font-display text-lg font-semibold text-foreground">₹{price.toLocaleString("en-IN")}</span>
              <span className="text-xs text-muted-foreground"> / tonne</span>
            </span>
          }
        />
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-accent/60 p-3 text-xs text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> You will receive offers in a few hours after posting.
        </div>
      </div>
    </motion.div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Wheat; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function WhyCard() {
  const items = [
    { icon: Users, title: "Verified buyers only", sub: "Trusted businesses" },
    { icon: TrendingUp, title: "Better prices", sub: "Competitive offers" },
    { icon: Truck, title: "Quick pickup", sub: "Logistics handled" },
    { icon: ShieldCheck, title: "Secure platform", sub: "100% safe for farmers" },
  ];
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-lg font-semibold text-foreground">Why post on Dhaani?</h3>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-accent text-primary">
              <it.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{it.title}</div>
              <div className="text-xs text-muted-foreground">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportedCrops() {
  const crops = [
    { label: "Rice", img: strawHero },
    { label: "Wheat", img: wheatImg },
    { label: "Paddy", img: paddyImg },
    { label: "Sugarcane", img: sugarcaneImg },
    { label: "Maize", img: maizeImg },
  ];
  return (
    <div className="rounded-3xl border border-border bg-cream/70 p-5 shadow-card">
      <h3 className="font-display text-lg font-semibold text-foreground">Supported crops</h3>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {crops.map((c) => (
          <div key={c.label} className="group text-center">
            <div className="aspect-square overflow-hidden rounded-xl border border-border">
              <img src={c.img} alt={c.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="mt-1 truncate text-[10px] font-medium text-foreground">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-primary" />
        <h3 className="font-display text-lg font-semibold text-foreground">Need help?</h3>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Our farmer support team is here for you, 9 AM – 7 PM.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" className="rounded-full border-border">
          <Phone className="mr-1.5 h-4 w-4" /> Call
        </Button>
        <Button className="rounded-full bg-gradient-to-r from-primary to-[#196b41] text-primary-foreground">
          <MessageCircle className="mr-1.5 h-4 w-4" /> Chat
        </Button>
      </div>
      <div className="mt-3 text-center text-xs text-muted-foreground">Or call <span className="font-semibold text-primary">1800-309-0001</span></div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-cream/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <Sprout className="h-4 w-4 text-primary" />
          <span className="font-display text-sm text-foreground">Dhaani</span>
          <span>· From stubble to sustainability</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default PostStrawPage;
