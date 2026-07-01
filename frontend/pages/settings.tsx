import React, { useState } from 'react';

export default function SettingsPage() {
  const [alertThreshold, setAlertThreshold] = useState(15);
  const [role, setRole] = useState('Manager');
  const [companyName, setCompanyName] = useState('مجوهرات الخليج');
  const [currency, setCurrency] = useState('KWD');
  const [language, setLanguage] = useState('ar');
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز الإعدادات</h1>

      {/* إعدادات الشركة */}
      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">معلومات الشركة</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gold">اسم الشركة:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 text-black mt-1"
            />
          </div>
          <div>
            <label className="text-gold">العملة:</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 text-black mt-1">
              <option value="KWD">دينار كويتي</option>
              <option value="SAR">ريال سعودي</option>
              <option value="AED">درهم إماراتي</option>
              <option value="BHD">دينار بحريني</option>
              <option value="QAR">ريال قطري</option>
              <option value="OMR">ريال عماني</option>
            </select>
          </div>
        </div>
      </div>

      {/* إعدادات المستخدمين */}
      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">إدارة المستخدمين</h2>
        <label className="text-gold">الدور الافتراضي:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="ml-2 p-2 text-black">
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Owner">Owner</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      {/* إعدادات التنبيهات */}
      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">إعدادات التنبيهات</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gold">العتبة لانخفاض المبيعات (%):</label>
            <input
              type="number"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="w-full p-2 text-black mt-1"
            />
          </div>
          <div>
            <label className="text-gold">تنبيه المخزون المنخفض:</label>
            <input type="number" defaultValue={10} className="w-full p-2 text-black mt-1" />
          </div>
        </div>
      </div>

      {/* إعدادات الإشعارات */}
      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">إعدادات الإشعارات</h2>
        <div className="space-y-3">
          <label className="flex items-center text-gold">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="mr-2"
            />
            إشعارات البريد الإلكتروني
          </label>
          <label className="flex items-center text-gold">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="mr-2"
            />
            إشعارات الرسائل القصيرة
          </label>
        </div>
      </div>

      {/* إعدادات الواجهة */}
      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">إعدادات الواجهة</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gold">اللغة:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 text-black mt-1">
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="text-gold">الوضع:</label>
            <select value={darkMode ? 'dark' : 'light'} onChange={(e) => setDarkMode(e.target.value === 'dark')} className="w-full p-2 text-black mt-1">
              <option value="dark">داكن</option>
              <option value="light">فاتح</option>
            </select>
          </div>
        </div>
      </div>

      {/* إعدادات التقارير */}
      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">إعدادات التقارير</h2>
        <p className="text-gold mb-2">الصيغ المسموح بها للتصدير:</p>
        <div className="space-y-2">
          <label className="flex items-center text-gold">
            <input type="checkbox" defaultChecked className="mr-2" />
            PDF
          </label>
          <label className="flex items-center text-gold">
            <input type="checkbox" defaultChecked className="mr-2" />
            Excel
          </label>
          <label className="flex items-center text-gold">
            <input type="checkbox" defaultChecked className="mr-2" />
            CSV
          </label>
        </div>
      </div>

      {/* زر الحفظ */}
      <button className="bg-gold text-black px-6 py-2 rounded font-bold">
        حفظ الإعدادات
      </button>
    </div>
  );
}
