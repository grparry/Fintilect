import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationConfig, NavigationSection, NavigationPermissionRequirement } from '../types/section-navigation.types';
import { useNavigationPermissions } from '../hooks/useNavigationPermissions';

interface NavigationState {
  sidebarOpen: boolean;
  activeSection: string | null;
  activePath: string | null;
  permissionCache: Map<string, boolean>;
  expandedItems: string[];
  processingSection: string | null;
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
    expandedItems: [],
    processingSection: null
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
      activeSection: sectionId
    }));
  }, []);

  const setActivePath = useCallback((path: string | null) => {
    setState(prev => ({
      ...prev,
      activePath: path
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setState(prev => {
      // If we're already processing this section, don't update
      if (prev.processingSection === sectionId) {
        return prev;
      }

      // First try to find it in the sections
      const section = config.sections.find(s => s.id === sectionId);

      // If not found in sections, look through all items recursively
      const findInItems = (items: any[]): any => {
        for (const item of items) {
          if (item.id === sectionId) return item;
          if (item.children) {
            const found = findInItems(item.children);
            if (found) return found;
          }
        }
        return null;
      };

      // Find the parent section of an item
      const findParentSection = (): NavigationSection | null => {
        for (const s of config.sections) {
          if (s.items) {
            const findInSection = (items: any[]): boolean => {
              for (const item of items) {
                if (item.id === sectionId) return true;
                if (item.children && findInSection(item.children)) return true;
              }
              return false;
            };
            if (findInSection(s.items)) return s;
          }
        }
        return null;
      };

      const parentSection = findParentSection();
      const isExpanded = prev.expandedItems.includes(sectionId);
      
      let newExpandedItems: string[];

      if (isExpanded) {
        // If we're collapsing, just remove this item and its children
        newExpandedItems = prev.expandedItems.filter(id => id !== sectionId);
      } else {
        // If we're expanding:
        // 1. Start with only the parent section expanded (if it exists)
        newExpandedItems = parentSection ? [parentSection.id] : [];
        
        // 2. Add this item
        newExpandedItems.push(sectionId);
        
        // 3. Keep any expanded items that are children of this section
        const isChildOf = (childId: string, parentId: string): boolean => {
          const parent = findInItems(config.sections.flatMap(s => s.items || []));
          if (!parent?.children) return false;
          return parent.children.some((child: any) => 
            child.id === childId || (child.children && isChildOf(childId, child.id))
          );
        };
        
        // Keep items that are either children of this section or belong to a different parent section
        const otherItems = prev.expandedItems.filter(id => {
          if (id === sectionId || id === parentSection?.id) return false;
          return isChildOf(id, sectionId);
        });
        
        newExpandedItems.push(...otherItems);
      }

      // Only update activeSection if this is a top-level section
      const newState = {
        ...prev,
        expandedItems: newExpandedItems,
        processingSection: sectionId // Mark that we're processing this section
      };

      if (section) {
        newState.activeSection = sectionId;
        newState.activePath = section.path;
      }

      return newState;
    });

    // Clear the processing flag after a short delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        processingSection: null
      }));
    }, 100);
  }, [config.sections]);

  useEffect(() => {
    const initializeSection = async () => {
      // If we're on the admin dashboard, deactivate all sections
      if (location.pathname === '/admin') {
        setState(prev => ({ ...prev, activeSection: null }));
        return;
      }

      const matchingSection = config.sections.find(section =>
        section.items.some(item => location.pathname.startsWith(item.path))
      );

      if (matchingSection) {
        const hasAccess = await hasPermission(matchingSection.permissions);
        if (hasAccess) {
          setState(prev => ({ ...prev, activeSection: matchingSection.id }));
        } else if (matchingSection.fallbackPath) {
          navigate(matchingSection.fallbackPath);
        }
      } else if (config.defaultSection) {
        const defaultSection = config.sections.find(s => s.id === config.defaultSection);
        if (defaultSection) {
          const hasAccess = await hasPermission(defaultSection.permissions);
          if (hasAccess) {
            setState(prev => ({ ...prev, activeSection: config.defaultSection }));
          }
        }
      }
    };

    initializeSection();
  }, [location.pathname, config.sections, config.defaultSection, hasPermission, navigate]);

  const value: NavigationContextType = {
    navigationConfig: config,
    state,
    setActiveSection,
    setActivePath,
    toggleSidebar,
    toggleSection,
    getAccessibleSections,
    hasPermission,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
