@echo off
title Upload RC Classroom to GitHub
echo ===================================================
echo   Uploading RC Classroom to https://github.com/mbechr/rcroom
echo ===================================================
echo.
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo Retrying with Program Files Git...
    "C:\Program Files\Git\cmd\git.exe" push -u origin main
)
echo.
echo ===================================================
pause
