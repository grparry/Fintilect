import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getNavigationConfig } from '../routes';
import { NavigationConfig, RouteConfig, NavigationSection } from '../types/route.types';

interface NavigationState {
  expandedSections: string[];
  activeRoute: string;
  sidebarOpen: boolean;
  breadcrumbs: string[];
}

type NavigationAction =
  | { type: 'TOGGLE_SECTION'; sectionId: string }
  | { type: 'SET_ACTIVE_ROUTE'; route: string; sections: string[]; breadcrumbs: string[] }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'UPDATE_BREADCRUMBS'; path: string[] }
  | { type: 'SET_EXPANDED_SECTIONS'; sections: string[] };

interface NavigationContextType {
  state: NavigationState;
  toggleSection: (sectionId: string) => void;
  setActiveRoute: (route: string) => void;
  toggleSidebar: () => void;
  updateBreadcrumbs: (path: string[]) => void;
}

const initialState: NavigationState = {
  expandedSections: [],
  activeRoute: '',
  sidebarOpen: true,
  breadcrumbs: [],
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case 'TOGGLE_SECTION':
      return {
        ...state,
        expandedSections: state.expandedSections.includes(action.sectionId)
          ? state.expandedSections.filter(id => id !== action.sectionId)
          : [...state.expandedSections, action.sectionId],
      };
    case 'SET_ACTIVE_ROUTE':
      return {
        ...state,
        activeRoute: action.route,
        expandedSections: action.sections,
        breadcrumbs: action.breadcrumbs,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case 'UPDATE_BREADCRUMBS':
      return {
        ...state,
        breadcrumbs: action.path,
      };
    case 'SET_EXPANDED_SECTIONS':
      return {
        ...state,
        expandedSections: action.sections,
      };
    default:
      return state;
  }
}

function findActiveSections(pathname: string, routes: NavigationConfig): string[] {
  const sections: string[] = [];
  
  function traverse(section: NavigationSection) {
    section.items.forEach(item => {
      if (pathname.startsWith(item.path) && section.id) {
        sections.push(section.id);
      }
    });
  }

  routes.forEach(section => traverse(section));
  return sections;
}

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigationConfig = useMemo(() => getNavigationConfig(), []);
  
  // Initialize with all sections expanded
  const allSectionIds = useMemo(() => 
    navigationConfig.map((section: NavigationSection) => section.id), 
    [navigationConfig]
  );

  const [state, dispatch] = useReducer(navigationReducer, {
    ...initialState,
    expandedSections: allSectionIds,
  });

  useEffect(() => {
    const activeSections = findActiveSections(location.pathname, navigationConfig);
    dispatch({ 
      type: 'SET_ACTIVE_ROUTE', 
      route: location.pathname,
      sections: Array.from(new Set([...allSectionIds, ...activeSections])), // Keep all sections expanded
      breadcrumbs: location.pathname.split('/').filter(Boolean)
    });
  }, [location.pathname, navigationConfig, allSectionIds]);

  const value = useMemo(() => ({
    state,
    toggleSection: (sectionId: string) =>
      dispatch({ type: 'TOGGLE_SECTION', sectionId }),
    setActiveRoute: (route: string) =>
      dispatch({ type: 'SET_ACTIVE_ROUTE', route, sections: [], breadcrumbs: [] }),
    toggleSidebar: () =>
      dispatch({ type: 'TOGGLE_SIDEBAR' }),
    updateBreadcrumbs: (path: string[]) =>
      dispatch({ type: 'UPDATE_BREADCRUMBS', path }),
  }), [state]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
