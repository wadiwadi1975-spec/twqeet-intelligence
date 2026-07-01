import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes: Record<string, { icon: string; text: string; sub: string; desc: string }> = {
    sm: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[6px]', desc: 'text-[7px]' },
    md: { icon: 'w-14 h-14', text: 'text-xl', sub: 'text-[8px]', desc: 'text-[9px]' },
    lg: { icon: 'w-24 h-24', text: 'text-3xl', sub: 'text-xs', desc: 'text-sm' },
    xl: { icon: 'w-40 h-40', text: 'text-5xl', sub: 'text-sm', desc: 'text-base' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center">
      <img src="/logo.svg" alt="منصتي" className={s.icon} />
      <h1 className={`${s.text} font-extrabold tracking-wider mt-2`} style={{ color: '#D4AF37' }}>منصتي</h1>
      <div className="flex items-center gap-1 justify-center mt-0.5">
        <div className="h-[1px] w-4 bg-gold opacity-60"></div>
        <p className={`${s.sub} tracking-[0.4em] font-semibold`} style={{ color: '#D4AF37' }}>MINASATI</p>
        <div className="h-[1px] w-4 bg-gold opacity-60"></div>
      </div>
      {size !== 'sm' && (
        <p className={`${s.desc} mt-1`} style={{ color: '#D4AF37', opacity: 0.7 }}>ذكاء القرارات.. زيادة الربح وتقليل المخاطر</p>
      )}
    </div>
  );
}
