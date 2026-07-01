import React, { useState } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLang } from '../contexts/LangContext';

const plans = [
  {
    id: 'starter',
    nameAr: 'الأساسي',
    nameEn: 'Starter',
    priceAr: '9',
    priceEn: '9',
    period: '/شهر',
    descriptionAr: 'مثالي للمتاجر الصغيرة',
    descriptionEn: 'Ideal for small stores',
    featuresAr: [
      '500 فاتورة شهرياً',
      'فرع واحد',
      '3 مستخدمين',
      'تقارير أساسية',
      'دعم عبر البريد',
    ],
    featuresEn: [
      '500 invoices/month',
      '1 branch',
      '3 users',
      'Basic reports',
      'Email support',
    ],
    color: '#6B7DB3',
    popular: false,
  },
  {
    id: 'professional',
    nameAr: 'الاحترافي',
    nameEn: 'Professional',
    priceAr: '29',
    priceEn: '29',
    period: '/شهر',
    descriptionAr: 'للمتاجر المتوسطة والكبيرة',
    descriptionEn: 'For medium and large stores',
    featuresAr: [
      '5,000 فاتورة شهرياً',
      '5 فروع',
      '10 مستخدمين',
      'تقارير متقدمة + AI',
      'تحليل المخزون',
      'دعم فني مباشر',
      'API كامل',
    ],
    featuresEn: [
      '5,000 invoices/month',
      '5 branches',
      '10 users',
      'Advanced reports + AI',
      'Inventory analysis',
      'Live support',
      'Full API access',
    ],
    color: '#D4AF37',
    popular: true,
  },
  {
    id: 'enterprise',
    nameAr: 'المؤسسات',
    nameEn: 'Enterprise',
    priceAr: '79',
    priceEn: '79',
    period: '/شهر',
    descriptionAr: 'للشركات الكبيرة والسلسلات',
    descriptionEn: 'For large companies and chains',
    featuresAr: [
      'فواتير غير محدودة',
      'فروع غير محدودة',
      'مستخدمين غير محدودين',
      'ذكاء اصطناعي متقدم',
      'لوحة الإدارة التنفيذية',
      'مدير حساب مخصص',
      'SLA 99.9%',
      'تكامل مع ERP',
    ],
    featuresEn: [
      'Unlimited invoices',
      'Unlimited branches',
      'Unlimited users',
      'Advanced AI',
      'Executive dashboard',
      'Dedicated account manager',
      'SLA 99.9%',
      'ERP integration',
    ],
    color: '#22C55E',
    popular: false,
  },
];

export default function PricingPage() {
  const { t, lang } = useLang();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // In real app, redirect to payment
    alert(lang === 'ar'
      ? `جاري توجيهك للدفع - الباقة: ${plans.find(p => p.id === planId)?.nameAr}`
      : `Redirecting to payment - Plan: ${plans.find(p => p.id === planId)?.nameEn}`
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a1628' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#1c2d4a' }}>
        <div className="flex items-center gap-3">
          <span className="text-gold font-bold text-lg">💎 {lang === 'ar' ? 'تسعير منصتي' : 'MINASATI Pricing'}</span>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            {lang === 'ar' ? 'اختر الباقة المناسبة' : 'Choose Your Plan'}
          </h1>
          <p className="text-gray-400 text-lg">
            {lang === 'ar' ? 'ابدأ مجاناً لمدة 14 يوماً - بدون بطاقة ائتمان' : 'Start free for 14 days - No credit card required'}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={`text-sm ${billing === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
            {lang === 'ar' ? 'شهري' : 'Monthly'}
          </span>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 rounded-full relative transition-all"
            style={{ backgroundColor: billing === 'yearly' ? '#D4AF37' : '#1c2d4a' }}
          >
            <div
              className="w-5 h-5 bg-white rounded-full absolute top-1 transition-all"
              style={{ left: billing === 'yearly' ? '32px' : '4px' }}
            />
          </button>
          <span className={`text-sm ${billing === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
            {lang === 'ar' ? 'سنوي' : 'Yearly'}
            <span className="text-green-400 text-xs mr-2">-20%</span>
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = billing === 'yearly'
              ? Math.round(Number(plan.priceAr) * 12 * 0.8)
              : plan.priceAr;
            const monthlyPrice = billing === 'yearly'
              ? Math.round(Number(plan.priceAr) * 0.8)
              : plan.priceAr;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 transition-all ${
                  plan.popular ? 'scale-105' : ''
                }`}
                style={{
                  backgroundColor: '#111d33',
                  border: `2px solid ${plan.popular ? plan.color : '#1c2d4a'}`,
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black"
                    style={{ backgroundColor: plan.color }}
                  >
                    {lang === 'ar' ? '⭐ الأكثر شعبية' : '⭐ Most Popular'}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'ar' ? plan.nameAr : plan.nameEn}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {lang === 'ar' ? plan.descriptionAr : plan.descriptionEn}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold" style={{ color: plan.color }}>
                      ${monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {lang === 'ar' ? 'د.ك' : 'KWD'}/{lang === 'ar' ? 'شهر' : 'mo'}
                    </span>
                  </div>
                  {billing === 'yearly' && (
                    <p className="text-green-400 text-xs mt-2">
                      {lang === 'ar' ? `$${price} سنوياً` : `$${price} yearly`}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {(lang === 'ar' ? plan.featuresAr : plan.featuresEn).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    backgroundColor: plan.popular ? plan.color : 'transparent',
                    color: plan.popular ? '#0a1628' : plan.color,
                    border: plan.popular ? 'none' : `2px solid ${plan.color}`,
                  }}
                >
                  {lang === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {[
              {
                qAr: 'هل يمكنني تغيير الباقة لاحقاً؟',
                qEn: 'Can I change my plan later?',
                aAr: 'نعم، يمكنك الترقية أو التخفيض في أي وقت. يتم احتساب الفرق.',
                aEn: 'Yes, you can upgrade or downgrade anytime. The difference is calculated.',
              },
              {
                qAr: 'هل توجد فترة تجريبية مجانية؟',
                qEn: 'Is there a free trial?',
                aAr: 'نعم، 14 يوماً مجاناً على جميع الباقات بدون بطاقة ائتمان.',
                aEn: 'Yes, 14 days free on all plans without credit card.',
              },
              {
                qAr: 'كيف يتم الدفع؟',
                qEn: 'How do I pay?',
                aAr: 'نقبل البطاقات الائتمانية، مدى، وتحويل بنكي.',
                aEn: 'We accept credit cards, Mada, and bank transfer.',
              },
              {
                qAr: 'هل يمكنني إلغاء الاشتراك؟',
                qEn: 'Can I cancel my subscription?',
                aAr: 'نعم، يمكنك الإلغاء في أي وقت بدون رسوم إضافية.',
                aEn: 'Yes, you can cancel anytime with no additional fees.',
              },
            ].map((faq, i) => (
              <div key={i} className="card">
                <h4 className="text-white font-semibold mb-2">
                  {lang === 'ar' ? faq.qAr : faq.qEn}
                </h4>
                <p className="text-gray-400 text-sm">
                  {lang === 'ar' ? faq.aAr : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          © 2024 MINASATI - {t.common.rights} wadi-1975
        </div>
      </div>
    </div>
  );
}
