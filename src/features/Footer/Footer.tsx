import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import {
  FOOTER_BRAND_DESCRIPTION,
  FOOTER_BOTTOM_LINKS,
  FOOTER_COPYRIGHT,
  FOOTER_NAV_COLUMNS,
  FOOTER_SOCIAL_LINKS,
} from './constants';
import { FooterProps } from './types';

const FOOTER_PSEUDO_STYLES = `
  .footer-nav-link {
    color: var(--vmc-color-text-on-dark-muted);
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-standard);
  }
  .footer-nav-link:hover {
    color: var(--vmc-color-text-inverse);
  }
  .footer-nav-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }
  .footer-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    color: var(--vmc-color-text-on-dark-muted);
    transition: color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard);
  }
  .footer-social-link:hover {
    color: var(--vmc-color-text-inverse);
    background-color: rgba(255, 255, 255, 0.1);
  }
  .footer-social-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 50%;
  }
  .footer-libro-reclamaciones {
    display: block;
    transition: opacity var(--duration-fast) var(--ease-standard);
  }
  .footer-libro-reclamaciones:hover {
    opacity: 0.85;
  }
  .footer-libro-reclamaciones:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .footer-nav-link,
    .footer-social-link,
    .footer-libro-reclamaciones {
      transition: none !important;
    }
  }
`;

export default function Footer({ className }: FooterProps) {
  return (
    <>
      <style>{FOOTER_PSEUDO_STYLES}</style>
      <footer
        role="contentinfo"
        className={clsx('w-full', className)}
        style={{ backgroundColor: 'var(--vmc-color-background-brand)' }}
      >
        {/* Top section */}
        <div
          style={{
            maxWidth: '1024px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            padding: '64px 32px 48px',
          }}
        >
          {/* Brand column */}
          <FooterBrandColumn />

          {/* Nav columns — each in its own grid cell */}
          {FOOTER_NAV_COLUMNS.map(function renderNavColumn(col) {
            return (
              <FooterNavColumnBlock
                key={col.heading || col.links[0]?.label}
                column={col}
              />
            );
          })}

          {/* Libro de Reclamaciones — requerimiento legal Perú */}
          <FooterReclamacionesBlock />
        </div>

        {/* Bottom bar — background shift, no border */}
        <FooterBottomBar />
      </footer>
    </>
  );
}

function FooterBrandColumn() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Logo + brand name */}
      <div>
        <Image
          src="/images/vmc-logo-white.svg"
          alt="VMC Subastas"
          width={120}
          height={32}
          style={{ objectFit: 'contain', display: 'block', marginBottom: '8px' }}
        />
        <span
          style={{
            display: 'block',
            color: 'var(--vmc-color-text-on-dark-subtle)',
            fontSize: '12px',
            lineHeight: '16px',
          }}
        >
          {FOOTER_BRAND_DESCRIPTION}
        </span>
      </div>

      {/* Social icons */}
      <nav aria-label="Redes sociales">
        <ul
          style={{
            display: 'flex',
            gap: '16px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {FOOTER_SOCIAL_LINKS.map(function renderSocialLink(social) {
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="footer-social-link"
                >
                  <FooterSocialIcon name={social.label} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

interface FooterNavColumnBlockProps {
  column: { heading: string; links: { label: string; href: string }[] };
}

function FooterNavColumnBlock({ column }: FooterNavColumnBlockProps) {
  const navAriaLabel = column.heading !== '' ? column.heading : undefined;

  return (
    <nav aria-label={navAriaLabel}>
      {column.heading && (
        <p
          style={{
            color: 'var(--vmc-color-text-inverse)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: 0.8,
          }}
        >
          {column.heading}
        </p>
      )}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {column.links.map(function renderNavLink(link) {
          return (
            <li key={link.label}>
              <Link href={link.href} className="footer-nav-link">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function FooterReclamacionesBlock() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      <a
        href="https://www.vmcsubastas.com/libro-de-reclamaciones"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Libro de Reclamaciones VMC Subastas"
        className="footer-libro-reclamaciones"
      >
        <Image
          src="/images/libro-reclamaciones.png"
          alt="Libro de Reclamaciones"
          width={80}
          height={48}
          style={{ objectFit: 'contain' }}
        />
      </a>
      <span
        style={{
          color: 'var(--vmc-color-text-on-dark-muted)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Libro de Reclamaciones
      </span>
    </div>
  );
}

function FooterBottomBar() {
  return (
    <div
      style={{
        background: 'color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0))',
        width: '100%',
        padding: '24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Copyright */}
        <p
          style={{
            color: 'var(--vmc-color-text-on-dark-subtle)',
            fontSize: '12px',
            lineHeight: '16px',
            margin: 0,
          }}
        >
          {FOOTER_COPYRIGHT}
        </p>

        {/* Bottom links — only render when there are links */}
        {FOOTER_BOTTOM_LINKS.length > 0 && (
          <nav aria-label="Links de pie de página">
            <ul
              style={{
                display: 'flex',
                gap: '16px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {FOOTER_BOTTOM_LINKS.map(function renderBottomLink(link) {
                return (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-nav-link">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

interface FooterSocialIconProps {
  name: string;
}

function FooterSocialIcon({ name }: FooterSocialIconProps) {
  if (name === 'Facebook') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (name === 'YouTube') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="var(--vmc-color-background-brand)" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    );
  }
  if (name === 'Instagram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (name === 'LinkedIn') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  return null;
}
