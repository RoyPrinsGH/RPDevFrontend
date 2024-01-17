@echo off
REM This script is intended for development purposes only.
REM It is not intended for production use.


REM -- Variables --

set RPDEV_prefix=[96m[RPDEV][0m
set RPDEV_devenv_path=%~dp0..\devenv\
set RPDEV_port=5000


REM -- Start --

echo %RPDEV_prefix% [95mStarting web app[0m
cd %RPDEV_devenv_path%
start "" "http://localhost:%RPDEV_port%"
start rpdev-backend.exe