import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getStoredLocale,
  storeLocale,
  translations,
  type Locale,
  type TranslationKeys,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() =>
    typeof window !== "undefined" ? getStoredLocale() : "en",
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocalePersisted = useCallback((next: Locale) => {
    storeLocale(next);
    setLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next: Locale = prev === "en" ? "hi" : "en";
      storeLocale(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: translations[locale],
      setLocale: setLocalePersisted,
      toggleLocale,
    }),
    [locale, setLocalePersisted, toggleLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
