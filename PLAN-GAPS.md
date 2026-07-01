# خطة سد الفجوات - TWQEET Intelligence

## المرحلة 1: الأساس المفقود

### 1.1 Categories Module (Backend + Frontend)
- **Backend:** categories.controller.ts, categories.service.ts, categories.module.ts
- **Frontend:** categories page مع Category Intelligence
- **الفئات الافتراضية:** الأساور، الخواتم، الحلقات، الأطقم، السلاسل، السبائك، الليرات، الذهب المستعمل، الألماس
- **APIs:** CRUD + GET /categories/intelligence (Opportunity Score, Best Seller, Highest Margin, Fastest Growing, Slowest Moving)

### 1.2 Employees Module (Backend + Frontend)
- **Backend:** employees.controller.ts, employees.service.ts, employees.module.ts
- **Frontend:** employees page مع Employee Intelligence
- **APIs:** CRUD + GET /employees/leaderboard, /employees/:id/performance
- **KPIs:** عدد الفواتير، قيمة المبيعات، متوسط الفاتورة، الربح، نسبة تحقيق الهدف

### 1.3 SaleItems Collection
- **Model:** saleId, productId, categoryId, quantity, weight, price
- **Purpose:** تحليل الفئات بدقة

### 1.4 Inventory Transfer
- **API:** POST /inventory/transfer (between branches)
- **API:** POST /inventory/adjust

### 1.5 Inventory Age Classification
- **تصنيف:** 0-30 يوم، 30-90، 90-180، 180-365، +365
- **تصنيف الحركة:** Fast Moving, Medium Moving, Slow Moving, Dead Stock

---

## المرحلة 2: Dashboard API + Health Score

### 2.1 Dashboard APIs
- GET /dashboard/summary
- GET /dashboard/charts
- GET /dashboard/health
- GET /dashboard/kpis
- GET /dashboard/timeline
- GET /dashboard/recommendations

### 2.2 Health Score Engine
- Weighted calculation: Sales Growth 25%, Profit Growth 25%, Inventory Turnover 20%, Branch Performance 10%, Employee Performance 10%, Customer Satisfaction 5%, Critical Alerts 5%
- Classification: 90-100 Excellent, 75-89 Very Good, 60-74 Good, 40-59 Needs Attention, <40 Critical

### 2.3 KPI Snapshots Collection
- **Fields:** companyId, branchId, date, sales, profit, inventory, healthScore, inventoryTurnover
- **Purpose:** تسريع Dashboard + التحليلات التاريخية

---

## المرحلة 3: AI Intelligence

### 3.1 AI Chat
- **API:** POST /ai/chat
- **Purpose:** محادثة مع النظام بالعربية

### 3.2 AI Executive Brief
- **API:** GET /ai/brief
- **Purpose:** ملخص صباحي للمدير

### 3.3 Smart Alerts AI
- **API:** GET /alerts/smart
- **Purpose:** تنبيهات بتحليل السبب والتوصية

### 3.4 AI Forecast
- **API:** GET /ai/forecast
- **Purpose:** توقعات 7/30/90/365 يوم

### 3.5 Category Intelligence
- **API:** GET /ai/category-intelligence
- **Purpose:** تحليل الفئات + Opportunity Score

### 3.6 AI Recommendations
- **API:** GET /ai/recommendations (تحديث)
- **Purpose:** توصيات ب السبب + التأثير + الأولوية + الثقة

---

## المرحلة 4: Executive Center

### 4.1 Executive Center APIs
- GET /executive/brief
- GET /executive/decisions (أهم 5 قرارات)
- GET /executive/radar (Radar Chart)
- GET /executive/opportunities
- GET /executive/heat-map

### 4.2 Decision Score
- **Formula:** = f(Expected Profit, Risk Level, Execution Cost, Speed, AI Confidence)

### 4.3 Smart Benchmark
- مقارنة: الشهر السابق، السنة السابقة، المتوسط، الهدف السنوي

### 4.4 Monthly Business Review
- تقرير شهري تلقائي: أفضل/أسوأ قرار، أفضل فرع/موظف/فئة، أكبر مشكلة، أهم فرصة

### 4.5 CEO Morning Report
- تقرير صباحي: حالة الشركة، التغيرات، المخاطر، الفرصة، قرار اليوم

---

## المرحلة 5: Pages المفقودة

### 5.1 Categories Intelligence Page (frontend/pages/categories.tsx)
### 5.2 Employee Intelligence Page (frontend/pages/employees.tsx)
### 5.3 Executive Center Page (تحديث frontend/pages/executive-dashboard.tsx)
### 5.4 AI Center Update (تحديث frontend/pages/ai-center.tsx)

---

## المرحلة 6: UI/UX Enhancements

### 6.1 Global Search Component
### 6.2 Notifications Center
### 6.3 Smart Filters
### 6.4 Branch Selector
### 6.5 Executive Cockpit Mode

---

## المرحلة 7: Market Intelligence

### 7.1 Gold Market API
- سعر الذهب العالمي (XAU/USD)
- أسعار العيارات المحلية
- سعر الدولار
### 7.2 Market Intelligence Page
### 7.3 Market Impact Analysis

---

## تحديث الملفات الحالية

### Files to Update:
- `backend/src/app.module.ts` - إضافة CategoriesModule, EmployeesModule
- `backend/src/mock/mock.service.ts` - بيانات فئات + موظفين + بنود فواتير
- `frontend/components/Sidebar.tsx` - إضافة الفئات + الموظفين + التنبؤات
- `frontend/pages/index.tsx` - Dashboard محسّن مع Health Score حقيقي
- `frontend/pages/ai-center.tsx` - AI Chat + Executive Brief + Forecast
- `frontend/pages/alerts.tsx` - Smart Alerts AI
- `frontend/pages/executive-dashboard.tsx` - Executive Center كامل
- `frontend/pages/reports.tsx` - تصدير PDF/Excel/CSV

### Files to Create:
- `backend/src/categories/` (controller, service, module, model)
- `backend/src/employees/` (controller, service, module, model)
- `backend/src/sales/sale-item.model.ts`
- `backend/src/dashboard/` (controller, service, module)
- `backend/src/executive/` (controller, service, module)
- `frontend/pages/categories.tsx`
- `frontend/pages/employees.tsx`
- `frontend/components/HealthScoreCard.tsx`
- `frontend/components/ExecutiveRadar.tsx`
- `frontend/components/AIChat.tsx`
- `frontend/components/NotificationsBell.tsx`
- `frontend/components/GlobalSearch.tsx`
