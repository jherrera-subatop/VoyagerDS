/**
 * FooterDone.tsx — Footer DONE (Design System · Figma MCP → tokens DS)
 * Pixel-perfect · Figma node 1:1017 · VMC 2026 Design System
 *
 * Handoff checklist:
 * ✓ HTML semántico (footer, nav, ul, a)
 * ✓ Accesibilidad: role, aria-label, alt, aria-hidden
 * ✓ Responsive: 1 col mobile → 2 cols sm → 4 cols lg
 * ✓ Tailwind layout + spacing; tokens DS para color
 * ✓ Hover/focus via Tailwind + style tag para pseudo-clases con var()
 * ✓ TypeScript estricto · sin any · sin ternarios · funciones nominales
 * ✓ Default export · sin props (contenido canónico hardcodeado)
 */

import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

// ---------------------------------------------------------------------------
// Props — canónico sin props; overrides opcionales solo para docs/preview
// ---------------------------------------------------------------------------

export interface FooterDoneProps {
  /** Override del logo — solo para preview en docs. En producción omitir. */
  logoSrc?: string;
  /** Override del libro de reclamaciones — solo para preview en docs. En producción omitir. */
  reclamacionesSrc?: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  ariaLabel: string;
}

const BRAND_DESCRIPTION =
  "Ecosistema digital de subastas de autos basado en comunidad y tecnología.";

const COPYRIGHT =
  "© 2026 VMC Subastas es una marca registrada de Subastop S.A.C. Todos los derechos reservados.";

const PLATAFORMA_LINKS: NavLink[] = [
  { label: "SubasCars",                                         href: "https://subascars.com" },
  { label: "SubasBlog",                                         href: "/blog" },
  { label: "¿Quiénes somos?",                                   href: "/quienes-somos" },
  { label: "¿Cómo vender?",                                     href: "/como-vender" },
  { label: "¿Cómo obtener acceso ilimitado a las subastas?",    href: "/subaspass" },
  { label: "BlackSheep Nation",                                 href: "/blacksheep-nation" },
];

const LEGAL_LINKS: NavLink[] = [
  { label: "Condiciones y Términos",                            href: "/condiciones" },
  { label: "Política de Protección de Datos Personales",        href: "/politica-proteccion-datos" },
  { label: "Política de privacidad General",                    href: "/politica-privacidad" },
  { label: "Testimonios",                                       href: "/testimonios" },
];

const CONTACTO_LINK: NavLink = { label: "Contáctanos", href: "/contacto" };

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook",  href: "https://facebook.com/vmcsubastas",  ariaLabel: "Síguenos en Facebook"  },
  { label: "Instagram", href: "https://instagram.com/vmcsubastas", ariaLabel: "Síguenos en Instagram" },
  { label: "YouTube",   href: "https://youtube.com/vmcsubastas",   ariaLabel: "Síguenos en YouTube"   },
  { label: "X",         href: "https://x.com/vmcsubastas",         ariaLabel: "Síguenos en X"         },
];

const BOTTOM_LINKS: NavLink[] = [
  { label: "Política de Cookies", href: "/politica-cookies"  },
  { label: "Mapa del Sitio",      href: "/mapa-del-sitio"    },
  { label: "Accesibilidad",       href: "/accesibilidad"     },
];

// ---------------------------------------------------------------------------
// Pseudo-class styles (color tokens no pueden expresarse en Tailwind utilities)
// ---------------------------------------------------------------------------

