import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationRegistry } from '../NavigationRegistry';
import { NavigationItem, NavigationState, CategoryItem } from '../types';
import { BASE_CONFIG_PATH } from '../constants';

/**
 * Hook for managing navigation state within emerge-config sections
 * Handles:
 * 1. Current section tracking
 * 2. Breadcrumb generation
 * 3. Navigation updates
 */
export const useConfigNavigation = () => {
    const location = useLocation();
    const [state, setState] = useState<NavigationState>({
        activeGroup: null,
        activeSection: null,
        breadcrumbs: []
    });

    // Memoize the registry instance
    const registry = useMemo(() => NavigationRegistry.getInstance(), []);

    // Memoize the navigation items
    const navigationItems = useMemo(() => registry.getNavigationItems(), [registry]);

    useEffect(() => {
        const path = location.pathname;
        if (!path.startsWith(BASE_CONFIG_PATH)) return;

        // Extract group and section from path
        const [, , , groupId, sectionId] = path.split('/');
        
        // Find matching navigation items for breadcrumbs
        const breadcrumbs = navigationItems.reduce<NavigationItem[]>((crumbs, category: CategoryItem) => {
            const section = category.children.find(
                item => item.path === path
            );
            
            if (section) {
                return [...crumbs, category, section];
            }
            return crumbs;
        }, []);

        setState({
            activeGroup: groupId || null,
            activeSection: sectionId || null,
            breadcrumbs
        });
    }, [location.pathname, navigationItems]);

    return state;
};
