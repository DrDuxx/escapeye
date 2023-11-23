@echo on

echo "Starting React build process. pm2 instance will be offline momentarily while this is running to free memory..."
call pm2 "stop" "all"
cd "%CD%\escape-ui"
call npm run build
echo 'Rooms and admin UI, build process completed.'
cd "..\monopoly-ui"
call npm run build
echo 'Monopoly UI, build process completed.'
call pm2 "restart" "all"
echo "Build process completed."
pause
@echo off