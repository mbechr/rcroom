@echo off
title Upload RC Classroom to GitHub
chcp 65001 >nul
echo ========================================================
echo   Uploading RC Classroom to GitHub
echo   Repository: https://github.com/mbechr/rcroom
echo ========================================================
echo.

git remote get-url origin | findstr /C:"ghp_" >nul
if %errorlevel% equ 0 (
    echo [OK] Saved GitHub Token detected. Pushing updates...
    git push -u origin main
    goto finished
)

echo GitHub requires a Personal Access Token (PAT) instead of your password.
echo.
echo Step 1: Open this link in your browser:
echo         https://github.com/settings/tokens/new?scopes=repo^&description=rcroom
echo.
echo Step 2: Click the green "Generate token" button at the bottom,
echo         then copy the token (starts with ghp_...).
echo.
echo --------------------------------------------------------
set /p GH_TOKEN="Step 3: Paste your token here and press Enter: "
echo --------------------------------------------------------

if "%GH_TOKEN%"=="" (
    echo.
    echo No token entered. Attempting standard git push...
    git push -u origin main
) else (
    echo.
    echo Pushing updates to GitHub with your token...
    git push https://mbechr:%GH_TOKEN%@github.com/mbechr/rcroom.git main
    if %errorlevel% equ 0 (
        echo.
        echo [SUCCESS] Updates uploaded to GitHub successfully!
        git remote set-url origin https://mbechr:%GH_TOKEN%@github.com/mbechr/rcroom.git
        echo [OK] Token saved securely. Future uploads will be 1-click automatic!
    ) else (
        echo.
        echo [ERROR] Upload failed. Please verify the token is correct and has 'repo' permission.
    )
)

:finished
echo.
echo ========================================================
pause
