/**
 * VOYAGER — Storybook Extractor Agent
 * ─────────────────────────────────────────────────────────────────
 * Phase: ib-taxonomia · Task C
 * Source: SubasCars Storybook (subascars-storybook-gcp.web.app)
 *
 * What this does:
 * 1. Fetches the Storybook index.json to get all stories
 * 2. For each story, fetches its args/argTypes (props + variants)
 * 3. Maps each component to the 5 Voyager functional domains
 * 4. Outputs a structured JSON with the 10 taxonomy fields
 *
 * Output: scripts/output/subascars-raw-inventory.json
 * ─────────────────────────────────────────────────────────────────
 */

const STORYBOOK_URL = 'https://subascars-storybook-gcp.web.app'

// ─── 5 Functional Domains ────────────────────────────────────────
const DOMAIN_MAP = {
  'primitivos-tokens': [
    'icon', 'typography', 'resource', 'graphic'
  ],
  'ui-core': [
    'accordion', 'button', 'checkbox', 'dropdown',
    'input', 'textbox', 'text-box', 'pad', 'bubble',
    'bullet', 'keys', 'tag'
  ],
  'discovery-navegacion': [
    'header', 'footer', 'navbar', 'navigation',
    'list', 'list-item', 'filmstrip', 'grid', 'group-header'
  ],
  'subasta-tiempo-real': [
    'bidding', 'opportunity', 'publication', 'card',
    'metrics', 'ranking', 'notification', 'animation',
    'filmstrip-card', 'gallery', 'group'
  ],
  'transaccional-cuenta': [
    'checkout', 'negociation', 'negotiation', 'execution',
    'registration', 'sign-in', 'user-validation', 'widget',
    'transaction', 'confirmation', 'participation',
    'cy-t', 'cyt', 'access', 'restricted'
  ]
}

function inferDomain(storyId, title) {
  const normalized = (storyId + ' ' + title).toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')

  for (const [domain, keywords] of Object.entries(DOMAIN_MAP)) {
    if (keywords.some(k => normalized.includes(k))) {
      return domain
    }
  }
  return 'ui-core' // default fallback
}

function toAIName(humanName) {
  return humanName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// ─── Main Extraction ─────────────────────────────────────────────
async function extractStorybook() {
  console.log('🔍 VOYAGER Storybook Extractor — SubasCars')
  console.log('━'.repeat(50))

  // Step 1: Fetch index
  console.log('\n📡 Fetching Storybook index...')
  const indexRes = await fetch(`${STORYBOOK_URL}/index.json`)
  if (!indexRes.ok) {
    throw new Error(`Failed to fetch index: ${indexRes.status}`)
  }
  const index = await indexRes.json()
  const entries = Object.values(index.entries || {})
  const stories = entries.filter(e => e.type === 'story')
  const components = entries.filter(e => e.type === 'docs' || e.type === 'component')

  console.log(`✅ Found ${stories.length} stories across ${components.length} components`)

  // Step 2: Group by component
  const componentMap = {}
  for (const story of stories) {
    const componentId = story.title
    if (!componentMap[componentId]) {
      componentMap[componentId] = {
        title: story.title,
        stories: [],
        importPath: story.importPath || null
      }
    }
    componentMap[componentId].stories.push({
      name: story.name,
      id: story.id,
      tags: story.tags || []
    })
  }

  // Step 3: Build taxonomy inventory
  console.log('\n🗂️  Building taxonomy inventory...')
  const inventory = []
  let count = 0

  for (const [title, component] of Object.entries(componentMap)) {
    const humanName = title.split('/').pop().trim()
    const domain = inferDomain(title, humanName)
    const variants = component.stories.map(s => s.name)

    const entry = {
      // Field 1: Nombre humano
      nombre_humano: humanName,

      // Field 2: Nombre AI/código
      nombre_ai: toAIName(humanName),

      // Field 3: Dominio funcional
      dominio: domain,

      // Field 4: Origen
      origen: 'SubasCars',

      // Field 5: Descripción y propósito
      descripcion: `Componente de SubasCars — ${title}`,

      // Field 6: Anatomía (variants as proxy)
      anatomia: variants,

      // Field 7: Props / Schema logic
      props: {
        variants_count: variants.length,
        story_ids: component.stories.map(s => s.id),
        storybook_path: title
      },

      // Field 8: Tokens y variables
      tokens: [], // To be enriched in categorization phase

      // Field 9: Accesibilidad
      accesibilidad: {
        auditado: false,
        notas: 'Pendiente audit WCAG — fase categorización'
      },

      // Field 10: Decisión
      decision: 'pendiente-revision',

      // Metadata
      _meta: {
        import_path: component.importPath,
        tags: component.stories.flatMap(s => s.tags),
        storybook_url: `${STORYBOOK_URL}/?path=/story/${component.stories[0]?.id}`
      }
    }

    inventory.push(entry)
    count++
  }

  // Step 4: Organize by domain
  const byDomain = {}
  for (const domain of Object.keys(DOMAIN_MAP)) {
    byDomain[domain] = inventory.filter(c => c.dominio === domain)
  }

  // Step 5: Summary
  console.log('\n📊 Domain Distribution:')
  for (const [domain, items] of Object.entries(byDomain)) {
    console.log(`   ${domain}: ${items.length} components`)
  }
  console.log(`\n   TOTAL: ${count} components extracted`)

  // Step 6: Output
  const output = {
    _meta: {
      source: 'SubasCars Storybook',
      url: STORYBOOK_URL,
      extracted_at: new Date().toISOString(),
      phase: 'ib-taxonomia · Task C',
      total_components: count,
      total_stories: stories.length
    },
    summary: {
      by_domain: Object.fromEntries(
        Object.entries(byDomain).map(([d, items]) => [d, items.length])
      )
    },
    inventory_by_domain: byDomain,
    inventory_flat: inventory
  }

  // Write output
  const { mkdir, writeFile } = await import('fs/promises')
  await mkdir('./scripts/output', { recursive: true })
  await writeFile(
    './scripts/output/subascars-raw-inventory.json',
    JSON.stringify(output, null, 2)
  )

  console.log('\n✅ Output saved: scripts/output/subascars-raw-inventory.json')
  console.log('━'.repeat(50))
  console.log('Next: Run categorization agent to enrich tokens + a11y fields')
  console.log('Then: Cross with VMC audit → TAXONOMY.md')
}

extractStorybook().catch(console.error)
