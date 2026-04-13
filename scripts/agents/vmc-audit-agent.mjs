/**
 * VOYAGER — VMC Audit Agent
 * ─────────────────────────────────────────────────────────────────
 * Phase: ib-taxonomia · Task B
 * Target: VMC Subastas — DETALLE page (sin login)
 *
 * What this does:
 * 1. Navigates to VMC Subastas and finds a DETALLE page
 * 2. Takes full-page screenshot
 * 3. Extracts DOM structure to identify component patterns
 * 4. Maps found components to the 5 Voyager functional domains
 * 5. Cross-references with SubasCars categorized inventory
 * 6. Outputs: screenshots + component inventory JSON
 *
 * Access level: no-loggeado (public view)
 * Next runs: loggeado, postor-activo (requires credentials)
 *
 * Output: scripts/output/vmc-audit/
 * ─────────────────────────────────────────────────────────────────
 */

import { chromium } from 'playwright'
import { mkdirSync, writeFileSync, readFileSync } from 'fs'

const DETALLE_URL = 'https://www.vmcsubastas.com/oferta/61204'
const OUTPUT_DIR = './scripts/output/vmc-audit'
const SUBASCARS_DATA = './scripts/output/subascars-categorized.json'

// Load SubasCars inventory for cross-reference
const subascars = JSON.parse(readFileSync(SUBASCARS_DATA, 'utf8'))
const subascarsNames = new Set(subascars.inventory_flat.map(c => c.nombre_ai))

// ─── Component Patterns to detect in DOM ─────────────────────────
const COMPONENT_PATTERNS = [
  // Domain 1: Primitivos
  { selector: 'svg, img[src*="icon"]', name: 'Icon', domain: 'primitivos-tokens', ai_name: 'icon' },

  // Domain 2: UI Core
  { selector: '[class*="accordion"], details, [data-accordion]', name: 'Accordion', domain: 'ui-core', ai_name: 'accordion' },
  { selector: 'button, [role="button"]', name: 'Button', domain: 'ui-core', ai_name: 'btn' },
  { selector: 'input, textarea, select', name: 'Input', domain: 'ui-core', ai_name: 'input' },
  { selector: '[class*="badge"], [class*="tag"], [class*="chip"]', name: 'Badge/Tag', domain: 'ui-core', ai_name: 'badge-tag' },
  { selector: '[class*="tooltip"], [class*="bubble"]', name: 'Tooltip', domain: 'ui-core', ai_name: 'tooltip' },
  { selector: '[class*="alert"], [class*="banner"], [role="alert"]', name: 'Alert/Banner', domain: 'ui-core', ai_name: 'alert' },
  { selector: '[class*="modal"], [role="dialog"]', name: 'Modal', domain: 'ui-core', ai_name: 'modal' },

  // Domain 3: Discovery & Navegación
  { selector: 'header, [class*="header"]', name: 'Header', domain: 'discovery-navegacion', ai_name: 'header-primary' },
  { selector: 'nav, [class*="navbar"], [class*="nav-bar"], [role="navigation"]', name: 'Navbar', domain: 'discovery-navegacion', ai_name: 'nav-primary' },
  { selector: 'footer, [class*="footer"]', name: 'Footer', domain: 'discovery-navegacion', ai_name: 'footer-primary' },
  { selector: '[class*="breadcrumb"]', name: 'Breadcrumb', domain: 'discovery-navegacion', ai_name: 'breadcrumb' },
  { selector: '[class*="sidebar"], aside', name: 'Sidebar', domain: 'discovery-navegacion', ai_name: 'sidebar' },
  { selector: '[class*="pagination"]', name: 'Pagination', domain: 'discovery-navegacion', ai_name: 'pagination' },
  { selector: '[class*="filter"], [class*="facet"]', name: 'Filter', domain: 'discovery-navegacion', ai_name: 'filter' },
  { selector: '[class*="search"]', name: 'Search', domain: 'discovery-navegacion', ai_name: 'search' },

  // Domain 4: Subasta en Tiempo Real
  { selector: '[class*="countdown"], [class*="timer"]', name: 'CountdownTimer', domain: 'subasta-tiempo-real', ai_name: 'timer-countdown' },
  { selector: '[class*="price"], [class*="precio"]', name: 'PriceDisplay', domain: 'subasta-tiempo-real', ai_name: 'display-price' },
  { selector: '[class*="gallery"], [class*="carousel"], [class*="slider"]', name: 'Gallery', domain: 'subasta-tiempo-real', ai_name: 'gallery-vehicle' },
  { selector: '[class*="card"], [class*="vehicle"], [class*="lot"]', name: 'AuctionCard', domain: 'subasta-tiempo-real', ai_name: 'card-auction' },
  { selector: '[class*="bid"], [class*="puja"]', name: 'BidWidget', domain: 'subasta-tiempo-real', ai_name: 'widget-bid' },
  { selector: '[class*="status"], [class*="estado"]', name: 'StatusBadge', domain: 'subasta-tiempo-real', ai_name: 'badge-status' },
  { selector: '[class*="metric"], [class*="stat"], [class*="counter"]', name: 'Metrics', domain: 'subasta-tiempo-real', ai_name: 'display-metrics' },

  // Domain 5: Transaccional & Cuenta
  { selector: '[class*="download"], [class*="descarga"]', name: 'DownloadRow', domain: 'transaccional-cuenta', ai_name: 'row-download' },
  { selector: '[class*="spec"], [class*="specs"], [class*="detail"]', name: 'VehicleSpecs', domain: 'transaccional-cuenta', ai_name: 'table-specs' },
  { selector: '[class*="quality"], [class*="calidad"]', name: 'DataQualityIndicator', domain: 'transaccional-cuenta', ai_name: 'indicator-data-quality' },
  { selector: '[class*="document"], [class*="archivo"]', name: 'DocumentSection', domain: 'transaccional-cuenta', ai_name: 'section-documents' },
  { selector: '[class*="help"], [class*="ayuda"], [class*="support"]', name: 'HelpBanner', domain: 'transaccional-cuenta', ai_name: 'banner-help' },
]

