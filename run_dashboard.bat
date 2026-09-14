@echo off
title Rania Classroom - Academic & Practice Infrastructure
echo ========================================================
echo   RANIA CLASSROOM - Academic & Practice Infrastructure
echo ========================================================
echo.
echo Starting Rania Classroom Portal with SQLite Database...
echo Opening portal in your default web browser...
start "" "http://localhost:8000"
python server.py

pause
