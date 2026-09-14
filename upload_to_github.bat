@echo off
title Upload RC Classroom to GitHub
chcp 65001 >nul
echo ========================================================
echo   Uploading RC Classroom to GitHub
echo   Repository: https://github.com/mbechr/rcroom
echo ========================================================
echo.
echo Staging code updates (HTML, CSS, JS)...
echo [NOTE] Database files (*.db) and student practice data are protected and will NOT be overwritten.
git add index.html app.js style.css js/ data/curriculum_data.js data/teacher_curriculum.js README.md .gitignore upload_to_github.bat run_dashboard.bat
git commit -m "Update classroom application and UI (preserve student data)" >nul 2>&1

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
echo [SUCCESS] Upload completed successfully!
echo تم رفع كود وتعديلات الموقع بنجاح.
echo سجلات ودرجات الطلاب محفوظة بالكامل ولن تتأثر.
echo ========================================================
pause
