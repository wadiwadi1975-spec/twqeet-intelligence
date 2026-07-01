import React from 'react';
import Sidebar from '../components/Sidebar';
import PriceTicker from '../components/PriceTicker';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0a1628' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <PriceTicker />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
