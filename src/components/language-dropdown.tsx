import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/i18n";

export function LanguageDropdown({ className = "" }: { className?: string }) {
  const { locale, t, setLocale } = useLanguage();

  const languages: { value: Locale; label: string }[] = [
    { value: "en", label: t.common.english },
    { value: "hi", label: t.common.hindi },
  ];

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep/80">
        {t.common.language}
      </label>
      <div className="relative flex items-center rounded-xl bg-white/85 ring-1 ring-[oklch(0.85_0.03_90)] backdrop-blur transition hover:ring-accent/50">
        <Languages className="absolute left-4 h-5 w-5 text-forest/70" />
        <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
          <SelectTrigger className="border-0 bg-transparent pl-12 pr-10 py-3.5 text-[15px] text-forest-deep ring-0 focus:ring-0 focus:outline-none shadow-none [&>span]:text-forest-deep">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
