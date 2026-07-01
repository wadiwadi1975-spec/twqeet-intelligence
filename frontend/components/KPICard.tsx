import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendLabel?: string;
  color?: 'gold' | 'green' | 'red' | 'orange';
}

export default function KPICard({ title, value, subtitle, icon, trend, trendValue, trendLabel, color = 'gold' }: KPICardProps) {
  const colorMap: Record<string, string> = {
    gold: '#D4AF37',
    green: '#22C55E',
    red: '#EF4444',
    orange: '#F97316',
  };

  const trendColor = trend === 'up' ? '#22C55E' : trend === 'down' ? '#EF4444' : '#D4AF37';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${colorMap[color]}15`, color: colorMap[color] }}
        >
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {trend && trendValue && (
        <div className="flex items-center gap-1">
          <span style={{ color: trendColor }} className="text-sm font-bold">
            {trendIcon} {trendValue}
          </span>
          {trendLabel && (
            <span className="text-gray-500 text-xs">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
