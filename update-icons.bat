@echo off
echo.
echo ====================================
echo   EduFun Logo Update Helper
echo ====================================
echo.

REM Check if the source logo exists
if not exist "assets\Logo\Logo.jpg" (
    echo ERROR: Source logo not found at assets\Logo\Logo.jpg
    echo Please make sure your logo file is in the correct location.
    pause
    exit /b 1
)

echo Found source logo: assets\Logo\Logo.jpg
echo.

REM Create backup directory if it doesn't exist
if not exist "assets\backup" mkdir "assets\backup"

REM Backup existing icons
echo Creating backups of existing icons...
copy "assets\icon.png" "assets\backup\icon-original.png" >nul 2>&1
copy "assets\adaptive-icon.png" "assets\backup\adaptive-icon-original.png" >nul 2>&1
copy "assets\splash-icon.png" "assets\backup\splash-icon-original.png" >nul 2>&1
copy "assets\favicon.png" "assets\backup\favicon-original.png" >nul 2>&1
echo Backups created in assets\backup\

echo.
echo ====================================
echo   MANUAL STEPS REQUIRED
echo ====================================
echo.
echo Since automated image processing tools are not available,
echo please follow these steps manually:
echo.
echo 1. Open your image editor (Photoshop, GIMP, etc.)
echo 2. Open the file: assets\Logo\Logo.jpg
echo 3. Create the following sized versions:
echo.
echo    📱 icon.png - 1024x1024 pixels
echo    🤖 adaptive-icon.png - 1024x1024 pixels  
echo    🎨 splash-icon.png - 1024x1024 pixels
echo    🌐 favicon.png - 48x48 pixels
echo.
echo 4. Save them in PNG format with transparency
echo 5. Replace the existing files in the assets folder
echo.
echo ====================================
echo   ONLINE TOOLS (Alternative)
echo ====================================
echo.
echo You can also use these online tools:
echo - https://www.iloveimg.com/resize-image
echo - https://www.canva.com/
echo - https://www.photopea.com/ (free Photoshop alternative)
echo.
echo ====================================
echo   RECOMMENDED SETTINGS
echo ====================================
echo.
echo - Keep the logo centered
echo - Maintain transparency around the edges
echo - Use high quality PNG format
echo - The teal/turquoise color should pop on both light and dark backgrounds
echo.

pause