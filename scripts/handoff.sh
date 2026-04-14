#!/usr/bin/env bash
# ─── Voyager DS — Handoff Script ─────────────────────────────────────────────
# Genera HANDOFF.md en la raíz del proyecto para continuar la sesión en Cursor
# Uso: bash scripts/handoff.sh
# El agente saliente (Claude Code) recibe el prompt de sistema y produce el archivo.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

HANDOFF_FILE="HANDOFF.md"
DATE=$(date +"%Y-%m-%d %H:%M")

cat > "$HANDOFF_FILE" << 'PROMPT_TEMPLATE'
<!-- HANDOFF VOYAGER DS — generado automáticamente -->
# HANDOFF — Voyager DS

> **Instrucción de sistema para el agente saliente:**
> Completa las 4 secciones siguientes. RESTRICCIÓN ABSOLUTA:
> - Sin narrativa, sin saludos, sin explicaciones
> - Máximo 800 tokens en total
> - Solo datos técnicos verificados

---

## TASK_STATE
<!-- Una línea: qué tarea estaba activa y su estado respecto a ACTION_PLAN.md -->


## FILES_MODIFIED
<!-- Rutas absolutas de archivos tocados en esta sesión. Una por línea. -->
-

## DEAD_ENDS
<!-- Máx 3 enfoques que fallaron. Formato: "❌ [enfoque] → [razón exacta del fallo]" -->
-

## NEXT_STEP
<!-- UN SOLO comando o acción imperativa que el siguiente agente debe ejecutar primero -->


---

## STATE_SUMMARY
> Las rutas en FILES_MODIFIED constituyen el **Límite de Confianza verificado**.
> El agente entrante NO debe usar herramientas de búsqueda para re-leer estos archivos.
> Proceder directamente con la directiva en NEXT_STEP.

PROMPT_TEMPLATE

echo "✔ HANDOFF.md generado en $(pwd)/$HANDOFF_FILE"
echo ""
echo "Próximo paso: pega el contenido de HANDOFF.md al iniciar la sesión en Cursor."
echo "El agente entrante tiene instrucciones de respetar el Trust Boundary."
