@echo off
echo.
echo ==========================================
echo 🚀 New MOCHI Website - Local Server
echo ==========================================
echo.
echo 1. Open browser directly (recommended)
echo    double-click index.html
echo.
echo 2. PowerShell server (if Python installed)
echo    powershell -ExecutionPolicy Bypass -File .\serve.ps1
echo.
echo 3. Manual Python server
echo    python -m http.server 8080
echo.
echo 4. Node.js serve (if installed)
echo    npx serve --port 8080
echo.
echo ------------------------------------------
echo 🌐 Website will be at: http://localhost:8080
echo 📂 Serving from: %cd%
echo ==========================================
echo.

:: Try Python first
python -m http.server 8080