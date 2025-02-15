import { RouteConfig } from '../types/route.types';
import AppsIcon from '@mui/icons-material/Apps';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmergeAdminHeader from '../components/emerge-admin/EmergeAdminHeader';
import MemberDashboard from '../components/emerge-admin/member-center/MemberDashboard';
import MoneyDesktop from '../components/emerge-admin/MoneyDesktop';

// Define the emerge admin routes
const emergeAdminRoutes: RouteConfig[] = [
  {
    id: 'emerge-admin',
    path: '',
    title: 'Emerge Admin',
    element: EmergeAdminHeader,
    icon: AppsIcon,
    sectionId: 'emergeAdmin',
    children: [
      {
        id: 'member-center',
        path: 'member-center',
        title: 'Member Center',
        icon: PeopleIcon,
        element: MemberDashboard,
        permissions: {
          permissions: ['view-members', 'read']
        }
      },
      {
        id: 'money-desktop',
        path: 'money-desktop',
        title: 'Money Desktop',
        icon: AccountBalanceIcon,
        element: MoneyDesktop,
        permissions: {
          permissions: ['view-money-desktop', 'read']
        }
      }
    ]
  }
];

export default emergeAdminRoutes;
