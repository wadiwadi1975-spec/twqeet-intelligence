import React from 'react';
import Logo from '../components/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#0a1628' }}>
      <div className="mb-10">
        <Logo size="lg" />
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
      <div className="mt-10 text-center">
        <p className="text-gold text-sm mb-1 opacity-70">ذكاء القرارات.. لزيادة الربح وتقليل المخاطر</p>
        <p className="text-gray-600 text-xs">© 2024 TWQEET Intelligence Platform</p>
      </div>
    </div>
  );
}
