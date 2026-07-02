import { useState, useEffect, useRef } from 'react';

const CURRS = [
  { id: 'kwd', name: 'الكويت', sym: 'KWD', flag: '🇰🇼', group: 'gulf' },
  { id: 'sar', name: 'السعودية', sym: 'SAR', flag: '🇸🇦', group: 'gulf' },
  { id: 'aed', name: 'الإمارات', sym: 'AED', flag: '🇦🇪', group: 'gulf' },
  { id: 'qar', name: 'قطر', sym: 'QAR', flag: '🇶🇦', group: 'gulf' },
  { id: 'bhd', name: 'البحرين', sym: 'BHD', flag: '🇧🇭', group: 'gulf' },
  { id: 'omr', name: 'عُمان', sym: 'OMR', flag: '🇴🇲', group: 'gulf' },
  { id: 'syp', name: 'سوريا', sym: 'SYP', flag: '🇸🇾', group: 'levant' },
  { id: 'lbp', name: 'لبنان', sym: 'LBP', flag: '🇱🇧', group: 'levant' },
  { id: 'jod', name: 'الأردن', sym: 'JOD', flag: '🇯🇴', group: 'levant' },
  { id: 'egp', name: 'مصر', sym: 'EGP', flag: '🇪🇬', group: 'other' },
  { id: 'iqd', name: 'العراق', sym: 'IQD', flag: '🇮🇶', group: 'other' },
];

const KAR = [
  { k: '24', m: 1, c: 'k24' },
  { k: '22', m: 22 / 24, c: 'k22' },
  { k: '21', m: 21 / 24, c: 'k21' },
  { k: '18', m: 18 / 24, c: 'k18' },
];

const GRAMS = [1, 2, 5, 10, 25, 50];

const FACTORS = [
  { nm: 'مؤشر الدولار DXY', val: '97.2', imp: 'إيجابي', ic: 'ip', sc: 82, pr: '98.1', note: 'انخفاض الدولار يدعم الذهب' },
  { nm: 'التضخم CPI', val: '3.1%', imp: 'إيجابي', ic: 'ip', sc: 75, pr: '2.9%', note: 'تضخم مرتفع = طلب على الذهب' },
  { nm: 'الفائدة الأمريكية', val: '4.75%', imp: 'محايد', ic: 'iu', sc: 50, pr: '4.75%', note: 'ثبات الفائدة تأثير محدود' },
  { nm: 'PMI التصنيع', val: '48.3', imp: 'إيجابي', ic: 'ip', sc: 65, pr: '49.1', note: 'تراجع PMI يعزز الملاذ الآمن' },
  { nm: 'NFP الوظائف', val: '187K', imp: 'محايد', ic: 'iu', sc: 55, pr: '203K', note: 'ضعف الوظائف يُضعف الدولار' },
  { nm: 'تدفقات ETF', val: '+12.4T', imp: 'إيجابي', ic: 'ip', sc: 78, pr: '+8.1T', note: 'تدفقات إيجابية قوية' },
  { nm: 'أسعار النفط', val: '$82.50', imp: 'إيجابي', ic: 'ip', sc: 68, pr: '$80', note: 'ارتفاع النفط = توترات جيوسياسية' },
  { nm: 'VIX التقلب', val: '18.4', imp: 'إيجابي', ic: 'ip', sc: 72, pr: '16.9', note: 'طلب مرتفع على الملاذ الآمن' },
];

const HM = [
  { nm: 'DXY', val: '-0.8%', sc: 82, bg: 'rgba(0,200,83,' },
  { nm: 'CPI', val: '+0.2%', sc: 75, bg: 'rgba(0,200,83,' },
  { nm: 'فائدة', val: '4.75%', sc: 50, bg: 'rgba(255,193,7,' },
  { nm: 'PMI', val: '48.3', sc: 65, bg: 'rgba(0,200,83,' },
  { nm: 'NFP', val: '187K', sc: 55, bg: 'rgba(255,193,7,' },
  { nm: 'ETF', val: '+12.4T', sc: 78, bg: 'rgba(0,200,83,' },
  { nm: 'نفط', val: '+3.1%', sc: 68, bg: 'rgba(0,200,83,' },
  { nm: 'VIX', val: '+8.9%', sc: 72, bg: 'rgba(0,200,83,' },
];

const TL_DATA: Record<string, { time: string; title: string; desc: string; sig: string; dot: string }[]> = {
  today: [
    { time: '14:30', title: 'توصية: شراء قوي', desc: 'CPI أعلى التوقعات — الذهب يرتفع.', sig: 'buy', dot: '#00C853' },
    { time: '11:00', title: 'اختراق مستوى رئيسي', desc: 'كسر مقاومة بحجم تداول مرتفع.', sig: 'buy', dot: '#D4AF37' },
    { time: '09:15', title: 'NFP: 187K وظيفة', desc: 'أقل من التوقعات — دعم إضافي.', sig: 'hold', dot: '#FFC107' },
  ],
  week: [
    { time: 'الاثنين', title: 'انتظار', desc: 'ترقب بيانات التضخم.', sig: 'hold', dot: '#FFC107' },
    { time: 'الأربعاء', title: 'CPI أعلى التوقعات', desc: 'إيجابي للذهب.', sig: 'buy', dot: '#00C853' },
    { time: 'الخميس', title: 'شراء قوي 87/100', desc: 'تضافر عوامل متعددة.', sig: 'buy', dot: '#D4AF37' },
  ],
  month: [
    { time: '1 يونيو', title: '87 نقطة', desc: 'بداية شهر قوية.', sig: 'buy', dot: '#00C853' },
    { time: '5 يونيو', title: '72 نقطة', desc: 'تراجع مؤقت.', sig: 'hold', dot: '#FFC107' },
    { time: '21 يونيو', title: '87 نقطة', desc: 'ذروة الشهر.', sig: 'buy', dot: '#D4AF37' },
  ],
  history: [
    { time: 'يونيو 2025', title: 'متوسط 81', desc: '11 شراء، 4 انتظار.', sig: 'buy', dot: '#00C853' },
    { time: 'مايو 2025', title: 'متوسط 74', desc: '8 شراء، 6 انتظار.', sig: 'hold', dot: '#FFC107' },
    { time: 'مارس 2025', title: 'متوسط 79', desc: '10 شراء، 3 انتظار.', sig: 'buy', dot: '#00C853' },
  ],
};

const AL_DATA_INIT = [
  { nm: 'تنبيه شراء', cond: 'XAU < $4,000', st: 'نشط', sc: 'st-on' },
  { nm: 'هدف ربح', cond: 'XAU > $4,300', st: 'نشط', sc: 'st-on' },
  { nm: 'وقف خسارة', cond: 'XAU < $3,800', st: 'مُشغَّل', sc: 'st-off' },
];

export default function GoldPulse() {
  const [screen, setScreen] = useState<'splash' | 'app'>('splash');
  const [activePage, setActivePage] = useState('dashboard');
  const [spot, setSpot] = useState<number | null>(null);
  const [prev, setPrev] = useState<number | null>(null);
  const [change, setChange] = useState<number>(0);
  const [pct, setPct] = useState<number>(0);
  const [provider, setProvider] = useState<string>('—');
  const [upTime, setUpTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [cfFilter, setCfFilter] = useState('all');
  const [tlFilter, setTlFilter] = useState('today');
  const [anCount, setAnCount] = useState(0);
  const [aiResult, setAiResult] = useState<string>('');
  const [aiBadge, setAiBadge] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [alData, setAlData] = useState(AL_DATA_INIT);
  const [clock, setClock] = useState('--:--');

  const fx = useRef<Record<string, number>>({
    KWD: 0.3071, SAR: 3.75, AED: 3.6725, QAR: 3.64, BHD: 0.376,
    OMR: 0.385, SYP: 12900, LBP: 89500, JOD: 0.709, EGP: 48.6, IQD: 1310,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFX();
    fetchGold();
    const goldInterval = setInterval(fetchGold, 60000);
    const fxInterval = setInterval(fetchFX, 300000);
    return () => {
      clearInterval(goldInterval);
      clearInterval(fxInterval);
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      fetchGold();
    }
  }, [countdown]);

  async function fetchFX() {
    try {
      const r = await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(8000) });
      const d = await r.json();
      if (d?.rates) {
        const rt = d.rates;
        ['KWD', 'SAR', 'AED', 'QAR', 'BHD', 'OMR', 'SYP', 'LBP', 'JOD', 'EGP', 'IQD'].forEach(k => {
          if (rt[k]) fx.current[k] = +rt[k];
        });
      }
    } catch (e) {}
  }

  async function fetchGold() {
    const sources = [
      { name: 'Currency-API', fn: async () => { const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json', { signal: AbortSignal.timeout(8000) }); const d = await r.json(); if (d?.xau?.usd) return d.xau.usd; } },
      { name: 'ExchangeRate-API', fn: async () => { const r = await fetch('https://open.er-api.com/v6/latest/XAU', { signal: AbortSignal.timeout(8000) }); const d = await r.json(); if (d?.rates?.USD) return d.rates.USD; } },
    ];
    for (const src of sources) {
      try {
        const p = await src.fn();
        if (p && p > 500 && p < 20000) {
          applyPrice(p, src.name);
          return;
        }
      } catch (e) {}
    }
    applyPrice(+((spot || 4150) + (Math.random() - 0.47) * 5).toFixed(2), 'محاكاة');
  }

  function applyPrice(price: number, prov: string) {
    setPrev(spot);
    setSpot(price);
    setProvider(prov);
    setUpTime(new Date());
    const chg = spot ? +(price - spot).toFixed(2) : +(price * 0.001).toFixed(2);
    const p = spot ? +((price - spot) / spot * 100).toFixed(3) : 0.10;
    setChange(chg);
    setPct(p);
    setCountdown(60);
  }

  function fmtP(v: number) {
    if (v >= 100000) return v.toLocaleString('en', { maximumFractionDigits: 0 });
    if (v >= 1000) return v.toLocaleString('en', { maximumFractionDigits: 0 });
    if (v >= 10) return v.toFixed(2);
    return v.toFixed(3);
  }

  const g24 = spot ? spot / 31.1035 : 0;
  const isUp = change >= 0;
  const fmt = (v: number) => v.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ height: '100vh', background: '#090909', overflow: 'hidden', fontFamily: "'Cairo', sans-serif", maxWidth: '430px', margin: '0 auto' }}>
      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .screen { display: none; flex-direction: column; height: 100%; overflow: hidden; }
        .screen.active { display: flex; }
        .splash { background: #090909; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; }
        .logo-glow { width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%); animation: glowP 3s ease-in-out infinite; }
        @keyframes glowP { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.12); opacity: 1; } }
        .wordmark h1 { font-size: 36px; font-weight: 900; color: #D4AF37; letter-spacing: 5px; text-align: center; }
        .wordmark p { font-size: 11px; color: #555; letter-spacing: 3px; text-align: center; margin-top: 5px; text-transform: uppercase; }
        .tagline { text-align: center; font-size: 13px; color: #AAA; line-height: 1.8; margin: 16px 0; }
        .tagline strong { color: #D4AF37; }
        .price-box { background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.35); border-radius: 14px; padding: 14px 18px; width: 100%; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; }
        .pb-label { font-size: 9px; color: #555; letter-spacing: 1px; margin-bottom: 4px; }
        .pb-price { font-size: 22px; font-weight: 700; color: #F5F5F5; }
        .pb-live { font-size: 9px; color: #00C853; background: rgba(0,200,83,.1); border: 1px solid rgba(0,200,83,.3); padding: 2px 8px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px; margin-top: 4px; }
        .pb-live::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #00C853; animation: blink 1.5s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .pb-chg { font-size: 13px; font-weight: 700; }
        .btn-pri { width: 100%; padding: 15px; border-radius: 22px; border: none; background: #D4AF37; color: #000; font-size: 15px; font-weight: 700; cursor: pointer; margin-bottom: 10px; }
        .btn-sec { width: 100%; padding: 14px; border-radius: 22px; background: none; border: 1px solid rgba(212,175,55,0.35); color: #D4AF37; font-size: 14px; font-weight: 600; cursor: pointer; margin-bottom: 16px; }
        .wadi { font-size: 11px; color: rgba(212,175,55,0.35); text-align: center; margin-top: 10px; letter-spacing: 2px; font-weight: 600; }
        .top-nav { background: #111; border-bottom: 1px solid rgba(212,175,55,0.15); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
        .tn-nm { font-size: 16px; font-weight: 700; color: #D4AF37; letter-spacing: 2px; }
        .tn-live { font-size: 9px; color: #00C853; background: rgba(0,200,83,.1); border: 1px solid rgba(0,200,83,.25); padding: 3px 9px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px; }
        .tn-live::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: #00C853; animation: blink 1.5s infinite; }
        .ticker { background: #1A1A1A; border-bottom: 1px solid rgba(212,175,55,0.15); padding: 6px 0; overflow: hidden; white-space: nowrap; }
        .ticker-inner { display: inline-flex; gap: 24px; animation: scroll 38s linear infinite; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ti { font-size: 10px; display: inline-flex; align-items: center; gap: 5px; color: #F5F5F5; }
        .ti .s { color: #D4AF37; font-weight: 700; }
        .up { color: #00C853; } .dn { color: #FF3D3D; }
        .scroll-area { flex: 1; overflow-y: auto; padding: 14px 14px 0; }
        .bottom-nav { background: #111; border-top: 1px solid rgba(212,175,55,0.15); display: flex; padding: 8px 2px 20px; }
        .bn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; cursor: pointer; padding: 6px 2px; color: #555; font-size: 9px; }
        .bn.active { color: #D4AF37; }
        .bn svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 1.8; }
        .live-card { background: linear-gradient(135deg, rgba(212,175,55,.07), rgba(212,175,55,.02)); border: 1px solid rgba(212,175,55,0.35); border-radius: 14px; padding: 14px; margin-bottom: 12px; }
        .lc-label { font-size: 9px; color: #555; letter-spacing: 1.5px; margin-bottom: 5px; }
        .lc-price { font-size: 28px; font-weight: 700; color: #F5F5F5; }
        .lc-chg { font-size: 12px; font-weight: 600; margin-top: 6px; }
        .lc-meta { font-size: 9px; color: #555; text-align: right; }
        .gauge-card { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 14px; padding: 14px; margin-bottom: 12px; display: flex; gap: 14px; align-items: center; }
        .gc-score { font-size: 34px; font-weight: 700; color: #00C853; }
        .gc-sig { display: inline-block; margin-top: 6px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(0,200,83,.1); color: #00C853; border: 1px solid rgba(0,200,83,.25); }
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
        .stat-c { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 10px; padding: 11px 13px; }
        .stat-c .sl { font-size: 9px; color: #555; margin-bottom: 3px; }
        .stat-c .sv { font-size: 16px; font-weight: 700; color: #F5F5F5; }
        .stat-c .sc { font-size: 9px; margin-top: 2px; }
        .kwd-card { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 14px; padding: 13px; margin-bottom: 12px; }
        .kwd-title { font-size: 9px; color: #555; letter-spacing: 1.5px; margin-bottom: 8px; }
        .kwd-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
        .kwd-k { font-size: 11px; color: #AAA; } .kwd-v { font-size: 14px; font-weight: 700; color: #D4AF37; }
        .ai-card { background: #111; border: 1px solid rgba(212,175,55,0.35); border-radius: 14px; margin-bottom: 12px; }
        .ai-head { padding: 11px 13px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .ai-title { font-size: 12px; font-weight: 700; color: #D4AF37; }
        .ai-run { background: #D4AF37; color: #000; border: none; padding: 7px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; cursor: pointer; }
        .ai-body { padding: 13px; min-height: 72px; }
        .ai-ph { font-size: 12px; color: #555; text-align: center; }
        .sec { font-size: 9px; font-weight: 700; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .fc { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 10px; padding: 11px 13px; margin-bottom: 8px; }
        .fc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .fc-nm { font-size: 10px; color: #AAA; font-weight: 600; }
        .fc-imp { font-size: 8px; padding: 2px 7px; border-radius: 10px; font-weight: 700; }
        .ip { background: rgba(0,200,83,.1); color: #00C853; } .iu { background: rgba(255,193,7,.1); color: #FFC107; }
        .fc-val { font-size: 15px; font-weight: 700; color: #F5F5F5; }
        .fc-sub { font-size: 9px; color: #555; }
        .fc-bar { height: 3px; background: #222; border-radius: 2px; margin-top: 8px; }
        .fc-fill { height: 100%; border-radius: 2px; }
        .hm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; }
        .hm-cell { border-radius: 9px; padding: 10px 12px; text-align: center; }
        .hm-nm { font-size: 9px; font-weight: 700; }
        .hm-val { font-size: 12px; font-weight: 700; }
        .hm-sc { font-size: 8px; margin-top: 2px; opacity: .8; }
        .cf-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .cf-btn { background: none; border: 1px solid rgba(212,175,55,0.15); color: #555; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-size: 10px; }
        .cf-btn.active { background: rgba(212,175,55,0.35); color: #D4AF37; border-color: rgba(212,175,55,0.35); }
        .cc { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 10px; overflow: hidden; margin-bottom: 9px; }
        .cc-head { background: #1A1A1A; padding: 9px 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .cc-nm { font-size: 12px; font-weight: 700; color: #F5F5F5; }
        .cc-rate { font-size: 10px; color: #D4AF37; font-weight: 600; }
        .gram-tbl { width: 100%; border-collapse: collapse; font-size: 10px; }
        .gram-tbl th { padding: 5px 6px; color: #555; font-weight: 600; text-align: right; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .gram-tbl td { padding: 5px 6px; text-align: right; border-bottom: 1px solid rgba(255,255,255,.03); color: #F5F5F5; }
        .k24 { color: #D4AF37; font-weight: 700; } .k22 { color: #C8A820; } .k21 { color: #B09010; } .k18 { color: #906810; }
        .tl-item { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .tl-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
        .tl-time { font-size: 9px; color: #555; }
        .tl-title { font-size: 11px; font-weight: 600; margin: 2px 0; color: #F5F5F5; }
        .tl-desc { font-size: 10px; color: #AAA; line-height: 1.5; }
        .tl-sig { font-size: 9px; padding: 2px 8px; border-radius: 8px; font-weight: 700; display: inline-block; margin-top: 3px; }
        .b-buy { background: rgba(0,200,83,.1); color: #00C853; border: 1px solid rgba(0,200,83,.3); }
        .b-sell { background: rgba(255,61,61,.1); color: #FF3D3D; border: 1px solid rgba(255,61,61,.3); }
        .b-hold { background: rgba(255,193,7,.1); color: #FFC107; border: 1px solid rgba(255,193,7,.3); }
        .mkt-row { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 10px; padding: 11px 13px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .mr-sym { font-size: 10px; color: #D4AF37; font-weight: 700; }
        .mr-name { font-size: 10px; color: #AAA; }
        .mr-val { font-size: 15px; font-weight: 700; text-align: right; color: #F5F5F5; }
        .mr-chg { font-size: 9px; margin-top: 2px; text-align: right; }
        .al-item { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 9px; padding: 11px 13px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .al-nm { font-size: 11px; font-weight: 600; color: #F5F5F5; }
        .al-cond { font-size: 9px; color: #555; margin-top: 2px; }
        .al-st { font-size: 9px; padding: 3px 9px; border-radius: 9px; font-weight: 700; }
        .st-on { background: rgba(0,200,83,.1); color: #00C853; } .st-off { background: rgba(255,61,61,.1); color: #FF3D3D; }
        .add-al { width: 100%; padding: 11px; background: none; border: 1px dashed rgba(212,175,55,0.35); border-radius: 9px; color: #D4AF37; font-size: 11px; cursor: pointer; margin-bottom: 12px; }
        .ni { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 9px; padding: 11px 13px; display: flex; gap: 9px; margin-bottom: 7px; }
        .ni.unread { border-color: rgba(212,175,55,.3); background: rgba(212,175,55,.03); }
        .ni-dot { width: 6px; height: 6px; border-radius: 50%; background: #D4AF37; flex-shrink: 0; margin-top: 4px; }
        .ni-t { font-size: 11px; font-weight: 600; color: #F5F5F5; margin-bottom: 2px; }
        .ni-m { font-size: 9px; color: #555; }
        .sub-card { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 14px; padding: 15px; margin-bottom: 10px; }
        .sub-card.feat { border-color: #D4AF37; }
        .sub-nm { font-size: 14px; font-weight: 700; color: #F5F5F5; }
        .sub-price { font-size: 18px; font-weight: 700; color: #D4AF37; }
        .sub-price span { font-size: 10px; color: #555; font-weight: 400; }
        .sub-feats { display: flex; flex-direction: column; gap: 5px; margin: 9px 0; }
        .sf { font-size: 11px; color: #AAA; display: flex; align-items: center; gap: 5px; }
        .sf::before { content: '✓'; color: #00C853; font-weight: 700; }
        .sf.no::before { content: '✗'; color: #555; } .sf.no { color: #555; }
        .sub-btn { width: 100%; padding: 11px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; margin-top: 7px; }
        .sub-btn.pri { background: #D4AF37; color: #000; border: none; }
        .sub-btn.out { background: none; border: 1px solid rgba(212,175,55,0.35); color: #D4AF37; }
        .set-row { background: #111; border: 1px solid rgba(212,175,55,0.15); border-radius: 9px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .sr-lbl { font-size: 12px; font-weight: 600; color: #F5F5F5; }
        .sr-sub { font-size: 9px; color: #555; margin-top: 2px; }
        .sr-ctrl select { background: #1A1A1A; border: 1px solid rgba(212,175,55,0.15); color: #F5F5F5; padding: 5px 8px; border-radius: 8px; font-size: 11px; }
        .spin { width: 20px; height: 20px; border: 2px solid rgba(212,175,55,0.35); border-top-color: #D4AF37; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 10px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* SPLASH */}
      <div className={`screen splash ${screen === 'splash' ? 'active' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="logo-glow" />
          <div style={{ width: 158, height: 158, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: '2px solid rgba(212,175,55,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <svg width="128" height="128" viewBox="0 0 200 200" fill="none">
              <defs>
                <linearGradient id="gG" x1="15%" y1="0%" x2="85%" y2="100%">
                  <stop offset="0%" stopColor="#F5D76E" />
                  <stop offset="45%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#9A7B10" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="82" stroke="url(#gG)" strokeWidth="6" fill="none" />
              <circle cx="100" cy="100" r="54" stroke="url(#gG)" strokeWidth="5" fill="none" />
              <circle cx="100" cy="100" r="27" stroke="url(#gG)" strokeWidth="4.5" fill="none" />
              <circle cx="100" cy="100" r="12" fill="url(#gG)" />
              <line x1="100" y1="18" x2="100" y2="157" stroke="url(#gG)" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="77" y1="38" x2="123" y2="38" stroke="url(#gG)" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="70" y1="157" x2="130" y2="157" stroke="url(#gG)" strokeWidth="5" strokeLinecap="round" />
              <circle cx="150" cy="56" r="13" fill="url(#gG)" />
              <circle cx="32" cy="94" r="10" fill="url(#gG)" />
              <circle cx="159" cy="107" r="7.5" fill="url(#gG)" />
            </svg>
          </div>

          <div className="wordmark" style={{ marginTop: 20 }}>
            <h1>TWQEET</h1>
            <p>Global Gold Intelligence</p>
          </div>

          <div className="tagline">
            منصة الذهب الذكية للمنطقة العربية<br />
            <strong>تحليل حي • توصيات ذكية • أسعار فورية</strong>
          </div>

          <div className="price-box">
            <div>
              <div className="pb-label">XAU / USD الآن</div>
              <div className="pb-price">{spot ? '$' + fmt(spot) : 'جارٍ...'}</div>
              <div className="pb-live">بيانات حية</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className={`pb-chg ${isUp ? 'up' : 'dn'}`}>
                {isUp ? '▲ +' : '▼ '}{pct.toFixed(2)}%
              </div>
              <div style={{ fontSize: 9, color: '#555', marginTop: 3 }}>{provider}</div>
            </div>
          </div>

          <button className="btn-pri" onClick={() => setScreen('app')}>ابدأ الآن</button>
          <button className="btn-sec" onClick={() => setScreen('app')}>تسجيل الدخول</button>
          <div style={{ fontSize: 10, color: '#555', textAlign: 'center', lineHeight: 1.7 }}>
            بالمتابعة أنت توافق على <span style={{ color: '#D4AF37' }}>شروط الاستخدام</span> و<span style={{ color: '#D4AF37' }}>سياسة الخصوصية</span>
          </div>
          <div className="wadi">WADI1975</div>
        </div>
      </div>

      {/* APP */}
      <div className={`screen ${screen === 'app' ? 'active' : ''}`} style={{ background: '#090909' }}>
        <div className="top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="30" height="30" viewBox="0 0 200 200" fill="none">
              <defs><linearGradient id="gG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F5D76E" /><stop offset="100%" stopColor="#9A7B10" /></linearGradient></defs>
              <circle cx="100" cy="100" r="82" stroke="url(#gG2)" strokeWidth="10" fill="none" />
              <circle cx="100" cy="100" r="54" stroke="url(#gG2)" strokeWidth="8" fill="none" />
              <circle cx="100" cy="100" r="27" stroke="url(#gG2)" strokeWidth="7" fill="none" />
              <circle cx="100" cy="100" r="12" fill="url(#gG2)" />
              <line x1="100" y1="18" x2="100" y2="157" stroke="url(#gG2)" strokeWidth="8" strokeLinecap="round" />
              <line x1="77" y1="38" x2="123" y2="38" stroke="url(#gG2)" strokeWidth="7" strokeLinecap="round" />
              <line x1="70" y1="157" x2="130" y2="157" stroke="url(#gG2)" strokeWidth="7" strokeLinecap="round" />
              <circle cx="150" cy="56" r="13" fill="url(#gG2)" />
              <circle cx="32" cy="94" r="10" fill="url(#gG2)" />
              <circle cx="159" cy="107" r="7.5" fill="url(#gG2)" />
            </svg>
            <span className="tn-nm">TWQEET</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="tn-live">مباشر</div>
            <span style={{ fontSize: 10, color: '#555' }}>{clock}</span>
          </div>
        </div>

        <div className="ticker">
          <div className="ticker-inner">
            {[...buildTickerItems(), ...buildTickerItems()].map((d, i) => (
              <span key={i} className="ti">
                <span className="s">{d.s}</span>
                <span>{d.v}</span>
                <span className={d.up ? 'up' : 'dn'}>{d.c}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="scroll-area">
          {activePage === 'dashboard' && (
            <div>
              <div className="live-card">
                <div className="lc-label">XAU / USD — سعر الذهب الفوري</div>
                <div className={`lc-price ${isUp ? 'up' : 'dn'}`}>{spot ? '$' + fmt(spot) : 'جارٍ التحميل...'}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <div className={`lc-chg ${isUp ? 'up' : 'dn'}`}>{isUp ? '▲' : '▼'} {isUp ? '+' : ''}{change.toFixed(2)} ({isUp ? '+' : ''}{pct.toFixed(2)}%)</div>
                  <div className="lc-meta"><div>مصدر: {provider}</div><div>تحديث: {upTime?.toLocaleTimeString('ar')}</div></div>
                </div>
              </div>

              <div className="gauge-card">
                <svg width="108" height="108" viewBox="0 0 110 110">
                  <path d="M8 90 A52 52 0 0 1 102 90" fill="none" stroke="#1e1e1e" strokeWidth="10" strokeLinecap="round" />
                  <path d="M8 90 A52 52 0 0 1 102 90" fill="none" stroke="#00C853" strokeWidth="10" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="34" />
                  <line x1="55" y1="90" x2="55" y2="44" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" transform="rotate(60,55,90)" />
                  <circle cx="55" cy="90" r="4" fill="#D4AF37" />
                </svg>
                <div>
                  <div style={{ fontSize: 9, color: '#555', letterSpacing: 1, marginBottom: 4 }}>مقياس TWQEET</div>
                  <div className="gc-score">87</div>
                  <div style={{ fontSize: 10, color: '#AAA', marginTop: 2 }}>نقطة من 100</div>
                  <div className="gc-sig">شراء قوي</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <div><div style={{ fontSize: 12, fontWeight: 600, color: '#D4AF37' }}>91%</div><div style={{ fontSize: 9, color: '#555' }}>الثقة</div></div>
                    <div><div style={{ fontSize: 12, fontWeight: 600, color: '#D4AF37' }}>صاعد</div><div style={{ fontSize: 9, color: '#555' }}>الاتجاه</div></div>
                  </div>
                </div>
              </div>

              <div className="g2">
                <div className="stat-c"><div className="sl">DXY الدولار</div><div className="sv">97.2</div><div className="sc dn">▼ -0.8%</div></div>
                <div className="stat-c"><div className="sl">CPI التضخم</div><div className="sv">3.1%</div><div className="sc up">▲ +0.2%</div></div>
                <div className="stat-c"><div className="sl">نفط برنت</div><div className="sv">$82.50</div><div className="sc up">▲ +3.1%</div></div>
                <div className="stat-c"><div className="sl">VIX التقلب</div><div className="sv">18.4</div><div className="sc up">▲ +8.9%</div></div>
              </div>

              <div className="kwd-card">
                <div className="kwd-title">الكويت — دينار كويتي / غرام (حي)</div>
                <div className="kwd-row"><span className="kwd-k">24 قيراط</span><span className="kwd-v">{spot ? (g24 * fx.current.KWD).toFixed(3) + ' KD' : '—'}</span></div>
                <div className="kwd-row"><span className="kwd-k">22 قيراط</span><span className="kwd-v">{spot ? (g24 * 22 / 24 * fx.current.KWD).toFixed(3) + ' KD' : '—'}</span></div>
                <div className="kwd-row"><span className="kwd-k">21 قيراط</span><span className="kwd-v">{spot ? (g24 * 21 / 24 * fx.current.KWD).toFixed(3) + ' KD' : '—'}</span></div>
                <div className="kwd-row"><span className="kwd-k">18 قيراط</span><span className="kwd-v">{spot ? (g24 * 18 / 24 * fx.current.KWD).toFixed(3) + ' KD' : '—'}</span></div>
              </div>

              <div className="ai-card">
                <div className="ai-head">
                  <div><div className="ai-title">تحليل الذكاء الاصطناعي</div><div style={{ fontSize: 9, color: '#555', marginTop: 2 }}>يعتمد على السعر الحي</div></div>
                  <button className="ai-run" onClick={runAI} disabled={aiLoading}>{aiLoading ? '⏳' : 'تحليل الآن'}</button>
                </div>
                <div className="ai-body">
                  {aiResult ? (
                    <div>
                      <div className={`tl-sig ${aiBadge === 'buy' ? 'b-buy' : aiBadge === 'sell' ? 'b-sell' : 'b-hold'}`}>
                        {aiBadge === 'buy' ? '🟢 شراء قوي' : aiBadge === 'sell' ? '🔴 بيع' : '🟡 انتظار'}
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 2, color: '#F5F5F5', marginTop: 8, whiteSpace: 'pre-wrap' }}>{aiResult}</div>
                    </div>
                  ) : (
                    <div className="ai-ph">اضغط <strong style={{ color: '#D4AF37' }}>تحليل الآن</strong> للحصول على توصية ذكية فورية</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activePage === 'prices' && (
            <div>
              <div style={{ marginBottom: 11 }}>
                <div style={{ fontSize: 9, color: '#555' }}>أسعار غرامات الذهب — بيانات حية</div>
                <div style={{ fontSize: 19, fontWeight: 700, color: '#D4AF37' }}>{spot ? '$' + fmt(spot) + ' / أوقية' : '—'}</div>
                <div style={{ fontSize: 10, color: isUp ? '#00C853' : '#FF3D3D' }}>{isUp ? '▲' : '▼'} {isUp ? '+' : ''}{pct.toFixed(2)}% — ${g24.toFixed(3)}/غ 24ق</div>
                <div style={{ fontSize: 9, color: '#555', marginTop: 2 }}>أسعار الصرف: ExchangeRate-API (حي)</div>
              </div>
              <div className="cf-row">
                {['all', 'gulf', 'levant', 'other'].map(g => (
                  <button key={g} className={`cf-btn ${cfFilter === g ? 'active' : ''}`} onClick={() => setCfFilter(g)}>
                    {g === 'all' ? 'الكل' : g === 'gulf' ? 'الخليج' : g === 'levant' ? 'الشام' : 'مصر والعراق'}
                  </button>
                ))}
              </div>
              {(cfFilter === 'all' ? CURRS : CURRS.filter(c => c.group === cfFilter)).map(c => (
                <div key={c.id} className="cc">
                  <div className="cc-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontSize: '1.3rem' }}>{c.flag}</span>
                      <div>
                        <div className="cc-nm">{c.name}</div>
                        <div style={{ fontSize: 9, color: '#555' }}>{c.sym}</div>
                      </div>
                    </div>
                    <div className="cc-rate">1$={(fx.current[c.sym] || 1).toLocaleString('en')} {c.sym}</div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="gram-tbl">
                      <thead>
                        <tr>
                          <th>العيار</th>
                          {GRAMS.map(g => <th key={g}>{g}غ</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {KAR.map(k => (
                          <tr key={k.k}>
                            <td>{k.k}ق</td>
                            {GRAMS.map(g => (
                              <td key={g} className={k.c}>{spot ? fmtP(g24 * (fx.current[c.sym] || 1) * k.m * g) : '—'}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === 'analysis' && (
            <div>
              <div className="sec">العوامل المؤثرة في الذهب</div>
              {FACTORS.map((f, i) => (
                <div key={i} className="fc">
                  <div className="fc-head">
                    <div className="fc-nm">{f.nm}</div>
                    <div className={`fc-imp ${f.ic}`}>{f.imp}</div>
                  </div>
                  <div className="fc-val">{f.val}</div>
                  <div className="fc-sub">السابق: {f.pr} | {f.note}</div>
                  <div className="fc-bar"><div className="fc-fill" style={{ width: `${f.sc}%`, background: f.ic === 'ip' ? '#00C853' : '#FFC107' }} /></div>
                </div>
              ))}
              <div className="sec" style={{ marginTop: 16 }}>Heat Map — خريطة الحرارة</div>
              <div className="hm-grid">
                {HM.map((h, i) => {
                  const opacity = (h.sc / 100) * 0.8 + 0.1;
                  return (
                    <div key={i} className="hm-cell" style={{ background: `${h.bg}${opacity.toFixed(2)})` }}>
                      <div className="hm-nm" style={{ color: h.sc > 55 ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,.85)' }}>{h.nm}</div>
                      <div className="hm-val" style={{ color: h.sc > 55 ? '#000' : '#fff' }}>{h.val}</div>
                      <div className="hm-sc" style={{ color: h.sc > 55 ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.6)' }}>{h.sc}pts</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activePage === 'timeline' && (
            <div>
              <div className="cf-row">
                {['today', 'week', 'month', 'history'].map(f => (
                  <button key={f} className={`cf-btn ${tlFilter === f ? 'active' : ''}`} onClick={() => setTlFilter(f)}>
                    {f === 'today' ? 'اليوم' : f === 'week' ? 'الأسبوع' : f === 'month' ? 'الشهر' : 'السجل'}
                  </button>
                ))}
              </div>
              {(TL_DATA[tlFilter] || []).map((it, i) => (
                <div key={i} className="tl-item">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="tl-dot" style={{ background: it.dot }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="tl-time">{it.time}</div>
                    <div className="tl-title">{it.title}</div>
                    <div className="tl-desc">{it.desc}</div>
                    <span className={`tl-sig ${it.sig === 'buy' ? 'b-buy' : it.sig === 'sell' ? 'b-sell' : 'b-hold'}`}>
                      {it.sig === 'buy' ? 'شراء' : it.sig === 'sell' ? 'بيع' : 'انتظار'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === 'market' && (
            <div>
              <div className="sec">المعادن النفيسة</div>
              {[
                { sym: 'XAU/USD', nm: 'ذهب', v: spot ? '$' + fmt(spot) : '—', c: Math.abs(pct).toFixed(2) + '%', up: pct >= 0 },
                { sym: 'XAG/USD', nm: 'فضة', v: '28.40', c: '+0.85%', up: true },
                { sym: 'XPT', nm: 'بلاتين', v: '1,042', c: '+0.6%', up: true },
                { sym: 'XPD', nm: 'بالاديوم', v: '986', c: '-0.4%', up: false },
              ].map((d, i) => (
                <div key={i} className="mkt-row">
                  <div><div className="mr-sym">{d.sym}</div><div className="mr-name">{d.nm}</div></div>
                  <div><div className={`mr-val ${d.up ? 'up' : 'dn'}`}>{d.v}</div><div className={`mr-chg ${d.up ? 'up' : 'dn'}`}>{d.up ? '▲' : '▼'} {d.c}</div></div>
                </div>
              ))}

              <div className="sec">التنبيهات</div>
              {alData.map((a, i) => (
                <div key={i} className="al-item">
                  <div><div className="al-nm">{a.nm}</div><div className="al-cond">{a.cond}</div></div>
                  <div className={`al-st ${a.sc}`}>{a.st}</div>
                </div>
              ))}
              <button className="add-al" onClick={() => {
                const p = prompt('السعر المستهدف ($):');
                if (p) setAlData([...alData, { nm: 'تنبيه مخصص', cond: `XAU > $${p}`, st: 'نشط', sc: 'st-on' }]);
              }}>+ إضافة تنبيه</button>

              <div className="sec">الإشعارات</div>
              {[
                { t: 'الذهب تجاوز $4,150', m: 'منذ 12 دقيقة', u: true },
                { t: 'مؤشر TWQEET 87 نقطة', m: 'منذ ساعة', u: true },
                { t: 'CPI صدر: 3.1%', m: 'منذ 6 ساعات', u: false },
              ].map((n, i) => (
                <div key={i} className={`ni ${n.u ? 'unread' : ''}`}>
                  {n.u && <div className="ni-dot" />}
                  <div><div className="ni-t">{n.t}</div><div className="ni-m">{n.m}</div></div>
                </div>
              ))}
            </div>
          )}

          {activePage === 'settings' && (
            <div>
              <div className="sec">الاشتراك</div>
              <div className="sub-card feat">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                  <div><div className="sub-nm">Investor</div><div style={{ fontSize: 9, color: '#D4AF37', marginTop: 2 }}>الأكثر شيوعاً</div></div>
                  <div className="sub-price">9.99 <span>KD/شهر</span></div>
                </div>
                <div className="sub-feats">
                  <div className="sf">أسعار عملات المنطقة الحية</div>
                  <div className="sf">5 تنبيهات</div>
                  <div className="sf">تحليل AI يومي</div>
                  <div className="sf no">Heat Map احترافية</div>
                </div>
                <button className="sub-btn pri">اشترك الآن</button>
              </div>
              <div className="sub-card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                  <div className="sub-nm">Pro Trader</div>
                  <div className="sub-price">24.99 <span>KD/شهر</span></div>
                </div>
                <div className="sub-feats">
                  <div className="sf">كل مزايا Investor</div>
                  <div className="sf">تنبيهات غير محدودة</div>
                  <div className="sf">تحليل AI غير محدود</div>
                  <div className="sf">Heat Map + Score</div>
                </div>
                <button className="sub-btn out">ترقية</button>
              </div>
              <div className="sec">الإعدادات</div>
              <div className="set-row"><div><div className="sr-lbl">العملة</div><div className="sr-sub">عملة عرض الأسعار</div></div><div><select><option>KWD</option><option>SAR</option><option>AED</option><option>USD</option></select></div></div>
              <div className="set-row"><div><div className="sr-lbl">اللغة</div></div><div><select><option>العربية</option><option>English</option></select></div></div>
              <div className="set-row"><div><div className="sr-lbl">البلد</div></div><div><select><option>الكويت</option><option>السعودية</option><option>الإمارات</option><option>مصر</option><option>العراق</option></select></div></div>
              <div style={{ textAlign: 'center', marginTop: 22, paddingBottom: 8 }}>
                <div style={{ fontSize: 10, color: '#555', lineHeight: 1.7 }}>بالمتابعة أنت توافق على <span style={{ color: '#D4AF37' }}>شروط الاستخدام</span></div>
                <div style={{ fontSize: 11, color: 'rgba(212,175,55,0.4)', marginTop: 10, letterSpacing: 2, fontWeight: 600 }}>WADI1975</div>
                <div style={{ fontSize: 9, color: '#555', marginTop: 6 }}>TWQEET v6.0 • Global Gold Intelligence Platform</div>
              </div>
            </div>
          )}
        </div>

        <div className="bottom-nav">
          {[
            { id: 'dashboard', label: 'الرئيسية', icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg> },
            { id: 'prices', label: 'الأسعار', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
            { id: 'analysis', label: 'التحليل', icon: <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
            { id: 'timeline', label: 'التايملاين', icon: <svg viewBox="0 0 24 24"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></svg> },
            { id: 'market', label: 'السوق', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg> },
            { id: 'settings', label: 'الإعدادات', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
          ].map(b => (
            <button key={b.id} className={`bn ${activePage === b.id ? 'active' : ''}`} onClick={() => setActivePage(b.id)}>
              {b.icon}
              <span>{b.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  function buildTickerItems() {
    const p = spot || 4150;
    return [
      { s: 'XAU/USD', v: '$' + p.toFixed(2), c: (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%', up: pct >= 0 },
      { s: 'XAG/USD', v: '28.40', c: '+0.85%', up: true },
      { s: 'DXY', v: '97.2', c: '-0.8%', up: false },
      { s: 'BRENT', v: '82.50', c: '+3.1%', up: true },
      { s: 'VIX', v: '18.4', c: '+8.9%', up: true },
      { s: 'USD/KWD', v: fx.current.KWD.toFixed(4), c: '+0.01%', up: true },
      { s: 'USD/SAR', v: fx.current.SAR.toFixed(4), c: '0.0%', up: true },
      { s: 'USD/EGP', v: fx.current.EGP.toFixed(2), c: '+0.2%', up: true },
    ];
  }

  async function runAI() {
    if (!spot) return;
    setAiLoading(true);
    setAiResult('');
    setAiBadge('');

    const sup = '$' + (spot * 0.965).toFixed(0);
    const res = '$' + (spot * 1.025).toFixed(0);
    const txt = `التوصية: شراء قوي — $${spot.toFixed(2)} يحظى بدعم من ضعف الدولار (DXY 97.2) وتدفقات ETF الإيجابية ومؤشر TWQEET 87/100.\n\nأهم عاملين: (1) انخفاض DXY يرفع جاذبية الذهب، (2) شراء البنوك المركزية +45 طن دعم هيكلي.\n\nالدعم: ${sup} | المقاومة: ${res}\n\nالمخاطر: بيانات توظيف قوية أو تصريحات فيدرالية متشددة.`;

    setTimeout(() => {
      setAiResult(txt);
      setAiBadge('buy');
      setAnCount(anCount + 1);
      setAiLoading(false);
    }, 2000);
  }
}
