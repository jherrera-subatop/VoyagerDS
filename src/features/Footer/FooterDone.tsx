/**
 * FooterDone.tsx — Footer corregido (Figma node 184:1436)
 * Correcciones aplicadas vs. Figma original:
 *   · Layout: 4 columnas equidistantes (CSS grid repeat(4,1fr) + space-between)
 *   · Text styles: heading-sm / body-sm / caption del DS (en vez de estilos locales)
 *   · Colores: 100% variables semánticas — ningún HEX ni rgba hardcodeado
 *   · Spacing: var(--vmc-space-*) en todos los gaps y paddings
 *   · Bottom bar: border-top con color/border/subtle (no background-shift)
 *   · Token reclamaciones: text/inverse (corregido de semanticos/surface/page)
 */

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, JSX } from "react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface FooterDoneProps {
  logoSrc?: string;
  reclamacionesSrc?: string;
}

// ---------------------------------------------------------------------------
// Data — fuente: vmcsubastas.com (audit Figma node 184:1436, 2026-05-03)
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

const BRAND_DESCRIPTION = "powered by SUBASTOP.Co";

const COPYRIGHT_LINE_1 =
  "© VMC Subastas es una marca registrada de Subastop S.A.C.";
const COPYRIGHT_LINE_2 = "Todos los derechos reservados 2026";

const PLATAFORMA_LINKS: NavLink[] = [
  { label: "SubasCars",         href: "https://subascars.com"    },
  { label: "SubasBlog",         href: "/blog"                    },
  { label: "¿Quiénes somos?",   href: "/quienes-somos"           },
  { label: "¿Cómo vender?",     href: "/como-vender"             },
  { label: "Subaspass",         href: "/subaspass"               },
  { label: "BlackSheep Nation", href: "/blacksheep-nation"       },
];

const LEGAL_LINKS: NavLink[] = [
  { label: "Condiciones y Términos",                       href: "/condiciones"               },
  { label: "Política de Protección de Datos Personales",   href: "/politica-proteccion-datos" },
  { label: "Política de privacidad General",               href: "/politica-privacidad"       },
  { label: "Testimonios",                                  href: "/testimonios"               },
  { label: "Canal de denuncias",                           href: "/canal-denuncias"           },
];

const CONTACTO_LINK: NavLink = { label: "Contáctanos", href: "/contacto" };

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook",  href: "https://facebook.com/vmcsubastas",  ariaLabel: "Síguenos en Facebook"  },
  { label: "YouTube",   href: "https://youtube.com/vmcsubastas",   ariaLabel: "Síguenos en YouTube"   },
  { label: "X",         href: "https://x.com/vmcsubastas",         ariaLabel: "Síguenos en X"         },
  { label: "Instagram", href: "https://instagram.com/vmcsubastas", ariaLabel: "Síguenos en Instagram" },
];

// ---------------------------------------------------------------------------
// Text style tokens (DS scale — ningún componente crea estilos nuevos)
// heading-sm : Plus Jakarta Sans / 18px / lh 24px / w500
// body-sm    : Roboto            / 14px / lh 20px / w400
// caption    : Roboto            / 12px / lh 16px / w400
// ---------------------------------------------------------------------------

const TS_HEADING_SM: CSSProperties = {
  fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
  fontSize: "18px",
  lineHeight: "24px",
  fontWeight: 500,
  margin: 0,
};

const TS_BODY_SM: CSSProperties = {
  fontFamily: "var(--font-body, 'Roboto', sans-serif)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
};

const TS_CAPTION: CSSProperties = {
  fontFamily: "var(--font-body, 'Roboto', sans-serif)",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  margin: 0,
};

// ---------------------------------------------------------------------------
// Pseudo-class & layout styles — color tokens no expresables en Tailwind utils
// ---------------------------------------------------------------------------

