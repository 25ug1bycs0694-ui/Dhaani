import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  User,
  Phone,
  IdCard,
  MapPin,
  Building2,
  Map,
  Leaf,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Check,
  KeyRound,
  Loader2,
  PlayCircle,
  X,
  LogIn,
  UserPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import farmerImg from "@/assets/farmer-portrait.jpg";
import logoImg from "@/assets/dhaani-logo.png";
import { useLanguage } from "@/contexts/language-context";
import { LanguageDropdown } from "@/components/language-dropdown";
import { isFirebaseConfigured } from "@/lib/firebase";
import { saveFarmerSignup } from "@/lib/farmers";

export const farmerAuthHead = () => ({
  meta: [
    { title: "Dhaani — Farmer Login & Signup | Turning Straw Into Value" },
    {
      name: "description",
      content:
        "Login or create your Dhaani farmer account. Sell crop residue, connect with verified buyers, and earn more — securely with Aadhaar verification.",
    },
  ],
});

/* ---------------- Data ---------------- */
const LOCATIONS: Record<string, Record<string, string[]>> = {
  Punjab: {
    Ludhiana: ["Khanna", "Samrala", "Jagraon", "Doraha", "Machhiwara"],
    Amritsar: ["Ajnala", "Majitha", "Rayya", "Attari", "Jandiala"],
    Patiala: ["Nabha", "Rajpura", "Samana", "Patran", "Bhadson"],
    Bathinda: ["Rampura Phul", "Maur", "Talwandi Sabo", "Bhucho", "Goniana"],
  },
  Haryana: {
    Karnal: ["Indri", "Nilokheri", "Gharaunda", "Assandh", "Taraori"],
    Hisar: ["Hansi", "Adampur", "Barwala", "Narnaund", "Uklana"],
    Sonipat: ["Gohana", "Kharkhoda", "Ganaur", "Rai", "Mundlana"],
    Karnal2: [],
    Rohtak: ["Meham", "Sampla", "Kalanaur", "Lakhan Majra"],
  },
  "Uttar Pradesh": {
    Meerut: ["Sardhana", "Mawana", "Kithore", "Hastinapur", "Parikshitgarh"],
    Agra: ["Fatehabad", "Bah", "Etmadpur", "Kiraoli", "Achhnera"],
    Varanasi: ["Pindra", "Cholapur", "Sevapuri", "Kashi", "Rohaniya"],
    Lucknow: ["Mohanlalganj", "Bakshi Ka Talab", "Malihabad", "Sarojini Nagar"],
  },
};
const STATES = Object.keys(LOCATIONS);

/* ---------------- Motion ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ---------------- Bits ---------------- */
function FloatingLeaf({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className ?? ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <div className="animate-float-leaf" style={{ animationDelay: `${delay}s` }}>
        <Leaf className="h-6 w-6 text-[oklch(0.7_0.18_140)] drop-shadow-[0_4px_8px_oklch(0.4_0.1_150/0.4)]" />
      </div>
    </motion.div>
  );
}

function TrustBadge({ icon: Icon, label, sub }: { icon: any; label: string; sub: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, scale: 1.02 }}
      className="flex items-center gap-3 rounded-xl bg-[oklch(0.18_0.05_150/0.55)] px-4 py-3 backdrop-blur-md ring-1 ring-white/10 transition"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.45_0.12_150)] to-[oklch(0.3_0.08_150)] ring-1 ring-white/20">
        <Icon className="h-5 w-5 text-[oklch(0.85_0.16_75)]" />
      </div>
      <div className="text-cream">
        <div className="text-sm font-semibold leading-tight">{label}</div>
        <div className="text-xs text-cream/70">{sub}</div>
      </div>
    </motion.div>
  );
}

