import { ComponentType } from 'react';
import { NavigationMetadata as BaseNavigationMetadata } from '../navigation/types';

/**
 * Navigation metadata for a configuration section
 */
export type NavigationMetadata = BaseNavigationMetadata;

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
    /** Icon component */
    icon?: any;
    /** Child items */
    children?: NavigationItem[];
    /** Parent navigation item ID */
    parent?: string;
    /** Display order */
    order: number;
    /** Required permissions */
    permissions?: string[];
    /** Component to render */
    element?: ComponentType;
}

/**
 * Navigation tree node
 */
export interface NavigationNode extends NavigationItem {
    children: NavigationNode[];
}