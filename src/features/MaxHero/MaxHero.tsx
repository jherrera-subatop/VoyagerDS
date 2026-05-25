import Link from 'next/link'
import { clsx } from 'clsx'
import type { MaxHeroProps } from './types'

const STYLES = `
  .max-hero-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 28px;
    border-radius: var(--vmc-radius-sm);
    border: none;
    cursor: pointer;
    font-family: var(--vmc-font-display);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--vmc-color-text-inverse);
    background: linear-gradient(132deg,
      var(--vmc-color-orange-500) 0%,
      var(--vmc-color-orange-600) 50%,
      var(--vmc-color-orange-700) 100%);
    box-shadow: 0 4px 20px color-mix(in oklch, var(--vmc-color-orange-600) 50%, transparent);
    transition:
      filter var(--vmc-motion-duration-fast) var(--vmc-motion-easing-standard),
      transform var(--vmc-motion-duration-fast) var(--vmc-motion-easing-standard),
      box-shadow var(--vmc-motion-duration-fast) var(--vmc-motion-easing-standard);
  }
  .max-hero-cta:hover {
    filter: brightness(1.1);
    box-shadow: 0 6px 28px color-mix(in oklch, var(--vmc-color-orange-600) 65%, transparent);
  }
  .max-hero-cta:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 3px;
    filter: brightness(1.05);
  }
  .max-hero-cta:active {
    transform: scale(0.97);
    filter: brightness(0.92);
    box-shadow: 0 2px 10px color-mix(in oklch, var(--vmc-color-orange-600) 35%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    .max-hero-cta {
      transition: none;
    }
  }
`

export default function MaxHero({ eyebrow, headline, body, cta, className }: MaxHeroProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section
        className={clsx(className)}
        style={{
          background: `linear-gradient(135deg, var(--vmc-color-vault-900) 0%, var(--vmc-color-vault-700) 100%)`,
          width: '100%',
          padding: '80px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {eyebrow && <EyebrowBadge text={eyebrow} />}
          <Headline text={headline} />
          <BodyText text={body} />
          <CtaButton href={cta.href} label={cta.label} />
        </div>
      </section>
    </>
  )
}

interface EyebrowBadgeProps {
  text: string
}

function EyebrowBadge({ text }: EyebrowBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: 'var(--vmc-radius-full)',
        backgroundColor: 'color-mix(in oklch, var(--vmc-color-orange-600) 15%, transparent)',
        border: '1px solid color-mix(in oklch, var(--vmc-color-orange-600) 40%, transparent)',
        fontFamily: 'var(--vmc-font-display)',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--vmc-color-orange-400)',
      }}
    >
      <LiveDot />
      {text}
    </span>
  )
}

function LiveDot() {
  return (
    <span
      style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'var(--vmc-color-orange-500)',
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  )
}

interface HeadlineProps {
  text: string
}

function Headline({ text }: HeadlineProps) {
  return (
    <h1
      style={{
        fontFamily: 'var(--vmc-font-display)',
        fontSize: 'clamp(36px, 5vw, 56px)',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--vmc-color-text-inverse)',
        margin: 0,
      }}
    >
      {text}
    </h1>
  )
}

interface BodyTextProps {
  text: string
}

function BodyText({ text }: BodyTextProps) {
  return (
    <p
      style={{
        fontFamily: 'var(--vmc-font-body)',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.7,
        color: 'var(--vmc-color-text-on-dark-muted)',
        margin: 0,
        maxWidth: '540px',
      }}
    >
      {text}
    </p>
  )
}

interface CtaButtonProps {
  href: string
  label: string
}

function CtaButton({ href, label }: CtaButtonProps) {
  return (
    <Link href={href} className="max-hero-cta" aria-label={label}>
      {label}
    </Link>
  )
}
