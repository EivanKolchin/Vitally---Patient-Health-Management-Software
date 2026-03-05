@echo off
cls
echo ========================================================
echo    STOPPING SEPSIS SENTINEL
echo ========================================================
echo.
echo Killing all Node.js processes...
echo.

REM Kill all node processes (stops the dev server)
taskkill /F /IM node.exe /T 2>nul

if errorlevel 1 (
    echo No Node.js processes found running
) else (
    echo Server stopped successfully
)

echo.
echo ========================================================
echo    SEPSIS SENTINEL STOPPED
echo ========================================================
echo.
echo To start again, run: start.bat
echo.
pause

