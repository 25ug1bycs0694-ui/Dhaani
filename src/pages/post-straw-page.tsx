import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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
  ChevronLeft,
  Bell,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import banner from "@/assets/post-straw/banner.jpg";
import farmerAvatar from "@/assets/farmer-avatar.jpg";
import dhaaniLogo from "@/assets/dhaani-logo.png";
import strawHero from "@/assets/post-straw/straw-hero.jpg";
import wheatImg from "@/assets/post-straw/wheat.jpg";
import paddyImg from "@/assets/post-straw/paddy.jpg";
import sugarcaneImg from "@/assets/post-straw/sugarcane.jpg";
import maizeImg from "@/assets/post-straw/maize.jpg";
import { NearbyBuyersPanel } from "@/components/post-straw/nearby-buyers-panel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  DEFAULT_FARM_COORDS,
  getNearbyBuyers,
} from "@/lib/nearby-buyers";
import { cn } from "@/lib/utils";

type StrawId = "rice" | "wheat" | "paddy" | "sugarcane" | "maize";
type QualityId = "premium" | "standard" | "basic";

const BUYER_RADIUS_KM = 150;

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
  {
    id: "sugarcane",
    label: "Sugarcane Residue",
    sub: "Ethanol grade",
    icon: Sprout,
    img: sugarcaneImg,
  },
  { id: "maize", label: "Maize Residue", sub: "Industrial use", icon: Wheat, img: maizeImg },
];

const qualities: { id: QualityId; label: string; sub: string; icon: typeof Award }[] = [
  { id: "premium", label: "Premium", sub: "Top market price", icon: Award },
  { id: "standard", label: "Standard", sub: "Fair market rates", icon: ShieldCheck },
  { id: "basic", label: "Basic", sub: "Quick liquidation", icon: CircleCheck },
];

