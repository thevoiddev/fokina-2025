# PowerShell script to convert images to WebP using ImageMagick or similar tool
# First, you need to install ImageMagick: https://imagemagick.org/script/download.php#windows

$publicDir = Join-Path $PSScriptRoot "..\public"
$imageExtensions = @(".png", ".jpg", ".jpeg")

Write-Host "Starting image conversion to WebP format..." -ForegroundColor Green

foreach ($file in Get-ChildItem $publicDir) {
    if ($imageExtensions -contains $file.Extension.ToLower()) {
        $outputPath = Join-Path $publicDir "$($file.BaseName).webp"
        
        Write-Host "Converting $($file.Name) to WebP..." -ForegroundColor Yellow
        
        try {
            # Using ImageMagick convert command
            & convert "$($file.FullName)" -quality 80 "$outputPath"
            Write-Host "✓ Successfully converted $($file.Name)" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Error converting $($file.Name): $_" -ForegroundColor Red
        }
    }
}

Write-Host "`nImage conversion complete!" -ForegroundColor Green
