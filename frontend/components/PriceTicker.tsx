import React, { useState, useEffect } from 'react';

interface MetalPrice {
  name: string;
  price: number;
  change: number;
  unit: string;
  icon: string;
}

interface CurrencyRate {
  name: string;
  code: string;
  rate: number;
  icon: string;
}

interface GoldGram {
  karat: string;
  priceKWD: number;
  priceUSD: number;
}

export default function PriceTicker() {
  const [metals, setMetals] = useState<MetalPrice[]>([
    { name: 'Gold', price: 3245.60, change: 1.23, unit: 'USD/oz', icon: '🥇' },
    { name: 'Silver', price: 32.18, change: -0.54, unit: 'USD/oz', icon: '🥈' },
    { name: 'Platinum', price: 1615.00, change: 0.87, unit: 'USD/oz', icon: '⚪' },
    { name: 'Copper', price: 4.52, change: 0.32, unit: 'USD/lb', icon: '🟤' },
  ]);

  const [currencies, setCurrencies] = useState<CurrencyRate[]>([
    { name: 'USD', code: 'USD', rate: 0.305, icon: '🇺🇸' },
    { name: 'EUR', code: 'EUR', rate: 0.332, icon: '🇪🇺' },
    { name: 'GBP', code: 'GBP', rate: 0.388, icon: '🇬🇧' },
    { name: 'SAR', code: 'SAR', rate: 1.144, icon: '🇸🇦' },
    { name: 'AED', code: 'AED', rate: 1.119, icon: '🇦🇪' },
    { name: 'JPY', code: 'JPY', rate: 46.25, icon: '🇯🇵' },
    { name: 'CNY', code: 'CNY', rate: 2.218, icon: '🇨🇳' },
    { name: 'INR', code: 'INR', rate: 25.65, icon: '🇮🇳' },
  ]);

  const [goldGrams, setGoldGrams] = useState<GoldGram[]>([
    { karat: '24K', priceKWD: 13.20, priceUSD: 43.28 },
    { karat: '22K', priceKWD: 12.10, priceUSD: 39.67 },
    { karat: '21K', priceKWD: 11.55, priceUSD: 37.87 },
    { karat: '18K', priceKWD: 9.90, priceUSD: 32.46 },
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString('ar-KW'));

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch metal prices from free API
        const metalRes = await fetch('https://aurumrates.com/api/v1/spot');
        const metalData = await metalRes.json();
        
        if (metalData.status === 'ok' && metalData.data) {
          const d = metalData.data;
          setMetals([
            { name: 'Gold', price: d.gold?.price || 3245.60, change: d.gold?.change_pct || 0, unit: 'USD/oz', icon: '🥇' },
            { name: 'Silver', price: d.silver?.price || 32.18, change: d.silver?.change_pct || 0, unit: 'USD/oz', icon: '🥈' },
            { name: 'Platinum', price: d.platinum?.price || 1615.00, change: d.platinum?.change_pct || 0, unit: 'USD/oz', icon: '⚪' },
            { name: 'Copper', price: 4.52, change: 0.32, unit: 'USD/lb', icon: '🟤' },
          ]);

          // Calculate gold gram prices (1 oz = 31.1035 grams)
          const goldUSD = d.gold?.price || 3245.60;
          const usdToKWD = 0.305;
          const goldGramUSD = goldUSD / 31.1035;
          const goldGramKWD = goldGramUSD * usdToKWD;
          
          setGoldGrams([
            { karat: '24K', priceKWD: goldGramKWD, priceUSD: goldGramUSD },
            { karat: '22K', priceKWD: goldGramKWD * 0.9167, priceUSD: goldGramUSD * 0.9167 },
            { karat: '21K', priceKWD: goldGramKWD * 0.875, priceUSD: goldGramUSD * 0.875 },
            { karat: '18K', priceKWD: goldGramKWD * 0.75, priceUSD: goldGramUSD * 0.75 },
          ]);
        }
        setLastUpdate(new Date().toLocaleTimeString('ar-KW'));
      } catch {
        // Use default data if API fails
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getChangeColor = (change: number) => change >= 0 ? '#22C55E' : '#EF4444';
  const getChangeArrow = (change: number) => change >= 0 ? '▲' : '▼';

  return (
    <div className="w-full overflow-hidden" style={{ backgroundColor: '#0a1628', borderBottom: '2px solid #D4AF37' }}>
      {/* Mobile: Single compact ticker with all data */}
      <div className="lg:hidden">
        <div className="flex items-center" style={{ height: '28px' }}>
          <div className="px-2 text-gold text-[9px] font-bold whitespace-nowrap border-l border-r" style={{ borderColor: '#1c2d4a', backgroundColor: 'rgba(212,175,55,0.15)' }}>
            📊
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center" style={{ animation: 'marquee 20s linear infinite' }}>
              {[...metals, ...goldGrams.slice(0,2), ...currencies.slice(0,3), ...metals, ...goldGrams.slice(0,2), ...currencies.slice(0,3)].map((item: any, i) => {
                const isMetal = 'change' in item;
                const isGold = 'karat' in item;
                if (isMetal) {
                  return (
                    <div key={i} className="flex items-center gap-1 px-3 whitespace-nowrap">
                      <span className="text-[11px]">{item.icon}</span>
                      <span className="text-white text-[10px] font-bold">{item.name}</span>
                      <span className="text-gold text-[11px] font-bold">${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      <span className="text-[10px] font-bold" style={{ color: getChangeColor(item.change) }}>
                        {getChangeArrow(item.change)} {Math.abs(item.change).toFixed(2)}%
                      </span>
                    </div>
                  );
                }
                if (isGold) {
                  return (
                    <div key={i} className="flex items-center gap-1 px-3 whitespace-nowrap">
                      <span className="text-gold text-[10px] font-bold">{item.karat}</span>
                      <span className="text-white text-[10px] font-bold">{item.priceKWD.toFixed(3)} د.ك</span>
                      <span className="text-green-400 text-[10px] font-bold">${item.priceUSD.toFixed(2)}</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex items-center gap-1 px-3 whitespace-nowrap">
                    <span className="text-[11px]">{item.icon}</span>
                    <span className="text-white text-[10px] font-bold">{item.code}</span>
                    <span className="text-gold text-[10px] font-bold">{item.rate.toFixed(3)} د.ك</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: 3 separate rows */}
      <div className="hidden lg:block">
        {/* Metals Row */}
        <div className="flex items-center" style={{ height: '32px' }}>
          <div className="px-3 text-gold text-xs font-bold whitespace-nowrap border-l border-r" style={{ borderColor: '#1c2d4a', backgroundColor: 'rgba(212,175,55,0.15)' }}>
            💎_metals
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center" style={{ animation: 'marquee 30s linear infinite' }}>
              {[...metals, ...metals, ...metals].map((m, i) => (
                <div key={i} className="flex items-center gap-2 px-4 whitespace-nowrap">
                  <span>{m.icon}</span>
                  <span className="text-white text-xs font-semibold">{m.name}</span>
                  <span className="text-gold text-xs font-bold">${m.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  <span className="text-xs" style={{ color: getChangeColor(m.change) }}>
                    {getChangeArrow(m.change)} {Math.abs(m.change).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gold Gram Prices */}
        <div className="flex items-center" style={{ height: '32px', borderTop: '1px solid #1c2d4a' }}>
          <div className="px-3 text-gold text-xs font-bold whitespace-nowrap border-l border-r" style={{ borderColor: '#1c2d4a', backgroundColor: 'rgba(212,175,55,0.15)' }}>
            🏆_Gram
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center" style={{ animation: 'marquee 25s linear infinite' }}>
              {[...goldGrams, ...goldGrams, ...goldGrams].map((g, i) => (
                <div key={i} className="flex items-center gap-3 px-4 whitespace-nowrap">
                  <span className="text-gold text-xs font-bold">{g.karat}</span>
                  <span className="text-white text-xs">{g.priceKWD.toFixed(3)} <span className="text-gray-400">د.ك</span></span>
                  <span className="text-green-400 text-xs">${g.priceUSD.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Currencies Row */}
        <div className="flex items-center" style={{ height: '32px', borderTop: '1px solid #1c2d4a' }}>
          <div className="px-3 text-gold text-xs font-bold whitespace-nowrap border-l border-r" style={{ borderColor: '#1c2d4a', backgroundColor: 'rgba(212,175,55,0.15)' }}>
            💱_Currency
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center" style={{ animation: 'marquee 35s linear infinite' }}>
              {[...currencies, ...currencies, ...currencies].map((c, i) => (
                <div key={i} className="flex items-center gap-2 px-4 whitespace-nowrap">
                  <span>{c.icon}</span>
                  <span className="text-white text-xs font-semibold">{c.code}</span>
                  <span className="text-gold text-xs font-bold">{c.rate.toFixed(3)} <span className="text-gray-400">د.ك</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
