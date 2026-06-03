import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Send,
  Tag,
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
  MessageSquare,
  FileText,
  CheckCircle,
  Package,
  Clock,
  Users,
  ChevronRight,
  Factory,
  PlayCircle,
  Phone,
  MoreVertical,
  Search,
  Flame,
  TrendingUp,
  Wind,
} from "lucide-react";
import heroField from "@/assets/hero-field.jpg";
import farmerAvatar from "@/assets/farmer-avatar.jpg";
import riceStraw from "@/assets/rice-straw.jpg";
import sidebarFarmer from "@/assets/sidebar-farmer.jpg";
import helpFarmer from "@/assets/help-farmer.png";
import dhaaniLogo from "@/assets/dhaani-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhaani — From stubble to sustainability" },
      { name: "description", content: "Farmer dashboard to sell rice straw to buyers and prevent stubble burning." },
      { property: "og:title", content: "Dhaani — Farmer Dashboard" },
      { property: "og:description", content: "From stubble to sustainability." },
    ],
  }),
  component: Index,
});

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Send, label: "Post My Straw" },
  { icon: Tag, label: "Buyer Offers", badge: 5 },
  { icon: ListChecks, label: "My Listings" },
  { icon: MessageCircle, label: "Chats", badge: 3 },
  { icon: CheckCircle2, label: "Completed Deals" },
  { icon: User, label: "Profile" },
  { icon: HelpCircle, label: "Help & Support" },
];

const stats = [
  { icon: Leaf, label: "Straw sold this season", value: "18", unit: "tonnes", trend: "+4 since Sept", bg: "var(--stat-green)", fg: "var(--stat-green-fg)" },
  { icon: IndianRupee, label: "Total earnings", value: "42,000", prefix: "₹", trend: "+₹8.4k this month", bg: "var(--stat-yellow)", fg: "var(--stat-yellow-fg)" },
  { icon: HandshakeIcon, label: "Active deals", value: "3", trend: "2 awaiting pickup", bg: "var(--stat-pink)", fg: "var(--stat-pink-fg)" },
  { icon: Wind, label: "Fires prevented", value: "4", trend: "≈ 2.4 t CO₂ saved", bg: "var(--stat-purple)", fg: "var(--stat-purple-fg)" },
];

const quickActions = [
  { icon: Leaf, label: "Post my straw", hint: "List new bales", bg: "var(--qa-green)", fg: "white", active: true },
  { icon: HandshakeIcon, label: "Buyer offers", hint: "12 new today", bg: "var(--qa-mint)", fg: "var(--qa-green)" },
  { icon: MessageSquare, label: "Chat with buyers", hint: "3 unread", bg: "var(--qa-blue)", fg: "oklch(0.35 0.13 225)" },
  { icon: FileText, label: "My listings", hint: "1 active", bg: "var(--qa-peach)", fg: "oklch(0.46 0.13 55)" },
  { icon: CheckCircle, label: "Completed deals", hint: "9 closed", bg: "var(--qa-lilac)", fg: "oklch(0.42 0.16 285)" },
];

const buyerOffers = [
  { name: "Green Energy Biogas", type: "Biogas plant · Panipat", price: "17,000", distance: "41 km", icon: Leaf, best: true, iconBg: "oklch(0.94 0.06 145)", iconFg: "oklch(0.38 0.1 148)" },
  { name: "Dilli Paper Mill", type: "Paper industry · Sonipat", price: "11,200", distance: "88 km", icon: Factory, iconBg: "oklch(0.92 0.025 235)", iconFg: "oklch(0.35 0.1 235)" },
  { name: "Sharma Mushroom Farm", type: "Mushroom farm · Kurukshetra", price: "9,600", distance: "62 km", icon: Sprout, iconBg: "oklch(0.93 0.06 30)", iconFg: "oklch(0.55 0.16 30)" },
];

