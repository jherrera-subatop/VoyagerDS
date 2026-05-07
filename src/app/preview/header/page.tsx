import type { JSX } from 'react';
import Header from '@/features/Header';

const labelStyle: React.CSSProperties = {
  fontFamily:    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
  fontSize:      11,
  fontWeight:    600,
  color:         'rgba(0,0,0,0.40)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom:  8,
};

export default function HeaderPreviewPage(): JSX.Element {
  return (
    <div style={{
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'stretch',
      justifyContent: 'center',
      minHeight:      '100vh',
      padding:        48,
      gap:            32,
    }}>
      <div>
        <p style={labelStyle}>Guest</p>
        <Header />
      </div>

      <div>
        <p style={labelStyle}>Logged in</p>
        <Header user="ZAEX5G" />
      </div>
    </div>
  );
}
