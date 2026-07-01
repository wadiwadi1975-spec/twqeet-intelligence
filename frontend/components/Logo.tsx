import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes: Record<string, { width: number }> = {
    sm: { width: 48 },
    md: { width: 64 },
    lg: { width: 140 },
    xl: { width: 260 },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center">
      <img 
        src="/logo.jpeg" 
        alt="منصتي" 
        style={{ width: s.width, height: 'auto' }}
      />
    </div>
  );
}
