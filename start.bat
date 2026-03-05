@echo off
cls
echo ========================================================
echo    SEPSIS SENTINEL - Clinical Decision Support System
echo ========================================================
echo.
echo Starting the application...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    echo This may take 2-3 minutes on first run...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies
        echo Please make sure Node.js is installed
        pause
        exit /b 1
    )
    echo.
) else (
    echo [OK] Dependencies already installed
    echo.
)

echo [2/2] Starting development server...
echo.
echo ========================================================
echo    Server will start at: http://localhost:3000
echo ========================================================
echo.
echo Opening browser in 5 seconds...
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server in the background and open browser
start /B npm run dev

REM Wait and then open browser
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================================
echo    SEPSIS SENTINEL IS RUNNING
echo ========================================================
echo.
echo Dashboard: http://localhost:3000
echo.
echo To stop the server, run: stop.bat
echo Or press Ctrl+C in this window
echo.
echo ========================================================

REM Keep the window open
cmd /k

