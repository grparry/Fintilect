import { SvgIconComponent } from '@mui/icons-material';

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  hideFromSidebar?: boolean;
  children?: NavigationItem[];
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

export interface NavigationConfig {
  sections: NavigationSection[];
}
