@echo off
setlocal
set "PATH=%~dp0;%PATH%"
call corepack.cmd pnpm %*
exit /b %errorlevel%
