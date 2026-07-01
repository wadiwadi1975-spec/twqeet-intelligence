import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PriceTicker from '../components/PriceTicker';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Link from 'next/link';
import { useLang } from '../contexts/LangContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lang } = useLang();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0a1628' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 right-0 z-50 transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Top Bar - Desktop */}
        <div className="hidden lg:flex items-center justify-end gap-3 p-3 border-b" style={{ borderColor: '#1c2d4a' }}>
          <LanguageSwitcher />
          <Link href="/pricing" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
            <span>💎</span>
            <span>{lang === 'ar' ? 'الاشتراك' : 'Subscribe'}</span>
          </Link>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-3 border-b" style={{ borderColor: '#1c2d4a', backgroundColor: '#0a1628' }}>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Link href="/pricing" className="p-2 rounded-lg text-gold" style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}>
              💎
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        <PriceTicker />
        <div className="p-3 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
