import { NavigationItem, ConfigSectionComponent, NavigationMetadata, CategoryItem } from './types';
import { CONFIG_SECTIONS } from './config';
import { BASE_CONFIG_PATH } from './constants';

/**
 * Registry for managing navigation items and configuration sections
 */
export class NavigationRegistry {
    private static instance: NavigationRegistry;
    private sections: Map<string, ConfigSectionComponent>;
    private navigationItems: CategoryItem[];

    private constructor() {
        this.sections = new Map();
        this.navigationItems = this.initializeNavigationItems();
        this.initializeSections();
    }

    /**
     * Get the singleton instance of NavigationRegistry
     */
    public static getInstance(): NavigationRegistry {
        if (!NavigationRegistry.instance) {
            NavigationRegistry.instance = new NavigationRegistry();
        }
        return NavigationRegistry.instance;
    }

    /**
     * Initialize navigation items from static config
     */
    private initializeNavigationItems(): CategoryItem[] {
        // Group items by category
        const categoryMap = new Map<string, NavigationItem[]>();
        
        Object.values(CONFIG_SECTIONS).forEach(metadata => {
            const item: NavigationItem = {
                id: metadata.key,
                title: metadata.label,
                path: `${BASE_CONFIG_PATH}/${metadata.groupId}/${metadata.sectionId}`,
                icon: metadata.icon,
                description: metadata.description
            };

            const category = metadata.category;
            if (!categoryMap.has(category)) {
                categoryMap.set(category, []);
            }
            categoryMap.get(category)!.push(item);
        });

        // Convert map to array of category items
        return Array.from(categoryMap.entries()).map(([category, items]): CategoryItem => ({
            id: category.toLowerCase().replace(/\s+/g, '-'),
            title: category,
            path: '', // Categories don't have their own paths
            children: items
        }));
    }

    /**
     * Initialize sections from config
     */
    private initializeSections(): void {
        Object.values(CONFIG_SECTIONS).forEach(metadata => {
            const path = `${metadata.groupId}/${metadata.sectionId}`;
            if (metadata.component) {
                this.sections.set(path, metadata.component);
            }
        });
    }

    /**
     * Get all navigation items
     */
    public getNavigationItems(): CategoryItem[] {
        return this.navigationItems;
    }

    /**
     * Get a specific section by group and section ID
     */
    public getSection(groupId: string, sectionId: string): ConfigSectionComponent | undefined {
        return this.sections.get(`${groupId}/${sectionId}`);
    }
}
