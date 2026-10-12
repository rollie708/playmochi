# Local development server for New MOCHI Website
# Usage: powershell -ExecutionPolicy Bypass -File .\serve.ps1

Write-Host "🚀 Starting MOCHI Website local server..." -ForegroundColor Cyan
Write-Host "📁 Serving: $PWD" -ForegroundColor White
Write-Host "🌐 Open browser at: http://localhost:8080" -ForegroundColor White
Write-Host "⏹️  Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""

# Use Python's built-in HTTP server if available
try {
    $process = Start-Process -FilePath "python" -ArgumentList "-m", "http.server", "8080" -NoNewWindow -RedirectStandardOutput "server-output.log" -RedirectStandardError "server-errors.log" -Wait
} catch {
    Write-Host "❌ Python not found. Try: npm install -g serve" -ForegroundColor Red
    Write-Host "   Or: pip install python" -ForegroundColor Gray
}