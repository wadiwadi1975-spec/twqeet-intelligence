import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ar from '../locales/ar.json';
import en from '../locales/en.json';

type Lang = 'ar' | 'en';

interface LangContextType {
  lang: Lang;
  t: typeof ar;
  setLang: (l: Lang) => void;
  isArabic: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'ar',
  t: ar,
  setLang: () => {},
  isArabic: true,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  const t = lang === 'ar' ? ar : en;

  return (
    <LangContext.Provider value={{ lang, t, setLang, isArabic: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
