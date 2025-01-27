import { ComponentType } from 'react';

/**
 * Navigation metadata for a configuration section
 */
export interface NavigationMetadata {
    /** Parent section ID */
    parent: string;
    /** Order within parent section */
    order: number;
}
/**
 * Navigation item in the registry
 */
export interface NavigationItem {
    /** Unique identifier */
    id: string;
    /** URL path */
    path: string;
    /** Display title */
    title: string;
    /** Parent navigation item ID */
    parent?: string;
    /** Display order */
    order: number;
    /** Icon component */
    icon?: ComponentType;
    /** Required permissions */
    permissions?: string[];
    /** Component to render */
    element?: ComponentType;
}
/**
 * Navigation tree node
 */
export interface NavigationNode extends NavigationItem {
    /** Child navigation items */
    children: NavigationNode[];
}