const STYLES = `
  /* ── Container query ───────────────────────────────────────────── */
  footer[data-footer-done] {
    container-type: inline-size;
    container-name: fd;
  }

  /* ── Interactive: nav links ─────────────────────────────────────── */
  .fd-link {
    color: var(--vmc-color-text-on-dark-muted);
    text-decoration: none;
    font-family: var(--font-body, 'Roboto', sans-serif);
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    transition: opacity 150ms ease;
  }
  .fd-link:hover  { opacity: 0.75; }
  .fd-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* ── Interactive: social icons ──────────────────────────────────── */
  .fd-social {
    color: var(--vmc-color-text-on-dark-muted);
    transition: color 150ms ease, background-color 150ms ease;
  }
  .fd-social:hover {
    color: var(--vmc-color-text-inverse);
    background-color: color-mix(in oklch, var(--vmc-color-text-inverse) 10%, transparent);
  }
  .fd-social:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 50%;
  }

  /* ── Interactive: libro de reclamaciones ───────────────────────── */
  .fd-reclamaciones { transition: opacity 150ms ease; }
  .fd-reclamaciones:hover { opacity: 0.8; }
  .fd-reclamaciones:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* ── Responsive: 4-column equidistant layout ────────────────────── */
  /* mobile-first: 1 col → sm: 2 cols → lg: 4 cols (Space between) */
  .fd-columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--vmc-space-400);
    align-items: start;
  }

  @container fd (min-width: 640px) {
    .fd-columns {
      grid-template-columns: 1fr 1fr;
      gap: var(--vmc-space-400);
    }
  }

  @container fd (min-width: 1024px) {
    /* 4 columnas iguales — Space between via justify-content */
    .fd-columns {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--vmc-space-600);
      justify-content: space-between;
    }
  }

  /* ── Bottom bar responsive ──────────────────────────────────────── */
  .fd-bottom-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--vmc-space-150);
    max-width: 1024px;
    margin: 0 auto;
    padding: var(--vmc-space-300) var(--vmc-space-400);
    text-align: center;
  }

  @container fd (min-width: 640px) {
    .fd-bottom-inner {
      flex-direction: row;
      justify-content: center;
    }
  }

  /* ── Motion: prefers-reduced-motion ────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .fd-link,
    .fd-social,
    .fd-reclamaciones { transition: none !important; }
  }
`;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function FooterDone({
  logoSrc,
  reclamacionesSrc,
}: FooterDoneProps): JSX.Element {
  const resolvedLogoSrc =
    logoSrc ?? "/images/vmc-logo-white.png";
  const resolvedReclamacionesSrc =
    reclamacionesSrc ?? "/images/libro-reclamaciones.png";

  return (
    <>
      <style>{STYLES}</style>
      <footer
        role="contentinfo"
        data-footer-done
        className="w-full"
        style={{ backgroundColor: "var(--vmc-color-background-brand)" }}
      >
        {/* ── Top section: 4 columnas equidistantes ─────────────────── */}
        <div
          style={{
            maxWidth: "1024px",
            margin: "0 auto",
            padding:
              "var(--vmc-space-400) var(--vmc-space-400) var(--vmc-space-400)",
          }}
        >
          <div className="fd-columns">
            <BrandColumn logoSrc={resolvedLogoSrc} />
            <NavColumn heading="Plataforma"         links={PLATAFORMA_LINKS} />
            <NavColumn heading="Legal & Compliance" links={LEGAL_LINKS}      />
            <ContactoColumn reclamacionesSrc={resolvedReclamacionesSrc} />
          </div>
        </div>

        {/* ── Bottom bar: divider + copyright centrado ──────────────── */}
        <BottomBar />
      </footer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Brand column — logo + tagline
// ---------------------------------------------------------------------------

interface BrandColumnProps { logoSrc: string; }

function BrandColumn({ logoSrc }: BrandColumnProps): JSX.Element {
  return (
    <div
      className="flex flex-col"
      style={{ gap: "var(--vmc-space-200)" }}
    >
      <Image
        src={logoSrc}
        alt="VMC Subastas"
        width={120}
        height={32}
        className="object-contain"
        unoptimized={logoSrc.startsWith("data:")}
      />
      <p
        style={{
          ...TS_CAPTION,
          color: "var(--vmc-color-text-on-dark-muted)",
        }}
      >
        {BRAND_DESCRIPTION}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav column — heading + list of links
// ---------------------------------------------------------------------------

interface NavColumnProps {
  heading: string;
  links: NavLink[];
}

function NavColumn({ heading, links }: NavColumnProps): JSX.Element {
  return (
    <nav aria-label={heading} className="flex flex-col" style={{ gap: "var(--vmc-space-200)" }}>
      <p style={{ ...TS_HEADING_SM, color: "var(--vmc-color-text-inverse)" }}>
        {heading}
      </p>
      <ul
        className="flex flex-col list-none p-0 m-0"
        style={{ gap: "var(--vmc-space-150)" }}
      >
        {links.map(function renderLink(link) {
          return (
            <li key={link.label}>
              <Link href={link.href} className="fd-link">
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
// Contacto column — Contacto + Encuéntranos en + Libro de Reclamaciones
// ---------------------------------------------------------------------------

interface ContactoColumnProps { reclamacionesSrc: string; }

function ContactoColumn({ reclamacionesSrc }: ContactoColumnProps): JSX.Element {
  return (
    <div className="flex flex-col" style={{ gap: "var(--vmc-space-400)" }}>
      {/* Contacto */}
      <div className="flex flex-col" style={{ gap: "var(--vmc-space-200)" }}>
        <p style={{ ...TS_HEADING_SM, color: "var(--vmc-color-text-inverse)" }}>
          Contacto
        </p>
        <Link href={CONTACTO_LINK.href} className="fd-link">
          {CONTACTO_LINK.label}
        </Link>
      </div>

      {/* Encuéntranos en */}
      <div className="flex flex-col" style={{ gap: "var(--vmc-space-200)" }}>
        <p style={{ ...TS_HEADING_SM, color: "var(--vmc-color-text-inverse)" }}>
          Encuéntranos en
        </p>
        <nav aria-label="Redes sociales">
          <ul
            className="flex list-none p-0 m-0"
            style={{ gap: "var(--vmc-space-200)" }}
          >
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

      {/* Libro de Reclamaciones — requerimiento legal Perú */}
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
      className="fd-reclamaciones flex items-center no-underline"
      style={{ gap: "var(--vmc-space-100)" }}
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
        style={{
          ...TS_BODY_SM,
          color: "var(--vmc-color-text-inverse)",
        }}
      >
        Libros de reclamaciones
      </span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Bottom bar — divider + copyright
// ---------------------------------------------------------------------------

function BottomBar(): JSX.Element {
  return (
    <div
      className="w-full"
      style={{
        borderTop: "0.75px solid var(--vmc-color-border-subtle)",
      }}
    >
      <div className="fd-bottom-inner">
        <p
          style={{
            ...TS_CAPTION,
            color: "var(--vmc-color-text-on-dark-muted)",
            textAlign: "center",
          }}
        >
          {COPYRIGHT_LINE_1}
          <br aria-hidden="true" />
          {COPYRIGHT_LINE_2}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social icons — SVG inline, sin dependencias externas
// ---------------------------------------------------------------------------

interface SocialIconProps { name: string; }

function SocialIcon({ name }: SocialIconProps): JSX.Element | null {
  if (name === "Facebook") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
  if (name === "Instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return null;
}

