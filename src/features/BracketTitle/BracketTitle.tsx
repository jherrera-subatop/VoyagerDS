import type { JSX } from 'react';
import type { BracketTitleProps } from './types';

const V = {
  vaultMid:    'var(--voyager-color-vault-mid, #3B1782)',
  textPrimary: 'var(--voyager-text-primary,   #191C1C)',
} as const;

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

function CornerTL(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, fill: V.vaultMid }}>
      <path d="M5.75 22C7.82107 22 9.5 20.3211 9.5 18.25L9.5 9.5H18.25C20.3211 9.5 22 7.82107 22 5.75C22 3.67893 20.3211 2 18.25 2L7 2C4.23858 2 2 4.23858 2 7L2 18.25C2 20.3211 3.67893 22 5.75 22Z" />
    </svg>
  );
}

function CornerBR(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
      style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, fill: V.vaultMid }}>
      <path d="M18.25 2C16.1789 2 14.5 3.67893 14.5 5.75V14.5L5.75 14.5C3.67893 14.5 2 16.1789 2 18.25C2 20.3211 3.67893 22 5.75 22H17C19.7614 22 22 19.7614 22 17V5.75C22 3.67893 20.3211 2 18.25 2Z" />
    </svg>
  );
}

export default function BracketTitle({ name, count }: BracketTitleProps): JSX.Element {
  return (
    <div style={{
      position:      'relative',
      display:       'inline-flex',
      flexDirection: 'column',
      padding:       '8px 12px',
      gap:           4,
    }}>
      <CornerTL />

      <h2 style={{
        fontFamily:    fontDisplay,
        fontSize:      16,
        fontWeight:    700,
        lineHeight:    '20px',
        color:         V.vaultMid,
        textTransform: 'uppercase',
        margin:        0,
        whiteSpace:    'nowrap',
      }}>
        {name}
      </h2>

      <p style={{
        fontFamily: fontDisplay,
        fontSize:   14,
        fontWeight: 300,
        lineHeight: '14px',
        color:      V.textPrimary,
        margin:     0,
        whiteSpace: 'nowrap',
      }}>
        {count} Ofertas
      </p>

      <CornerBR />
    </div>
  );
}
