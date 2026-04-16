export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterNavColumn {
  heading: string;
  links: FooterNavLink[];
}

export interface FooterProps {
  className?: string;
}
