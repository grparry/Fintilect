import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationConfig, NavigationSection, NavigationPermissionRequirement } from './types/section-navigation.types';
import { useNavigationPermissions } from './hooks/useNavigationPermissions';

interface NavigationState {
  sidebarOpen: boolean;
  activeSection: string | null;
  activePath: string | null;
  permissionCache: Map<string, boolean>;
  expandedItems: string[];
}

export interface NavigationContextType {
  navigationConfig: NavigationConfig;
  state: NavigationState;
  setActiveSection: (sectionId: string | null) => void;
  setActivePath: (path: string | null) => void;
  toggleSidebar: () => void;
  toggleSection: (sectionId: string) => void;
  getAccessibleSections: () => Promise<NavigationSection[]>;
  hasPermission: (requirements: NavigationPermissionRequirement) => Promise<boolean>;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode; config: NavigationConfig }> = ({
  children,
  config,
}) => {
  const [state, setState] = useState<NavigationState>({
    sidebarOpen: true,
    activeSection: null,
    activePath: null,
    permissionCache: new Map(),
    expandedItems: []
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { checkPermissions } = useNavigationPermissions();

  const hasPermission = useCallback(async (requirements: NavigationPermissionRequirement) => {
    if (!requirements) return true;

    const cacheKey = JSON.stringify(requirements);
    if (state.permissionCache.has(cacheKey)) {
      return state.permissionCache.get(cacheKey) || false;
    }

    const result = await checkPermissions([requirements]);
    const newCache = new Map(state.permissionCache);
    newCache.set(cacheKey, result);
    setState(prev => ({ ...prev, permissionCache: newCache }));
    return result;
  }, [checkPermissions, state.permissionCache]);

  const getAccessibleSections = useCallback(async () => {
    const accessibleSections: NavigationSection[] = [];

    for (const section of config.sections) {
      if (!section.permissions || await hasPermission(section.permissions)) {
        accessibleSections.push(section);
      }
    }

    return accessibleSections;
  }, [config.sections, hasPermission]);

  const setActiveSection = useCallback((sectionId: string | null) => {
    setState(prev => ({
      ...prev,












      ...prev,

      ...prev,


      // First try to find it in the sections

      // If not found in sections, look through all items recursively

      // Find the parent section of an item




        // If we're collapsing, just remove this item
        // If we're expanding, we need to:
        // 1. Keep the parent section expanded
        // 2. Collapse any sibling items
        // 3. Add this item to expanded items
          // Keep parent section expanded
          // Keep items from other sections
          // Remove all other items from this section

        ...prev,

      // If we're on the admin dashboard, deactivate all sections

      );




    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );

