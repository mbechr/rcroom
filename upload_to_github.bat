@echo off
setlocal EnableExtensions
chcp 65001 >nul
title RC Academy - Publish to GitHub

cd /d "%~dp0"

echo ========================================================
echo   RC Academy - Publish to GitHub
echo   Repository: rcroom
echo ========================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git was not found in PATH.
    echo Install Git for Windows, then run this file again.
    echo.
    pause
    exit /b 1
)

if not exist ".git" (
    echo [ERROR] This folder is not a Git repository.
    echo Open this project from its existing Git clone and run the file again.
    echo.
    pause
    exit /b 1
)

echo Checking repository status...
git status --short
if errorlevel 1 (
    echo [ERROR] Unable to read the Git repository.
    echo.
    pause
    exit /b 1
)

echo.
echo Staging project updates...
rem Database files, local secrets, archives, and temporary files are excluded by .gitignore.
git add -A
if errorlevel 1 (
    echo [ERROR] Git could not stage the project files.
    echo.
    pause
    exit /b 1
)

for /f %%A in ('git diff --cached --name-only') do set "HAS_CHANGES=1"
if not defined HAS_CHANGES (
    echo [INFO] No new changes to commit.
) else (
    echo.
    echo Creating commit...
    git commit -m "Update RC Academy classroom application"
    if errorlevel 1 (
        echo [ERROR] Commit failed.
        echo.
        pause
        exit /b 1
    )
)

echo.
echo Publishing to GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo [ERROR] GitHub push failed.
    echo.
    echo If authentication is requested, sign in through Git Credential Manager
    echo or configure your GitHub credentials, then run this file again.
    echo.
    echo This script never stores or embeds a GitHub token.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo [SUCCESS] RC Academy was published successfully.
echo Student data and local database files remain protected.
echo ========================================================
echo.
pause
endlocal
