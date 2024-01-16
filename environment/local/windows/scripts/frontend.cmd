@echo off
echo [95mStarted frontend in development mode[0m
cd "%~dp0..\..\..\..\rpdev-frontend\"
start "" "http://localhost:5173/about"
start npm run dev