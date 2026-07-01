@echo off
chcp 65001 >nul
echo ========================================
echo    TWQEET Frontend Server
echo ========================================
echo.
cd /d "%~dp0frontend"
echo جاري تشغيل الواجهة الأمامية...
echo.
call npm run dev
pause
