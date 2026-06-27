# Конвертация HEIC + OG preview (Windows, ffmpeg)
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

if (Test-Path "assets\IMG_8807.HEIC") {
  ffmpeg -y -i "assets\IMG_8807.HEIC" -q:v 2 "public\images\gallery\09-view.jpg"
  ffmpeg -y -i "public\images\gallery\09-view.jpg" -q:v 3 "public\images\gallery\09-view.webp"
}

ffmpeg -y -i "public\images\hero-atist-monument.jpg" -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,drawbox=x=0:y=0:w=1200:h=630:color=black@0.45:t=fill,drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':text='78 m² · Abovyan · `$92,000':fontsize=52:fontcolor=white:x=(w-text_w)/2:y=h*0.38,drawtext=fontfile='C\:/Windows/Fonts/arial.ttf':text='Direct Sale · Garni St. 10':fontsize=34:fontcolor=0xC9A962:x=(w-text_w)/2:y=h*0.52,drawtext=fontfile='C\:/Windows/Fonts/arial.ttf':text='WhatsApp +37477271488':fontsize=28:fontcolor=0x25D366:x=(w-text_w)/2:y=h*0.64" -frames:v 1 "public\images\og-preview.jpg"

Write-Host "Done: 09-view.jpg, og-preview.jpg"
