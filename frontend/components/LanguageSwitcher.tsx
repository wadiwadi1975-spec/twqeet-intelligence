import React from 'react';
import { useLang } from '../contexts/LangContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      style={{
        backgroundColor: 'rgba(212,175,55,0.1)',
        border: '1px solid rgba(212,175,55,0.3)',
        color: '#D4AF37',
      }}
    >
      <span className="text-sm">{lang === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
      <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
    </button>
  );
}
