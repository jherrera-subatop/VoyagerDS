/**
 * VOYAGER — Categorization Agent
 * ─────────────────────────────────────────────────────────────────
 * Phase: ib-taxonomia · Task D
 * Input:  scripts/output/subascars-raw-inventory.json
 * Output: scripts/output/subascars-categorized.json
 *
 * What this does:
 * 1. Deduplicates components (same name, different casing/path)
 * 2. Reclassifies misclassified components to correct domain
 * 3. Enriches with correct AI-native naming (DTCG dialect)
 * 4. Cross-references with VMC DETALLE known components
 * 5. Assigns preliminary decision (port / review / discard)
 * ─────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const raw = JSON.parse(readFileSync('./scripts/output/subascars-raw-inventory.json', 'utf8'))

// ─── Reclassification Rules ───────────────────────────────────────
// Components incorrectly assigned by keyword matcher
const RECLASSIFY = {
  'Cards':           'subasta-tiempo-real',
  'Gallery':         'subasta-tiempo-real',
  'Grid':            'subasta-tiempo-real',
  'Groups':          'subasta-tiempo-real',
  'Days':            'subasta-tiempo-real',
  'Participations':  'transaccional-cuenta',
  'Ranking':         'transaccional-cuenta',
  'RankingV2':       'transaccional-cuenta',
  'AddList':         'transaccional-cuenta',
  'Attention':       'ui-core',
  'Model Value':     'ui-core',
  'Slider':          'ui-core',
  'Subastip':        'ui-core',
  'Wallet':          'transaccional-cuenta',
  'Auction Tracker': 'subasta-tiempo-real',
  'Auction Tracker V2': 'subasta-tiempo-real',
  'User Avatars':    'ui-core',
  'Navigator Bar':   'discovery-navegacion',
  'ActivityCounter': 'ui-core',
  'Activity':        'ui-core',
  'Navigation':      'discovery-navegacion',
}

// ─── AI-Native Naming (DTCG dialect) ─────────────────────────────
const AI_NAMES = {
  'Icons':              'icon',
  'Resources':          'asset-resource',
  'ActivityCounter':    'badge-activity-counter',
  'Activity':           'indicator-activity',
  'Navigation':         'nav-primary',
  'Accordion':          'accordion',
  'Bubble':             'tooltip-bubble',
  'Bullet Drops':       'list-bullet-drop',
  'CTA2':               'btn-cta',
  'Clickable2':         'btn-clickable',
  'Check Box':          'input-checkbox',
  'Dropdown Box':       'input-dropdown',
  'Text Box2':          'input-text',
  'Keys':               'input-key',
  'Pad Value':          'input-pad-value',
  'Attention':          'alert-attention',
  'Model Value':        'display-model-value',
  'Navigator Bar':      'nav-bar',
  'Slider':             'input-slider',
  'Subastip':           'tooltip-subastip',
  'Tags':               'badge-tag',
  'Wallet':             'display-wallet',
  'Auction Tracker':    'tracker-auction',
  'Auction Tracker V2': 'tracker-auction-v2',
  'User Avatars':       'avatar-user',
  'Pad':                'input-pad',
  'Cards':              'card-publication',
  'Gallery':            'gallery-vehicle',
  'Grid':               'grid-publication',
  'Groups':             'group-publication',
  'Days':               'group-days',
  'Header':             'header-primary',
  'Footer':             'footer-primary',
  'List':               'list-primary',
  'List Item':          'list-item',
  'Navbar V2':          'navbar-v2',
  'AddList':            'list-add',
  'Participations':     'list-participations',
  'Ranking':            'list-ranking',
  'RankingV2':          'list-ranking-v2',
  'Metrics':            'display-metrics',
  'ID Card':            'card-id',
  'Group Avatar':       'avatar-group',
  'CTA':                'btn-cta-primary',
  'Display':            'card-display',
  'Mini':               'card-mini',
  'Opportunity':        'card-opportunity',
  'First Login':        'animation-first-login',
  'Negociation':        'widget-negotiation',
  'Welcome Back':       'animation-welcome-back',
  'Transaction':        'widget-transaction',
  'Checkout':           'widget-checkout',
  'Confirmation':       'widget-confirmation',
  'Single':             'widget-single',
  'Cookies':            'modal-cookies',
  'Registration':       'widget-registration',
  'Access':             'widget-access',
  'Informative':        'widget-informative',
  'OpenAccountBusiness':'widget-open-account',
  'Billing':            'widget-billing',
  'Transfer':           'widget-transfer',
  'CheckIn':            'widget-checkin',
  'Debt':               'widget-debt',
  'Pay2Play':           'widget-pay2play',
  'Restricted':         'widget-restricted',
  'Registration2':      'widget-registration-v2',
}

// ─── VMC DETALLE Known Components (from screenshot analysis) ──────
const VMC_DETALLE_COMPONENTS = [
  'header-primary',
  'nav-primary',
  'footer-primary',
  'gallery-vehicle',
  'card-opportunity',
  'card-mini',
  'card-display',
  'btn-cta-primary',
  'display-metrics',
  'accordion',
  'badge-tag',
]

// ─── Deduplication ────────────────────────────────────────────────
function deduplicateComponents(inventory) {
  const seen = new Map()
  const deduplicated = []
  const duplicates = []

  for (const component of inventory) {
    const key = component.nombre_humano.toLowerCase().trim()
    if (seen.has(key)) {
      duplicates.push({
        kept: seen.get(key).nombre_humano,
        discarded: component.nombre_humano,
        path: component._meta?.storybook_url
      })
    } else {
      seen.set(key, component)
      deduplicated.push(component)
    }
  }

  return { deduplicated, duplicates }
}

// ─── Main Processing ──────────────────────────────────────────────
console.log('🗂️  VOYAGER Categorization Agent')
console.log('━'.repeat(50))
console.log(`\n📥 Input: ${raw._meta.total_components} raw components`)

const allComponents = raw.inventory_flat

// Step 1: Deduplicate
const { deduplicated, duplicates } = deduplicateComponents(allComponents)
console.log(`\n🔄 Deduplication:`)
console.log(`   Removed ${duplicates.length} duplicates:`)
duplicates.forEach(d => console.log(`   · "${d.discarded}" → kept "${d.kept}"`))
console.log(`   Remaining: ${deduplicated.length} components`)

// Step 2: Reclassify + Enrich
const enriched = deduplicated.map(component => {
  const name = component.nombre_humano

  // Reclassify if needed
  const domain = RECLASSIFY[name] || component.dominio

  // AI name
  const aiName = AI_NAMES[name] || component.nombre_ai

  // Cross-reference with VMC DETALLE
  const inVMCDetalle = VMC_DETALLE_COMPONENTS.includes(aiName)

  // Preliminary decision
  let decision = 'pendiente-revision'
  if (inVMCDetalle) decision = 'portar-revisar'
  if (['animation-first-login', 'animation-welcome-back'].includes(aiName)) decision = 'revisar-contexto'
  if (['modal-cookies'].includes(aiName)) decision = 'evaluar'

  return {
    ...component,
    nombre_ai: aiName,
    dominio: domain,
    decision,
    _voyager: {
      in_vmc_detalle: inVMCDetalle,
      reclassified: !!RECLASSIFY[name],
      original_domain: component.dominio
    }
  }
})

// Step 3: Organize by domain
const byDomain = {
  'primitivos-tokens': [],
  'ui-core': [],
  'discovery-navegacion': [],
  'subasta-tiempo-real': [],
  'transaccional-cuenta': []
}

for (const c of enriched) {
  if (byDomain[c.dominio]) {
    byDomain[c.dominio].push(c)
  }
}

// Step 4: Summary
console.log('\n📊 Final Domain Distribution:')
let total = 0
for (const [domain, items] of Object.entries(byDomain)) {
  console.log(`   ${domain}: ${items.length} components`)
  total += items.length
}
console.log(`\n   TOTAL: ${total} unique components`)

const vmcMatches = enriched.filter(c => c._voyager.in_vmc_detalle)
console.log(`\n🔗 VMC DETALLE cross-matches: ${vmcMatches.length} components`)
vmcMatches.forEach(c => console.log(`   · ${c.nombre_humano} → ${c.nombre_ai}`))

// Step 5: Output
mkdirSync('./scripts/output', { recursive: true })
const output = {
  _meta: {
    source: 'SubasCars Storybook — categorized',
    phase: 'ib-taxonomia · Task D',
    processed_at: new Date().toISOString(),
    total_raw: raw._meta.total_components,
    duplicates_removed: duplicates.length,
    total_clean: total,
    vmc_detalle_matches: vmcMatches.length
  },
  duplicates_log: duplicates,
  summary: {
    by_domain: Object.fromEntries(
      Object.entries(byDomain).map(([d, items]) => [d, items.length])
    )
  },
  inventory_by_domain: byDomain,
  inventory_flat: enriched
}

writeFileSync(
  './scripts/output/subascars-categorized.json',
  JSON.stringify(output, null, 2)
)

console.log('\n✅ Output saved: scripts/output/subascars-categorized.json')
console.log('━'.repeat(50))
console.log('Next: VMC audit agent → cross both sources → TAXONOMY.md')