function Field({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  showVerify,
}: {
  icon: any;
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
  showVerify?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep/80">
        {label}
      </label>
      <motion.div
        animate={{
          boxShadow: error
            ? "0 0 0 4px oklch(0.7 0.21 30 / 0.18), 0 10px 28px -10px oklch(0.7 0.21 30 / 0.4)"
            : focused
              ? "0 0 0 4px oklch(0.72 0.16 55 / 0.18), 0 10px 28px -10px oklch(0.72 0.16 55 / 0.4)"
              : "0 1px 2px oklch(0.2 0.06 150 / 0.05)",
        }}
        transition={{ duration: 0.25 }}
        className="relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur"
      >
        <Icon className={`ml-4 h-5 w-5 ${error ? "text-destructive" : "text-forest/70"}`} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-3 py-3.5 text-[15px] text-forest-deep placeholder:text-muted-foreground/70 focus:outline-none"
        />
        {showVerify && <Check className="mr-4 h-5 w-5 text-forest" />}
        {error && <AlertCircle className="mr-4 h-5 w-5 text-destructive" />}
      </motion.div>
      {error && <p className="px-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  options,
  disabled,
}: {
  icon: any;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep/80">
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur transition hover:ring-accent/50 ${disabled ? "opacity-50" : ""}`}
      >
        <Icon className="ml-4 h-5 w-5 text-forest/70" />
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent px-3 py-3.5 pr-10 text-[15px] text-forest-deep focus:outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ArrowRight className="pointer-events-none absolute right-4 h-4 w-4 rotate-90 text-forest/50" />
      </div>
    </div>
  );
}

/* ---------------- Demo Video Modal ---------------- */
function DemoModal({
  open,
  onClose,
  videoTitle,
}: {
  open: boolean;
  onClose: () => void;
  videoTitle: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-premium ring-1 ring-white/20"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/8A7rXO8fLd4?autoplay=1"
                title={videoTitle}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Main ---------------- */
export function FarmerAuthPage() {
  const { locale, t } = useLanguage();
  const navigate = useNavigate();
  const f = t.farmer;
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [submitting, setSubmitting] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  
  const [phoneError, setPhoneError] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");

  // OTP state
  const [otpStep, setOtpStep] = useState<"idle" | "sent" | "verified">("idle");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);

  // Login OTP state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPhoneError, setLoginPhoneError] = useState("");
  const [loginState, setLoginState] = useState("");
  const [loginDistrict, setLoginDistrict] = useState("");
  const [loginVillage, setLoginVillage] = useState("");
  const [loginOtpStep, setLoginOtpStep] = useState<"idle" | "sent" | "verified">("idle");
  const [loginOtp, setLoginOtp] = useState("");
  const [loginOtpError, setLoginOtpError] = useState("");
  const [loginGeneratedOtp, setLoginGeneratedOtp] = useState("");
  const [loginOtpTimer, setLoginOtpTimer] = useState(0);
  const [loginSendingOtp, setLoginSendingOtp] = useState(false);

  const districts = useMemo(() => (state ? Object.keys(LOCATIONS[state]) : []), [state]);
  const villages = useMemo(
    () => (state && district ? (LOCATIONS[state][district] ?? []) : []),
    [state, district],
  );

  const loginDistricts = useMemo(
    () => (loginState ? Object.keys(LOCATIONS[loginState] ?? {}) : []),
    [loginState],
  );
  const loginVillages = useMemo(
    () =>
      loginState && loginDistrict
        ? (LOCATIONS[loginState]?.[loginDistrict] ?? [])
        : [],
    [loginDistrict, loginState],
  );

  const validatePhone = (value: string) => {
    const strValue = String(value || "");
    const trimmed = strValue.replace(/\D/g, "");
    if (!trimmed) {
      setPhoneError(f.phoneRequired);
    } else if (trimmed.length !== 10) {
      setPhoneError(f.phoneInvalid);
    } else {
      setPhoneError("");
    }
    setPhone(strValue);
  };

  const validateAadhaar = (value: string) => {
    const trimmed = value.replace(/\D/g, "");
    if (!trimmed) {
      setAadhaarError(f.aadhaarRequired);
    } else if (trimmed.length !== 12) {
      setAadhaarError(f.aadhaarInvalid);
    } else {
      setAadhaarError("");
    }
    setAadhaar(value);
  };

  const validateLoginPhone = (value: string) => {
    const strValue = String(value || "");
    const trimmed = strValue.replace(/\D/g, "");
    if (!trimmed) {
      setLoginPhoneError(f.phoneRequired);
    } else if (trimmed.length !== 10) {
      setLoginPhoneError(f.phoneInvalid);
    } else {
      setLoginPhoneError("");
    }
    setLoginPhone(strValue);
  };

  // OTP Timer Effect
  useEffect(() => {
    if (otpTimer <= 0) return;
    const timer = setInterval(() => {
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpTimer]);

  // Login OTP Timer Effect
  useEffect(() => {
    if (loginOtpTimer <= 0) return;
    const timer = setInterval(() => {
      setLoginOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loginOtpTimer]);

  const generateAndSendOtp = async () => {
    const trimmedPhone = phone.replace(/\D/g, "");
    if (trimmedPhone.length !== 10) {
      setPhoneError(f.phoneInvalid);
      return;
    }

    setSendingOtp(true);
    try {
      // Generate 6-digit OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setOtpStep("sent");
      setOtpTimer(60);
      setOtp("");
      setOtpError("");
      toast.success(f.otpSent);
      // In production, this would call your backend to send SMS
      console.log("OTP for demo:", newOtp);
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtpCode = () => {
    const trimmedOtp = otp.replace(/\D/g, "");
    if (trimmedOtp.length !== 6) {
      setOtpError(f.otpInvalid);
      return;
    }
    if (trimmedOtp === generatedOtp) {
      setOtpStep("verified");
      setOtpError("");
      setOtp("");
      toast.success("Phone verified successfully!");
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const generateAndSendLoginOtp = async () => {
    const trimmedPhone = loginPhone.replace(/\D/g, "");
    if (trimmedPhone.length !== 10) {
      setLoginPhoneError(f.phoneInvalid);
      return;
    }

    setLoginSendingOtp(true);
    try {
      // Generate 6-digit OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setLoginGeneratedOtp(newOtp);
      setLoginOtpStep("sent");
      setLoginOtpTimer(60);
      setLoginOtp("");
      setLoginOtpError("");
      toast.success(f.otpSent);
      console.log("Login OTP for demo:", newOtp);
    } finally {
      setLoginSendingOtp(false);
    }
  };

  const verifyLoginOtpCode = () => {
    const trimmedOtp = loginOtp.replace(/\D/g, "");
    if (trimmedOtp.length !== 6) {
      setLoginOtpError(f.otpInvalid);
      return;
    }
    if (trimmedOtp === loginGeneratedOtp) {
      setLoginOtpStep("verified");
      setLoginOtpError("");
      setLoginOtp("");
      toast.success("Phone verified successfully!");
    } else {
      setLoginOtpError("Invalid OTP. Please try again.");
    }
  };

  const handleLoginSubmit = async () => {
    const trimmedPhone = loginPhone.replace(/\D/g, "");

    if (loginOtpStep !== "verified") {
      toast.error("Please verify your phone number first.");
      return;
    }

    setSubmitting(true);
    try {
      // In production, this would authenticate against your backend
      toast.success("Logged in successfully!");
      const profile = {
        fullName: "Gurpreet Singh",
        phone: trimmedPhone,
        state: loginState,
        district: loginDistrict,
        village: loginVillage,
      };
      localStorage.setItem("farmerProfile", JSON.stringify(profile));
      // Navigate to dashboard
      navigate({ to: "/farmer/dashboard/" });
      // Reset login form
      setLoginPhone("");
      setLoginPhoneError("");
      setLoginState("");
      setLoginDistrict("");
      setLoginVillage("");
      setLoginOtpStep("idle");
      setLoginOtp("");
      setLoginOtpError("");
      setLoginGeneratedOtp("");
      setLoginOtpTimer(0);
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignupSubmit = async () => {
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.replace(/\D/g, "");
    const trimmedAadhaar = aadhaar.replace(/\D/g, "");

    let hasErrors = false;

    if (!trimmedName) {
      toast.error(f.nameRequired);
      hasErrors = true;
    }

    if (otpStep !== "verified") {
      toast.error("Please verify your phone number first.");
      hasErrors = true;
    }

    if (trimmedAadhaar.length !== 12) {
      setAadhaarError(f.aadhaarInvalid);
      hasErrors = true;
    }

    if (!state || !district || !village) {
      toast.error(f.fillRequired);
      hasErrors = true;
    }

    if (hasErrors) return;

    setSubmitting(true);
    try {
      const firebaseReady = isFirebaseConfigured();

      if (firebaseReady) {
        await saveFarmerSignup({
          fullName: trimmedName,
          phone: trimmedPhone,
          aadhaar: trimmedAadhaar,
          state,
          district,
          village,
          locale,
        });
      } else {
        // Demo mode: still allow UX flow even if Firebase isn't configured yet.
        toast.error(f.firebaseNotConfigured);
      }
      const profile = {
        fullName: trimmedName,
        phone: trimmedPhone,
        state,
        district,
        village,
      };
      // Store farmer data in localStorage for dashboard
      localStorage.setItem("farmerProfile", JSON.stringify(profile));
      localStorage.setItem("farmerSignupData", JSON.stringify(profile));
      toast.success(f.signupSuccess);
      // Navigate to dashboard
      navigate({ to: "/farmer/dashboard/" });
      setFullName("");
      setPhone("");
      setAadhaar("");
      setState("");
      setDistrict("");
      setVillage("");
      setPhoneError("");
      setAadhaarError("");
      setOtpStep("idle");
      setOtp("");
      setGeneratedOtp("");
    } catch (err) {
      console.error(err);
      toast.error(f.signupError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.6_0.15_140/0.25)] blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.78_0.16_75/0.22)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[oklch(0.5_0.12_150/0.18)] blur-3xl" />
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} videoTitle={f.demoVideoTitle} />

      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-0 p-4 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:p-6">
        {/* LEFT: Cinematic farmer panel */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl shadow-premium ring-1 ring-black/5"
        >
          <img
            src={farmerImg}
            alt={f.altFarmerPortrait}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-forest-deep/20 to-forest-deep/95" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.78_0.16_75/0.18)] via-transparent to-[oklch(0.45_0.12_150/0.3)]" />

          <FloatingLeaf className="left-[12%] top-[18%]" delay={0} />
          <FloatingLeaf className="right-[18%] top-[30%]" delay={2} />
          <FloatingLeaf className="left-[55%] top-[10%]" delay={4} />
          <FloatingLeaf className="right-[8%] bottom-[40%]" delay={1.5} />
          <FloatingLeaf className="left-[25%] bottom-[25%]" delay={3.2} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="absolute left-6 top-6 z-10 flex items-center gap-3 lg:left-8 lg:top-8"
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.05 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 p-1.5 shadow-lg ring-1 ring-white/40"
            >
              <img src={logoImg} alt={f.altLogo} className="h-full w-full object-contain" />
            </motion.div>
            <div className="text-cream">
              <div className="font-display text-2xl font-semibold leading-none tracking-tight">
                Dhaani
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-cream/75">
                {t.brand.tagline}
              </div>
            </div>
          </motion.div>

          {/* Headline + content */}
          <div className="relative z-10 flex h-full min-h-[600px] flex-col justify-end p-6 lg:min-h-[820px] lg:p-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="max-w-xl"
            >
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream lg:text-6xl">
                {f.heroHeadline1}
                <br />
                {f.heroHeadline2}{" "}
                <span className="text-gradient-gold italic">{f.heroHeadlineHighlight}</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-cream/85 lg:text-lg">{f.heroSubtext}</p>
            </motion.div>

            {/* Demo CTA card */}
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              onClick={() => setDemoOpen(true)}
              whileHover={{ x: 6 }}
              className="group mt-6 flex w-fit items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-3 pr-6 backdrop-blur-xl transition hover:border-accent/50 hover:bg-white/15"
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.16_75)] to-[oklch(0.6_0.2_50)] text-forest-deep shadow-lg">
                <PlayCircle className="h-7 w-7" />
                <span className="absolute -inset-1 -z-10 animate-ping rounded-xl bg-[oklch(0.78_0.16_75/0.5)]" />
              </div>
              <div className="text-left text-cream">
                <div className="text-sm font-semibold">{f.watchDemo}</div>
                <div className="text-xs text-cream/70">{f.watchDemoSub}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-cream/70 transition group-hover:translate-x-1 group-hover:text-cream" />
            </motion.button>

            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
              initial="hidden"
              animate="visible"
              className="mt-8 grid max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              <TrustBadge icon={ShieldCheck} label={f.trustVerified} sub={f.trustVerifiedSub} />
              <TrustBadge icon={Sparkles} label={f.trustIncome} sub={f.trustIncomeSub} />
              <TrustBadge icon={Leaf} label={f.trustPollution} sub={f.trustPollutionSub} />
              <TrustBadge icon={User} label={f.trustBuyers} sub={f.trustBuyersSub} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-8 grid grid-cols-4 gap-3 rounded-2xl bg-[oklch(0.15_0.04_150/0.6)] p-4 backdrop-blur-xl ring-1 ring-white/10"
            >
              {[
                { v: "10K+", l: f.statFarmers },
                { v: "50K+", l: f.statTons },
                { v: "100+", l: f.statDistricts },
                { v: "4.8★", l: f.statRating },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-gradient-gold font-display text-xl font-bold lg:text-2xl">
                    {s.v}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-cream/70">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* RIGHT: Auth card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-start justify-center py-8 lg:items-center lg:py-0"
        >
          <div className="glass relative w-full max-w-xl rounded-3xl p-7 shadow-premium lg:p-9">
            {/* Floating logo medallion */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
              className="absolute -top-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-2xl bg-white p-2 shadow-glow ring-1 ring-accent/30"
            >
              <img src={logoImg} alt={f.altLogo} className="h-full w-full object-contain" />
            </motion.div>

            {/* Header */}
            <div className="mt-10 text-center">
              <motion.h2
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-semibold text-forest-deep lg:text-4xl"
              >
                {mode === "signup" ? f.signupTitle : f.loginTitle}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-2 text-sm text-muted-foreground"
              >
                {mode === "signup" ? f.signupSubtitle : f.loginSubtitle}
              </motion.p>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent/40" />
                <Leaf className="h-3.5 w-3.5 text-accent" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent/40" />
              </div>
            </div>

            {/* Login / Signup Tabs */}
            <div className="relative mt-6 flex rounded-2xl bg-secondary/60 p-1.5 ring-1 ring-border">
              {(["signup", "login"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors"
                >
                  {mode === m && (
                    <motion.span
                      layoutId="auth-tab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-forest-deep via-forest to-[oklch(0.42_0.11_150)] shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-1.5 ${mode === m ? "text-cream" : "text-forest-deep/70"}`}
                  >
                    {m === "signup" ? (
                      <UserPlus className="h-4 w-4" />
                    ) : (
                      <LogIn className="h-4 w-4" />
                    )}
                    {m === "signup" ? f.tabSignUp : f.tabLogin}
                  </span>
                </button>
              ))}
            </div>

            <LanguageDropdown />

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "signup" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "signup" ? -20 : 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 space-y-4"
              >
                {mode === "signup" ? (
                  <>
                    <Field
                      icon={User}
                      label={f.fullName}
                      placeholder={f.fullNamePlaceholder}
                      value={fullName}
                      onChange={setFullName}
                    />

                    {/* Phone Verification Section */}
                    <div className="space-y-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep/80">
                          {f.phone}
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <motion.div
                              animate={{
                                boxShadow: phoneError
                                  ? "0 0 0 4px oklch(0.7 0.21 30 / 0.18), 0 10px 28px -10px oklch(0.7 0.21 30 / 0.4)"
                                  : otpStep === "verified"
                                    ? "0 0 0 4px oklch(0.5 0.16 140 / 0.18), 0 10px 28px -10px oklch(0.5 0.16 140 / 0.4)"
                                    : "0 1px 2px oklch(0.2 0.06 150 / 0.05)",
                              }}
                              transition={{ duration: 0.25 }}
                              className="relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur"
                            >
                              <Phone className={`ml-4 h-5 w-5 ${phoneError ? "text-destructive" : otpStep === "verified" ? "text-forest" : "text-forest/70"}`} />
                              <input
                                type="tel"
                                placeholder={f.phonePlaceholder}
                                value={phone}
                                onChange={(e) => validatePhone(e.target.value)}
                                disabled={otpStep === "verified"}
                                className="w-full bg-transparent px-3 py-3.5 text-[15px] text-forest-deep placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-70"
                              />
                              {otpStep === "verified" && <CheckCircle2 className="mr-4 h-5 w-5 text-forest" />}
                              {phoneError && <AlertCircle className="mr-4 h-5 w-5 text-destructive" />}
                            </motion.div>
                          </div>
                          {otpStep !== "verified" && (
                            <motion.button
                              type="button"
                              disabled={phoneError !== "" || sendingOtp || otpStep === "sent"}
                              whileHover={{ scale: 0.95 }}
                              onClick={generateAndSendOtp}
                              className="rounded-xl bg-gradient-to-r from-forest-deep via-forest to-[oklch(0.45_0.11_150)] px-4 py-3.5 text-sm font-semibold text-cream shadow-md transition disabled:opacity-50"
                            >
                              {sendingOtp ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : otpStep === "sent" ? (
                                <span>OTP Sent</span>
                              ) : (
                                f.sendOtp
                              )}
                            </motion.button>
                          )}
                        </div>
                        {phoneError && <p className="px-1 text-xs text-destructive">{phoneError}</p>}
                      </div>

                      {/* OTP Input Section */}
                      {otpStep === "sent" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2 rounded-xl bg-gradient-to-br from-[oklch(0.95_0.04_140)] to-[oklch(0.96_0.03_85)] p-4 ring-1 ring-forest/10"
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-forest-deep">{f.phoneVerification}</p>
                            <p className="text-xs text-forest/60 bg-white/50 px-2 py-1 rounded">Demo OTP: <span className="font-mono font-bold text-forest">{generatedOtp}</span></p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {f.otpHint} <span className="font-semibold text-forest">{phone.replace(/(\d{2})(\d{4})(\d{4})/, "$1****$3")}</span>
                          </p>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <motion.div
                                  animate={{
                                    boxShadow: otpError
                                      ? "0 0 0 4px oklch(0.7 0.21 30 / 0.18), 0 10px 28px -10px oklch(0.7 0.21 30 / 0.4)"
                                      : "0 1px 2px oklch(0.2 0.06 150 / 0.05)",
                                  }}
                                  transition={{ duration: 0.25 }}
                                  className="relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur"
                                >
                                  <KeyRound className={`ml-4 h-5 w-5 ${otpError ? "text-destructive" : "text-forest/70"}`} />
                                  <input
                                    type="text"
                                    placeholder={f.otpPlaceholder}
                                    value={otp}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                                      setOtp(val);
                                      setOtpError("");
                                    }}
                                    maxLength={6}
                                    className="w-full bg-transparent px-3 py-3.5 text-[15px] tracking-widest text-forest-deep placeholder:text-muted-foreground/70 focus:outline-none"
                                  />
                                  {otpError && <AlertCircle className="mr-4 h-5 w-5 text-destructive" />}
                                </motion.div>
                              </div>
                              <motion.button
                                type="button"
                                disabled={otp.length !== 6}
                                whileHover={{ scale: 0.95 }}
                                onClick={verifyOtpCode}
                                className="rounded-xl bg-gradient-to-r from-forest-deep via-forest to-[oklch(0.45_0.11_150)] px-4 py-3.5 text-sm font-semibold text-cream shadow-md transition disabled:opacity-50"
                              >
                                {f.verifyOtp}
                              </motion.button>
                            </div>
                            {otpError && <p className="px-1 text-xs text-destructive">{otpError}</p>}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {otpTimer > 0
                                ? `${f.resendIn} ${otpTimer}s`
                                : `${f.resendOtp}?`}
                            </p>
                            {otpTimer === 0 && (
                              <button
                                type="button"
                                onClick={generateAndSendOtp}
                                className="text-xs font-semibold text-forest underline hover:underline-offset-2"
                              >
                                {f.resendOtp}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Field
                        icon={IdCard}
                        label={f.aadhaar}
                        placeholder={f.aadhaarPlaceholder}
                        value={aadhaar}
                        onChange={validateAadhaar}
                        error={aadhaarError}
                        showVerify={aadhaar.replace(/\D/g, "").length === 12}
                      />
                      <p className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5 text-forest" />
                        {f.aadhaarSafe}
                      </p>
                    </div>

                    <SelectField
                      icon={Map}
                      label={f.state}
                      placeholder={f.statePlaceholder}
                      value={state}
                      onChange={(v) => {
                        setState(v);
                        setDistrict("");
                        setVillage("");
                      }}
                      options={STATES}
                    />
                    <SelectField
                      icon={Building2}
                      label={f.district}
                      placeholder={state ? f.districtPlaceholder : f.districtNeedState}
                      value={district}
                      onChange={(v) => {
                        setDistrict(v);
                        setVillage("");
                      }}
                      options={districts}
                      disabled={!state}
                    />
                    <SelectField
                      icon={MapPin}
                      label={f.village}
                      placeholder={district ? f.villagePlaceholder : f.villageNeedDistrict}
                      value={village}
                      onChange={setVillage}
                      options={villages}
                      disabled={!district}
                    />
                  </>
                ) : (
                  <>
                    <SelectField
                      icon={Map}
                      label={f.state}
                      placeholder={f.statePlaceholder}
                      value={loginState}
                      onChange={(v) => {
                        setLoginState(v);
                        setLoginDistrict("");
                        setLoginVillage("");
                      }}
                      options={STATES}
                    />
                    <SelectField
                      icon={Building2}
                      label={f.district}
                      placeholder={loginState ? f.districtPlaceholder : f.districtNeedState}
                      value={loginDistrict}
                      onChange={(v) => {
                        setLoginDistrict(v);
                        setLoginVillage("");
                      }}
                      options={loginDistricts}
                      disabled={!loginState}
                    />
                    <SelectField
                      icon={MapPin}
                      label={f.village}
                      placeholder={loginDistrict ? f.villagePlaceholder : f.villageNeedDistrict}
                      value={loginVillage}
                      onChange={setLoginVillage}
                      options={loginVillages}
                      disabled={!loginDistrict}
                    />

                    {/* Login Phone Verification Section */}
                    <div className="space-y-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep/80">
                          {f.phone}
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <motion.div
                              animate={{
                                boxShadow: loginPhoneError
                                  ? "0 0 0 4px oklch(0.7 0.21 30 / 0.18), 0 10px 28px -10px oklch(0.7 0.21 30 / 0.4)"
                                  : loginOtpStep === "verified"
                                    ? "0 0 0 4px oklch(0.5 0.16 140 / 0.18), 0 10px 28px -10px oklch(0.5 0.16 140 / 0.4)"
                                    : "0 1px 2px oklch(0.2 0.06 150 / 0.05)",
                              }}
                              transition={{ duration: 0.25 }}
                              className="relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur"
                            >
                              <Phone className={`ml-4 h-5 w-5 ${loginPhoneError ? "text-destructive" : loginOtpStep === "verified" ? "text-forest" : "text-forest/70"}`} />
                              <input
                                type="tel"
                                placeholder={f.phonePlaceholder}
                                value={loginPhone}
                                onChange={(e) => {
                                  validateLoginPhone(e.target.value);
                                }}
                                disabled={loginOtpStep === "verified"}
                                className="w-full bg-transparent px-3 py-3.5 text-[15px] text-forest-deep placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-70"
                              />
                              {loginOtpStep === "verified" && <CheckCircle2 className="mr-4 h-5 w-5 text-forest" />}
                              {loginPhoneError && <AlertCircle className="mr-4 h-5 w-5 text-destructive" />}
                            </motion.div>
                          </div>
                          {loginOtpStep !== "verified" && (
                            <motion.button
                              type="button"
                              disabled={loginPhoneError !== "" || loginSendingOtp || loginOtpStep === "sent"}
                              whileHover={{ scale: 0.95 }}
                              onClick={generateAndSendLoginOtp}
                              className="rounded-xl bg-gradient-to-r from-forest-deep via-forest to-[oklch(0.45_0.11_150)] px-4 py-3.5 text-sm font-semibold text-cream shadow-md transition disabled:opacity-50"
                            >
                              {loginSendingOtp ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : loginOtpStep === "sent" ? (
                                <span>OTP Sent</span>
                              ) : (
                                f.sendOtp
                              )}
                            </motion.button>
                          )}
                        </div>
                        {loginPhoneError && <p className="px-1 text-xs text-destructive">{loginPhoneError}</p>}
                      </div>

                      {/* Login OTP Input Section */}
                      {loginOtpStep === "sent" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2 rounded-xl bg-gradient-to-br from-[oklch(0.95_0.04_140)] to-[oklch(0.96_0.03_85)] p-4 ring-1 ring-forest/10"
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-forest-deep">{f.phoneVerification}</p>
                            <p className="text-xs text-forest/60 bg-white/50 px-2 py-1 rounded">Demo OTP: <span className="font-mono font-bold text-forest">{loginGeneratedOtp}</span></p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {f.otpHint} <span className="font-semibold text-forest">{loginPhone.replace(/(\d{2})(\d{4})(\d{4})/, "$1****$3")}</span>
                          </p>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <motion.div
                                  animate={{
                                    boxShadow: loginOtpError
                                      ? "0 0 0 4px oklch(0.7 0.21 30 / 0.18), 0 10px 28px -10px oklch(0.7 0.21 30 / 0.4)"
                                      : "0 1px 2px oklch(0.2 0.06 150 / 0.05)",
                                  }}
                                  transition={{ duration: 0.25 }}
                                  className="relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur"
                                >
                                  <KeyRound className={`ml-4 h-5 w-5 ${loginOtpError ? "text-destructive" : "text-forest/70"}`} />
                                  <input
                                    type="text"
                                    placeholder={f.otpPlaceholder}
                                    value={loginOtp}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                                      setLoginOtp(val);
                                      setLoginOtpError("");
                                    }}
                                    maxLength={6}
                                    className="w-full bg-transparent px-3 py-3.5 text-[15px] tracking-widest text-forest-deep placeholder:text-muted-foreground/70 focus:outline-none"
                                  />
                                  {loginOtpError && <AlertCircle className="mr-4 h-5 w-5 text-destructive" />}
                                </motion.div>
                              </div>
                              <motion.button
                                type="button"
                                disabled={loginOtp.length !== 6}
                                whileHover={{ scale: loginOtp.length !== 6 ? 1 : 0.95 }}
                                onClick={verifyLoginOtpCode}
                                className="rounded-xl bg-gradient-to-r from-forest-deep via-forest to-[oklch(0.45_0.11_150)] px-4 py-3.5 text-sm font-semibold text-cream shadow-md transition disabled:opacity-50"
                              >
                                {f.verifyOtp}
                              </motion.button>
                            </div>
                            {loginOtpError && <p className="px-1 text-xs text-destructive">{loginOtpError}</p>}
                            <p className="text-xs text-muted-foreground/80">
                              {loginOtpTimer > 0 ? `${f.resendIn} ${loginOtpTimer}s` : ""}
                              {loginOtpTimer === 0 && (
                                <button
                                  type="button"
                                  onClick={generateAndSendLoginOtp}
                                  className="text-forest font-semibold hover:underline"
                                >
                                  {f.resendOtp}
                                </button>
                              )}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-muted-foreground">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-forest/30 accent-forest"
                        />
                        {f.rememberMe}
                      </label>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Primary CTA */}
            <motion.button
              type="button"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.01 }}
              whileTap={{ scale: submitting ? 1 : 0.99 }}
              onClick={() => {
                if (mode === "signup") void handleSignupSubmit();
                else void handleLoginSubmit();
              }}
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-forest-deep via-forest to-[oklch(0.45_0.11_150)] py-4 text-base font-semibold text-cream shadow-[0_12px_30px_-10px_oklch(0.3_0.1_150/0.7)] transition disabled:opacity-70"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100 animate-shimmer" />
              <span className="relative flex items-center gap-2">
                {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                {submitting
                  ? f.signupSubmitting
                  : mode === "signup"
                    ? f.createAccount
                    : f.loginSecurely}
              </span>
              {!submitting && (
                <ArrowRight className="relative h-5 w-5 transition group-hover:translate-x-1" />
              )}
            </motion.button>

            {/* Aadhaar Verification (signup only) */}
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.04_140)] to-[oklch(0.96_0.03_85)] p-5 ring-1 ring-forest/10"
              >
                <div className="mb-1 text-sm font-semibold text-forest-deep">
                  {f.aadhaarVerification}
                </div>
                <p className="mb-4 text-xs text-muted-foreground">{f.aadhaarOtpHint}</p>
                <div className="flex items-center justify-between">
                  {[
                    { icon: IdCard, label: f.stepEnterAadhaar },
                    { icon: KeyRound, label: f.stepVerifyOtp },
                    { icon: User, label: f.stepVerifyDetails },
                    { icon: Check, label: f.stepAccountCreated, done: true },
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <motion.div
                          whileHover={{ y: -2, scale: 1.05 }}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${
                            step.done
                              ? "bg-gradient-to-br from-forest to-[oklch(0.32_0.08_150)] text-cream ring-forest/40 shadow-md"
                              : "bg-white text-forest ring-forest/15"
                          }`}
                        >
                          <step.icon className="h-5 w-5" />
                        </motion.div>
                        <span className="max-w-[60px] text-center text-[10px] font-medium leading-tight text-forest-deep">
                          {step.label}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="mx-1 mb-5 flex-1 border-t border-dashed border-forest/30" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" />
              {f.termsPrefix}{" "}
              <span className="font-medium text-forest underline-offset-2 hover:underline">
                {f.termsLink}
              </span>
              .
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
