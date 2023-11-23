@echo on

echo "Starting all instances..."
call pm2 start
echo "Starting process completed."
echo "Insuring all processes are active and running..."
call pm2 list
setlocal
:PROMPT
SET /P ISACTIVE=Is everything online? (Y/[N])?
IF /I "%ISACTIVE%" NEQ "Y" GOTO END
for /F "tokens=14" %%i in ('"ipconfig | findstr IPv4"') do SET IPADDRESS=%%i
echo "use ipv4 address and append the correct port at the end ie: %IPADDRESS%:4000 (monopoly) %IPADDRESS%:3000 (escape + admin)"
pause
GOTO :EOF
:END
call pm2 stop all
pause
@echo off