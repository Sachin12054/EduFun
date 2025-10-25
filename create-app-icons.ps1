# PowerShell script to create app icons from the new Kidemy logo
# Make sure you have ImageMagick installed or use an online tool

# Required sizes for different purposes:
# App Icon: 1024x1024 (iOS), 512x512 (Android)
# Adaptive Icon: 108x108 dp (432x432 px for xxxhdpi)
# Splash Screen: 1242x2436 (iPhone X), 1080x1920 (Android)

Write-Host "Kidemy Logo Icon Creation Script"
Write-Host "================================"
Write-Host ""
Write-Host "Please manually create the following sizes from your logo:"
Write-Host ""
Write-Host "1. App Icon (Main): 1024x1024 -> save as 'icon.png'"
Write-Host "2. Adaptive Icon: 432x432 -> save as 'adaptive-icon.png'"
Write-Host "3. Splash Icon: 512x512 -> save as 'splash-icon.png'"
Write-Host "4. Favicon: 48x48 -> save as 'favicon.png'"
Write-Host ""
Write-Host "All files should be saved in the 'assets' folder"
Write-Host ""
Write-Host "You can use online tools like:"
Write-Host "- https://www.image-converter.org/"
Write-Host "- https://www.canva.com/resize/"
Write-Host "- https://www.photopea.com/ (free Photoshop alternative)"