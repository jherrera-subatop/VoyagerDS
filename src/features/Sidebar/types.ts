export interface SidebarSubItem {
  label:     string;
  count?:    number;
  children?: SidebarSubItem[];
}

export interface SidebarNavItem {
  label:         string;
  iconPath:      string;
  active?:       boolean;
  sectionBefore?: string;
  children?:     SidebarSubItem[];
}

export interface SidebarProps {
  className?:         string;
  logoSrc?:           string;
  defaultActive?:     string | null;
  defaultExpanded?:   string[];
  defaultCollapsed?:  boolean;
}
