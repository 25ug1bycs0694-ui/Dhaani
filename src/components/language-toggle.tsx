import { motion } from "framer-motion";
import { Globe, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { Locale } from "@/lib/i18n";

type LanguageToggleProps = {
  variant?: "button" | "pill";
  className?: string;
};

export function LanguageToggle({ variant = "button", className = "" }: LanguageToggleProps) {
  const { locale, t, setLocale, toggleLocale } = useLanguage();

  if (variant === "pill") {
    return (
      <motion.div
        className={`mt-4 flex items-center justify-between rounded-xl bg-white/60 p-1.5 ring-1 ring-border ${className}`}
      >
        <div className="flex items-center gap-2 pl-3 text-xs font-medium text-muted-foreground">
          <Languages className="h-3.5 w-3.5" /> {t.common.language}
        </div>
        <div className="relative flex rounded-lg bg-secondary/60 p-1">
          {(["en", "hi"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className="relative z-10 px-4 py-1.5 text-xs font-semibold transition-colors"
            >
              {locale === l && (
                <motion.span
                  layoutId="global-lang-pill"
                  className="absolute inset-0 rounded-md bg-gradient-to-br from-forest to-[oklch(0.32_0.08_150)] shadow-md"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className={`relative ${locale === l ? "text-cream" : "text-forest-deep"}`}>
                {l === "en" ? t.common.english : t.common.hindi}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.langToggle}
      className={`flex items-center gap-2 rounded-full border border-forest/30 bg-white/40 px-4 py-2 text-sm font-medium text-forest-deep backdrop-blur-md transition hover:bg-white/70 ${className}`}
    >
      <Globe className="h-4 w-4" />
      {t.langToggle}
    </button>
  );
}

/** Compact pill for nav bars on inner pages */
export function LanguageToggleNav({ className = "" }: { className?: string }) {
  const { locale, t, setLocale } = useLanguage();

  return (
    <motion.div
      className={`flex items-center gap-1 rounded-full border border-forest/30 bg-white/40 p-1 backdrop-blur-md ${className}`}
    >
      {(["en", "hi"] as const).map((l: Locale) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`relative rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locale === l ? "bg-forest text-cream shadow-sm" : "text-forest-deep/70 hover:text-forest-deep"
          }`}
        >
          {l === "en" ? t.common.english : t.common.hindi}
        </button>
      ))}
    </motion.div>
  );
}
