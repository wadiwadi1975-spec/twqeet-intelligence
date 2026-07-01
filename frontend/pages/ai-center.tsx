import React, { useState, useEffect } from 'react';

export default function AICenterPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, message: string, confidence?: number}[]>([]);
  const [brief, setBrief] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [market, setMarket] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/ai/brief?companyId=1').then(r => r.json()).then(setBrief);
    fetch('http://localhost:4000/ai/forecast?companyId=1').then(r => r.json()).then(d => setForecast(d.value || d.forecasts || []));
    fetch('http://localhost:4000/ai/market?companyId=1').then(r => r.json()).then(setMarket);
    fetch('http://localhost:4000/ai/insights?companyId=1').then(r => r.json()).then(d => setRecommendations(d.recommendations || []));
  }, []);

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    const q = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', message: q }]);
    setChatMessage('');
    try {
      const res = await fetch(`http://localhost:4000/ai/chat?companyId=1&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'ai', message: data.answer, confidence: data.confidence }]);
    } catch {
      setChatHistory(prev => [...prev, { role: 'ai', message: 'حدث خطأ في الاتصال', confidence: 0 }]);
    }
  };

  const suggestedQuestions = [
    'كيف حال المبيعات؟',
    'ما هو هامش الربح؟',
    'كيف حال المخزون؟',
    'أفضل فرع أداءً؟',
    'أفضل موظف؟',
    'ما هي أفضل فئة؟',
    'give me توصيات',
    'التنبيهات المهمة',
  ];

  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: '💬' },
    { id: 'brief', label: 'Executive Brief', icon: '📋' },
    { id: 'forecast', label: 'Forecast', icon: '📈' },
    { id: 'market', label: 'Market', icon: '🌍' },
    { id: 'recommendations', label: 'Recommendations', icon: '💡' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">مركز الذكاء الاصطناعي</h1>
        <p className="text-gold mt-1">تحليلات ذكية وتوقعات وتوصيات</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-gold text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* AI Chat */}
      {activeTab === 'chat' && (
        <div className="card">
          <h3 className="text-gold font-bold mb-4">AI Chat - اسأل الذكاء الاصطناعي</h3>
          <div className="h-96 overflow-y-auto p-4 rounded-xl mb-4" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p className="text-lg mb-2">مرحباً! أنا مساعدك الذكي 🤖</p>
                <p className="text-sm mb-6">اسألني عن أي شيء في متجرك</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedQuestions.map((sq, i) => (
                    <button key={i} onClick={() => { setChatMessage(sq); }}
                      className="px-3 py-1.5 rounded-lg text-xs text-gold border border-gold/30 hover:bg-gold/10 transition-all">
                      {sq}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-xl text-sm whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-white'
                }`}>
                  <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>{msg.message}</p>
                  {msg.confidence !== undefined && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <div className="w-16 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                        <div className="h-full rounded-full" style={{ 
                          width: `${msg.confidence}%`, 
                          backgroundColor: msg.confidence > 85 ? '#22C55E' : msg.confidence > 70 ? '#EAB308' : '#EF4444' 
                        }} />
                      </div>
                      <span className="text-[10px] opacity-50">الثقة: {msg.confidence}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              className="flex-1" placeholder="اكتب سؤالك هنا..." />
            <button onClick={handleChat} className="btn-gold px-6">إرسال</button>
          </div>
        </div>
      )}

      {/* Executive Brief */}
      {activeTab === 'brief' && brief && (
        <div className="card">
          <h3 className="text-gold font-bold mb-4">التقرير التنفيذي الصباحي</h3>
          <div className="p-6 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
            <p className="text-white text-lg mb-4">{brief.greeting}، {brief.date}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(34,197,94,0.08)' }}>
                <p className="text-gray-400 text-xs">مبيعات الأمس</p>
                <p className="text-white font-bold">{brief.salesToday?.toLocaleString()} د.ك</p>
                <p className="text-green-400 text-xs">{brief.salesGrowth}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.08)' }}>
                <p className="text-gray-400 text-xs">الأرباح</p>
                <p className="text-white font-bold">{brief.profitToday?.toLocaleString()} د.ك</p>
                <p className="text-red-400 text-xs">{brief.profitChange}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(212,175,55,0.08)' }}>
                <p className="text-gray-400 text-xs">أفضل فرع</p>
                <p className="text-white font-bold">{brief.topBranch}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.08)' }}>
                <p className="text-gray-400 text-xs">يحتاج متابعة</p>
                <p className="text-white font-bold">{brief.worstBranch}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white text-sm">💡 <strong>أفضل فئة:</strong> {brief.topCategory}</p>
              <p className="text-white text-sm">⚠️ <strong>مخزون راكد:</strong> {brief.deadStockCount} قطعة</p>
              <p className="text-gray-300 text-sm">{brief.keyInsight}</p>
              <p className="text-gold text-sm font-semibold">📌 {brief.topRecommendation}</p>
              <p className="text-gray-500 text-sm">🌍 {brief.marketImpact}</p>
            </div>
          </div>
        </div>
      )}

      {/* Forecast */}
      {activeTab === 'forecast' && (
        <div className="card">
          <h3 className="text-gold font-bold mb-4">توقعات الذكاء الاصطناعي</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {forecast.map((f) => (
              <div key={f._id} className="p-4 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{f.period}</span>
                  <span className="badge" style={{
                    backgroundColor: f.confidence > 85 ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                    color: f.confidence > 85 ? '#22C55E' : '#EAB308'
                  }}>الثقة: {f.confidence}%</span>
                </div>
                <p className="text-white text-xl font-bold">{f.predictedValue?.toLocaleString()} {f.type === 'category' ? '' : 'د.ك'}</p>
                {f.category && <p className="text-gold text-sm">{f.category}</p>}
                {f.predictedGrowth && <p className="text-sm" style={{ color: f.trend === 'up' ? '#22C55E' : '#EF4444' }}>{f.predictedGrowth}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Intelligence */}
      {activeTab === 'market' && market && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-gold font-bold mb-4">ذكاء السوق</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                <p className="text-gray-400 text-xs">سعر الذهب العالمي</p>
                <p className="text-white text-xl font-bold">${market.goldPrice?.usd}</p>
                <p className="text-sm" style={{ color: market.goldPrice?.change > 0 ? '#22C55E' : '#EF4444' }}>
                  {market.goldPrice?.change > 0 ? '+' : ''}{market.goldPrice?.changePercent}%
                </p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                <p className="text-gray-400 text-xs">سعر الدولار</p>
                <p className="text-white text-xl font-bold">{market.dollarRate}</p>
              </div>
              {Object.entries(market.localPrices || {}).map(([karat, price]) => (
                <div key={karat} className="p-4 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                  <p className="text-gray-400 text-xs">عيار {karat}</p>
                  <p className="text-white text-xl font-bold">{String(price)} د.ك/جرام</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="text-gold font-bold mb-3">الأخبار الاقتصادية المؤثرة</h3>
            <div className="space-y-2">
              {market.news?.map((n: any, i: number) => (
                <div key={i} className="p-3 rounded-xl flex items-start gap-3" style={{ backgroundColor: '#0d1628' }}>
                  <span className="text-lg">{n.impact === 'positive' ? '✅' : n.impact === 'negative' ? '❌' : '⚠️'}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{n.title}</p>
                    <p className="text-gray-400 text-xs">{n.effect}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <h3 className="text-gold font-bold">التوصيات الذكية</h3>
          {recommendations.map((rec) => (
            <div key={rec._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge" style={{
                      backgroundColor: rec.priority === 'High' ? 'rgba(239,68,68,0.15)' : rec.priority === 'Medium' ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)',
                      color: rec.priority === 'High' ? '#EF4444' : rec.priority === 'Medium' ? '#EAB308' : '#22C55E'
                    }}>{rec.priority}</span>
                    <span className="text-gray-500 text-[10px]">{rec.impact}</span>
                  </div>
                  <h4 className="text-white font-semibold">{rec.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{rec.description}</p>
                </div>
                <div className="text-left">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                    {rec.confidence}%
                  </div>
                  <p className="text-gray-500 text-[10px] mt-1">الثقة</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
