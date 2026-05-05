import type { JSX } from 'react';
import Sidebar from '@/features/Sidebar/Sidebar';

const labelStyle: React.CSSProperties = {
  fontFamily:    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
  fontSize:      11,
  fontWeight:    600,
  color:         'rgba(0,0,0,0.40)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom:  8,
  textAlign:     'center',
};

interface VariantProps {
  label:             string;
  defaultActive?:    string;
  defaultExpanded?:  string[];
  defaultCollapsed?: boolean;
}

const VARIANTS: VariantProps[] = [
  {
    label: 'Icon-only',
    defaultCollapsed: true,
  },
  {
    label: 'Collapsed',
  },
  {
    label:           'Tipo de oferta',
    defaultActive:   'Tipo de oferta',
    defaultExpanded: ['Tipo de oferta', 'En vivo', 'Negociable'],
  },
  {
    label:           'Categorías',
    defaultActive:   'Categorías',
    defaultExpanded: [
      'Categorías',
      'Vehicular', 'Liviano', 'Seminuevo', 'Siniestrado',
      'Equipos diversos', 'Aire acondicionado',
      'Maquinaria', 'Maquinaria pesada',
      'Artículos diversos', 'Electrónica',
    ],
  },
  {
    label:           'Empresas',
    defaultActive:   'Empresas',
    defaultExpanded: [
      'Empresas',
      'Maquisistema', 'Santander Consumer', 'Pacífico', 'SubasCars', 'Institución Financiera',
    ],
  },
];

export default function SidebarPreviewPage(): JSX.Element {
  return (
    <div style={{
      display:    'flex',
      gap:        48,
      padding:    48,
      alignItems: 'flex-start',
      flexWrap:   'wrap',
    }}>
      {VARIANTS.map(function renderVariant(v) {
        return (
          <div key={v.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={labelStyle}>{v.label}</p>
            <Sidebar
              defaultActive={v.defaultActive ?? null}
              defaultExpanded={v.defaultExpanded ?? []}
              defaultCollapsed={v.defaultCollapsed ?? false}
            />
          </div>
        );
      })}
    </div>
  );
}
