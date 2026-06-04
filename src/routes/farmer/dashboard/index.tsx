import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useChat } from "@/contexts/chat-context";
import {
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  CheckCircle2,
  User,
  HelpCircle,
  Bell,
  MapPin,
  Sprout,
  IndianRupee,
  Leaf,
  Handshake as HandshakeIcon,
  Package,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Factory,
  PlayCircle,
  Phone,
  MoreVertical,
  Search,
  Wind,
  ArrowRight,
  Star,
} from "lucide-react";
import heroField from "@/assets/hero-field.jpg";
import farmerAvatar from "@/assets/farmer-avatar.jpg";
import riceStraw from "@/assets/rice-straw.jpg";
import sidebarFarmer from "@/assets/sidebar-farmer.jpg";
import helpFarmer from "@/assets/help-farmer.png";
import dhaaniLogo from "@/assets/dhaani-logo.png";

export const Route = createFileRoute("/farmer/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dhaani — From stubble to sustainability" },
      {
        name: "description",
        content:
          "Farmer dashboard to sell rice straw to buyers and prevent stubble burning.",
      },
      { property: "og:title", content: "Dhaani — Farmer Dashboard" },
      { property: "og:description", content: "From stubble to sustainability." },
    ],
  }),
  component: Index,
});

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ListChecks, label: "My Listings" },
  { icon: MessageCircle, label: "Chats", badge: 3 },
  { icon: CheckCircle2, label: "Completed Deals" },
  { icon: User, label: "Profile" },
  { icon: HelpCircle, label: "Help & Support" },
];

const stats = [
  {
    icon: Leaf,
    label: "Straw Sold",
    value: "18",
    unit: "tonnes",
    trend: "+4 since Sept",
    trendColor: "#4a8c5c",
  },
  {
    icon: IndianRupee,
    label: "Total Earnings",
    value: "42,000",
    prefix: "₹ ",
    trend: "+₹8.4k this month",
    trendColor: "#4a8c5c",
  },
  {
    icon: HandshakeIcon,
    label: "Active Deals",
    value: "3",
    trend: "2 awaiting pickup",
    trendColor: "#b07830",
  },
  {
    icon: Wind,
    label: "Fires Prevented",
    value: "4",
    trend: "≈ 2.4 t CO₂ saved",
    trendColor: "#4a8c5c",
  },
];

const buyerOffers = [
  {
    name: "Green Energy Biogas",
    type: "Biogas plant",
    location: "Panipat",
    price: "17,000",
    distance: "41 km away",
    listing: "Rice straw – 22 tonnes",
    icon: Leaf,
    best: true,
    iconBg: "oklch(0.94 0.06 145)",
    iconFg: "oklch(0.38 0.1 148)",
  },
  {
    name: "Dilli Paper Mill",
    type: "Paper industry",
    location: "Sonipat",
    price: "11,200",
    distance: "88 km away",
    listing: "Rice straw – 22 tonnes",
    icon: Factory,
    iconBg: "oklch(0.92 0.025 235)",
    iconFg: "oklch(0.35 0.1 235)",
  },
  {
    name: "Sharma Mushroom Farm",
    type: "Mushroom farm",
    location: "Kurukshetra",
    price: "9,600",
    distance: "62 km away",
    listing: "Wheat straw – 15 tonnes",
    icon: Sprout,
    iconBg: "oklch(0.93 0.06 30)",
    iconFg: "oklch(0.55 0.16 30)",
  },
];

const chats = [
  {
    name: "Green Energy Biogas",
    initials: "GE",
    msg: "Typing...",
    time: "10:30 AM",
    unread: 2,
    tint: "oklch(0.94 0.06 145)",
    fg: "oklch(0.38 0.1 148)",
  },
  {
    name: "Dilli Paper Mill",
    initials: "DP",
    msg: "Offer updated: ₹11,200/tonne",
    time: "Yesterday",
    unread: 1,
    tint: "oklch(0.92 0.025 235)",
    fg: "oklch(0.35 0.1 235)",
  },
  {
    name: "Sharma Mushroom Farm",
    initials: "SM",
    msg: "Pickup available on Thursday",
    time: "2 days ago",
    unread: 0,
    tint: "oklch(0.93 0.06 30)",
    fg: "oklch(0.55 0.16 30)",
  },
];