async function runVMCAudit() {
  console.log('🔍 VOYAGER VMC Audit Agent')
  console.log('━'.repeat(50))
  console.log(`🌐 Target: ${DETALLE_URL}`)
  console.log(`📋 Access level: no-loggeado`)
  console.log(`📦 SubasCars reference: ${subascarsNames.size} components loaded\n`)

  mkdirSync(`${OUTPUT_DIR}/screenshots`, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  })
  const page = await context.newPage()
  const foundComponents = []

  try {
    // ── Step 1: Navigate directly to DETALLE ────────────────────
    console.log('📡 Step 1: Navigating directly to DETALLE...')
    await page.goto(DETALLE_URL, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)

    // ── Step 2: Screenshot DETALLE ───────────────────────────────
    const currentUrl = page.url()
    console.log(`\n📸 Step 2: Capturing DETALLE screenshots...`)
    console.log(`   Current URL: ${currentUrl}`)

    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshots/01-detalle-full.png`,
      fullPage: true
    })
    console.log('   ✅ Full page captured')

    // Viewport screenshot (above the fold)
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshots/02-detalle-viewport.png`,
      fullPage: false
    })
    console.log('   ✅ Viewport (above fold) captured')

    // ── Step 3: Extract DOM components ──────────────────────────
    console.log(`\n🔬 Step 3: Extracting DOM component patterns...`)

    for (const pattern of COMPONENT_PATTERNS) {
      const result = await page.evaluate((sel) => {
        const elements = document.querySelectorAll(sel)
        if (elements.length === 0) return null

        const sample = elements[0]
        return {
          count: elements.length,
          tag: sample.tagName.toLowerCase(),
          classes: Array.from(sample.classList).slice(0, 5),
          hasText: sample.textContent?.trim().substring(0, 50) || '',
          hasChildren: sample.children.length
        }
      }, pattern.selector)

      if (result && result.count > 0) {
        const isInSubasCars = subascarsNames.has(pattern.ai_name)
        foundComponents.push({
          nombre_humano: pattern.name,
          nombre_ai: pattern.ai_name,
          dominio: pattern.domain,
          origen: 'VMC',
          descripcion: `Componente detectado en VMC DETALLE page`,
          anatomia: [pattern.selector],
          props: {
            instances_found: result.count,
            dom_tag: result.tag,
            sample_classes: result.classes,
            sample_text: result.hasText
          },
          tokens: [],
          accesibilidad: { auditado: false, notas: 'Pendiente audit WCAG' },
          decision: isInSubasCars ? 'ya-en-subascars' : 'crear-o-evaluar',
          _vmc: {
            detected_by: pattern.selector,
            in_subascars: isInSubasCars,
            page_url: currentUrl
          }
        })
        console.log(`   ✅ ${pattern.name} — ${result.count} instances ${isInSubasCars ? '(en SubasCars)' : '(NUEVO)'}`)
      }
    }

    // ── Step 4: Extract page structure ──────────────────────────
    console.log(`\n🏗️  Step 4: Extracting page structure...`)
    const pageStructure = await page.evaluate(() => {
      const structure = {
        title: document.title,
        url: window.location.href,
        sections: [],
        total_elements: document.querySelectorAll('*').length
      }

      // Map major sections
      const sections = document.querySelectorAll('section, main, aside, article, [class*="section"], [class*="container"]')
      sections.forEach((el, i) => {
        if (i < 20) {
          structure.sections.push({
            tag: el.tagName.toLowerCase(),
            classes: Array.from(el.classList).slice(0, 3).join(' '),
            children: el.children.length
          })
        }
      })
      return structure
    })

    console.log(`   Page: "${pageStructure.title}"`)
    console.log(`   Total DOM elements: ${pageStructure.total_elements}`)
    console.log(`   Major sections found: ${pageStructure.sections.length}`)

    // ── Step 5: Identify NEW components (not in SubasCars) ──────
    const newComponents = foundComponents.filter(c => !c._vmc.in_subascars)
    const existingComponents = foundComponents.filter(c => c._vmc.in_subascars)

    console.log(`\n📊 Results:`)
    console.log(`   Total detected: ${foundComponents.length} component types`)
    console.log(`   Already in SubasCars: ${existingComponents.length}`)
    console.log(`   NEW (not in SubasCars): ${newComponents.length}`)

    if (newComponents.length > 0) {
      console.log(`\n   🆕 New components to create/evaluate:`)
      newComponents.forEach(c => console.log(`      · ${c.nombre_humano} (${c.dominio})`))
    }

    // ── Output ───────────────────────────────────────────────────
    const output = {
      _meta: {
        source: 'VMC Subastas — live audit',
        target_page: 'DETALLE',
        access_level: 'no-loggeado',
        phase: 'ib-taxonomia · Task B',
        audited_at: new Date().toISOString(),
        page_url: currentUrl,
        total_dom_elements: pageStructure.total_elements
      },
      summary: {
        total_component_types: foundComponents.length,
        in_subascars: existingComponents.length,
        new_components: newComponents.length,
        screenshots: [
          '01-detalle-full.png',
          '02-detalle-viewport.png'
        ]
      },
      page_structure: pageStructure,
      components: {
        all: foundComponents,
        new_only: newComponents,
        in_subascars: existingComponents
      }
    }

    writeFileSync(
      `${OUTPUT_DIR}/vmc-detalle-audit.json`,
      JSON.stringify(output, null, 2)
    )

    console.log(`\n✅ Output saved: ${OUTPUT_DIR}/vmc-detalle-audit.json`)
    console.log(`✅ Screenshots saved: ${OUTPUT_DIR}/screenshots/`)

  } catch (error) {
    console.error('❌ Error:', error.message)
    await page.screenshot({
      path: `${OUTPUT_DIR}/screenshots/error-state.png`,
      fullPage: true
    })
    console.log('   Error screenshot saved')
  } finally {
    await browser.close()
  }

  console.log('\n━'.repeat(50))
  console.log('Next: Cross VMC + SubasCars → TAXONOMY.md')
}

runVMCAudit().catch(console.error)
