import { ComponentType } from 'react';

export interface NavigationItem {
    id: string;
    path: string;
    title: string;
    icon?: ComponentType;
    element?: ComponentType;
    permissions?: string[];
    children?: NavigationItem[];
    parent?: string;
    order?: number;
}
export class NavigationRegistry {
    private static routes: Map<string, NavigationItem> = new Map();
    private static navigationItems: NavigationItem[] = [];
    static register(item: NavigationItem) {
        this.routes.set(item.id, item);
        if (item.children) {
            item.children.forEach(child => this.routes.set(child.id, child));
        }
        this.navigationItems.push(item);
    }
    static getRoute(id: string): NavigationItem {
        const route = this.routes.get(id);
        if (!route) {
            throw new Error(`Route ${id} not found`);
        }
        return route;
    }
    static getNavigationItems(): NavigationItem[] {
        return this.navigationItems;
    }
    static clear() {
        this.routes.clear();
        this.navigationItems = [];
    }
}