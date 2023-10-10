@echo off
setlocal

:: Prompt for elevation
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

:: If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"

:: Continue with your script below

:: Change directory to the script's location
cd /d "%~dp0"

:: Get the current directory and replace \ with \\
set "current_dir=%cd%"
set "escaped_dir=%current_dir:\=\\%"

echo Current Directory: %current_dir%
echo Escaped Directory: %escaped_dir%

:: Write the registry file
(
echo Windows Registry Editor Version 5.00
echo.
echo [HKEY_CLASSES_ROOT\VRWheelchairSim]
echo @="URL:VRWheelchairSim"
echo "URL Protocol"=""
echo.
echo [HKEY_CLASSES_ROOT\VRWheelchairSim\shell]
echo.
echo [HKEY_CLASSES_ROOT\VRWheelchairSim\shell\open]
echo.
echo [HKEY_CLASSES_ROOT\VRWheelchairSim\shell\open\command]
echo @="\"%escaped_dir%\\WheelchairExe\\VR-wheelchair-sim.exe\" \"%%1\""
) > VRWheelchairSim.reg

echo Registry file created.

:: Import the registry file
reg import VRWheelchairSim.reg

echo Registry file imported successfully.

:: Clean up (Optional: Remove the registry file after import)
del /f /q VRWheelchairSim.reg

endlocal
