# PowerShell script to update app icons with the new Kidemy logo

Write-Host "Kidemy Logo Update Script" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Check if the logo image exists
$logoPath = ".\assets\Logo\Logo.jpg"
if (-Not (Test-Path $logoPath)) {
    Write-Host "ERROR: Logo file not found at $logoPath" -ForegroundColor Red
    exit 1
}

Write-Host "Found logo file: $logoPath" -ForegroundColor Yellow

# Install required tools if not present
Write-Host "Checking for required tools..." -ForegroundColor Yellow

# Function to resize image using ImageMagick (if available)
function Resize-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [string]$Size
    )
    
    if (Get-Command "magick" -ErrorAction SilentlyContinue) {
        Write-Host "Resizing to $Size..." -ForegroundColor Blue
        & magick "$InputPath" -resize "$Size" "$OutputPath"
        return $true
    } else {
        Write-Host "ImageMagick not found. Please resize manually to $Size" -ForegroundColor Yellow
        return $false
    }
}

# Create different icon sizes
$iconSizes = @{
    "icon.png" = "1024x1024"
    "adaptive-icon.png" = "1024x1024"
    "splash-icon.png" = "1024x1024"
    "favicon.png" = "48x48"
}

Write-Host "Creating icon variants..." -ForegroundColor Yellow

foreach ($icon in $iconSizes.GetEnumerator()) {
    $outputPath = ".\assets\$($icon.Key)"
    $size = $icon.Value
    
    Write-Host "Creating $($icon.Key) ($size)..." -ForegroundColor Blue
    
    if (-Not (Resize-Image -InputPath $logoPath -OutputPath $outputPath -Size $size)) {
        Write-Host "Manual resize needed for $($icon.Key) to $size" -ForegroundColor Yellow
    }
}

Write-Host "Icon update process completed!" -ForegroundColor Green
Write-Host "If ImageMagick was not found, you'll need to manually resize the logo:" -ForegroundColor Yellow
Write-Host "- icon.png: 1024x1024 pixels" -ForegroundColor White
Write-Host "- adaptive-icon.png: 1024x1024 pixels" -ForegroundColor White
Write-Host "- splash-icon.png: 1024x1024 pixels" -ForegroundColor White
Write-Host "- favicon.png: 48x48 pixels" -ForegroundColor White