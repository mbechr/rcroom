@echo off
title Upload RC Classroom to GitHub
echo ===================================================
echo   Uploading RC Classroom to https://github.com/mbechr/rcroom
echo ===================================================
echo.
git push -u origin main
echo.
if %errorlevel% neq 0 (
    echo [NOTE] If GitHub asks for Password, please paste your GitHub Token (ghp_...)
    echo        Normal account passwords are not accepted by GitHub.
)
echo ===================================================
pause
