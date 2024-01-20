@echo off
REM This script is intended for development purposes only.
REM It is not intended for production use.

goto :main
:resetANSI
EXIT /B

:main

REM -- Variables --

set RPDEV_prefix=[96m[RPDEV][0m


REM -- Start --

REM Check if running as admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo %RPDEV_prefix% [91mThis script must be run as administrator.[0m
    exit /b 1
)

REM Check if dotnet 8 is installed
dotnet --version | findstr /C:"8." >nul
if %errorlevel% neq 0 (
    echo %RPDEV_prefix% [91mdotnet 8 is not installed. Please visit the following link to download and install it:[0m
    echo https://dotnet.microsoft.com/download/dotnet/8.0
    exit /b 1
)

REM Check if node is installed
node --version >nul
if %errorlevel% neq 0 (
    echo %RPDEV_prefix% [91mnode is not installed. Please visit the following link to download and install it:[0m
    echo https://nodejs.org/en/download/
    exit /b 1
)

REM Check if SQL Server is installed
sqlcmd -? >nul
if %errorlevel% neq 0 (
    echo %RPDEV_prefix% [91mSQL Server is not installed. Please install SQL Server before proceeding.[0m
    exit /b 1
)

REM Check if dotnet-ef tool is installed
dotnet tool list --global | findstr /C:"dotnet-ef" >nul
if %errorlevel% neq 0 (
    echo %RPDEV_prefix% [91mdotnet-ef tool is not installed. Please run the following command to install it:[0m
    echo dotnet tool install --global dotnet-ef
    exit /b 1
)

echo.
set /p changeEnvironment="%RPDEV_prefix% Do you want to change the ASPNETCORE_ENVIRONMENT? (Y/N):"
if /i not "%changeEnvironment%"=="Y" ( goto :skipEnvironment )

echo.
echo Select a value for ASPNETCORE_ENVIRONMENT:
echo 1. Development
echo 2. Staging
echo 3. Production

set /p environmentChoice="Enter your choice (1-3): "

if "%environmentChoice%"=="1" (
    setx ASPNETCORE_ENVIRONMENT Development
    call :resetANSI
    echo %RPDEV_prefix% [93mDevelopment environment selected.[0m
    echo %RPDEV_prefix% [91mPlease restart your IDE or terminal process to apply the changes.[0m
) else if "%environmentChoice%"=="2" (
    setx ASPNETCORE_ENVIRONMENT Staging
    call :resetANSI
    echo %RPDEV_prefix% [93mStaging environment selected.[0m
    echo %RPDEV_prefix% [91mPlease restart your IDE or terminal process to apply the changes.[0m
) else if "%environmentChoice%"=="3" (
    setx ASPNETCORE_ENVIRONMENT Production
    call :resetANSI
    echo %RPDEV_prefix% [93mProduction environment selected.[0m
    echo %RPDEV_prefix% [91mPlease restart your IDE or terminal process to apply the changes.[0m
) else (
    echo %RPDEV_prefix% [91mInvalid choice. Please select a valid option.[0m
    exit /b 1
)
echo.

:skipEnvironment

set /p setConnectionString="%RPDEV_prefix% Do you want to set RPDEV_CONNECTION_STRING? (Y/N): "
if /i not "%setConnectionString%"=="Y" ( goto :skipConnectionString )

set /p connectionString="Enter the connection string for RPDEV_CONNECTION_STRING: "

setx RPDEV_CONNECTION_STRING "%connectionString%"
call :resetANSI
echo %RPDEV_prefix% [93mConnection string set successfully.[0m
echo %RPDEV_prefix% [91mPlease restart your IDE or terminal process to apply the changes.[0m
echo.

:skipConnectionString

pause