function Index() {
  const { locale } = useLanguage();
  const { openChat } = useChat();
  const [activeOffer, setActiveOffer] = useState(0);

  // Get farmer data from localStorage (set on signup/login)
  const [farmerData, setFarmerData] = useState<{
    fullName?: string;
    phone?: string;
    state?: string;
    district?: string;
    village?: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored =
      localStorage.getItem("farmerProfile") ??
      localStorage.getItem("farmerSignupData");
    if (!stored) return;
    try {
      setFarmerData(JSON.parse(stored));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const farmerDisplayName = useMemo(() => {
    const name = farmerData?.fullName?.trim();
    return name || "Gurpreet Singh";
  }, [farmerData?.fullName]);

  const farmerRegion = useMemo(() => {
    const parts = [farmerData?.district, farmerData?.state].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Amritsar, Punjab";
  }, [farmerData?.district, farmerData?.state]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const currentOffer = buyerOffers[activeOffer];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f5f0e8",
        fontFamily: "var(--font-sans)",
        color: "var(--foreground)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ===================== SIDEBAR ===================== */}
      <motion.aside
        initial={{ x: -220 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          width: 220,
          background: "white",
          borderRight: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          zIndex: 30,
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: "24px 24px 4px 24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <motion.img
              src={dhaaniLogo}
              alt="Dhaani logo"
              style={{ width: 32, height: 32, objectFit: "contain" }}
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                color: "#1a3a2a",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Dhaani
            </h1>
          </div>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.05em",
              color: "#7a8a7e",
              marginTop: 4,
              paddingLeft: 40,
            }}
          >
            From stubble to sustainability
          </p>
        </motion.div>

        {/* Separator */}
        <div style={{ padding: "12px 20px 8px" }}>
          <div style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />
        </div>

        {/* Navigation */}
        <nav style={{ padding: "0 12px", flex: 1 }}>
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              whileHover={{ x: 3 }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: item.active ? 600 : 500,
                background: item.active
                  ? "linear-gradient(135deg, #1a4a2e, #2a6b3e)"
                  : "transparent",
                color: item.active ? "white" : "#4a5a4e",
                marginBottom: 2,
                position: "relative",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(26,74,46,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }
              }}
            >
              <item.icon
                size={18}
                strokeWidth={1.75}
                style={{ flexShrink: 0 }}
              />
              <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              {item.badge && !item.active && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #d4622b, #e88a45)",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: 99,
                    lineHeight: 1.3,
                  }}
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Farmer of the Month Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ padding: "12px 14px 16px" }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <motion.img
              src={sidebarFarmer}
              alt="Farmer of the Month"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(15,30,20,0.88) 0%, rgba(15,30,20,0.4) 50%, transparent 100%)",
              }}
            />

            {/* Star badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4622b, #e88a45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(212,98,43,0.4)",
              }}
            >
              <Star size={14} fill="white" color="white" />
            </motion.div>

            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 14,
                right: 14,
                color: "white",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                Farmer of the Month
              </p>
              <p
                style={{
                  fontSize: 11,
                  opacity: 0.85,
                  marginTop: 3,
                  lineHeight: 1.4,
                }}
              >
                Inspiring change. Building a cleaner tomorrow.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 99,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "inherit",
                }}
              >
                Know More <ArrowRight size={12} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.aside>

      {/* ===================== MAIN CONTENT ===================== */}
      <main
        style={{
          flex: 1,
          marginLeft: 220,
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          overflowX: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ---- TOP BAR ---- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 460,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              borderRadius: 99,
              padding: "8px 14px",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Search size={16} color="#999" />
            <input
              placeholder="Search buyers, listings, mandis..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13,
                color: "#333",
                fontFamily: "inherit",
              }}
            />
            <kbd
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#999",
                background: "#f0f0f0",
                padding: "2px 6px",
                borderRadius: 4,
                fontFamily: "inherit",
              }}
            >
              ⌘ K
            </kbd>
          </div>

          <div style={{ flex: 1 }} />

          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "white",
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Bell size={18} strokeWidth={1.75} color="#444" />
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4622b, #e88a45)",
                color: "white",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
              }}
            >
              2
            </motion.span>
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            <img
              src={farmerAvatar}
              alt="Gurpreet Singh"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(0,0,0,0.08)",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1a3a2a",
                  lineHeight: 1.2,
                }}
              >
                {farmerDisplayName}
              </div>
              <div style={{ fontSize: 11, color: "#8a9a8e" }}>Farmer</div>
            </div>
            <ChevronDown size={16} color="#8a9a8e" />
          </motion.button>
        </motion.div>

        {/* ---- HERO + BEST OFFER ROW ---- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20,
          }}
        >
          {/* Hero Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              background: "white",
              border: "1px solid rgba(0,0,0,0.06)",
              minHeight: 220,
            }}
          >
            {/* Background image on right */}
            <motion.img
              src={heroField}
              alt="Wheat field at sunset"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "60%",
                height: "100%",
                objectFit: "cover",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8 }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, white 35%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.2) 80%, transparent 100%)",
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                position: "relative",
                zIndex: 2,
                padding: "36px 36px",
                maxWidth: "55%",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#1a3a2a",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Good morning,
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, #1a4a2e, #3a7a4e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {farmerDisplayName}
                </span>
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#5a6a5e",
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                Let's turn your stubble into value
                <br />
                and a cleaner tomorrow.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <Link to="/farmer/post-straw">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "linear-gradient(135deg, #1a4a2e, #2a6b3e)",
                      color: "white",
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "10px 20px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(26,74,46,0.3)",
                      fontFamily: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>🌾</span> Post My Straw
                  </motion.span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "white",
                    color: "#1a3a2a",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "10px 20px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  View Offers <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Best Offer Today Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{
              background: "white",
              borderRadius: 20,
              padding: 20,
              border: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 14,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#1a3a2a",
                  margin: 0,
                }}
              >
                Best offer today
              </h3>
              <motion.button
                whileHover={{ x: 2 }}
                style={{
                  fontSize: 12,
                  color: "#1a4a2e",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                View all
              </motion.button>
            </div>

            {/* Best offer badge */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "linear-gradient(135deg, #2a6b3e, #4a9b5e)",
                color: "white",
                fontSize: 10,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 99,
                width: "fit-content",
                marginBottom: 12,
              }}
            >
              ⭐ Best offer
            </motion.span>

            {/* Listing the offer is for */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#f5f0e8",
                borderRadius: 8,
                padding: "6px 10px",
                marginBottom: 12,
              }}
            >
              <Package size={14} color="#7a8a7e" />
              <span style={{ fontSize: 12, color: "#5a6a5e", fontWeight: 500 }}>
                For: <span style={{ color: "#1a3a2a", fontWeight: 600 }}>{currentOffer.listing}</span>
              </span>
            </div>

            {/* Offer content */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: currentOffer.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <currentOffer.icon
                  size={20}
                  style={{ color: currentOffer.iconFg }}
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1a3a2a",
                  }}
                >
                  {currentOffer.name}
                </div>
                <div style={{ fontSize: 12, color: "#7a8a7e" }}>
                  {currentOffer.type} · {currentOffer.location}
                </div>
                <div style={{ fontSize: 11, color: "#9aaa9e", marginTop: 2 }}>
                  📍 {currentOffer.distance}
                </div>
              </div>
            </div>

            {/* Price */}
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#1a3a2a",
                  lineHeight: 1,
                }}
              >
                ₹{currentOffer.price}
              </span>
              <span style={{ fontSize: 12, color: "#7a8a7e", marginLeft: 6 }}>
                per tonne
              </span>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  background: "linear-gradient(135deg, #1a4a2e, #2a6b3e)",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Accept Offer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openChat(currentOffer.name, {
                  id: currentOffer.name,
                  name: currentOffer.name,
                  type: currentOffer.type,
                  location: currentOffer.location,
                  distance: currentOffer.distance,
                  price: currentOffer.price,
                  listing: currentOffer.listing,
                  iconBg: currentOffer.iconBg,
                  iconFg: currentOffer.iconFg,
                })}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  background: "white",
                  color: "#1a3a2a",
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Chat with Buyer
              </motion.button>
            </div>

            {/* Carousel dots + arrows */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                marginTop: 14,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {buyerOffers.map((_, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setActiveOffer(idx)}
                    style={{
                      width: idx === activeOffer ? 18 : 7,
                      height: 7,
                      borderRadius: 99,
                      background:
                        idx === activeOffer
                          ? "#1a4a2e"
                          : "rgba(0,0,0,0.15)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setActiveOffer(
                      (prev) =>
                        (prev - 1 + buyerOffers.length) % buyerOffers.length
                    )
                  }
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <ChevronLeft size={14} color="#666" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setActiveOffer(
                      (prev) => (prev + 1) % buyerOffers.length
                    )
                  }
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <ChevronRight size={14} color="#666" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- STATS ROW ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "16px 18px",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "default",
                transition: "box-shadow 0.2s",
              }}
            >
              <motion.div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "oklch(0.94 0.06 145)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <s.icon
                  size={20}
                  style={{ color: "oklch(0.38 0.1 148)" }}
                  strokeWidth={1.75}
                />
              </motion.div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#7a8a7e",
                    letterSpacing: "0.02em",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 3,
                    marginTop: 2,
                  }}
                >
                  {s.prefix && (
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#1a3a2a",
                      }}
                    >
                      {s.prefix}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 26,
                      fontWeight: 700,
                      color: "#1a3a2a",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#7a8a7e",
                        marginLeft: 2,
                      }}
                    >
                      {s.unit}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: s.trendColor,
                    marginTop: 2,
                    fontWeight: 500,
                  }}
                >
                  {s.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---- BOTTOM CONTENT: LISTING + CHATS ---- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20,
          }}
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* My Active Listing */}
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{
                background: "white",
                borderRadius: 20,
                padding: 22,
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1a3a2a",
                    margin: 0,
                  }}
                >
                  My active listing
                </h3>
                <motion.button
                  whileHover={{ x: 2 }}
                  style={{
                    fontSize: 12,
                    color: "#1a4a2e",
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  View all
                </motion.button>
              </div>

              <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                {/* Straw Image */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={riceStraw}
                    alt="Rice straw"
                    style={{
                      width: 140,
                      height: 120,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: 14,
                    }}
                    loading="lazy"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      background: "rgba(42,107,62,0.9)",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#7cdf8a",
                        display: "inline-block",
                      }}
                    />
                    Active
                  </span>
                </motion.div>

                {/* Listing details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#1a3a2a",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      Rice straw
                    </h4>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#8a9a8e",
                        padding: 4,
                      }}
                    >
                      <MoreVertical size={16} />
                    </motion.button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 14,
                      marginTop: 8,
                      fontSize: 13,
                      color: "#7a8a7e",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Package size={14} color="#7a8a7e" /> <span style={{ color: "#1a3a2a", fontWeight: 500 }}>22</span> tonnes
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <MapPin size={14} color="#7a8a7e" /> {farmerRegion}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Clock size={14} color="#7a8a7e" /> Pickup in 3 days
                    </span>
                  </div>

                  {/* Buyers interested row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        {[
                          {
                            initials: "GE",
                            bg: "oklch(0.94 0.06 145)",
                            fg: "oklch(0.38 0.1 148)",
                          },
                          {
                            initials: "DP",
                            bg: "oklch(0.92 0.025 235)",
                            fg: "oklch(0.35 0.1 235)",
                          },
                          {
                            initials: "SM",
                            bg: "oklch(0.93 0.06 30)",
                            fg: "oklch(0.55 0.16 30)",
                          },
                        ].map((b, idx) => (
                          <motion.span
                            key={b.initials}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.08 * idx }}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: b.bg,
                              color: b.fg,
                              fontSize: 9,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "2px solid white",
                              marginLeft: idx > 0 ? -6 : 0,
                            }}
                          >
                            {b.initials}
                          </motion.span>
                        ))}
                      </div>
                      <span style={{ fontSize: 12, color: "#5a6a5e" }}>
                        <strong>3 buyers</strong> interested
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "linear-gradient(135deg, #1a4a2e, #2a6b3e)",
                        color: "white",
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "9px 18px",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(26,74,46,0.25)",
                        fontFamily: "inherit",
                      }}
                    >
                      View Details <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Need Help Banner */}
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{
                background: "#faf7f2",
                borderRadius: 20,
                padding: "18px 24px",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <motion.img
                src={helpFarmer}
                alt="Help illustration"
                style={{
                  width: 56,
                  height: 56,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
                whileHover={{ scale: 1.1 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#1a3a2a",
                    margin: 0,
                  }}
                >
                  Need help?
                </h4>
                <p
                  style={{
                    fontSize: 12,
                    color: "#7a8a7e",
                    marginTop: 2,
                    lineHeight: 1.4,
                  }}
                >
                  Watch a demo, call our team in Punjabi & Hindi, or browse FAQs.
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "white",
                    color: "#1a3a2a",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "9px 16px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <PlayCircle size={14} /> Watch Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "linear-gradient(135deg, #1a4a2e, #2a6b3e)",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "9px 16px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(26,74,46,0.25)",
                    fontFamily: "inherit",
                  }}
                >
                  <Phone size={14} /> Call Support
                </motion.button>
              </div>
            </motion.section>
          </div>

          {/* Right Column - Recent Chats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              background: "white",
              borderRadius: 20,
              padding: 20,
              border: "1px solid rgba(0,0,0,0.06)",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 14,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#1a3a2a",
                  margin: 0,
                }}
              >
                Recent chats
              </h3>
              <motion.button
                whileHover={{ x: 2 }}
                style={{
                  fontSize: 12,
                  color: "#1a4a2e",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                View all
              </motion.button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {chats.map((c, idx) => (
                <motion.button
                  key={c.name}
                  onClick={() => openChat(c.name, {
                    id: c.name,
                    name: c.name,
                    type: 'Buyer',
                    location: 'Location',
                    distance: 'Distance',
                    price: 'Price',
                    listing: 'Listing',
                  })}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: "rgba(26,74,46,0.03)",
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 8px",
                    borderRadius: 12,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                    fontFamily: "inherit",
                  }}
                >
                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: c.tint,
                      color: c.fg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {c.initials}
                  </motion.div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1a3a2a",
                        }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#9aaa9e",
                          flexShrink: 0,
                          marginLeft: 8,
                        }}
                      >
                        {c.time}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: "#8a9a8e",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 180,
                        }}
                      >
                        {c.msg}
                      </span>
                      {c.unread > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            background:
                              "linear-gradient(135deg, #d4622b, #e88a45)",
                            color: "white",
                            fontSize: 10,
                            fontWeight: 700,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginLeft: 6,
                          }}
                        >
                          {c.unread}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
