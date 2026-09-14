@echo off
title Upload RC Classroom to GitHub
chcp 65001 >nul
echo ========================================================
echo   Uploading RC Classroom to GitHub
echo   Repository: https://github.com/mbechr/rcroom
echo ========================================================
echo.
echo Pushing latest updates to GitHub...
git push origin main
echo.
echo ========================================================
echo [SUCCESS] Upload completed successfully!
echo ========================================================
pause
