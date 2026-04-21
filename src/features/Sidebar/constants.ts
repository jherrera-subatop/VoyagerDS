import type { SidebarNavItem } from './types';

export const SIDEBAR_BRAND_NAME = '>vmc< Subastas';
export const SIDEBAR_BRAND_SUB  = 'powered by SUBASTOP.Co';

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    label: 'Próximas',
    active: true,
    iconPath: 'M8 2v2M16 2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  },
  {
    label: 'Tipo de oferta',
    iconPath: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2',
  },
  {
    label: 'Categorías',
    iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
  {
    label: 'Empresas',
    iconPath: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  },
  {
    label: 'Centro de ayuda',
    iconPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01',
  },
];
