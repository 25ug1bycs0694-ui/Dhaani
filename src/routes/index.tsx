import { createFileRoute, Link } from "@tanstack/react-router";
import { BUYER_APP_PATH, FARMER_APP_PATH } from "@/lib/links";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageDropdown } from "@/components/language-dropdown";
import { useAQI } from "@/hooks/use-aqi";
import {
  Leaf,
  ArrowRight,
  Shield,
  MapPin,
  Headphones,
  Sprout,
  Tractor,
  Briefcase,
  Activity,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";
import heroField from "@/assets/hero-field.jpg";
import farmerImg from "@/assets/farmer.png";
import buyerImg from "@/assets/buyer.png";
import dhaaniLogo from "@/assets/dhaani-logo.png";

export const Route = createFileRoute("/")({
  component: DhaaniLanding,
});

function FloatingLeaf({ delay, x, duration }: { delay: number; x: string; duration: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 text-leaf/70"
      style={{ left: x }}
      initial={{ y: -40, rotate: 0, opacity: 0 }}
      animate={{
        y: ["-5%", "110vh"],
        rotate: [0, 180, 360],
        opacity: [0, 0.9, 0],
        x: [0, 30, -20, 10, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <Leaf className="h-5 w-5" />
    </motion.div>
  );
}

function DhaaniLanding() {
  const { t } = useLanguage();
  const navLinks = [t.nav.about, t.nav.howItWorks, t.nav.impact, t.nav.help];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Floating leaves */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        <FloatingLeaf delay={0} x="10%" duration={18} />
        <FloatingLeaf delay={4} x="35%" duration={22} />
        <FloatingLeaf delay={8} x="65%" duration={20} />
        <FloatingLeaf delay={12} x="85%" duration={24} />
        <FloatingLeaf delay={2} x="50%" duration={26} />
      </div>

      {/* Hero */}
      <section className="relative min-h-[100vh] w-full">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroField} alt={t.alt.heroImage} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/20" />
        </div>

        {/* Navbar */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto mt-6 flex w-[94%] max-w-7xl items-center justify-between rounded-2xl glass px-5 py-3"
        >
          <a href="#" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
              transition={{ duration: 0.6 }}
              className="relative h-12 w-12"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-ember/40 via-leaf/30 to-forest/40 opacity-0 blur-md transition group-hover:opacity-100" />
              <img
                src={dhaaniLogo}
                alt={t.alt.logo}
                className="relative h-12 w-12 object-contain drop-shadow-md"
              />
            </motion.div>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold tracking-tight text-forest-deep">
                Dhaani <span className="font-sans text-base font-medium text-forest/60">·</span>
                <span className="font-display ml-1 text-base font-semibold text-ember">धानी</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-forest/70">
                {t.brand.tagline}
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="group relative text-sm font-medium text-forest-deep/80 transition hover:text-forest-deep"
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-forest transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <LanguageDropdown />
        </motion.nav>

        {/* Hero content */}
        <div className="relative z-10 mx-auto grid w-[94%] max-w-7xl grid-cols-1 gap-10 px-2 pt-16 pb-32 lg:grid-cols-2 lg:gap-8 lg:pt-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-forest-deep">
              <Sparkles className="h-3.5 w-3.5 text-ember" />
              {t.hero.badge}
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.02] text-forest-deep sm:text-6xl lg:text-7xl">
              {t.hero.titleLine1} <br /> {t.hero.titleLine2} <br />
              {t.hero.titleLine3Start}{" "}
              <span className="text-gradient-ember italic">{t.hero.titleLine3Highlight}</span>{" "}
              {t.hero.titleLine3End}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-forest-deep/75 sm:text-lg">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={FARMER_APP_PATH}
                  className="group flex items-center gap-3 rounded-2xl bg-gradient-hero px-7 py-4 text-base font-semibold text-primary-foreground shadow-forest transition"
                >
                  <Tractor className="h-5 w-5 text-leaf" />
                  {t.hero.farmerCta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={BUYER_APP_PATH}
                  className="group flex items-center gap-3 rounded-2xl bg-gradient-ember px-7 py-4 text-base font-semibold text-white shadow-ember transition"
                >
                  <Briefcase className="h-5 w-5" />
                  {t.hero.buyerCta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#2d5a3d", "#c4654a", "#8b7355", "#4a6741"].map((c, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="text-sm leading-tight">
                <div className="font-semibold text-forest-deep">{t.hero.trustedTitle}</div>
                <div className="text-forest-deep/60">{t.hero.trustedSubtitle}</div>
              </div>
            </div>
          </motion.div>

          {/* Right - AQI card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <AqiCard />
          </motion.div>
        </div>
      </section>

      {/* Impact strip */}
      <section className="relative z-10 -mt-16 px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl glass-dark p-8 shadow-forest sm:p-10">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-leaf/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-ember/20 blur-3xl" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["0%", "500%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />

            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center gap-5">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ember/20">
                  <Sprout className="h-8 w-8 text-ember-glow" />
                </div>
                <div>
                  <Counter
                    to={12540}
                    className="font-display text-4xl font-bold text-beige sm:text-5xl"
                  />
                  <div className="text-sm text-beige/70">{t.impact.tonnesLabel}</div>
                </div>
              </div>

              <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-full border border-leaf/30 bg-forest-deep/40">
                <Leaf className="h-9 w-9 text-leaf" />
              </div>

              <div className="flex items-center gap-5 md:justify-end">
                <div className="md:text-right">
                  <Counter
                    to={3142}
                    className="font-display text-4xl font-bold text-beige sm:text-5xl md:text-right"
                  />
                  <div className="text-sm text-beige/70">{t.impact.firesLabel}</div>
                </div>
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-leaf/20">
                  <TrendingUp className="h-8 w-8 text-leaf" />
                </div>
              </div>
            </div>

            <div className="relative mt-8 border-t border-white/10 pt-5 text-center text-sm text-beige/80">
              <Leaf className="mr-2 inline h-4 w-4 text-leaf" />
              {t.impact.footerPrefix}{" "}
              <span className="text-ember-glow font-semibold">{t.impact.footerHighlight1}</span>{" "}
              {t.impact.footerMiddle}{" "}
              <span className="text-leaf font-semibold">{t.impact.footerHighlight2}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Who are you */}
      <section className="px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="font-display text-4xl font-bold text-forest-deep sm:text-5xl">
            {t.roles.heading}
          </h2>
          <p className="mt-3 text-forest-deep/70">{t.roles.subheading}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          <RoleCard
            tone="forest"
            href={FARMER_APP_PATH}
            badgeIcon={<Leaf className="h-5 w-5" />}
            title={t.roles.farmerTitle}
            highlight={t.roles.farmerHighlight}
            description={t.roles.farmerDesc}
            chips={[
              { icon: <Sprout className="h-4 w-4" />, label: t.roles.chips.sellStraw },
              { icon: <TrendingUp className="h-4 w-4" />, label: t.roles.chips.earnMore },
              { icon: <Leaf className="h-4 w-4" />, label: t.roles.chips.saveEnvironment },
            ]}
            image={farmerImg}
            imageAlt={t.alt.farmer}
          />
          <RoleCard
            tone="ember"
            href={BUYER_APP_PATH}
            badgeIcon={<Briefcase className="h-5 w-5" />}
            title={t.roles.buyerTitle}
            highlight={t.roles.buyerHighlight}
            description={t.roles.buyerDesc}
            chips={[
              { icon: <Sprout className="h-4 w-4" />, label: t.roles.chips.qualityStraw },
              { icon: <TrendingUp className="h-4 w-4" />, label: t.roles.chips.timelyDelivery },
              { icon: <Leaf className="h-4 w-4" />, label: t.roles.chips.sustainableGrowth },
            ]}
            image={buyerImg}
            imageAlt={t.alt.buyer}
          />
        </div>

        {/* Feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-8 max-w-6xl"
        >
          <div className="grid grid-cols-2 gap-4 rounded-3xl glass p-6 sm:p-8 lg:grid-cols-4">
            <Feature
              icon={<Shield />}
              title={t.features.verifiedTitle}
              desc={t.features.verifiedDesc}
            />
            <Feature
              icon={<Leaf />}
              title={t.features.sustainableTitle}
              desc={t.features.sustainableDesc}
            />
            <Feature icon={<MapPin />} title={t.features.localTitle} desc={t.features.localDesc} />
            <Feature
              icon={<Headphones />}
              title={t.features.supportTitle}
              desc={t.features.supportDesc}
            />
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-border bg-forest-deep py-10 text-center text-sm text-beige/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4">
          <div className="flex items-center gap-2 text-beige">
            <Sprout className="h-5 w-5 text-leaf" />
            <span className="font-display text-lg font-bold">Dhaani</span>
          </div>
          <div>
            © {new Date().getFullYear()} Dhaani. {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- AQI Card ---------- */
const aqiTranslations = {
  en: {
    title: "Air Quality Index",
    source: "Source: WAQI / CPCB",
    aqiLevelGood: "Good",
    aqiLevelSatisfactory: "Satisfactory",
    aqiLevelModerate: "Moderate",
    aqiLevelPoor: "Poor",
    aqiLevelVeryPoor: "Very Poor",
    aqiLevelSevere: "Severe"
  },
  hi: {
    title: "वायु गुणवत्ता सूचकांक",
    source: "स्रोत: WAQI / CPCB",
    aqiLevelGood: "अच्छा",
    aqiLevelSatisfactory: "संतोषजनक",
    aqiLevelModerate: "सामान्य",
    aqiLevelPoor: "खराब",
    aqiLevelVeryPoor: "बहुत खराब",
    aqiLevelSevere: "अति गंभीर"
  }
};

function AqiCard() {
  const { locale } = useLanguage();
  const { data, loading } = useAQI("Delhi", 600000);
  const [refreshing, setRefreshing] = useState(false);

  const localT = aqiTranslations[locale as "en" | "hi"] || aqiTranslations.en;

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const getAQIDetails = (aqi: number) => {
    if (aqi <= 50) {
      return {
        accentBg: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
        dot: "bg-emerald-500",
        label: localT.aqiLevelGood
      };
    }
    if (aqi <= 100) {
      return {
        accentBg: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/30",
        dot: "bg-green-500",
        label: localT.aqiLevelSatisfactory
      };
    }
    if (aqi <= 150) {
      return {
        accentBg: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
        dot: "bg-amber-500",
        label: localT.aqiLevelModerate
      };
    }
    if (aqi <= 200) {
      return {
        accentBg: "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-900/30",
        dot: "bg-orange-500",
        label: localT.aqiLevelPoor
      };
    }
    if (aqi <= 300) {
      return {
        accentBg: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
        dot: "bg-rose-500",
        label: localT.aqiLevelVeryPoor
      };
    }
    return {
      accentBg: "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
      dot: "bg-purple-500",
      label: localT.aqiLevelSevere
    };
  };

  const displayAqi = data?.aqi ?? 247;
  const details = getAQIDetails(displayAqi);

  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/40 bg-white/35 shadow-float backdrop-blur-xl">
      {/* Background image + warm haze like reference */}
      <div className="absolute inset-0">
        <img src={heroField} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/35 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/25 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-4 p-4 sm:p-5 md:grid-cols-[1.05fr_0.95fr] md:gap-4">
        {/* LEFT: AQI gauge */}
        <div className="flex min-h-[520px] flex-col rounded-[1.6rem] border border-white/50 bg-white/35 p-4 backdrop-blur-xl sm:min-h-[560px] sm:p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 ring-1 ring-white/70">
                <Leaf className="h-5 w-5 text-forest" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-forest-deep/80">
                  <MapPin className="h-4 w-4 text-forest/70" />
                  <span>Delhi, India</span>
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-forest-deep/60">
                  {loading || refreshing ? (locale === "hi" ? "अपडेट हो रहा है" : "Updating…") : (locale === "hi" ? "अभी अपडेट" : "Updated just now")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-forest-deep/70">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full ${details.dot} opacity-50`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${details.dot}`} />
              </span>
              <span className="uppercase">{loading || refreshing ? (locale === "hi" ? "अपडेट" : "Updating") : "Live"}</span>
            </div>
          </div>

          {/* Premium semi-gauge */}
          {(() => {
            const clamped = Math.max(0, Math.min(displayAqi, 300));
            const pct = (clamped / 300) * 100;
            return (
              <div className="mt-3 grid flex-1 place-items-center">
                <div className="relative h-[220px] w-[220px] sm:h-[250px] sm:w-[250px]">
                  {/* Outer ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 210deg, #22c55e 0deg, #f59e0b 110deg, #ef4444 200deg, #ef4444 240deg, rgba(255,255,255,0) 240deg)",
                      filter: "drop-shadow(0 18px 40px rgba(34, 197, 94, 0.18))",
                      WebkitMask:
                        "radial-gradient(circle, transparent 58%, #000 59%)",
                      mask: "radial-gradient(circle, transparent 58%, #000 59%)",
                    }}
                  />

                  {/* Inner glass */}
                  <div className="absolute inset-[18px] rounded-full bg-white/45 backdrop-blur-xl ring-1 ring-white/60" />

                  {/* Needle dot */}
                  <div
                    className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-forest shadow-lg"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${210 + (pct * 240) / 100}deg) translateY(-94px)`,
                    }}
                  />

                  {/* Center content */}
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div className="space-y-2">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-forest-deep/55">
                        {locale === "hi" ? "AQI सूचकांक" : "AQI Index"}
                      </div>
                      <div className="font-display text-6xl font-bold leading-none text-forest-deep sm:text-7xl">
                        {displayAqi}
                      </div>
                      <div className={`mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${details.accentBg}`}>
                        <span className={`h-2 w-2 rounded-full ${details.dot}`} />
                        {details.label}
                      </div>
                      <div className="mx-auto max-w-[190px] text-[11px] leading-snug text-forest-deep/60">
                        {locale === "hi"
                          ? "हवा की गुणवत्ता सामान्य है। संवेदनशील लोगों को असर हो सकता है।"
                          : "Air quality is acceptable. May affect sensitive people."}
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute left-0 bottom-2 text-[10px] font-semibold text-forest-deep/60">
                    {locale === "hi" ? "अच्छा" : "Good"}
                  </div>
                  <div className="absolute right-0 bottom-2 text-[10px] font-semibold text-forest-deep/60">
                    {locale === "hi" ? "200+" : "200+"}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Weather strip like reference */}
          <div className="mt-3 grid grid-cols-4 gap-2 rounded-2xl border border-white/40 bg-white/40 p-3 text-[11px] font-semibold text-forest-deep/70 backdrop-blur-xl">
            <div className="flex items-center gap-1.5">
              <Thermometer className="h-4 w-4 text-forest/60" />
              <span>{data?.temp ?? 31}°C</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="h-4 w-4 text-forest/60" />
              <span>{data?.humidity ?? 53}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wind className="h-4 w-4 text-forest/60" />
              <span>{Math.round((data?.co ? data.co * 3 : 17))} km/h</span>
            </div>
            <div className="flex items-center justify-end text-forest-deep/60">
              <span>{locale === "hi" ? "आंशिक बादल" : "Partly Cloudy"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Pollutant overview */}
        <div className="flex min-h-[520px] flex-col rounded-[1.6rem] border border-white/40 bg-forest-deep/55 p-4 text-cream backdrop-blur-xl sm:min-h-[560px] sm:p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-cream/95">
              {locale === "hi" ? "प्रदूषक सारांश" : "Pollutant Overview"}
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-cream/90 ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              {locale === "hi" ? "ताज़ा करें" : "Refresh"}
            </button>
          </div>

          <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
            {[
              {
                k: "PM2.5",
                v: data?.pm25 ?? Math.round(displayAqi * 0.88),
                u: "µg/m³",
                s: locale === "hi" ? "महीन कण" : "Fine particulate",
                tint: "bg-emerald-400/15 text-emerald-100 ring-emerald-300/20",
              },
              {
                k: "PM10",
                v: data?.pm10 ?? Math.round(displayAqi * 1.0),
                u: "µg/m³",
                s: locale === "hi" ? "धूल कण" : "Coarse particulate",
                tint: "bg-amber-400/15 text-amber-100 ring-amber-300/20",
              },
              {
                k: "NO₂",
                v: data?.no2 ?? Math.round(14 + displayAqi * 0.1),
                u: "ppb",
                s: details.label,
                tint: "bg-leaf/15 text-cream ring-white/10",
              },
              {
                k: "SO₂",
                v: data?.so2 ?? 12,
                u: "ppb",
                s: locale === "hi" ? "अच्छा" : "Good",
                tint: "bg-sky-400/10 text-sky-100 ring-sky-300/15",
              },
              {
                k: "CO",
                v: data?.co ?? 5.5,
                u: "ppm",
                s: locale === "hi" ? "अच्छा" : "Good",
                tint: "bg-violet-400/10 text-violet-100 ring-violet-300/15",
              },
              {
                k: "O₃",
                v: data?.o3 ?? 32,
                u: "ppb",
                s: details.label,
                tint: "bg-orange-400/10 text-orange-100 ring-orange-300/15",
              },
            ].map((p) => (
              <div
                key={p.k}
                className={`flex min-h-[96px] flex-col justify-between rounded-2xl bg-white/5 p-3 ring-1 ${p.tint}`}
              >
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cream/70">
                  {p.k}
                </div>
                <div>
                  <div className="mt-2 font-display text-2xl font-semibold leading-none text-cream">
                    {p.v}
                    <span className="ml-1 text-[11px] font-semibold text-cream/60">
                      {p.u}
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] font-semibold text-cream/65">
                    {p.s}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-leaf/15 ring-1 ring-white/10">
                  <Shield className="h-5 w-5 text-leaf" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-cream">
                    {locale === "hi"
                      ? "पराली जलाना और वायु गुणवत्ता"
                      : "Stubble Burning & Air Quality"}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-cream/70">
                    {locale === "hi"
                      ? "दिल्ली में सर्दियों की धुंध का बड़ा कारण पराली जलाना है — धानी के साथ इसे स्रोत पर रोका जा सकता है।"
                      : "Stubble burning contributes up to 40% of winter smog in Delhi — Dhaani helps prevent it at the source."}
                  </div>
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                <ArrowRight className="h-4 w-4 text-cream/80" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] font-semibold text-cream/55">
              <div>{localT.source}</div>
              <div className="text-cream/50">{data?.lastUpdated}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Role Card ---------- */
function RoleCard({
  tone,
  badgeIcon,
  title,
  highlight,
  description,
  chips,
  image,
  imageAlt,
  href,
}: {
  tone: "forest" | "ember";
  badgeIcon: React.ReactNode;
  title: string;
  highlight: string;
  description: string;
  chips: { icon: React.ReactNode; label: string }[];
  image: string;
  imageAlt: string;
  href?: string;
}) {
  const isForest = tone === "forest";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-white/60 bg-card p-7 shadow-float transition"
      style={{
        background: isForest
          ? "linear-gradient(135deg, oklch(0.94 0.04 130 / 95%), oklch(0.88 0.05 130 / 90%))"
          : "linear-gradient(135deg, oklch(0.96 0.04 75 / 95%), oklch(0.9 0.06 70 / 90%))",
      }}
    >
      <div
        className={`absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125 ${
          isForest ? "bg-leaf/30" : "bg-ember/25"
        }`}
      />

      <div className="relative grid grid-cols-[1fr_auto] gap-4">
        <div>
          <div className="text-sm font-medium text-forest-deep/70">{title}</div>
          <div
            className={`mt-1 font-display text-5xl font-bold leading-none ${
              isForest ? "text-forest-deep" : "text-ember"
            }`}
          >
            {highlight}
          </div>
          <p className="mt-4 max-w-[230px] text-sm leading-relaxed text-forest-deep/75">
            {description}
          </p>
        </div>
        <div
          className={`grid h-11 w-11 self-start place-items-center rounded-full text-white shadow-lg ${
            isForest ? "bg-gradient-hero" : "bg-gradient-ember"
          }`}
        >
          {badgeIcon}
        </div>
      </div>

      <div className="relative -mb-2 mt-2 flex items-end justify-center">
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-56 w-auto object-contain drop-shadow-2xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-forest-deep/10 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          {chips.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-1.5 text-xs font-semibold text-forest-deep"
            >
              <span className={isForest ? "text-forest" : "text-ember"}>{c.icon}</span>
              {c.label}
            </div>
          ))}
        </div>
        {href ? (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={href}
              className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-lg ${
                isForest ? "bg-gradient-hero" : "bg-gradient-ember"
              }`}
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-lg ${
              isForest ? "bg-gradient-hero" : "bg-gradient-ember"
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest/10 text-forest">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-forest-deep">{title}</div>
        <div className="text-xs text-forest-deep/65">{desc}</div>
      </div>
    </div>
  );
}

function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-IN"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <motion.div ref={ref} className={className}>
      {rounded}
    </motion.div>
  );
}