export function PostStrawPage() {
  const [strawType, setStrawType] = useState<StrawId>("rice");
  const [quality, setQuality] = useState<QualityId>("premium");
  const [quantity, setQuantity] = useState(22);
  const [price, setPrice] = useState(17000);
  const [minPrice, setMinPrice] = useState(16000);
  const [priceType, setPriceType] = useState<"fixed" | "open">("open");
  const [photos, setPhotos] = useState<string[]>([strawHero, wheatImg, paddyImg]);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [posting, setPosting] = useState(false);
  const [farmerName, setFarmerName] = useState("Gurpreet Singh");
  const [farmerRegion, setFarmerRegion] = useState("Amritsar, Punjab");

  const { coords, loading: locating, detect } = useGeolocation({ autoDetect: true });

  const farmCoords = coords ?? DEFAULT_FARM_COORDS;

  const nearbyBuyers = useMemo(
    () => getNearbyBuyers(farmCoords, BUYER_RADIUS_KM, strawType),
    [farmCoords.latitude, farmCoords.longitude, strawType],
  );

  const strawMeta = strawTypes.find((s) => s.id === strawType)!;
  const qualityMeta = qualities.find((q) => q.id === quality)!;

  useEffect(() => {
    setLocationLabel(farmerRegion);
  }, [farmerRegion]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored =
      localStorage.getItem("farmerProfile") ??
      localStorage.getItem("farmerSignupData");
    if (!stored) return;
    try {
      const data = JSON.parse(stored) as {
        fullName?: string;
        district?: string;
        state?: string;
      };
      if (data.fullName?.trim()) setFarmerName(data.fullName.trim());
      const parts = [data.district, data.state].filter(Boolean);
      if (parts.length > 0) setFarmerRegion(parts.join(", "));
    } catch {
      /* ignore */
    }
  }, []);

  const detectLocation = async () => {
    const position = await detect();
    if (position) {
      setLocationLabel(farmerRegion);
      toast.success("GPS location detected", {
        description: `Showing buyers within ${BUYER_RADIUS_KM} km of your farm.`,
      });
    } else {
      setLocationLabel(farmerRegion);
      toast.info("Using your profile region", {
        description: `Buyers within ${BUYER_RADIUS_KM} km of ${farmerRegion}.`,
      });
    }
  };

  const handlePost = () => {
    if (!agreed) {
      toast.error("Please confirm the details are correct");
      return;
    }
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      toast.success("Your listing has been published", {
        description: `${nearbyBuyers.length} verified buyers within ${BUYER_RADIUS_KM} km will be notified.`,
      });
    }, 1400);
  };

  const displayLocation = locationLabel ?? farmerRegion;

  return (
    <div className="min-h-screen bg-background bg-grain">
      <TopBar farmerName={farmerName} />
      <HeroBanner />
      <main className="mx-auto -mt-20 max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
        <PageHeader />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <StrawDetailsSection
              strawType={strawType}
              setStrawType={setStrawType}
              quality={quality}
              setQuality={setQuality}
            />
            <PickupSection
              locationLabel={displayLocation}
              hasGps={Boolean(coords)}
              locating={locating}
              detect={detectLocation}
              lat={farmCoords.latitude}
              lng={farmCoords.longitude}
            />
            <PhotosQuantitySection
              photos={photos}
              setPhotos={setPhotos}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <PricingSection
              price={price}
              setPrice={setPrice}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              priceType={priceType}
              setPriceType={setPriceType}
            />
            <ReviewSection
              strawMeta={strawMeta}
              qualityMeta={qualityMeta}
              quantity={quantity}
              price={price}
              location={displayLocation}
              agreed={agreed}
              setAgreed={setAgreed}
              posting={posting}
              onPost={handlePost}
              buyerCount={nearbyBuyers.length}
            />
          </div>
          <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
            <NearbyBuyersPanel
              buyers={nearbyBuyers}
              loading={locating}
              radiusKm={BUYER_RADIUS_KM}
              locationLabel={displayLocation}
            />
            <LivePreview
              strawMeta={strawMeta}
              qualityMeta={qualityMeta}
              quantity={quantity}
              price={price}
              location={displayLocation}
              photo={photos[0]}
            />
            <WhyCard />
            <SupportCard />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TopBar({ farmerName }: { farmerName: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/farmer/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:border-forest/30 hover:text-forest"
            aria-label="Back to dashboard"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <Link to="/farmer/dashboard" className="flex items-center gap-2.5">
            <img
              src={dhaaniLogo}
              alt="Dhaani"
              className="h-10 w-10 object-contain"
              width={40}
              height={40}
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold text-forest">Dhaani</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                From stubble to sustainability
              </div>
            </div>
          </Link>
        </div>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search buyers, listings, messages…"
            className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground sm:flex"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[9px] font-semibold text-cream">
              3
            </span>
          </button>
          <div className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 pr-3">
            <img
              src={farmerAvatar}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
              width={32}
              height={32}
            />
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-xs font-semibold text-foreground">{farmerName}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Farmer
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroBanner() {
  return (
    <div className="relative h-52 w-full overflow-hidden sm:h-64">
      <img
        src={banner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={640}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/35 via-background/15 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
    </div>
  );
}

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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
        </span>
        New listing · under 2 minutes
      </div>
      <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        <span className="mr-2">🌾</span>
        Post Your{" "}
        <span className="bg-gradient-to-r from-forest to-forest-deep bg-clip-text text-transparent">
          Straw
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
        Get the best offers from verified buyers within 150 km of your farm.
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
            <t.icon className="h-3.5 w-3.5 text-forest" />
            {t.label}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

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
      className="rounded-3xl border border-border bg-card p-6 shadow-forest sm:p-8"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-hero text-sm font-semibold text-primary-foreground shadow-sm">
          {step}
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

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
    <SectionCard step={1} title="Straw Details" desc="Select type and quality grade.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {strawTypes.map((s) => {
          const active = strawType === s.id;
          return (
            <motion.button
              key={s.id}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStrawType(s.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card text-left transition-all",
                active ? "border-forest ring-2 ring-forest/15" : "border-border hover:border-forest/40",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {active && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-cream">
                    <CircleCheck className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold text-foreground">{s.label}</div>
                <div className="text-[10px] text-muted-foreground">{s.sub}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {qualities.map((q) => {
          const active = quality === q.id;
          return (
            <motion.button
              key={q.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setQuality(q.id)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                active ? "border-forest bg-cream ring-2 ring-forest/10" : "border-border hover:border-forest/40",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  active ? "bg-gradient-hero text-cream" : "bg-beige text-forest",
                )}
              >
                <q.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{q.label}</div>
                <div className="text-[11px] text-muted-foreground">{q.sub}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </SectionCard>
  );
}

function PickupSection({
  locationLabel,
  hasGps,
  locating,
  detect,
  lat,
  lng,
}: {
  locationLabel: string;
  hasGps: boolean;
  locating: boolean;
  detect: () => void;
  lat: number;
  lng: number;
}) {
  const mapSrc = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=10&size=800x420&maptype=mapnik&markers=${lat},${lng},red-pushpin`;

  return (
    <SectionCard step={2} title="Pickup & Location" desc="GPS helps match buyers within 150 km.">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-medium text-forest">
            <CircleCheck className="h-3.5 w-3.5" />
            {hasGps ? "GPS detected" : "Profile location"}
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="font-display text-lg font-semibold">{locationLabel}</div>
            <p className="mt-1 text-sm text-muted-foreground">India · Pickup at farm gate</p>
            <Button
              variant="ghost"
              onClick={() => void detect()}
              disabled={locating}
              className="mt-3 h-8 rounded-full px-3 text-xs text-forest hover:bg-cream"
            >
              {locating ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Navigation className="mr-1.5 h-3.5 w-3.5" />
              )}
              {locating ? "Detecting…" : "Refresh GPS"}
            </Button>
          </div>
          <div className="flex items-start gap-2 rounded-2xl border border-border bg-beige/50 p-3 text-xs">
            <Leaf className="mt-0.5 h-4 w-4 flex-none text-forest" />
            <span>
              Verified buyers within{" "}
              <strong className="text-forest">{BUYER_RADIUS_KM} km</strong> are suggested as you
              fill this form.
            </span>
          </div>
        </div>
        <div className="relative h-[280px] overflow-hidden rounded-2xl border border-border sm:h-[320px]">
          <img
            src={mapSrc}
            alt="Map"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between rounded-xl bg-card/90 px-3 py-2 text-[11px] backdrop-blur">
            <span className="font-medium">Search radius · {BUYER_RADIUS_KM} km</span>
            <span className="text-muted-foreground">{locationLabel}</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

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

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 8)
      .map((f) => URL.createObjectURL(f));
    setPhotos([...photos, ...urls].slice(0, 8));
  };

  return (
    <SectionCard step={3} title="Photos & Quantity" desc="Clear photos build trust.">
      <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-cream/50 p-8 text-center">
        <Upload className="h-6 w-6 text-forest" />
        <p className="mt-2 text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
        <Button
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-full bg-gradient-hero text-primary-foreground hover:opacity-95"
        >
          <Camera className="mr-2 h-4 w-4" /> Choose Photos
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((p, i) => (
            <div
              key={p + i}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <img src={p} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-card/90 opacity-0 group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 rounded-2xl border border-border bg-beige/40 p-6">
        <div className="flex items-end justify-between">
          <span className="text-sm font-medium">Quantity</span>
          <span className="font-display text-4xl font-semibold text-forest">
            {quantity}
            <span className="text-base font-medium text-muted-foreground"> Tonnes</span>
          </span>
        </div>
        <Slider
          className="mt-5"
          min={1}
          max={100}
          step={1}
          value={[quantity]}
          onValueChange={(v) => setQuantity(v[0])}
        />
      </div>
    </SectionCard>
  );
}

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
    <SectionCard step={4} title="Set Your Price" desc="You're in control.">
      <div className="grid gap-5 md:grid-cols-2">
        <PriceField label="Expected Price" value={price} onChange={setPrice} />
        <PriceField label="Minimum Acceptable" value={minPrice} onChange={setMinPrice} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {(["fixed", "open"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setPriceType(id)}
            className={cn(
              "rounded-2xl border p-4 text-left text-sm font-semibold transition",
              priceType === id ? "border-forest bg-cream" : "border-border",
            )}
          >
            {id === "fixed" ? "Fixed Price" : "Open to Offers"}
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-3 rounded-2xl border border-ember/30 bg-gradient-to-br from-cream to-beige-warm/40 p-5">
        <TrendingUp className="h-5 w-5 shrink-0 text-ember" />
        <p className="text-sm text-muted-foreground">
          Area rates: <strong className="text-forest">₹16,000 – ₹19,000</strong> / tonne
        </p>
      </div>
    </SectionCard>
  );
}

function PriceField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/10">
        <IndianRupee className="h-4 w-4 text-muted-foreground" />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 bg-transparent font-display text-xl font-semibold outline-none"
        />
        <span className="text-xs text-muted-foreground">/ tonne</span>
      </div>
    </label>
  );
}

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
  buyerCount,
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
  buyerCount: number;
}) {
  return (
    <SectionCard step={5} title="Review & Post" desc="Final check before going live.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Type", strawMeta.label],
          ["Quality", qualityMeta.label],
          ["Qty", `${quantity} T`],
          ["Price", `₹${price.toLocaleString("en-IN")}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-cream/50 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="mt-1 text-sm font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-foreground">
        <MapPin className="mr-1.5 inline h-4 w-4 text-forest" />
        {location} · <strong>{buyerCount}</strong> buyers within {BUYER_RADIUS_KM} km will be
        notified
      </p>
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl bg-beige/40 p-4">
        <Checkbox
          checked={agreed}
          onCheckedChange={(v) => setAgreed(Boolean(v))}
          className="mt-0.5 border-forest data-[state=checked]:bg-forest"
        />
        <span className="text-sm">
          I confirm details are accurate and authorise Dhaani to share this listing with verified
          buyers within {BUYER_RADIUS_KM} km.
        </span>
      </label>
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onPost}
        disabled={posting}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-hero py-4 font-display text-lg font-semibold text-primary-foreground shadow-forest disabled:opacity-80"
      >
        {posting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Publishing…
          </>
        ) : (
          <>
            🌾 Post My Listing <ChevronRight className="h-5 w-5" />
          </>
        )}
      </motion.button>
    </SectionCard>
  );
}

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
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-forest">
      <div className="border-b border-border bg-cream/60 px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Live preview
      </div>
      <div className="relative aspect-[4/3]">
        <img src={photo ?? strawMeta.img} alt="" className="h-full w-full object-cover" />
        <div className="absolute bottom-3 left-3 rounded-full bg-card/90 px-2.5 py-1 text-[11px] backdrop-blur">
          <MapPin className="mr-1 inline h-3 w-3 text-forest" />
          {location}
        </div>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-display text-xl font-semibold">{strawMeta.label}</h3>
        <p className="text-sm text-muted-foreground">
          {quantity} tonnes · {qualityMeta.label} · ₹{price.toLocaleString("en-IN")}/tonne
        </p>
      </div>
    </div>
  );
}

function WhyCard() {
  const items = [
    { icon: Users, title: "Verified buyers only" },
    { icon: TrendingUp, title: "Better prices" },
    { icon: Truck, title: "Quick pickup" },
    { icon: ShieldCheck, title: "Secure platform" },
  ];
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-forest">
      <h3 className="font-display text-lg font-semibold">Why post on Dhaani?</h3>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3 text-sm font-medium">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream text-forest">
              <it.icon className="h-4 w-4" />
            </div>
            {it.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <h3 className="font-display text-lg font-semibold">Need help?</h3>
      <p className="mt-1 text-xs text-muted-foreground">Farmer support · 9 AM – 7 PM</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" className="rounded-full">
          <Phone className="mr-1.5 h-4 w-4" /> Call
        </Button>
        <Button className="rounded-full bg-gradient-hero text-primary-foreground">
          <MessageCircle className="mr-1.5 h-4 w-4" /> Chat
        </Button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-cream/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={dhaaniLogo} alt="" className="h-5 w-5 object-contain" />
          <span className="font-display text-sm text-foreground">Dhaani</span>
        </div>
        <Link to="/farmer/dashboard" className="font-medium text-forest hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </footer>
  );
}
