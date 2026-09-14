@echo off
title Upload RC Classroom to GitHub
chcp 65001 >nul
echo ========================================================
echo   Uploading RC Classroom to GitHub
echo   Repository: https://github.com/mbechr/rcroom
echo ========================================================
echo.
echo Pushing updates to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo GitHub Token required. Please generate a token from:
    echo https://github.com/settings/tokens/new?scopes=repo^&description=rcroom
    echo.
    set /p GH_TOKEN="Paste your new token (ghp_...) and press Enter: "
    if not "%GH_TOKEN%"=="" (
        git push https://mbechr:%GH_TOKEN%@github.com/mbechr/rcroom.git main
    )
)
echo.
echo ========================================================
echo Done!
echo ========================================================
pause
