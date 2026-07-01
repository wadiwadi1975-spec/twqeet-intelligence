import React from 'react';
import Logo from '../components/Logo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLang } from '../contexts/LangContext';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#0a1628' }}>
      {/* Language Switcher - Top */}
      <div className="absolute top-4 left-4">
        <LanguageSwitcher />
      </div>

      <div className="mb-10">
        <Logo size="lg" />
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
      <div className="mt-10 text-center">
        <p className="text-gold text-sm mb-1 opacity-70">
          {lang === 'ar' ? 'ذكاء القرارات.. لزيادة الربح وتقليل المخاطر' : 'Smart Decisions.. Increase profit and reduce risks'}
        </p>
        <p className="text-gray-600 text-xs">© 2024 MINASATI - {lang === 'ar' ? 'جميع الحقوق محفوظة wadi-1975' : 'All rights reserved wadi-1975'}</p>
      </div>
    </div>
  );
}
