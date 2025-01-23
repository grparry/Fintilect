import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';

// Lazy load components
const EmergeAdminHeader = lazy(() => {
  console.log('Lazy loading EmergeAdminHeader');
  return import('../components/emerge-admin/EmergeAdminHeader');
});
const MemberDashboard = lazy(() => import('../components/emerge-admin/member-center/MemberDashboard'));
const MoneyDesktop = lazy(() => import('../components/emerge-admin/MoneyDesktop'));

// Define the emerge admin routes
const emergeAdminRoutes: RouteConfig[] = [
  {
    id: 'emerge-admin',
    path: '/admin/emerge',
    title: 'Emerge Admin',
    element: EmergeAdminHeader,
    icon: 'Apps',
    sectionId: 'emerge',
    children: [
      {
        id: 'member-center',
        path: '/admin/emerge/member-center',
        title: 'Member Center',
        element: MemberDashboard,
        icon: 'People',
        sectionId: 'emerge'
      },
      {
        id: 'money-desktop',
        path: '/admin/emerge/money-desktop',
        title: 'Money Desktop',
        element: MoneyDesktop,
        icon: 'AccountBalance',
        sectionId: 'emerge'
      }
    ]
  }
];

// Debug log the routes
console.log('emergeAdminRoutes before export:', emergeAdminRoutes.map(r => ({
  id: r.id,
  path: r.path,
  title: r.title,
  hasChildren: !!r.children
})));

export default emergeAdminRoutes;
