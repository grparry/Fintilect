import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationConfig, NavigationSection, NavigationPermissionRequirement } from '../types/section-navigation.types';
import { useNavigationPermissions } from '../hooks/useNavigationPermissions';

interface NavigationState {
  sidebarOpen: boolean;
  activeSection: string | null;
  activePath: string;
  permissionCache: Map<string, boolean>;
  expandedItems: string[];
  processingSection: string | null;
  activeItems: string[];
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

const initialState: NavigationState = {
  sidebarOpen: true,
  activeSection: null,
  activePath: window.location.pathname,
  permissionCache: new Map(),
  expandedItems: [],
  processingSection: null,
  activeItems: []
};

export const NavigationProvider: React.FC<{ children: React.ReactNode; config: NavigationConfig }> = ({
  children,
  config,
}) => {
  const [state, setState] = useState<NavigationState>(initialState);
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

  const findParentItems = useCallback((path: string): string[] => {
    const result: string[] = [];
    let bestMatch = { path: '', chain: [] as string[] };
    
    const findInItems = (items: any[], parentChain: string[] = []) => {
      for (const item of items) {
        const currentChain = [...parentChain];
        
        if (item.path) {
          if ((path === item.path || path.startsWith(item.path + '/')) && 
              item.path.length > bestMatch.path.length) {
            currentChain.push(item.id);
            bestMatch = { path: item.path, chain: [...currentChain] };
          }
        }
        
        if (item.children || item.items) {
          const children = item.children || item.items;
          if (children) {
            const nextChain = item.path ? currentChain : [...currentChain, item.id];
            findInItems(children, nextChain);
          }
        }
      }
    };

    config.sections.forEach(section => {
      const sectionChain = [section.id];
      if (section.path && (path === section.path || path.startsWith(section.path + '/'))) {
        bestMatch = { path: section.path, chain: [...sectionChain] };
      }
      if (section.items) {
        findInItems(section.items, sectionChain);
      }
    });

    console.log('[findParentItems] Best match found:', {
      path,
      bestMatch,
      chain: bestMatch.chain
    });

    return bestMatch.chain;
  }, [config.sections]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      activePath: location.pathname
    }));
  }, [location.pathname]);

  useEffect(() => {
    const activeChain = findParentItems(location.pathname);
    console.log('[Navigation] Updating active items:', activeChain);
    
    setState(prev => ({
      ...prev,
      activeItems: activeChain,
      activePath: location.pathname
    }));
  }, [location.pathname, findParentItems]);

  const toggleSection = useCallback((sectionId: string) => {
    console.log('[toggleSection] Called with:', sectionId);
    setState(prev => {
      // If we're already processing this section, don't update
      if (prev.processingSection === sectionId) {
        console.log('[toggleSection] Already processing section:', sectionId);
        return prev;
      }

      // First try to find it in the sections
      const section = config.sections.find(s => s.id === sectionId);
      console.log('[toggleSection] Found section:', section?.id);

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

      // Find the parent section and determine if this is a grandchild
      const findParentAndDepth = (): { parentSection: NavigationSection | null, depth: number, parentChain: string[] } => {
        for (const s of config.sections) {
          if (s.items) {
            const findInSection = (items: any[], currentDepth: number, chain: string[] = []): { depth: number, chain: string[] } | null => {
              for (const item of items) {
                if (item.id === sectionId) {
                  return { depth: currentDepth, chain };
                }
                if (item.children) {
                  const result = findInSection(item.children, currentDepth + 1, [...chain, item.id]);
                  if (result) return result;
                }
              }
              return null;
            };
            const result = findInSection(s.items, 1);
            if (result) {
              console.log('[toggleSection] Found item in section hierarchy:', {
                section: s.id,
                depth: result.depth,
                parentChain: result.chain
              });
              return { parentSection: s, depth: result.depth, parentChain: result.chain };
            }
          }
        }
        return { parentSection: null, depth: 0, parentChain: [] };
      };

      const { parentSection, depth, parentChain } = findParentAndDepth();
      const isGrandChild = depth > 1;
      console.log('[toggleSection] Item depth:', depth, 'isGrandChild:', isGrandChild);
      console.log('[toggleSection] Parent chain:', parentChain);
      
      // If this is a grandchild item, don't modify the expanded state
      if (isGrandChild) {
        console.log('[toggleSection] Skipping state update for grandchild');
        return {
          ...prev,
          activePath: findInItems(config.sections.flatMap(s => s.items || []))?.path || prev.activePath
        };
      }

      const isExpanded = prev.expandedItems.includes(sectionId);
      console.log('[toggleSection] Current expanded state:', isExpanded);
      console.log('[toggleSection] Current expandedItems:', prev.expandedItems);
      
      let newExpandedItems: string[];

      if (isExpanded) {
        // If we're collapsing, only remove this item and keep its children
        newExpandedItems = prev.expandedItems.filter(id => id !== sectionId);
        console.log('[toggleSection] Collapsing - new expandedItems:', newExpandedItems);
      } else {
        // For parent items (depth === 1), close other parent items
        if (depth === 1) {
          // Find all other parent items at the same level
          const otherParents = config.sections
            .flatMap(s => s.items || [])
            .filter(item => item.id !== sectionId)
            .map(item => item.id);
            
          console.log('[toggleSection] Other parents to close:', otherParents);
          
          // Keep only items that aren't other parents
          newExpandedItems = prev.expandedItems.filter(id => !otherParents.includes(id));
        } else {
          // For non-parent items, preserve existing state
          newExpandedItems = [...prev.expandedItems];
        }
        
        // Add this item if not already present
        if (!newExpandedItems.includes(sectionId)) {
          newExpandedItems.push(sectionId);
        }
        
        // Add parent section if not already present
        if (parentSection && !newExpandedItems.includes(parentSection.id)) {
          newExpandedItems.push(parentSection.id);
        }
        
        console.log('[toggleSection] Expanding - new expandedItems:', newExpandedItems);
      }

      const targetItem = findInItems(config.sections.flatMap(s => s.items || []));
      return {
        ...prev,
        expandedItems: newExpandedItems,
        processingSection: sectionId,
        activeSection: section?.id || prev.activeSection,
        activePath: targetItem?.path || prev.activePath
      };
    });

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        processingSection: null
      }));
    }, 100);
  }, [config.sections]);

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
