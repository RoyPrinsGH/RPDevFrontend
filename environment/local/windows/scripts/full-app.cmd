@echo off

REM This script builds the backend and frontend and starts the web app.
REM It is intended for development purposes only.
REM It is not intended for production use.


REM -- Variables --

set RPDEV_prefix=[96m[RPDEV][0m
set RPDEV_backend_path=%~dp0..\..\..\..\rpdev-backend\
set RPDEV_frontend_path=%~dp0..\..\..\..\rpdev-frontend\
set RPDEV_devenv_path=%~dp0..\devenv\
set RPDEV_port=5000


REM -- Build and start --

rmdir /Q /S %RPDEV_devenv_path%
mkdir %RPDEV_devenv_path%

echo %RPDEV_prefix% [91mBuilding backend...[0m
cd %RPDEV_backend_path%
dotnet publish rpdev-backend.csproj -c Release -o %RPDEV_devenv_path% --self-contained true -p:PublishSingleFile=true -p:AssemblyName=rpdev-backend
echo %RPDEV_prefix% [92mBuilding backend... done[0m

echo %RPDEV_prefix% [91mBuilding frontend...[0m
cd %RPDEV_frontend_path%
call npm run build
move dist %RPDEV_devenv_path%\wwwroot
echo %RPDEV_prefix% [92mBuilding frontend... done[0m

echo %RPDEV_prefix% [95mStarting web app[0m
cd %RPDEV_devenv_path%
start "" "http://localhost:%RPDEV_port%"
start rpdev-backend.exe
