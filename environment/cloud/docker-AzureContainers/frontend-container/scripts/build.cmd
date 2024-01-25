cd %~dp0

rmdir /s /q ..\containerenv
mkdir ..\containerenv

xcopy ..\..\..\..\..\rpdev-frontend\* ..\containerenv\ /E /Y /EXCLUDE:.buildignore
xcopy ..\nginx.conf ..\containerenv\ /Y /EXCLUDE:.buildignore
xcopy ..\certificates\* ..\containerenv\ /Y /EXCLUDE:.buildignore

docker build -t rpdev-frontend ..\containerenv -f ..\dockerfile

rmdir /s /q ..\containerenv