import MaxHero from '@/features/MaxHero'
import { MAX_HERO_DEFAULTS } from '@/features/MaxHero'

export default function MaxHeroPreviewPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--vmc-color-background-primary)' }}>
      <MaxHero
        eyebrow={MAX_HERO_DEFAULTS.eyebrow}
        headline={MAX_HERO_DEFAULTS.headline}
        body={MAX_HERO_DEFAULTS.body}
        cta={MAX_HERO_DEFAULTS.cta}
      />
    </main>
  )
}
