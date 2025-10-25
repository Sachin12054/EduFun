# PowerShell script to convert JPG logo to app icons
# This script uses Windows built-in tools to create basic PNG versions

param(
    [string]$SourceLogo = "assets\Logo\Logo.jpg",
    [string]$OutputDir = "assets"
)

Write-Host "Kidemy Logo to App Icons Converter" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if source logo exists
if (-not (Test-Path $SourceLogo)) {
    Write-Host "ERROR: Source logo not found at $SourceLogo" -ForegroundColor Red
    exit 1
}

Write-Host "Found source logo: $SourceLogo" -ForegroundColor Yellow

# Create backup directory
$BackupDir = "$OutputDir\backup"
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

# Backup existing icons
$IconFiles = @("icon.png", "adaptive-icon.png", "splash-icon.png", "favicon.png")
foreach ($file in $IconFiles) {
    $sourcePath = "$OutputDir\$file"
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath "$BackupDir\$file.backup" -Force
        Write-Host "Backed up $file" -ForegroundColor Blue
    }
}

Write-Host ""
Write-Host "MANUAL CONVERSION REQUIRED:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Since PowerShell doesn't have built-in image conversion," -ForegroundColor White
Write-Host "please follow these steps:" -ForegroundColor White
Write-Host ""
Write-Host "1. Open Paint (mspaint.exe)" -ForegroundColor Cyan
Write-Host "2. Open file: $SourceLogo" -ForegroundColor Cyan
Write-Host "3. Resize to 1024x1024 pixels:" -ForegroundColor Cyan
Write-Host "   - Click Resize button" -ForegroundColor Gray
Write-Host "   - Select Pixels" -ForegroundColor Gray
Write-Host "   - Set both width and height to 1024" -ForegroundColor Gray
Write-Host "   - Click OK" -ForegroundColor Gray
Write-Host "4. Save as PNG:" -ForegroundColor Cyan
Write-Host "   - File > Save As > PNG" -ForegroundColor Gray
Write-Host "   - Save as: $OutputDir\icon.png" -ForegroundColor Gray
Write-Host "5. Repeat for other files:" -ForegroundColor Cyan
Write-Host "   - Copy icon.png to adaptive-icon.png" -ForegroundColor Gray
Write-Host "   - Copy icon.png to splash-icon.png" -ForegroundColor Gray
Write-Host "6. For favicon.png:" -ForegroundColor Cyan
Write-Host "   - Resize to 48x48 pixels and save as favicon.png" -ForegroundColor Gray
Write-Host ""

# Alternative online tools
Write-Host "ALTERNATIVE - Online Tools (Recommended):" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://www.remove.bg/" -ForegroundColor Cyan
Write-Host "   - Upload your logo" -ForegroundColor Gray
Write-Host "   - Download PNG with transparent background" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Go to: https://www.iloveimg.com/resize-image" -ForegroundColor Cyan
Write-Host "   - Upload the transparent PNG" -ForegroundColor Gray
Write-Host "   - Resize to 1024x1024" -ForegroundColor Gray
Write-Host "   - Download and rename to icon.png" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Copy icon.png to:" -ForegroundColor Cyan
Write-Host "   - adaptive-icon.png" -ForegroundColor Gray
Write-Host "   - splash-icon.png" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Create 48x48 version for favicon.png" -ForegroundColor Cyan
Write-Host ""

Write-Host "After creating the PNG files:" -ForegroundColor Green
Write-Host "1. Stop Expo server (Ctrl+C)" -ForegroundColor White
Write-Host "2. Run: expo start --clear" -ForegroundColor White
Write-Host "3. Rebuild your app to see new icons" -ForegroundColor White

Read-Host "Press Enter to continue..."