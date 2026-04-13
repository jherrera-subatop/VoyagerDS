/**
 * VOYAGER — Taxonomy Curator Agent
 * ─────────────────────────────────────────────────────────────────
 * Phase: ib-taxonomia · Task E
 * Input:  vmc-detalle-audit.json + subascars-categorized.json
 * Output: TAXONOMY.md (DETALLE page — Ruta B, iteración 1)
 *
 * Lógica de decisión:
 *   referencia-subascars → componente existe en SubasCars Storybook,
 *     usarla como referencia anatómica al construir (NO portar tal cual)
 *   solo-vmc → solo existe en VMC DETALLE audit, construir desde VMC
 *   pendiente-audit → anatomía insuficiente, necesita más audit
 *
 * Aclaración: SubasCars = referencia de anatomía/variantes, NO código
 *   a copiar. En ib-componentes: VMC manda (UX/comportamiento),
 *   SubasCars = alternativa a explorar. Output = componente nuevo, UI
 *   upgraded, no copia de ninguno.
 * ─────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const VMC_AUDIT    = './scripts/output/vmc-audit/vmc-detalle-audit.json'
const SUBASCARS    = './scripts/output/subascars-categorized.json'
const OUTPUT_DIR   = './scripts/output'
const OUTPUT_MD    = `${OUTPUT_DIR}/TAXONOMY.md`
const OUTPUT_JSON  = `${OUTPUT_DIR}/taxonomy-detalle.json`

const vmcAudit   = JSON.parse(readFileSync(VMC_AUDIT, 'utf8'))
const subascars  = JSON.parse(readFileSync(SUBASCARS, 'utf8'))

// Index SubasCars by ai_name for fast lookup
const scIndex = {}
for (const c of subascars.inventory_flat) {
  scIndex[c.nombre_ai] = c
}

// ─── Enriched anatomy from audit context ─────────────────────────
// Since DOM extraction gives us limited anatomy, we enrich manually
// based on what's known from the audit screenshot + patterns.
const ANATOMY_ENRICHMENT = {
  'icon': ['svg sprite', 'tamaño: sm/md/lg', 'color via token'],
  'btn': ['label', 'icon-left?', 'icon-right?', 'estado: default/hover/disabled/loading'],
  'input': ['label', 'placeholder', 'helper-text', 'error-text', 'estado: default/focus/error/disabled'],
  'header-primary': ['logo', 'nav-links', 'cta-login', 'cta-registro'],
  'nav-primary': ['links de navegación', 'indicador activo', 'responsive: hamburger'],
  'footer-primary': ['columnas de links', 'redes sociales', 'legal/copyright'],
  'sidebar': ['filtros de búsqueda', 'precio-range', 'tipo-vehículo', 'año', 'marca'],
  'display-price': ['precio actual', 'moneda (PEN/USD)', 'precio base?', 'variante: grande/compacto'],
  'card-auction': ['imagen vehículo', 'título', 'precio', 'timer-countdown', 'cta-pujar', 'badge-estado'],
  'display-metrics': ['label', 'valor numérico', 'unidad', 'icono?'],
  'table-specs': ['filas clave-valor', 'grupos de specs (motor, carrocería, etc.)', 'expand/collapse?'],
  'indicator-data-quality': ['porcentaje o score', 'label descriptivo', 'color semántico por nivel'],
}

// ─── Accessibility baseline (WCAG 2.1 AA) ────────────────────────
const A11Y_BASE = {
  'btn':                   { roles: 'button', keyboard: 'Enter/Space', notas: 'focus-visible required, disabled no ocultar' },
  'input':                 { roles: 'textbox/combobox/listbox según tipo', keyboard: 'Tab, flechas en select', notas: 'label asociado obligatorio, error anunciado via aria-describedby' },
  'header-primary':        { roles: 'banner (landmark)', keyboard: 'Tab a través de nav-links', notas: 'skip-to-content link recomendado' },
  'nav-primary':           { roles: 'navigation (landmark)', keyboard: 'Tab/flechas', notas: 'aria-current="page" en link activo' },
  'footer-primary':        { roles: 'contentinfo (landmark)', keyboard: 'Tab', notas: 'links deben tener texto descriptivo' },
  'sidebar':               { roles: 'complementary (landmark)', keyboard: 'Tab, flechas en sliders', notas: 'filtros deben anunciar cambios via aria-live' },
  'display-price':         { roles: 'text (implícito)', keyboard: 'N/A', notas: 'contraste mínimo 4.5:1, no solo color para comunicar cambio' },
  'card-auction':          { roles: 'article o listitem', keyboard: 'Tab al CTA', notas: 'imagen con alt descriptivo del vehículo' },
  'display-metrics':       { roles: 'text (implícito)', keyboard: 'N/A', notas: 'valores dinámicos via aria-live="polite"' },
  'table-specs':           { roles: 'table/grid o dl/dt/dd', keyboard: 'Tab si hay filas expandibles', notas: 'headers asociados a celdas, scope="row/col"' },
  'indicator-data-quality':{ roles: 'meter o progressbar', keyboard: 'N/A', notas: 'aria-valuenow/min/max, no transmitir solo por color' },
  'icon':                  { roles: 'img (si decorativo: aria-hidden=true)', keyboard: 'N/A si decorativo', notas: 'iconos funcionales requieren aria-label' },
}

// ─── Tokens baseline (DTCG — se llena en ib-fundamentos) ─────────
const TOKENS_NOTE = 'Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.'

// ─── Process components ───────────────────────────────────────────
console.log('📋 VOYAGER Taxonomy Curator')
console.log('━'.repeat(50))
console.log(`📥 VMC DETALLE components: ${vmcAudit.components.all.length}`)
console.log(`📥 SubasCars reference:    ${subascars.inventory_flat.length} components\n`)

const taxonomy = []

for (const vmc of vmcAudit.components.all) {
  const scRef = scIndex[vmc.nombre_ai] || null
  const decision = scRef ? 'referencia-subascars' : 'solo-vmc'

  const entry = {
    // Campo 1: Nombre humano
    nombre_humano: vmc.nombre_humano,

    // Campo 2: Nombre AI / código
    nombre_ai: vmc.nombre_ai,

    // Campo 3: Dominio funcional
    dominio: vmc.dominio,

    // Campo 4: Origen
    origen: scRef ? 'VMC + SubasCars' : 'VMC',

    // Campo 5: Descripción y propósito
    descripcion: buildDescription(vmc, scRef),

    // Campo 6: Anatomía
    anatomia: ANATOMY_ENRICHMENT[vmc.nombre_ai] || vmc.anatomia || ['pendiente-audit-detallado'],

    // Campo 7: Props y schema logic
    props: {
      instancias_en_vmc: vmc.props.instances_found,
      variantes_conocidas: scRef ? scRef.anatomia : ['pendiente-audit'],
      dom_tag_vmc: vmc.props.dom_tag,
      storybook_ref: scRef ? scRef._meta?.storybook_url : null,
    },

    // Campo 8: Tokens (pendiente ib-fundamentos)
    tokens: TOKENS_NOTE,

    // Campo 9: Accesibilidad
    accesibilidad: A11Y_BASE[vmc.nombre_ai] || {
      roles: 'pendiente-audit-a11y',
      keyboard: 'pendiente-audit-a11y',
      notas: 'Audit WCAG 2.1 AA pendiente en ib-componentes'
    },

    // Campo 10: Decisión
    decision,

    // Meta
    _meta: {
      page_source: 'VMC DETALLE — oferta/61204',
      vmc_instances: vmc.props.instances_found,
      subascars_ref: scRef ? scRef.nombre_humano : null,
      decision_razon: decision === 'referencia-subascars'
        ? 'SubasCars tiene este componente → usar como referencia anatómica en ib-componentes (NO portar). VMC manda en UX/comportamiento.'
        : 'No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.',
    }
  }

  taxonomy.push(entry)
  console.log(`   ✅ ${vmc.nombre_humano.padEnd(24)} → ${decision}`)
}

// ─── Group by domain ──────────────────────────────────────────────
const byDomain = {
  'primitivos-tokens':   taxonomy.filter(c => c.dominio === 'primitivos-tokens'),
  'ui-core':             taxonomy.filter(c => c.dominio === 'ui-core'),
  'discovery-navegacion':taxonomy.filter(c => c.dominio === 'discovery-navegacion'),
  'subasta-tiempo-real': taxonomy.filter(c => c.dominio === 'subasta-tiempo-real'),
  'transaccional-cuenta':taxonomy.filter(c => c.dominio === 'transaccional-cuenta'),
}

// ─── Summary ──────────────────────────────────────────────────────
const refSC  = taxonomy.filter(c => c.decision === 'referencia-subascars').length
const soloVMC = taxonomy.filter(c => c.decision === 'solo-vmc').length

console.log(`\n📊 Summary:`)
console.log(`   Total components (DETALLE): ${taxonomy.length}`)
console.log(`   referencia-subascars:       ${refSC}`)
console.log(`   solo-vmc:                   ${soloVMC}`)
console.log(`\n   Por dominio:`)
for (const [d, items] of Object.entries(byDomain)) {
  if (items.length > 0) console.log(`   ${d}: ${items.length}`)
}

// ─── Write JSON ───────────────────────────────────────────────────
mkdirSync(OUTPUT_DIR, { recursive: true })
const jsonOut = {
  _meta: {
    source: 'VMC DETALLE oferta/61204 × SubasCars Storybook',
    phase: 'ib-taxonomia · Task E · Ruta B iteración 1',
    page_scope: 'DETALLE',
    curated_at: new Date().toISOString(),
    total: taxonomy.length,
    referencia_subascars: refSC,
    solo_vmc: soloVMC,
  },
  by_domain: byDomain,
  flat: taxonomy,
}
writeFileSync(OUTPUT_JSON, JSON.stringify(jsonOut, null, 2))

// ─── Write TAXONOMY.md ────────────────────────────────────────────
const md = buildMarkdown(byDomain, jsonOut._meta)
writeFileSync(OUTPUT_MD, md)

console.log(`\n✅ taxonomy-detalle.json → ${OUTPUT_JSON}`)
console.log(`✅ TAXONOMY.md           → ${OUTPUT_MD}`)
console.log('━'.repeat(50))
console.log('Ruta B — iteración 1 completa. Siguiente: ib-componentes para DETALLE.')
console.log('Cuando DETALLE esté construido → volver aquí → audit Homepage → iteración 2.')

// ─── Helpers ──────────────────────────────────────────────────────
function buildDescription(vmc, scRef) {
  const descriptions = {
    'icon':                   'Elemento visual atómico. Comunica acciones, estados y conceptos sin texto. Decorativo o funcional según contexto.',
    'btn':                    'Dispara una acción. Variantes: primario (CTA principal), secundario, ghost, destructivo. Estados: default, hover, focus, disabled, loading.',
    'input':                  'Captura datos del usuario. Tipos: text, email, número, select, etc. Siempre con label visible y manejo de error explícito.',
    'header-primary':         'Identidad y navegación global. Contiene logo, links principales y accesos de cuenta. Persiste en todas las páginas.',
    'nav-primary':            'Navegación entre secciones principales. Indica página activa. Colapsa a hamburger en mobile.',
    'footer-primary':         'Cierre de página. Links legales, redes sociales, información de contacto. Persiste en todas las páginas.',
    'sidebar':                'Panel lateral de filtros para exploración de ofertas. Contiene filtros de precio, tipo, año y marca.',
    'display-price':          'Muestra el precio actual de la subasta. Central en la decisión del postor — debe ser legible, preciso y actualizable en tiempo real.',
    'card-auction':           'Tarjeta de oferta individual. Contiene imagen, título del vehículo, precio actual, timer y CTA de puja.',
    'display-metrics':        'Muestra una métrica clave (views, pujas, participantes). Compacto, legible, puede actualizarse en tiempo real.',
    'table-specs':            'Tabla de especificaciones técnicas del vehículo. Agrupa datos por categoría (motor, carrocería, equipamiento). Crítico para la decisión de compra.',
    'indicator-data-quality': 'Indica el nivel de completitud/calidad de los datos del vehículo. Ayuda al postor a evaluar confiabilidad de la información.',
  }
  return descriptions[vmc.nombre_ai] || `Componente detectado en VMC DETALLE page. ${scRef ? 'Referencia anatómica disponible en SubasCars.' : 'Sin referencia en SubasCars.'}`
}

function buildMarkdown(byDomain, meta) {
  const lines = []

  lines.push(`# TAXONOMY.md — VOYAGER`)
  lines.push(``)
  lines.push(`> **Fase:** ib-taxonomia · Task E · Ruta B`)
  lines.push(`> **Scope actual:** VMC DETALLE (oferta/61204) — iteración 1`)
  lines.push(`> **Curado:** ${new Date().toLocaleDateString('es-PE', { year:'numeric', month:'long', day:'numeric' })}`)
  lines.push(`> **Estado:** 🔄 En construcción — crece page-type por page-type (Ruta B)`)
  lines.push(``)
  lines.push(`---`)
  lines.push(``)
  lines.push(`## Aclaración sobre las decisiones`)
  lines.push(``)
  lines.push(`| Decisión | Significado |`)
  lines.push(`|---|---|`)
  lines.push(`| \`referencia-subascars\` | Existe en SubasCars Storybook → usarla como **referencia anatómica** en ib-componentes. **NO portar código.** VMC manda en UX/comportamiento. SubasCars = alternativa a explorar. Output = componente nuevo, UI upgraded. |`)
  lines.push(`| \`solo-vmc\` | No existe en SubasCars → construir desde audit VMC. Referencia: DOM snapshot + screenshots. |`)
  lines.push(`| \`pendiente-audit\` | Anatomía insuficiente para documentar. Requiere audit adicional. |`)
  lines.push(``)
  lines.push(`---`)
  lines.push(``)

  const domainLabels = {
    'primitivos-tokens':    '## 1 — Primitivos & Tokens',
    'ui-core':              '## 2 — UI Core',
    'discovery-navegacion': '## 3 — Discovery & Navegación',
    'subasta-tiempo-real':  '## 4 — Subasta en Tiempo Real',
    'transaccional-cuenta': '## 5 — Transaccional & Cuenta',
  }

  for (const [domain, components] of Object.entries(byDomain)) {
    if (components.length === 0) continue

    lines.push(domainLabels[domain])
    lines.push(``)

    for (const c of components) {
      lines.push(`### \`${c.nombre_ai}\` — ${c.nombre_humano}`)
      lines.push(``)
      lines.push(`| Campo | Valor |`)
      lines.push(`|---|---|`)
      lines.push(`| **Nombre humano** | ${c.nombre_humano} |`)
      lines.push(`| **Nombre AI** | \`${c.nombre_ai}\` |`)
      lines.push(`| **Dominio** | ${c.dominio} |`)
      lines.push(`| **Origen** | ${c.origen} |`)
      lines.push(`| **Decisión** | \`${c.decision}\` |`)
      lines.push(``)
      lines.push(`**Descripción:** ${c.descripcion}`)
      lines.push(``)
      lines.push(`**Anatomía:**`)
      for (const item of c.anatomia) {
        lines.push(`- ${item}`)
      }
      lines.push(``)
      lines.push(`**Props conocidos:**`)
      lines.push(`- Instancias en VMC DETALLE: ${c.props.instancias_en_vmc}`)
      if (c.props.variantes_conocidas && c.props.variantes_conocidas[0] !== 'pendiente-audit') {
        lines.push(`- Variantes SubasCars: ${c.props.variantes_conocidas.join(', ')}`)
      }
      if (c.props.storybook_ref) {
        lines.push(`- Storybook ref: ${c.props.storybook_ref}`)
      }
      lines.push(``)
      lines.push(`**Tokens:** ${c.tokens}`)
      lines.push(``)
      lines.push(`**Accesibilidad:**`)
      lines.push(`- ARIA roles: ${c.accesibilidad.roles}`)
      lines.push(`- Teclado: ${c.accesibilidad.keyboard}`)
      lines.push(`- Notas: ${c.accesibilidad.notas}`)
      lines.push(``)
      lines.push(`> 📌 **${c._meta.decision_razon}**`)
      lines.push(``)
      lines.push(`---`)
      lines.push(``)
    }
  }

  lines.push(`## Iteraciones pendientes (Ruta B)`)
  lines.push(``)
  lines.push(`| Iteración | Page type | Estado |`)
  lines.push(`|---|---|---|`)
  lines.push(`| 1 | DETALLE (\`/oferta/:id\`) | ✅ Completo |`)
  lines.push(`| 2 | Homepage | ⏳ Pendiente |`)
  lines.push(`| 3 | Listing de ofertas | ⏳ Pendiente |`)
  lines.push(`| 4 | Panel de usuario (loggeado) | ⏳ Pendiente |`)
  lines.push(`| 5 | Flujo de puja activa (postor) | ⏳ Pendiente |`)
  lines.push(``)
  lines.push(`---`)
  lines.push(``)
  lines.push(`*TAXONOMY.md es un documento vivo en Ruta B — crece con cada iteración de audit.*`)
  lines.push(`*No está completo hasta que todas las page types estén auditadas.*`)

  return lines.join('\n')
}
