import type { SidebarNavItem } from './types';

export const SIDEBAR_BRAND_NAME = 'VMCSUBASTAS';
export const SIDEBAR_BRAND_SUB  = 'Powered by SUBASTOP.Co';

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    label:    'Hoy',
    iconPath: 'M8 2v2M16 2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  },
  {
    label:    'Tipo de oferta',
    iconPath: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    children: [
      { label: 'En vivo',    count: 23 },
      { label: 'Negociable', count: 5  },
    ],
  },
  {
    label:    'Categorías',
    iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    children: [
      {
        label: 'Vehicular', count: 27,
        children: [
          {
            label: 'Liviano', count: 27,
            children: [
              { label: 'Seminuevo',  count: 23 },
              { label: 'Siniestrado', count: 4 },
            ],
          },
        ],
      },
      {
        label: 'Equipos diversos', count: 1,
        children: [
          { label: 'Aire acondicionado', count: 1 },
        ],
      },
      {
        label: 'Maquinaria', count: 3,
        children: [
          { label: 'Maquinaria pesada', count: 3 },
        ],
      },
      {
        label: 'Artículos diversos', count: 2,
        children: [
          { label: 'Electrónica', count: 2 },
        ],
      },
    ],
  },
  {
    label:    'Empresas',
    iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
    children: [
      { label: 'Maquisistema',          count: 12 },
      { label: 'Santander Consumer',    count: 7  },
      { label: 'Pacífico',              count: 3  },
      { label: 'SubasCars',             count: 5  },
      { label: 'Institución Financiera', count: 1 },
    ],
  },
  {
    label:         'Centro de ayuda',
    sectionBefore: 'Soporte',
    iconPath:      'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',
  },
];
