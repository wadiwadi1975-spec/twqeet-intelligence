@echo off
echo ========================================
echo    منصتي MINASATI - تشغيل الموقع
echo ========================================
echo.

echo [1/2] تشغيل الخادم (Backend)...
cd /d "%~dp0backend"
start cmd /c "node dist/main.js"

echo [2/2] تشغيل الواجهة (Frontend)...
cd /d "%~dp0frontend"
start cmd /c "npx next dev -p 3000"

echo.
echo ========================================
echo    تم التشغيل بنجاح!
echo    الواجهة: http://localhost:3000
echo    الخادم:  http://localhost:4000
echo ========================================
echo.
echo اضغط أي زر لإغلاق هذه النافذة...
pause >nul
