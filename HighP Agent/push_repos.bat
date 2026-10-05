@echo off
title HighP - Push Backend & Frontend to GitHub
color 0A
echo ========================================================
echo   HighP Workforce Platform - GitHub Push Utility
echo   Pushing Backend and Frontend Updates to GitHub...
echo ========================================================
echo.

echo [1/2] Pushing Backend (HighP-Agent-Backend)...
cd /d "%~dp0backend"
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Backend push failed or was cancelled.
    goto end
)
echo.
echo [OK] Backend pushed successfully!

echo.
echo [2/3] Pushing Frontend (HighP-Agent)...
cd /d "%~dp0frontend"
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Frontend push failed or was cancelled.
    goto end
)
echo.
echo [OK] Frontend pushed successfully!

echo.
echo [3/3] Pushing Desktop Agent (HighP-desktop-agent)...
cd /d "%~dp0desktop-agent"
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Desktop agent push failed or was cancelled.
    goto end
)
echo.
echo [OK] Desktop agent pushed successfully!

echo.
echo ========================================================
echo   All repositories pushed successfully!
echo   Vercel will now automatically redeploy both apps.
echo ========================================================

:end
echo.
pause
