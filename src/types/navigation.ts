
export interface NavigationTab {
  id: string;
  label: string;
  onClick: () => void;
}

export interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface NavigationConfig {
  brandText?: string;
  brandLink?: string;
  tabs?: NavigationTab[];
  externalLinks?: NavigationLink[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}
