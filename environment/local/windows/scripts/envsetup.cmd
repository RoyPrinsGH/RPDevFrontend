@echo off
REM This script is intended for development purposes only.
REM It is not intended for production use.


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

REM Menu to select ASPNETCORE_ENVIRONMENT value
echo.
echo Select a value for ASPNETCORE_ENVIRONMENT:
echo 1. Development
echo 2. Staging
echo 3. Production
set /p environmentChoice=Enter your choice (1-3): 

REM Set ASPNETCORE_ENVIRONMENT based on user's choice
if "%environmentChoice%"=="1" (
    setx ASPNETCORE_ENVIRONMENT Development
    echo %RPDEV_prefix% [93mDevelopment environment selected.[0m
) else if "%environmentChoice%"=="2" (
    setx ASPNETCORE_ENVIRONMENT Staging
    echo %RPDEV_prefix% [93mStaging environment selected.[0m
) else if "%environmentChoice%"=="3" (
    setx ASPNETCORE_ENVIRONMENT Production
    echo %RPDEV_prefix% [93mProduction environment selected.[0m
) else (
    echo %RPDEV_prefix% [91mInvalid choice. Please select a valid option.[0m
    exit /b 1
)

echo %RPDEV_prefix% [91mPlease restart your IDE or terminal process to apply the changes.[0m
echo.