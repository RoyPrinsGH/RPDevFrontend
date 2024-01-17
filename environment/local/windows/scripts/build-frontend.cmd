@echo off
REM This script is intended for development purposes only.
REM It is not intended for production use.


REM -- Variables --

set RPDEV_prefix=[96m[RPDEV][0m
set RPDEV_frontend_path=%~dp0..\..\..\..\rpdev-frontend\
set RPDEV_devenv_path=%~dp0..\devenv\


REM -- Build --

echo %RPDEV_prefix% [91mBuilding frontend...[0m
cd %RPDEV_frontend_path%
call npm run build
move dist %RPDEV_devenv_path%\wwwroot
echo %RPDEV_prefix% [92mBuilding frontend... done[0m