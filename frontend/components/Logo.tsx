import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  vertical?: boolean;
}

export default function Logo({ size = 'md', showText = true, vertical = false }: LogoProps) {
  const sizes = {
    sm: { icon: 48, text: 'text-xl', sub: 'text-[8px]', tagline: 'text-[7px]' },
    md: { icon: 72, text: 'text-2xl', sub: 'text-[10px]', tagline: 'text-[9px]' },
    lg: { icon: 120, text: 'text-4xl', sub: 'text-xs', tagline: 'text-[11px]' },
  };

  return (
    <div className={`flex ${vertical ? 'flex-col items-center' : 'items-center gap-3'}`}>
      {/* Icon */}
      <svg viewBox="0 0 200 200" style={{ width: sizes[size].icon, height: sizes[size].icon }}>
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D060" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#B8960C" />
          </linearGradient>
          <linearGradient id="goldGradV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D060" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A07C1C" />
          </linearGradient>
          <linearGradient id="diamondLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5D6" />
            <stop offset="30%" stopColor="#F5D060" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8960C" />
          </linearGradient>
          <linearGradient id="diamondDark" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>

        {/* Incomplete circle - open at top right */}
        <path
          d="M 155,100 A 68,68 0 1,1 105,32"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Bar chart - 4 gold bars */}
        <rect x="60" y="62" width="13" height="28" rx="2" fill="url(#goldGradV)" />
        <rect x="77" y="48" width="13" height="42" rx="2" fill="url(#goldGradV)" />
        <rect x="94" y="38" width="13" height="52" rx="2" fill="url(#goldGradV)" />
        <rect x="111" y="30" width="13" height="60" rx="2" fill="url(#goldGradV)" />

        {/* Upward arrow */}
        <path
          d="M 58,88 L 120,34"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="120,34 112,28 120,22 128,30" fill="url(#goldGrad)" />

        {/* 3D Diamond */}
        {/* Main diamond body */}
        <polygon points="100,105 135,128 100,155 65,128" fill="url(#diamondLight)" />

        {/* Top facet highlight */}
        <polygon points="100,105 118,116 100,128 82,116" fill="#FFF5D6" opacity="0.35" />

        {/* Left facet shadow */}
        <polygon points="100,105 65,128 82,116" fill="url(#diamondDark)" opacity="0.5" />

        {/* Right facet */}
        <polygon points="100,105 135,128 118,116" fill="#C9A227" opacity="0.4" />

        {/* Bottom left facet */}
        <polygon points="65,128 100,155 100,128" fill="#8B6914" opacity="0.45" />

        {/* Bottom right facet */}
        <polygon points="135,128 100,155 100,128" fill="#A07C1C" opacity="0.4" />

        {/* Center line highlight */}
        <line x1="100" y1="105" x2="100" y2="155" stroke="#FFF5D6" strokeWidth="0.7" opacity="0.25" />
      </svg>

      {/* Text */}
      {showText && (
        <div className={vertical ? 'text-center mt-1' : ''}>
          <h1 className={`${sizes[size].text} font-extrabold tracking-wider leading-none`}
              style={{ color: '#D4AF37' }}>
            TWQEET
          </h1>
          <div className="flex items-center gap-1 justify-center mt-0.5">
            <div className="h-[1px] w-4 bg-gold opacity-60" />
            <p className={`${sizes[size].sub} tracking-[0.4em] leading-none font-semibold`}
               style={{ color: '#D4AF37' }}>
              INTELLIGENCE
            </p>
            <div className="h-[1px] w-4 bg-gold opacity-60" />
          </div>
          {size !== 'sm' && (
            <p className={`${sizes[size].tagline} mt-1.5 leading-none font-normal opacity-60`}
               style={{ color: '#D4AF37' }}>
              ذكاء القرارات.. لزيادة الربح وتقليل المخاطر
            </p>
          )}
        </div>
      )}
    </div>
  );
}
