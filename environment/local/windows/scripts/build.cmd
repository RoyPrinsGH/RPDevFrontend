@echo off
REM This script is intended for development purposes only.
REM It is not intended for production use.


REM -- Build --

call %~dp0\build-backend.cmd
call %~dp0\build-frontend.cmd