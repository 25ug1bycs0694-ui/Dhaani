import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Factory,
  IdCard,
  KeyRound,
  Leaf,
  Loader2,
  Lock,
  Mail,
  Map,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  User,
  UserPlus,
  LogIn,
  Warehouse,
} from "lucide-react";
import logoImg from "@/assets/dhaani-logo.png";
import { useLanguage } from "@/contexts/language-context";

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
const INDUSTRIES = ["Biogas Plant", "Paper Mill", "Brick Kiln", "Packaging Startup", "Other"];
const BUYER_PANEL_IMAGE =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=85";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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

function FeatureCard({ icon: Icon, label, sub }: { icon: LucideIcon; label: string; sub: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, scale: 1.02 }}
      className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-md ring-1 ring-white/20 transition"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a1a] ring-1 ring-white/20">
        <Icon className="h-5 w-5 text-cream" />
      </div>
      <div className="text-cream">
        <div className="text-sm font-semibold leading-tight">{label}</div>
        <div className="text-xs text-cream/75">{sub}</div>
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
  right,
}: {
  icon: LucideIcon;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  right?: ReactNode;
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
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-3 py-3.5 text-[15px] text-forest-deep placeholder:text-muted-foreground/70 focus:outline-none"
        />
        {right}
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
  icon: LucideIcon;
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

function PhoneOtpField({
  phone,
  setPhone,
  phoneError,
  setPhoneError,
  otpStep,
  setOtpStep,
  otp,
  setOtp,
  otpError,
  setOtpError,
  generatedOtp,
  setGeneratedOtp,
  otpTimer,
  setOtpTimer,
  sendingOtp,
  setSendingOtp,
}: {
  phone: string;
  setPhone: (v: string) => void;
  phoneError: string;
  setPhoneError: (v: string) => void;
  otpStep: "idle" | "sent" | "verified";
  setOtpStep: (v: "idle" | "sent" | "verified") => void;
  otp: string;
  setOtp: (v: string) => void;
  otpError: string;
  setOtpError: (v: string) => void;
  generatedOtp: string;
  setGeneratedOtp: (v: string) => void;
  otpTimer: number;
  setOtpTimer: (v: number | ((prev: number) => number)) => void;
  sendingOtp: boolean;
  setSendingOtp: (v: boolean) => void;
}) {
  const validatePhone = (value: string) => {
    const strValue = String(value || "");
    const trimmed = strValue.replace(/\D/g, "");
    if (!trimmed) {
      setPhoneError("Phone number is required.");
    } else if (trimmed.length !== 10) {
      setPhoneError("Enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");
    }
    setPhone(strValue);
  };

  const generateAndSendOtp = async () => {
    const trimmedPhone = phone.replace(/\D/g, "");
    if (trimmedPhone.length !== 10) {
      setPhoneError("Enter a valid 10-digit phone number.");
      return;
    }

    setSendingOtp(true);
    try {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setOtpStep("sent");
      setOtpTimer(60);
      setOtp("");
      setOtpError("");
      toast.success("OTP sent successfully.");
      console.log("Buyer OTP for demo:", newOtp);
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtpCode = () => {
    const trimmedOtp = otp.replace(/\D/g, "");
    if (trimmedOtp.length !== 6) {
      setOtpError("Enter the 6-digit OTP.");
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

  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep/80">
          Phone Number
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
              <Phone
                className={`ml-4 h-5 w-5 ${phoneError ? "text-destructive" : otpStep === "verified" ? "text-forest" : "text-forest/70"}`}
              />
              <input
                type="tel"
                placeholder="Enter phone number"
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
                "Send OTP"
              )}
            </motion.button>
          )}
        </div>
        {phoneError && <p className="px-1 text-xs text-destructive">{phoneError}</p>}
      </div>

      {otpStep === "sent" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 rounded-xl bg-gradient-to-br from-[oklch(0.95_0.04_140)] to-[oklch(0.96_0.03_85)] p-4 ring-1 ring-forest/10"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-forest-deep">Phone Verification</p>
            <p className="rounded bg-white/50 px-2 py-1 text-xs text-forest/60">
              Demo OTP: <span className="font-mono font-bold text-forest">{generatedOtp}</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter the OTP sent to{" "}
            <span className="font-semibold text-forest">
              {phone.replace(/(\d{2})(\d{4})(\d{4})/, "$1****$3")}
            </span>
          </p>
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
                <KeyRound
                  className={`ml-4 h-5 w-5 ${otpError ? "text-destructive" : "text-forest/70"}`}
                />
                <input
                  type="text"
                  placeholder="Enter OTP"
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
              whileHover={{ scale: otp.length !== 6 ? 1 : 0.95 }}
              onClick={verifyOtpCode}
              className="rounded-xl bg-gradient-to-r from-forest-deep via-forest to-[oklch(0.45_0.11_150)] px-4 py-3.5 text-sm font-semibold text-cream shadow-md transition disabled:opacity-50"
            >
              Verify
            </motion.button>
          </div>
          {otpError && <p className="px-1 text-xs text-destructive">{otpError}</p>}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP?"}
            </p>
            {otpTimer === 0 && (
              <button
                type="button"
                onClick={generateAndSendOtp}
                className="text-xs font-semibold text-forest underline hover:underline-offset-2"
              >
                Resend OTP
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function BuyerAuthPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [industry, setIndustry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [gstinError, setGstinError] = useState("");
  const [contactName, setContactName] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpStep, setOtpStep] = useState<"idle" | "sent" | "verified">("idle");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [loginIndustry, setLoginIndustry] = useState("");
  const [loginCompanyName, setLoginCompanyName] = useState("");
  const [loginState, setLoginState] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPhoneError, setLoginPhoneError] = useState("");
  const [loginOtpStep, setLoginOtpStep] = useState<"idle" | "sent" | "verified">("idle");
  const [loginOtp, setLoginOtp] = useState("");
  const [loginOtpError, setLoginOtpError] = useState("");
  const [loginGeneratedOtp, setLoginGeneratedOtp] = useState("");
  const [loginOtpTimer, setLoginOtpTimer] = useState(0);
  const [loginSendingOtp, setLoginSendingOtp] = useState(false);

  const districts = useMemo(() => (state ? Object.keys(LOCATIONS[state]) : []), [state]);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const timer = setInterval(() => {
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpTimer]);

  useEffect(() => {
    if (loginOtpTimer <= 0) return;
    const timer = setInterval(() => {
      setLoginOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loginOtpTimer]);

  const handleSignupSubmit = async () => {
    const trimmedGstin = gstin.replace(/[^a-z0-9]/gi, "").toUpperCase();
    let hasErrors = false;

    if (
      !industry ||
      !companyName.trim() ||
      !contactName.trim() ||
      !state ||
      !district ||
      !password.trim()
    ) {
      toast.error("Please fill all required fields.");
      hasErrors = true;
    }
    if (trimmedGstin.length !== 15) {
      setGstinError("Enter a valid 15-character GSTIN.");
      hasErrors = true;
    }
    if (otpStep !== "verified") {
      toast.error("Please verify your phone number first.");
      hasErrors = true;
    }
    if (!acceptedTerms) {
      toast.error("Please agree to Dhaani's Terms & Conditions and Privacy Policy.");
      hasErrors = true;
    }
    if (hasErrors) return;

    setSubmitting(true);
    try {
      const profile = {
        industry,
        companyName: companyName.trim(),
        gstin: trimmedGstin,
        contactName: contactName.trim(),
        phone: phone.replace(/\D/g, ""),
        email: email.trim(),
        state,
        district,
      };
      localStorage.setItem("buyerProfile", JSON.stringify(profile));
      localStorage.setItem("buyerSignupData", JSON.stringify(profile));
      toast.success("Buyer account created successfully!");
      navigate({ to: "/buyer/dashboard" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginSubmit = async () => {
    if (!loginIndustry || !loginCompanyName.trim() || !loginState) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (loginOtpStep !== "verified") {
      toast.error("Please verify your phone number first.");
      return;
    }

    setSubmitting(true);
    try {
      const profile = {
        industry: loginIndustry,
        companyName: loginCompanyName.trim(),
        phone: loginPhone.replace(/\D/g, ""),
        state: loginState,
      };
      localStorage.setItem("buyerProfile", JSON.stringify(profile));
      toast.success("Logged in successfully!");
      navigate({ to: "/buyer/dashboard" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.6_0.15_140/0.25)] blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[oklch(0.78_0.16_75/0.22)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[oklch(0.5_0.12_150/0.18)] blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-0 p-4 lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:p-6">
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl shadow-premium ring-1 ring-black/5"
        >
          <img
            src={BUYER_PANEL_IMAGE}
            alt="Industrial biomass facility with transport infrastructure"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/45 via-forest-deep/25 to-forest-deep/95" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#d97706]/20 via-transparent to-[oklch(0.45_0.12_150/0.3)]" />

          <FloatingLeaf className="left-[12%] top-[18%]" delay={0} />
          <FloatingLeaf className="right-[18%] top-[30%]" delay={2} />
          <FloatingLeaf className="left-[55%] top-[10%]" delay={4} />
          <FloatingLeaf className="right-[8%] bottom-[40%]" delay={1.5} />
          <FloatingLeaf className="left-[25%] bottom-[25%]" delay={3.2} />

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
              <img src={logoImg} alt="Dhaani logo" className="h-full w-full object-contain" />
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

          <div className="relative z-10 flex h-full min-h-[640px] flex-col justify-end p-6 lg:min-h-[860px] lg:p-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="max-w-2xl"
            >
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream lg:text-6xl">
                Source crop residue directly from farmers.
                <br />
                Build a <span className="text-[#D97706] italic">sustainable supply chain.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-cream/85 lg:text-lg">
                Connect with verified farmers across Punjab, Haryana and Western UP. Buy rice straw,
                wheat straw and agricultural biomass directly without middlemen.
              </p>
            </motion.div>

            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
              initial="hidden"
              animate="visible"
              className="mt-8 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              <FeatureCard
                icon={ShieldCheck}
                label="Verified Farmers"
                sub="Direct sourcing from trusted sellers"
              />
              <FeatureCard icon={Warehouse} label="Bulk Supply" sub="Large quantities available" />
              <FeatureCard
                icon={PackageCheck}
                label="Better Pricing"
                sub="No middlemen commissions"
              />
              <FeatureCard
                icon={Truck}
                label="Pickup Ready"
                sub="Location & logistics visibility"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-8 grid grid-cols-2 gap-3 rounded-2xl bg-[oklch(0.15_0.04_150/0.75)] p-4 backdrop-blur-xl ring-1 ring-white/10 lg:grid-cols-4"
            >
              {[
                { v: "10K+", l: "Verified Farmers" },
                { v: "50K+", l: "Tonnes Listed" },
                { v: "100+", l: "Districts Covered" },
                { v: "500+", l: "Verified Buyers" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-xl font-bold text-[#D97706] lg:text-2xl">
                    {s.v}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-cream/70">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-cream/85 backdrop-blur-xl"
            >
              <Leaf className="h-4 w-4 text-leaf" />A secure marketplace for businesses committed to
              sustainability and growth.
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-start justify-center py-8 lg:items-center lg:py-0"
        >
          <div className="glass relative w-full max-w-xl rounded-3xl p-7 shadow-premium lg:p-9">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
              className="absolute -top-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-2xl bg-white p-2 shadow-glow ring-1 ring-accent/30"
            >
              <img src={logoImg} alt="Dhaani logo" className="h-full w-full object-contain" />
            </motion.div>

            <div className="mt-10 text-center">
              <motion.h2
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-semibold text-forest-deep lg:text-4xl"
              >
                {mode === "signup" ? "Create your buyer account" : "Access your buyer account"}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-2 text-sm text-muted-foreground"
              >
                {mode === "signup"
                  ? "Join Dhaani and access thousands of verified farmers."
                  : "Login to source verified crop residue directly from farmers."}
              </motion.p>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent/40" />
                <Leaf className="h-3.5 w-3.5 text-accent" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent/40" />
              </div>
            </div>

            <div className="relative mt-6 flex rounded-2xl bg-secondary/60 p-1.5 ring-1 ring-border">
              {(["signup", "login"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors"
                >
                  {mode === m && (
                    <motion.span
                      layoutId="buyer-auth-tab"
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
                    {m === "signup" ? "Sign Up" : "Login"}
                  </span>
                </button>
              ))}
            </div>

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
                    <SelectField
                      icon={Factory}
                      label="Industry Type"
                      placeholder="Select industry type"
                      value={industry}
                      onChange={setIndustry}
                      options={INDUSTRIES}
                    />
                    <Field
                      icon={Building2}
                      label="Company Name"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={setCompanyName}
                    />
                    <div className="space-y-1.5">
                      <Field
                        icon={IdCard}
                        label="GSTIN Number"
                        placeholder="15-digit GSTIN"
                        value={gstin}
                        onChange={(value) => {
                          setGstin(
                            value
                              .replace(/[^a-z0-9]/gi, "")
                              .toUpperCase()
                              .slice(0, 15),
                          );
                          setGstinError("");
                        }}
                        error={gstinError}
                      />
                      <p className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5 text-forest" />
                        Your GSTIN details are safe and secure with us.
                      </p>
                    </div>
                    <Field
                      icon={User}
                      label="Contact Person Name"
                      placeholder="Enter full name"
                      value={contactName}
                      onChange={setContactName}
                    />
                    <SelectField
                      icon={Map}
                      label="State"
                      placeholder="Select state"
                      value={state}
                      onChange={(v) => {
                        setState(v);
                        setDistrict("");
                      }}
                      options={STATES}
                    />
                    <SelectField
                      icon={Building2}
                      label="District"
                      placeholder={state ? "Select district" : "Select state first"}
                      value={district}
                      onChange={setDistrict}
                      options={districts}
                      disabled={!state}
                    />
                    <PhoneOtpField
                      phone={phone}
                      setPhone={setPhone}
                      phoneError={phoneError}
                      setPhoneError={setPhoneError}
                      otpStep={otpStep}
                      setOtpStep={setOtpStep}
                      otp={otp}
                      setOtp={setOtp}
                      otpError={otpError}
                      setOtpError={setOtpError}
                      generatedOtp={generatedOtp}
                      setGeneratedOtp={setGeneratedOtp}
                      otpTimer={otpTimer}
                      setOtpTimer={setOtpTimer}
                      sendingOtp={sendingOtp}
                      setSendingOtp={setSendingOtp}
                    />
                    <Field
                      icon={Mail}
                      label="Email Address (Optional)"
                      placeholder="Enter email address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                    />
                    <Field
                      icon={Lock}
                      label="Password"
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={setPassword}
                      right={
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="mr-4 text-forest/60 transition hover:text-forest"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      }
                    />
                    <div className="flex gap-3 rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.04_140)] to-[oklch(0.96_0.03_85)] p-4 ring-1 ring-forest/10">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                      <p className="text-xs leading-relaxed text-forest-deep/80">
                        Your data is 100% secure with us. We never share your information with
                        anyone.
                      </p>
                    </div>
                    <label className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-forest/30 accent-forest"
                      />
                      <span>
                        I agree to Dhaani&apos;s{" "}
                        <span className="font-medium text-forest">Terms & Conditions</span> and{" "}
                        <span className="font-medium text-forest">Privacy Policy</span>
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    <SelectField
                      icon={Factory}
                      label="Industry Type"
                      placeholder="Select industry type"
                      value={loginIndustry}
                      onChange={setLoginIndustry}
                      options={INDUSTRIES}
                    />
                    <Field
                      icon={Building2}
                      label="Company Name"
                      placeholder="Enter company name"
                      value={loginCompanyName}
                      onChange={setLoginCompanyName}
                    />
                    <SelectField
                      icon={Map}
                      label="State"
                      placeholder="Select state"
                      value={loginState}
                      onChange={setLoginState}
                      options={STATES}
                    />
                    <PhoneOtpField
                      phone={loginPhone}
                      setPhone={setLoginPhone}
                      phoneError={loginPhoneError}
                      setPhoneError={setLoginPhoneError}
                      otpStep={loginOtpStep}
                      setOtpStep={setLoginOtpStep}
                      otp={loginOtp}
                      setOtp={setLoginOtp}
                      otpError={loginOtpError}
                      setOtpError={setLoginOtpError}
                      generatedOtp={loginGeneratedOtp}
                      setGeneratedOtp={setLoginGeneratedOtp}
                      otpTimer={loginOtpTimer}
                      setOtpTimer={setLoginOtpTimer}
                      sendingOtp={loginSendingOtp}
                      setSendingOtp={setLoginSendingOtp}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-muted-foreground">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-forest/30 accent-forest"
                        />
                        Remember me
                      </label>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.04_140)] to-[oklch(0.96_0.03_85)] p-5 ring-1 ring-forest/10"
              >
                <div className="mb-1 text-sm font-semibold text-forest-deep">
                  GSTIN Verification
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Verify business details before creating your buyer account.
                </p>
                <div className="flex items-center justify-between">
                  {[
                    { icon: IdCard, label: "Enter GSTIN" },
                    { icon: Factory, label: "Verify Business" },
                    { icon: User, label: "Verify Details" },
                    { icon: Check, label: "Account Created", done: true },
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
                        <span className="max-w-[66px] text-center text-[10px] font-medium leading-tight text-forest-deep">
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
              <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                {submitting
                  ? "Please wait..."
                  : mode === "signup"
                    ? "Create Account"
                    : "Access Buyer Portal"}
              </span>
              {!submitting && (
                <ArrowRight className="relative h-5 w-5 transition group-hover:translate-x-1" />
              )}
            </motion.button>

            {mode === "signup" ? (
              <p className="mt-5 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-forest hover:underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <>
                <div className="mt-5 grid grid-cols-1 gap-2 text-center text-[11px] font-semibold text-forest-deep/75 sm:grid-cols-3">
                  {[
                    "Verified Business Accounts Only",
                    "Direct Farmer Access",
                    "Secure Marketplace",
                  ].map((badge) => (
                    <div
                      key={badge}
                      className="rounded-xl bg-white/60 px-3 py-2 ring-1 ring-forest/10"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  By continuing, you agree to our Terms & Privacy Policy
                </p>
              </>
            )}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
