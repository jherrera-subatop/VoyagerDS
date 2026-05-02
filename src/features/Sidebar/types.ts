export interface SidebarNavItem {
  label: string;
  iconPath: string;
  active?: boolean;
}

export interface SidebarProps {
  className?: string;
  activeItem?: string;
  /** Override del logo — solo para preview en docs. En producción omitir. */
  logoSrc?: string;
  /** Variante colapsada: 64px, solo íconos, sin labels ni chevrones. */
  collapsed?: boolean;
}
