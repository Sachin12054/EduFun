@echo off
echo.
echo ====================================================
echo   EduFun Logo Conversion Helper - Final Step
echo ====================================================
echo.

echo Creating optimized PNG versions of your logo...
echo.

REM Check if the source logo exists
if not exist "Logo\Logo.jpg" (
    echo ERROR: Source logo not found at Logo\Logo.jpg
    echo Please make sure your logo file is in the correct location.
    pause
    exit /b 1
)

echo Found source logo: Logo\Logo.jpg
echo.

echo IMPORTANT: To get the best results, please follow these steps:
echo.
echo 1. Go to https://www.remove.bg/ 
echo    - Upload your Logo\Logo.jpg
echo    - Download the PNG with transparent background
echo.
echo 2. Go to https://www.iloveimg.com/resize-image
echo    - Upload the transparent PNG from step 1
echo    - Create these sizes:
echo      * 1024x1024 pixels for icon.png
echo      * 1024x1024 pixels for adaptive-icon.png  
echo      * 1024x1024 pixels for splash-icon.png
echo      * 48x48 pixels for favicon.png
echo.
echo 3. Save all as PNG format and replace the files in this folder
echo.
echo ====================================================
echo   Alternative: Use Built-in Windows Tools
echo ====================================================
echo.
echo You can also use Paint or Photos app on Windows:
echo 1. Open Logo\Logo.jpg in Paint
echo 2. Resize to 1024x1024 pixels
echo 3. Save as PNG format
echo 4. Replace icon.png, adaptive-icon.png, and splash-icon.png
echo 5. Create a 48x48 version for favicon.png
echo.
echo ====================================================
echo   Current Status
echo ====================================================

if exist "icon.png" (
    echo ✓ icon.png exists
) else (
    echo ✗ icon.png missing
)

if exist "adaptive-icon.png" (
    echo ✓ adaptive-icon.png exists
) else (
    echo ✗ adaptive-icon.png missing
)

if exist "splash-icon.png" (
    echo ✓ splash-icon.png exists  
) else (
    echo ✗ splash-icon.png missing
)

if exist "favicon.png" (
    echo ✓ favicon.png exists
) else (
    echo ✗ favicon.png missing
)

echo.
echo After creating the PNG files, restart your Expo development server
echo to see the changes: expo start
echo.

pause