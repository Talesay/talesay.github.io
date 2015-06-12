@echo off

:: Change CWD to base dir
cd ../

:: Optimize images
FOR /F "tokens=*" %%G IN ('dir /s /b *.png') DO "tools/optipng.exe" -o7 %%G

pause