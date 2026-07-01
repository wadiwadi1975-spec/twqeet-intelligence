@echo off
chcp 65001 >nul
echo ========================================
echo    TWQEET Backend Server
echo ========================================
echo.
cd /d "%~dp0"
echo جاري تشغيل Backend...
echo.
call npm run start:dev
pause
