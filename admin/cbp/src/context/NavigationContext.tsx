import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationConfig, NavigationSection, NavigationItem } from '../types/section-navigation.types';
import { usePermissions } from '../hooks/usePermissions';
import logger from '../utils/logger';

interface NavigationState {
  sidebarOpen: boolean;
  activeSection: string | null;
  activePath: string;
  expandedItems: string[];
  processingSection: string | null;
  activeItems: string[];
}

interface NavigationContextType {
  navigationConfig: NavigationConfig;
  state: NavigationState;
  setActiveSection: (sectionId: string | null) => void;
  setActivePath: (path: string | null) => void;
  toggleSidebar: () => void;
  toggleSection: (sectionId: string) => void;
  getAccessibleSections: () => Promise<NavigationSection[]>;
  hasPermission: (section: NavigationSection) => Promise<boolean>;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

const initialState: NavigationState = {
  sidebarOpen: true,
  activeSection: null,
  activePath: window.location.pathname,
  expandedItems: [],
  processingSection: null,
  activeItems: []
};

export const NavigationProvider: React.FC<{ config: NavigationConfig; children: React.ReactNode }> = ({
  config,
  children
}) => {
  const [state, setState] = useState<NavigationState>(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkPermission, permissionContext } = usePermissions();

  const hasPermission = useCallback(async (section: NavigationSection): Promise<boolean> => {
    if (!section.resourceId) return true;
    const result = await checkPermission(section.resourceId);
    return result.hasAccess;
  }, [checkPermission]);

  const getAccessibleSections = useCallback(async (): Promise<NavigationSection[]> => {
    const accessibleSections: NavigationSection[] = [];
    
    logger.log('[NavigationContext] Getting accessible sections with roles:', permissionContext.roles);

    for (const section of config.sections) {
      // If the section has a resourceId, use that for permission check (includes admin permissions)
      // Otherwise, fall back to direct role check
      let hasAccess = false;
      
      if (section.resourceId) {
        // This will properly check both regular permissions and admin permissions
        hasAccess = await hasPermission(section);
        logger.log(`[NavigationContext] Section ${section.title} resourceId check:`, {
          resourceId: section.resourceId,
          hasAccess
        });
      } 
      else if (section.requiredPermission) {
        // Only do direct role check if no resourceId is specified
        hasAccess = permissionContext.roles.includes(section.requiredPermission);
        logger.log(`[NavigationContext] Section ${section.title} direct role check:`, {
          requiredPermission: section.requiredPermission,
          hasAccess
        });
      }
      else {
        // If no permissions required, grant access
        hasAccess = true;
        logger.log(`[NavigationContext] Section ${section.title} has no permission requirements, granting access`);
      }
      
      if (hasAccess) {
        logger.log(`[NavigationContext] Adding accessible section: ${section.title}`);
        accessibleSections.push(section);
      } else {
        logger.log(`[NavigationContext] Section not accessible: ${section.title}`);
      }
    }

    logger.log('[NavigationContext] Accessible sections:', accessibleSections.map(s => s.title));
    return accessibleSections;
  }, [config.sections, hasPermission, permissionContext]);

  const setActiveSection = useCallback((sectionId: string | null): void => {
    setState(prev => ({
      ...prev,
      activeSection: sectionId
    }));
  }, []);

  const setActivePath = useCallback((path: string | null): void => {
    setState(prev => ({
      ...prev,
      activePath: path
    }));
  }, []);

  const toggleSidebar = useCallback((): void => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const findParentItems = useCallback((path: string): string[] => {
    const result: string[] = [];
    let bestMatch = { path: '', chain: [] as string[] };
    
    const findInItems = (items: NavigationItem[], parentChain: string[] = []): void => {
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

    logger.log('[findParentItems] Best match found:', {
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
    logger.log('[Navigation] Updating active items:', activeChain);
    
    setState(prev => ({
      ...prev,
      activeItems: activeChain,
      activePath: location.pathname
    }));
  }, [location.pathname, findParentItems]);

  const toggleSection = useCallback((sectionId: string): void => {
    logger.log('[toggleSection] Called with:', sectionId);
    setState(prev => {
      // If we're already processing this section, don't update
      if (prev.processingSection === sectionId) {
        logger.log('[toggleSection] Already processing section:', sectionId);
        return prev;
      }

      // First try to find it in the sections
      const section = config.sections.find(s => s.id === sectionId);
      logger.log('[toggleSection] Found section:', section?.id);

      // If not found in sections, look through all items recursively
      const findInItems = (items: NavigationItem[]): NavigationItem | null => {
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
            const findInSection = (items: NavigationItem[], currentDepth: number, chain: string[] = []): { depth: number, chain: string[] } | null => {
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
              logger.log('[toggleSection] Found item in section hierarchy:', {
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
      logger.log('[toggleSection] Item depth:', depth, 'isGrandChild:', isGrandChild);
      logger.log('[toggleSection] Parent chain:', parentChain);
      
      // If this is a grandchild item, don't modify the expanded state
      if (isGrandChild) {
        logger.log('[toggleSection] Skipping state update for grandchild');
        return {
          ...prev,
          activePath: findInItems(config.sections.flatMap(s => s.items || []))?.path || prev.activePath
        };
      }

      const isExpanded = prev.expandedItems.includes(sectionId);
      logger.log('[toggleSection] Current expanded state:', isExpanded);
      logger.log('[toggleSection] Current expandedItems:', prev.expandedItems);
      
      let newExpandedItems: string[];

      if (isExpanded) {
        // If we're collapsing, only remove this item and keep its children
        newExpandedItems = prev.expandedItems.filter(id => id !== sectionId);
        logger.log('[toggleSection] Collapsing - new expandedItems:', newExpandedItems);
      } else {
        // For parent items (depth === 1), close other parent items
        if (depth === 1) {
          // Find all other parent items at the same level
          const otherParents = config.sections
            .flatMap(s => s.items || [])
            .filter(item => item.id !== sectionId)
            .map(item => item.id);
            
          logger.log('[toggleSection] Other parents to close:', otherParents);
          
          // Keep only items that aren't other parents
          newExpandedItems = prev.expandedItems.filter(id => !otherParents.includes(id));
        } 
        // Special handling for report section headers (checking by ID pattern)
        else if (sectionId.includes('-reports')) {
          logger.log('[toggleSection] Detected report section header:', sectionId);
          
          // Find all report section headers in the navigation config
          const reportSectionIds: string[] = [];
          
          // Look through all sections to find report section headers
          config.sections.forEach(section => {
            if (section.items) {
              section.items.forEach(item => {
                if (item.id === 'reports' && item.items) {
                  // Found the reports section, now get all report category headers
                  item.items.forEach(reportItem => {
                    if (reportItem.id.includes('-reports') && reportItem.id !== sectionId) {
                      reportSectionIds.push(reportItem.id);
                    }
                  });
                }
              });
            }
          });
          
          logger.log('[toggleSection] Other report sections to close:', reportSectionIds);
          
          // Keep only items that aren't other report section headers
          newExpandedItems = prev.expandedItems.filter(id => !reportSectionIds.includes(id));
          
          // Make sure 'reports' parent remains expanded
          if (!newExpandedItems.includes('reports')) {
            newExpandedItems.push('reports');
          }
          
          // Make sure 'billPay' parent remains expanded
          if (!newExpandedItems.includes('billPay')) {
            newExpandedItems.push('billPay');
          }
        } else {
          // For other non-parent items, preserve existing state
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
        
        logger.log('[toggleSection] Expanding - new expandedItems:', newExpandedItems);
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