const chats = [
  { name: "Green Energy Biogas", initials: "GE", msg: "Namaste Gurpreet ji, we'd like to confirm 8 tonnes at ₹17k…", time: "10:30 AM", unread: 2, tint: "oklch(0.94 0.06 145)", fg: "oklch(0.38 0.1 148)" },
  { name: "Dilli Paper Mill", initials: "DP", msg: "Could you share moisture content and a few quality photos?", time: "Yesterday", unread: 1, tint: "oklch(0.92 0.025 235)", fg: "oklch(0.35 0.1 235)" },
  { name: "Sharma Mushroom Farm", initials: "SM", msg: "Pickup truck available Thursday — does that work for you?", time: "2 days ago", unread: 0, tint: "oklch(0.93 0.06 30)", fg: "oklch(0.55 0.16 30)" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-[260px] shrink-0 bg-card/60 border-r border-border/70 flex flex-col">
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-baseline gap-2">
            <img src={dhaaniLogo} alt="Dhaani logo" className="size-7 object-contain" />
            <h1 className="font-display text-[28px] font-semibold text-primary leading-none">
              Dhaani
            </h1>
          </div>
          <p className="text-[11px] tracking-wide uppercase text-muted-foreground/80 mt-2.5 pl-9">
            From stubble to sustainability
          </p>
        </div>
        <div className="px-5 pb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <nav className="px-3 flex-1 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition relative ${
                item.active
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_6px_16px_-8px_oklch(0.38_0.1_148_/_0.5)]"
                  : "text-foreground/75 hover:bg-secondary/60 hover:text-foreground font-medium"
              }`}
            >
              <item.icon className="size-[18px]" strokeWidth={1.75} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && !item.active && (
                <span className="text-[10px] font-semibold bg-secondary text-primary px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={sidebarFarmer} alt="Farmer at sunset" className="w-full h-44 object-cover" loading="lazy" width={400} height={300} />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-card">
              <p className="font-display text-[15px] leading-tight">
                "Mera khet, meri pehchaan."
              </p>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mt-1">— Farmer of the week</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
        {/* Top utility bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 bg-card rounded-full pl-4 pr-2 py-1.5 border border-border/70 shadow-[var(--shadow-soft)] max-w-md">
            <Search className="size-4 text-muted-foreground" />
            <input
              placeholder="Search buyers, listings, mandis…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70 py-1"
            />
            <kbd className="text-[10px] font-medium text-muted-foreground bg-secondary/70 px-1.5 py-0.5 rounded">⌘ K</kbd>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground hidden md:flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" /> Live mandi rate · ₹1,840/qtl
          </div>
          <button className="relative size-10 rounded-full bg-card border border-border/70 flex items-center justify-center shadow-[var(--shadow-soft)]">
            <Bell className="size-[18px]" strokeWidth={1.75} />
            <span className="absolute -top-0.5 -right-0.5 bg-[var(--terracotta)] text-card text-[10px] rounded-full size-4 flex items-center justify-center font-bold border-2 border-card">3</span>
          </button>
          <button className="size-10 rounded-full overflow-hidden border border-border/70 shadow-[var(--shadow-soft)]">
            <img src={farmerAvatar} alt="Profile" className="size-full object-cover" />
          </button>
        </div>

        {/* Hero greeting card */}
        <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-[var(--shadow-card)]">
          <img src={heroField} alt="Farmland in Karnal at sunset" className="w-full h-48 object-cover" width={1600} height={400} />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/10" />
          <div className="absolute inset-0 flex items-center justify-between px-7">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={farmerAvatar} alt="Gurpreet Singh" className="size-[88px] rounded-full border-[3px] border-card object-cover shadow-md" width={120} height={120} />
                <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-[var(--stat-green-fg)] border-2 border-card" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Wednesday, 27 May</p>
                <h2 className="font-display text-[32px] font-semibold text-foreground leading-tight mt-0.5">
                  Namaste, Gurpreet <span className="italic font-medium text-primary">Singh</span>
                </h2>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin className="size-3.5 text-primary" strokeWidth={2} /> Karnal, Haryana
                  <span className="size-1 rounded-full bg-muted-foreground/40 mx-1.5" />
                  Rabi season · week 14
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-5 border border-border/60 shadow-[var(--shadow-card)] relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="size-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon className="size-5" style={{ color: s.fg }} strokeWidth={2} />
                </div>
                <TrendingUp className="size-3.5 text-muted-foreground/60" />
              </div>
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  {s.prefix && <span className="font-display text-2xl text-foreground/80">{s.prefix}</span>}
                  <span className="font-display text-[32px] font-semibold text-foreground leading-none tabular-nums">{s.value}</span>
                  {s.unit && <span className="text-xs text-muted-foreground">{s.unit}</span>}
                </div>
                <p className="text-[11px] mt-2" style={{ color: s.fg }}>{s.trend}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left col */}
          <div className="col-span-2 space-y-6">
            {/* Quick Actions */}
            <section>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-xl font-semibold text-foreground">Quick actions</h3>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Tap to begin</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {quickActions.map((q) => (
                  <button
                    key={q.label}
                    className="group rounded-2xl p-4 flex flex-col items-start gap-3 transition border border-transparent hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                    style={{ background: q.bg, color: q.fg }}
                  >
                    <q.icon className="size-6" strokeWidth={1.75} />
                    <div className="text-left">
                      <div className="text-sm font-semibold leading-tight">{q.label}</div>
                      <div className="text-[10px] opacity-70 mt-0.5">{q.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* My Active Listings */}
            <section className="bg-card rounded-2xl p-5 border border-border/60 shadow-[var(--shadow-card)]">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-xl font-semibold text-foreground">My active listing</h3>
                <button className="text-xs text-primary font-medium hover:underline">Manage</button>
              </div>
              <div className="flex gap-5">
                <div className="relative shrink-0">
                  <img src={riceStraw} alt="Rice straw bales" className="size-32 rounded-xl object-cover" loading="lazy" width={200} height={200} />
                  <span className="absolute top-2 left-2 bg-card/95 backdrop-blur text-[10px] font-semibold text-foreground px-2 py-0.5 rounded-full shadow-sm">
                    Grade A
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-[20px] font-semibold text-foreground leading-tight">Rice straw</h4>
                        <span className="flex items-center gap-1 bg-secondary text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          <span className="size-1.5 rounded-full bg-primary animate-pulse" /> Active
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">Listed 3 days ago · ID #DH-2748</p>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground p-1 -m-1">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground mt-3">
                    <span className="flex items-center gap-1.5"><Package className="size-3.5" /> <span className="text-foreground font-medium tabular-nums">22</span> tonnes</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> Karnal, Haryana</span>
                    <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> Pickup in 3 days</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between bg-secondary/50 border border-secondary rounded-xl pl-3 pr-1.5 py-1.5">
                    <span className="flex items-center gap-2 text-sm text-foreground">
                      <span className="flex -space-x-1.5">
                        {["GE","DP","SM"].map((i, idx) => (
                          <span key={i} className="size-6 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-card"
                            style={{ background: ["oklch(0.94 0.06 145)","oklch(0.92 0.025 235)","oklch(0.93 0.06 30)"][idx], color: ["oklch(0.38 0.1 148)","oklch(0.35 0.1 235)","oklch(0.55 0.16 30)"][idx] }}>
                            {i}
                          </span>
                        ))}
                      </span>
                      <span className="text-[13px]"><span className="font-semibold">3 buyers</span> interested</span>
                    </span>
                    <button className="bg-primary text-primary-foreground text-[13px] font-semibold pl-3.5 pr-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-primary/90 transition">
                      View offers <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Chats */}
            <section>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-foreground">Recent chats</h3>
                <button className="text-xs text-primary font-medium hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {chats.map((c) => (
                  <button key={c.name} className="text-left bg-card rounded-xl p-3.5 border border-border/60 shadow-[var(--shadow-soft)] hover:border-primary/30 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: c.tint, color: c.fg }}>
                        {c.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold text-foreground truncate">{c.name}</div>
                        <div className="text-[10px] text-muted-foreground">{c.time}</div>
                      </div>
                      {c.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center font-bold">{c.unread}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2 leading-snug">{c.msg}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right col */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-semibold text-foreground">Top buyer offers</h3>
              <button className="text-xs text-primary font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {buyerOffers.map((o, idx) => (
                <div key={o.name} className={`relative bg-card rounded-2xl p-4 border shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)] ${o.best ? "border-primary/30" : "border-border/60"}`}>
                  {o.best && (
                    <div className="absolute -top-2 left-4 bg-[var(--terracotta)] text-card text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      Best offer
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: o.iconBg }}>
                      <o.icon className="size-5" style={{ color: o.iconFg }} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-semibold text-foreground truncate">{o.name}</h4>
                      <p className="text-[11px] text-muted-foreground truncate">{o.type}</p>
                      <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="size-2.5" /> {o.distance} away
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display text-[20px] font-semibold text-foreground leading-none tabular-nums">
                        <span className="text-base text-foreground/70">₹</span>{o.price}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">per tonne</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-xs font-semibold border border-border rounded-lg py-1.5 hover:bg-secondary/60 transition flex items-center justify-center gap-1 text-foreground">
                    View offer <ChevronRight className="size-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Need Help */}
            <div className="relative bg-primary rounded-2xl p-5 overflow-hidden text-primary-foreground" style={{ backgroundImage: "radial-gradient(circle at 90% 10%, oklch(0.5 0.13 148) 0%, transparent 60%)" }}>
              <div className="relative z-10 max-w-[58%]">
                <h4 className="font-display text-[20px] font-semibold leading-tight">Need a hand?</h4>
                <p className="text-[11px] opacity-80 mt-1 leading-relaxed">Watch a demo, call our team in Punjabi & Hindi, or browse FAQs.</p>
                <div className="flex flex-col gap-1.5 mt-4">
                  <button className="bg-card text-foreground text-[11px] font-semibold rounded-full pl-2.5 pr-3 py-1.5 flex items-center gap-1.5 w-fit hover:scale-[1.02] transition">
                    <PlayCircle className="size-3.5 text-primary" /> Watch demo
                  </button>
                  <button className="bg-card/15 backdrop-blur text-card text-[11px] font-semibold rounded-full pl-2.5 pr-3 py-1.5 flex items-center gap-1.5 w-fit hover:bg-card/25 transition">
                    <Phone className="size-3.5" /> Call support
                  </button>
                </div>
              </div>
              <img src={helpFarmer} alt="" className="absolute -right-3 bottom-0 h-[170px] w-auto object-contain pointer-events-none" loading="lazy" width={200} height={200} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
