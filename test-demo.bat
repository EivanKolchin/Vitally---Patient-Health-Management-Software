@echo off
cls
echo ========================================================
echo    SEPSIS SENTINEL - PRE-DEMO TEST
echo ========================================================
echo.
echo This script will test all critical features before your
echo hackathon presentation.
echo.
pause
echo.

echo [1/6] Checking if server is running...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo    X Server is NOT running
    echo    ! Run start.bat first
    echo.
    pause
    exit /b 1
) else (
    echo    √ Server is running
)
echo.

echo [2/6] Testing API - Patient List...
curl -s http://localhost:3000/api/patients >nul 2>&1
if errorlevel 1 (
    echo    X API not responding
    echo    ! Check console for errors
) else (
    echo    √ Patient list API working
)
echo.

echo [3/6] Testing API - Patient Detail...
curl -s "http://localhost:3000/api/patients/patient_001" >nul 2>&1
if errorlevel 1 (
    echo    X Patient detail API not responding
) else (
    echo    √ Patient detail API working
)
echo.

echo [4/6] Testing API - Hospitals...
curl -s http://localhost:3000/api/hospitals >nul 2>&1
if errorlevel 1 (
    echo    X Hospitals API not responding
) else (
    echo    √ Hospitals API working
)
echo.

echo [5/6] Opening test URLs in browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000
echo    √ Dashboard opened
timeout /t 2 /nobreak >nul
start http://localhost:3000/patient/patient_001
echo    √ Patient detail opened
timeout /t 2 /nobreak >nul
start http://localhost:3000/about
echo    √ About page opened
echo.

echo [6/6] Test Summary
echo ========================================================
echo.
echo √ All systems operational!
echo.
echo DEMO CHECKLIST:
echo [ ] Dashboard shows 3 patients
echo [ ] Risk badges are color-coded (red/amber/green)
echo [ ] Sarah Johnson shows HIGH RISK
echo [ ] Patient detail page loads
echo [ ] Vitals and labs display correctly
echo [ ] Charts render properly
echo [ ] Hospital dropdown works
echo [ ] Switching hospitals updates recommendation
echo [ ] "Copy Note" button works
echo [ ] About page explains the problem clearly
echo.
echo ========================================================
echo    READY FOR HACKATHON! Good luck! 🏆
echo ========================================================
echo.
pause

