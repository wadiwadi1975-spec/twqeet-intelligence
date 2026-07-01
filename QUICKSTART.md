# TWQEET Intelligence - Quick Start Guide

## الطريقة الأسهل - تشغيل تلقائي

### 1. تثبيت MongoDB (مرة واحدة فقط)
- ادخل على: https://www.mongodb.com/try/download/community
- حمّل MongoDB Community Server
- ثبّته بإعدادات افتراضية

### 2. تشغيل النظام
انقر على ملف `تشغيل-النظام.bat`

### 3. فتح المتصفح
- http://localhost:3000

### 4. تسجيل الدخول
- البريد: `admin@twqeet.com`
- كلمة المرور: `admin123`

---

## تشغيل يدوي

### Backend
```powershell
cd backend
npm install
npm run build
npm run start:dev
```

### Frontend (نافذة جديدة)
```powershell
cd frontend
npm install
npm run dev
```

---

## الروابط
| الخدمة | الرابط |
|--------|--------|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:4000 |
| MongoDB | localhost:27017 |

---

## إصلاح مشاكل شائعة

### npm not found
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### MongoDB connection error
تأكد أن MongoDB يعمل على المنفذ 27017

### Port already in use
غيّر المنفذ في `backend/.env`:
```
PORT=4001
```
