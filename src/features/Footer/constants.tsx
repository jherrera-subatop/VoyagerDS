import { FooterNavColumn } from './types';

// Fuente de verdad: vmcsubastas.com/oferta/61272 (audit 15-abr-2026)
// Regla: UX writing del legacy se mantiene INTACTO — NUNCA inventar contenido

export const FOOTER_BRAND_DESCRIPTION = 'powered by SUBASTOP.Co';

export const FOOTER_COPYRIGHT =
  '© VMC Subastas es una marca registrada de Subastop S.A.C. Todos los derechos reservados 2025';

// Columnas reales del footer VMC — sin headings visibles en el original
export const FOOTER_NAV_COLUMNS: FooterNavColumn[] = [
  {
    heading: '',
    links: [
      { label: 'SubasCars',          href: 'https://subascars.com' },
      { label: 'SubasBlog',          href: '/blog' },
      { label: '¿Quiénes somos?',    href: '/quienes-somos' },
      { label: '¿Cómo vender?',      href: '/como-vender' },
      { label: 'Subaspass',          href: '/subaspass' },
      { label: 'Blacksheep Nation',  href: '/blacksheep-nation' },
    ],
  },
  {
    heading: '',
    links: [
      { label: 'Condiciones y Términos · Contáctanos',       href: '/condiciones' },
      { label: 'Política de Protección de Datos Personales', href: '/politica-proteccion-datos' },
      { label: 'Política de Privacidad General',             href: '/politica-privacidad' },
      { label: 'Testimonios',                                href: '/testimonios' },
    ],
  },
];

export const FOOTER_BOTTOM_LINKS: FooterNavColumn['links'] = [];

export const FOOTER_SOCIAL_LINKS = [
  { label: 'Facebook',  href: 'https://facebook.com/vmcsubastas',  ariaLabel: 'Síguenos en Facebook' },
  { label: 'YouTube',   href: 'https://youtube.com/vmcsubastas',   ariaLabel: 'Síguenos en YouTube' },
  { label: 'Instagram', href: 'https://instagram.com/vmcsubastas', ariaLabel: 'Síguenos en Instagram' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/vmcsubastas', ariaLabel: 'Síguenos en LinkedIn' },
];