const STYLES = `
  /* ── Interactive states ─────────────────────────────────────────── */
  .fd-link {
    color: var(--vmc-color-text-on-dark-muted);
    text-decoration: none;
    transition: opacity 150ms ease;
  }
  .fd-link:hover  { opacity: 0.85; }
  .fd-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }
  .fd-social {
    color: var(--vmc-color-text-on-dark-muted);
    transition: color 150ms ease, background-color 150ms ease;
  }
  .fd-social:hover {
    color: var(--vmc-color-text-inverse);
    background-color: rgba(255,255,255,0.10);
  }
  .fd-social:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 50%;
  }
  .fd-reclamaciones:hover  { opacity: 0.85; }
  .fd-reclamaciones:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* ── Container query context ────────────────────────────────────── */
  /* footer[role="contentinfo"] es el container — responde a su propio ancho,
     no al viewport del navegador. Funciona correctamente en el viewport switcher
     del DS y en producción. */
  footer {
    container-type: inline-size;
    container-name: fd;
  }

  /* ── Responsive layout — mobile first ───────────────────────────── */
  .fd-top-inner {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .fd-brand-col {
    width: 100%;
  }
  .fd-nav-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* ── sm: ≥ 640px del contenedor ─────────────────────────────────── */
  @container fd (min-width: 640px) {
    .fd-nav-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* ── lg: ≥ 1024px del contenedor ────────────────────────────────── */
  @container fd (min-width: 1024px) {
    .fd-top-inner {
      flex-direction: row;
      gap: 48px;
    }
    .fd-brand-col {
      width: 192px;
      flex-shrink: 0;
    }
    .fd-nav-grid {
      flex: 1;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }
  }

  /* ── Bottom bar ──────────────────────────────────────────────────── */
  .fd-bottom-inner {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 1024px;
    margin: 0 auto;
    padding: 16px 32px;
  }
  @container fd (min-width: 640px) {
    .fd-bottom-inner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fd-link, .fd-social, .fd-reclamaciones { transition: none !important; }
  }
`;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function FooterDone({ logoSrc, reclamacionesSrc }: FooterDoneProps): JSX.Element {
  const resolvedLogoSrc         = logoSrc          ?? "/images/vmc-logo-white.png";
  const resolvedReclamacionesSrc = reclamacionesSrc ?? "/images/libro-reclamaciones.png";

  return (
    <>
      <style>{STYLES}</style>
      <footer
        className="w-full"
        style={{ backgroundColor: "var(--vmc-color-background-brand)" }}
      >
        {/* ── Top section ───────────────────────────────────────────── */}
        <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 32px 40px" }}>
          {/*
           * Responsive layout via .fd-* CSS classes (container queries in STYLES):
           * mobile → 1 col · sm → 2 cols nav · lg → brand(192px) + 3 cols nav
           */}
          <div className="fd-top-inner">
            {/* Brand — ancho fijo en desktop */}
            <div className="fd-brand-col">
              <BrandColumn logoSrc={resolvedLogoSrc} />
            </div>
            {/* 3 columnas nav */}
            <div className="fd-nav-grid">
              <NavColumn heading="Plataforma"         links={PLATAFORMA_LINKS} />
              <NavColumn heading="Legal & Compliance" links={LEGAL_LINKS}      />
              <ContactoColumn reclamacionesSrc={resolvedReclamacionesSrc} />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <BottomBar />
      </footer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Brand column
// ---------------------------------------------------------------------------

interface BrandColumnProps { logoSrc: string; }

function BrandColumn({ logoSrc }: BrandColumnProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={logoSrc}
        alt="VMC Subastas"
        width={120}
        height={32}
        className="object-contain"
        unoptimized
      />
      <p
        className="text-xs leading-5"
        style={{ color: "var(--vmc-color-text-on-dark-muted)" }}
      >
        {BRAND_DESCRIPTION}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generic nav column
// ---------------------------------------------------------------------------

interface NavColumnProps {
  heading: string;
  links: NavLink[];
}

function NavColumn({ heading, links }: NavColumnProps): JSX.Element {
  return (
    <nav aria-label={heading} className="flex flex-col gap-4">
      <p
        className="text-sm font-bold leading-5"
        style={{ color: "var(--vmc-color-text-inverse)", opacity: 0.8 }}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-2 list-none p-0 m-0">
        {links.map(function renderLink(link) {
          return (
            <li key={link.label}>
              <Link href={link.href} className="fd-link text-xs leading-5">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Contacto column — heading + link + socials + reclamaciones
// ---------------------------------------------------------------------------

interface ContactoColumnProps { reclamacionesSrc: string; }

function ContactoColumn({ reclamacionesSrc }: ContactoColumnProps): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      {/* Contacto */}
      <div className="flex flex-col gap-4">
        <p
          className="text-sm font-bold leading-5"
          style={{ color: "var(--vmc-color-text-inverse)", opacity: 0.8 }}
        >
          Contacto
        </p>
        <Link href={CONTACTO_LINK.href} className="fd-link text-xs leading-5">
          {CONTACTO_LINK.label}
        </Link>
      </div>

      {/* Encuéntranos en */}
      <div className="flex flex-col gap-4">
        <p
          className="text-sm font-bold leading-5"
          style={{ color: "var(--vmc-color-text-inverse)", opacity: 0.8 }}
        >
          Encuéntranos en
        </p>
        <nav aria-label="Redes sociales">
          <ul className="flex gap-3 list-none p-0 m-0">
            {SOCIAL_LINKS.map(function renderSocial(social) {
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="fd-social flex items-center justify-center w-8 h-8 rounded-full"
                  >
                    <SocialIcon name={social.label} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Libro de Reclamaciones */}
      <ReclamacionesBlock reclamacionesSrc={reclamacionesSrc} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Libro de Reclamaciones
// ---------------------------------------------------------------------------

interface ReclamacionesBlockProps { reclamacionesSrc: string; }

function ReclamacionesBlock({ reclamacionesSrc }: ReclamacionesBlockProps): JSX.Element {
  return (
    <a
      href="https://www.vmcsubastas.com/libro-de-reclamaciones"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Libro de Reclamaciones VMC Subastas"
      className="fd-reclamaciones flex items-center gap-2 no-underline"
    >
      <Image
        src={reclamacionesSrc}
        alt="Libro de Reclamaciones"
        width={86}
        height={35}
        className="object-contain shrink-0"
        unoptimized={reclamacionesSrc.startsWith("data:")}
      />
      <span
        className="text-xs font-semibold leading-5"
        style={{ color: "var(--vmc-color-text-inverse)" }}
      >
        Libros de reclamaciones
      </span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Bottom bar
// ---------------------------------------------------------------------------

function BottomBar(): JSX.Element {
  return (
    <div
      className="w-full"
      style={{
        background:
          "color-mix(in oklch, var(--vmc-color-background-brand) 85%, var(--vmc-color-text-primary))",
      }}
    >
      <div className="fd-bottom-inner">
        {/* Copyright */}
        <p
          className="text-xs leading-5 m-0"
          style={{
            color: "var(--vmc-color-text-on-dark-subtle)",
            opacity: 0.75,
          }}
        >
          {COPYRIGHT}
        </p>

        {/* Bottom links */}
        <nav aria-label="Links de pie de página">
          <ul className="flex flex-wrap items-center gap-0 list-none p-0 m-0">
            {BOTTOM_LINKS.map(function renderBottomLink(link, index) {
              return (
                <li key={link.label} className="flex items-center">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="text-xs px-3"
                      style={{
                        color: "var(--vmc-color-text-on-dark-subtle)",
                        opacity: 0.5,
                      }}
                    >
                      •
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="fd-link text-xs leading-5"
                    style={{ opacity: 0.75 }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social icons — SVG inline, sin dependencias externas
// ---------------------------------------------------------------------------

interface SocialIconProps {
  name: string;
}

function SocialIcon({ name }: SocialIconProps): JSX.Element | null {
  if (name === "Facebook") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (name === "YouTube") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.53C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" style={{ fill: "var(--vmc-color-background-brand)" }} />
      </svg>
    );
  }
  if (name === "X") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return null;
}
