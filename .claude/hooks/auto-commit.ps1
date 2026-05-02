Set-Location "C:\VoyagerDS\VoyagerDS"
git add -A 2>$null
$diff = git diff --cached --name-only 2>$null
if ($diff) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm"
    git commit -m "wip: checkpoint $date" 2>$null
    Write-Host "auto-commit: cambios guardados"
} else {
    Write-Host "auto-commit: nada que commitear"
}
