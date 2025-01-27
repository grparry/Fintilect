import { SvgIconComponent } from '@mui/icons-material';

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  hideFromSidebar?: boolean;
  children?: NavigationItem[];
  permissions?: NavigationPermissionRequirement;
}

export interface NavigationPermissionRequirement {
  anyOf?: string[];
  allOf?: string[];
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
  permissions?: NavigationPermissionRequirement;
}

export interface NavigationConfig {
  sections: NavigationSection[];
}
