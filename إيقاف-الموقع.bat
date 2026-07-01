@echo off
echo ========================================
echo    إيقاف الموقع
echo ========================================
taskkill /F /IM node.exe 2>nul
echo    تم إيقاف جميع العمليات
timeout /t 2
