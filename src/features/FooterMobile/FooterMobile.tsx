/**
 * FooterMobile — Voyager DS
 * Figma node: 241-1482 · mobile adaptation · 420px
 */

import type { JSX } from "react";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

const V = {
  bg:      "var(--vmc-color-background-brand)",
  heading: "var(--vmc-color-text-inverse)",
  link:    "color-mix(in oklch, var(--vmc-color-text-inverse) 60%, transparent)",
  divider: "color-mix(in oklch, var(--vmc-color-text-inverse) 15%, transparent)",
} as const;

/* ── Assets (Figma MCP · 7-day TTL · replace with /public paths in prod) ── */
const LOGO_SRC  = "https://www.figma.com/api/mcp/asset/5cbcd9a7-5eb0-4533-a732-de72391440f9";
const LIBRO_SRC = "https://www.figma.com/api/mcp/asset/36a6ae2d-5b34-448e-9812-9c2fe907d004";

const PLATAFORMA_LINKS = [
  "SubasCars", "SubasBlog", "¿Quiénes somos?",
  "¿Cómo vender?", "Subaspass", "BlackSheep Nation",
] as const;

const LEGAL_LINKS = [
  "Condiciones y Términos",
  "Política de Protección de Datos Personales",
  "Política de privacidad General",
  "Testimonios",
  "Canal de denuncias",
] as const;

interface SocialItem {
  label: string;
  src:   string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  { label: "Facebook",  src: "https://www.figma.com/api/mcp/asset/8915e61d-9d9a-4ba0-a7e2-43117817b13c" },
  { label: "Instagram", src: "https://www.figma.com/api/mcp/asset/2f92cfc2-1f01-4963-a6e4-068fdd6c94ff" },
  { label: "YouTube",   src: "https://www.figma.com/api/mcp/asset/616532dd-e802-4718-8d41-3f72e8631522" },
  { label: "X",         src: "https://www.figma.com/api/mcp/asset/c8e77c67-871c-4ec8-ac5e-bcebd0bc2b7e" },
];

interface FooterSectionProps {
  heading: string;
  items:   readonly string[];
}

function FooterSection({ heading, items }: FooterSectionProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, lineHeight: "20px",
        color: V.heading, margin: 0 }}>
        {heading}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0,
        display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(function renderLink(item) {
          return (
            <li key={item}>
              <a href="#" style={{ fontFamily: F, fontSize: 12, fontWeight: 700,
                lineHeight: "16px", color: V.link, textDecoration: "none" }}>
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SocialIcon({ label, src }: SocialItem): JSX.Element {
  return (
    <a href="#" aria-label={label}
      style={{ display: "flex", alignItems: "center", justifyContent: "center",
        width: 24, height: 24, flexShrink: 0 }}>
      <img src={src} alt={label} width={20} height={20}
        style={{ objectFit: "contain" }} />
    </a>
  );
}

export default function FooterMobile(): JSX.Element {
  return (
    <footer style={{ background: V.bg, width: "100%",
      padding: "32px 24px 24px", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Logo */}
      <img src={LOGO_SRC} alt="VMC Subastas" width={178} height={30}
        style={{ objectFit: "contain", objectPosition: "left", flexShrink: 0 }} />

      {/* Plataforma */}
      <FooterSection heading="Plataforma" items={PLATAFORMA_LINKS} />

      {/* Legal */}
      <FooterSection heading="Legal & Compliance" items={LEGAL_LINKS} />

      {/* Contacto + Social */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, lineHeight: "20px",
            color: V.heading, margin: 0 }}>
            Contacto
          </p>
          <a href="#" style={{ fontFamily: F, fontSize: 12, fontWeight: 700,
            lineHeight: "16px", color: V.link, textDecoration: "none" }}>
            Contáctanos
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, lineHeight: "20px",
            color: V.heading, margin: 0 }}>
            Encuéntranos en
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {SOCIAL_ITEMS.map(function renderSocialIcon(item) {
              return <SocialIcon key={item.label} label={item.label} src={item.src} />;
            })}
          </div>
        </div>
      </div>

      {/* Libro de reclamaciones */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={LIBRO_SRC} alt="Libro de reclamaciones" width={86} height={35}
          style={{ objectFit: "contain", flexShrink: 0 }} />
        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, lineHeight: "20px",
          color: V.heading, margin: 0 }}>
          Libros de reclamaciones
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: V.divider, flexShrink: 0 }} aria-hidden="true" />

      {/* Copyright */}
      <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, lineHeight: "16px",
        color: V.link, margin: 0, textAlign: "center" }}>
        © VMC Subastas es una marca registrada de Subastop S.A.C.
        <br />
        Todos los derechos reservados 2026
      </p>
    </footer>
  );
}
