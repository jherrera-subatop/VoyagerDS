# Concorde Setup — corre esto en la raiz de cualquier repo
# PowerShell: .\concorde-setup.ps1

Write-Host "Concorde — instalando skill..." -ForegroundColor Cyan

# 1. Crear directorios
New-Item -ItemType Directory -Force -Path ".claude\skills\concorde" | Out-Null
New-Item -ItemType Directory -Force -Path ".claude\concorde" | Out-Null

# 2. SKILL.md — copiar desde este repo o pegar contenido directo
$skillSource = ".\.claude\skills\concorde\SKILL.md"
if (Test-Path $skillSource) {
  Write-Host "  SKILL.md ya existe — sin cambios" -ForegroundColor Yellow
} else {
  Write-Host "  Copia manual requerida: pega el SKILL.md en .claude\skills\concorde\" -ForegroundColor Red
}

# 3. token-map.json — siempre empieza vacío
$tokenMap = @'
{
  "version": "1",
  "generated_by": "concorde",
  "last_updated": "",
  "tokens": {},
  "typography": {},
  "spacing": {}
}
'@
if (-not (Test-Path ".claude\concorde\token-map.json")) {
  $tokenMap | Out-File -FilePath ".claude\concorde\token-map.json" -Encoding utf8
  Write-Host "  token-map.json creado" -ForegroundColor Green
}

# 4. concorde-config.json — template
$config = @'
{
  "version": "1",
  "project": "NOMBRE-DEL-PROYECTO",
  "stack": {
    "framework": "nextjs",
    "typescript": true,
    "styling": "tailwind-v4",
    "animation": "css-native",
    "component_library": null
  },
  "code_rules": {
    "no_any": true,
    "no_ternaries": false,
    "no_anonymous_functions": false,
    "no_hardcoded_hex": false,
    "spacing_grid": 8,
    "use_container_queries": false
  },
  "output_dir": "src/components",
  "token_system": false,
  "allowed_dependencies": ["react", "next", "clsx"],
  "typescript_strict": true
}
'@
if (-not (Test-Path "concorde-config.json")) {
  $config | Out-File -FilePath "concorde-config.json" -Encoding utf8
  Write-Host "  concorde-config.json creado — edita project y output_dir" -ForegroundColor Green
}

# 5. concorde-manifest.json — template
$manifest = @'
{
  "version": "1",
  "preview_base_url": "http://localhost:3000",
  "generated_at": "",
  "components": {
    "Button": {
      "variants": ["primary", "secondary"],
      "states": ["default", "hover", "pressed", "disabled"],
      "has_interactive_demo": true,
      "preview_url": "/preview",
      "preview_anchor": "#button",
      "figma_node_id": "",
      "notes": ""
    }
  }
}
'@
if (-not (Test-Path "concorde-manifest.json")) {
  $manifest | Out-File -FilePath "concorde-manifest.json" -Encoding utf8
  Write-Host "  concorde-manifest.json creado — edita con tus componentes" -ForegroundColor Green
}

Write-Host ""
Write-Host "Listo. Checklist:" -ForegroundColor Cyan
Write-Host "  [ ] Pega el SKILL.md en .claude\skills\concorde\" -ForegroundColor White
Write-Host "  [ ] Edita concorde-config.json — project + output_dir + code_rules" -ForegroundColor White
Write-Host "  [ ] Edita concorde-manifest.json — agrega tus componentes" -ForegroundColor White
Write-Host "  [ ] Agrega data-concorde-* al HTML de tu preview" -ForegroundColor White
Write-Host "  [ ] Abre Claude Code → /concorde NombreComponente" -ForegroundColor White
Write-Host ""
Write-Host "Docs: ver SKILL.md para instrucciones completas" -ForegroundColor Gray
