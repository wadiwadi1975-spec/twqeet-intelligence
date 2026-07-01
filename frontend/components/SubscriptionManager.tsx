import React, { useState } from 'react';
import { useLang } from '../contexts/LangContext';

interface Subscription {
  plan: string;
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  invoicesUsed: number;
  invoicesLimit: number;
  branchesUsed: number;
  branchesLimit: number;
  usersUsed: number;
  usersLimit: number;
}

export default function SubscriptionManager() {
  const { lang } = useLang();
  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'professional',
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2027-01-01',
    invoicesUsed: 2847,
    invoicesLimit: 5000,
    branchesUsed: 3,
    branchesLimit: 5,
    usersUsed: 7,
    usersLimit: 10,
  });

  const planNames: Record<string, { ar: string; en: string; color: string }> = {
    starter: { ar: 'الأساسي', en: 'Starter', color: '#6B7DB3' },
    professional: { ar: 'الاحترافي', en: 'Professional', color: '#D4AF37' },
    enterprise: { ar: 'المؤسسات', en: 'Enterprise', color: '#22C55E' },
  };

  const statusLabels: Record<string, { ar: string; en: string; color: string }> = {
    active: { ar: 'نشط', en: 'Active', color: '#22C55E' },
    trial: { ar: 'تجريبي', en: 'Trial', color: '#EAB308' },
    expired: { ar: 'منتهي', en: 'Expired', color: '#EF4444' },
    cancelled: { ar: 'ملغي', en: 'Cancelled', color: '#6B7DB3' },
  };

  const plan = planNames[subscription.plan];
  const status = statusLabels[subscription.status];

  const getUsagePercent = (used: number, limit: number) => {
    return Math.min(100, Math.round((used / limit) * 100));
  };

  const getUsageColor = (percent: number) => {
    if (percent >= 90) return '#EF4444';
    if (percent >= 70) return '#EAB308';
    return '#22C55E';
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="card" style={{ border: `2px solid ${plan.color}` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'ar' ? 'الباقة الحالية' : 'Current Plan'}
            </h3>
            <p className="text-sm text-gray-400">
              {lang === 'ar' ? 'منذ' : 'Since'} {subscription.startDate}
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{ backgroundColor: `${status.color}20`, color: status.color }}
          >
            {lang === 'ar' ? status.ar : status.en}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold" style={{ color: plan.color }}>
            {lang === 'ar' ? plan.ar : plan.en}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <span>{lang === 'ar' ? 'تاريخ البداية' : 'Start Date'}</span>
            <p className="text-white">{subscription.startDate}</p>
          </div>
          <div>
            <span>{lang === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</span>
            <p className="text-white">{subscription.endDate}</p>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">
          {lang === 'ar' ? 'الاستهلاك' : 'Usage'}
        </h3>

        <div className="space-y-4">
          {/* Invoices */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">
                {lang === 'ar' ? 'الفواتير' : 'Invoices'}
              </span>
              <span className="text-sm text-white">
                {subscription.invoicesUsed.toLocaleString()} / {subscription.invoicesLimit.toLocaleString()}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${getUsagePercent(subscription.invoicesUsed, subscription.invoicesLimit)}%`,
                  backgroundColor: getUsageColor(getUsagePercent(subscription.invoicesUsed, subscription.invoicesLimit)),
                }}
              />
            </div>
          </div>

          {/* Branches */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">
                {lang === 'ar' ? 'الفروع' : 'Branches'}
              </span>
              <span className="text-sm text-white">
                {subscription.branchesUsed} / {subscription.branchesLimit}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${getUsagePercent(subscription.branchesUsed, subscription.branchesLimit)}%`,
                  backgroundColor: getUsageColor(getUsagePercent(subscription.branchesUsed, subscription.branchesLimit)),
                }}
              />
            </div>
          </div>

          {/* Users */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">
                {lang === 'ar' ? 'المستخدمين' : 'Users'}
              </span>
              <span className="text-sm text-white">
                {subscription.usersUsed} / {subscription.usersLimit}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${getUsagePercent(subscription.usersUsed, subscription.usersLimit)}%`,
                  backgroundColor: getUsageColor(getUsagePercent(subscription.usersUsed, subscription.usersLimit)),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 btn-gold py-3">
          {lang === 'ar' ? 'ترقية الباقة' : 'Upgrade Plan'}
        </button>
        <button className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all">
          {lang === 'ar' ? 'الفواتير' : 'Invoices'}
        </button>
      </div>
    </div>
  );
}
