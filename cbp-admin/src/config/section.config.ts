import { NavigationSection } from '../types/section-navigation.types';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';

// Section-specific configurations
export const sectionConfig: Record<string, Partial<NavigationSection>> = {
  clientManagement: {
    icon: BusinessIcon,
    color: '#1976D2',  // Darker blue
  },
  emergeAdmin: {
    icon: GroupIcon,
    color: '#2196F3',  // Blue
  },
  emergeConfig: {
    icon: SettingsIcon,
    color: '#03A9F4',  // Light blue
  },
  billPay: {
    icon: PaymentsIcon,
    color: '#00BCD4',  // Cyan
  },
  development: {
    icon: CodeIcon,
    color: '#009688',  // Teal
  },
};

// Default section configuration
export const defaultSectionConfig: Partial<NavigationSection> = {
  icon: FolderIcon,
  color: '#757575',  // Grey
};
