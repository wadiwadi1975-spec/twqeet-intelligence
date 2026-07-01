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

  const allItems = [
    ...metals.map(m => `${m.icon} ${m.name} $${m.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`),
    ...goldGrams.map(g => `${g.karat} ${g.priceKWD.toFixed(3)} د.ك`),
    ...currencies.map(c => `${c.icon} ${c.code} ${c.rate.toFixed(3)} د.ك`)
  ];

  return (
    <div style={{ backgroundColor: '#0a1628', borderBottom: '2px solid #D4AF37', height: '30px', overflow: 'hidden', position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '30px', animation: 'marquee 25s linear infinite', whiteSpace: 'nowrap' }}>
        {[...allItems, ...allItems, ...allItems, ...allItems].map((text, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 16px', fontSize: '11px', color: '#D4AF37', fontWeight: 'bold' }}>
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
