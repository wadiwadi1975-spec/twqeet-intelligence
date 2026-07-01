@echo off
chcp 65001 >nul
title TWQEET - Quick Start

echo.
echo  ======================================
echo     TWQEET Intelligence Platform
echo  ======================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Node.js not found!
    echo  Download from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js found
echo.

:: Install Backend
echo  [1/4] Installing Backend dependencies...
cd /d "%~dp0backend"
call "C:\Program Files\nodejs\npm.cmd" install --silent 2>nul
if %errorlevel% neq 0 (
    echo  [!] Backend install failed
    pause
    exit /b 1
)
echo  [OK] Backend ready
echo.

:: Install Frontend
echo  [2/4] Installing Frontend dependencies...
cd /d "%~dp0frontend"
call "C:\Program Files\nodejs\npm.cmd" install --silent 2>nul
if %errorlevel% neq 0 (
    echo  [!] Frontend install failed
    pause
    exit /b 1
)
echo  [OK] Frontend ready
echo.

:: Build Backend
echo  [3/4] Building Backend...
cd /d "%~dp0backend"
call "C:\Program Files\nodejs\npm.cmd" run build 2>nul
echo  [OK] Build complete
echo.

:: Start Backend
echo  [4/4] Starting servers...
echo.
start "TWQEET Backend" cmd /k "cd /d "%~dp0backend" && call "C:\Program Files\nodejs\npm.cmd" run start:dev"
timeout /t 3 /nobreak >nul
start "TWQEET Frontend" cmd /k "cd /d "%~dp0frontend" && call "C:\Program Files\nodejs\npm.cmd" run dev"

echo  ======================================
echo     Servers Starting...
echo  ======================================
echo.
echo     Backend:  http://localhost:4000
echo     Frontend: http://localhost:3000
echo.
echo     Login:
echo     Email: admin@twqeet.com
echo     Pass:  admin123
echo  ======================================
echo.
echo     NOTE: MongoDB must be running on port 27017
echo     Download: https://www.mongodb.com/try/download/community
echo.
pause
