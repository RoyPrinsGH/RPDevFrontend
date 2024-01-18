@echo off
REM This script is intended for development purposes only.
REM It is not intended for production use.


REM -- Variables --

set RPDEV_prefix=[96m[RPDEV][0m
set RPDEV_frontend_path=%~dp0..\..\..\..\rpdev-frontend\
set RPDEV_vite_port=5173


REM -- Start --

echo %RPDEV_prefix% [95mStarted frontend in development mode[0m
cd %RPDEV_frontend_path%
start "" "http://localhost:%RPDEV_vite_port%/about"
start npm run dev

cd %~dp0