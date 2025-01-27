import { SvgIconProps } from '@mui/material';
import { FC } from 'react';
import { EmergeConfigSection } from '../core/EmergeConfigSection';

/**
 * Navigation metadata for a configuration section
 */
export interface NavigationMetadata {
    /** Unique key for the section */
    key: string;
    /** Group identifier */
    groupId: string;
    /** Section identifier */
    sectionId: string;
    /** Display label */
    label: string;
    /** Icon component */
    icon: FC<SvgIconProps>;
    /** Category for grouping */
    category: string;
    /** Section description */
    description?: string;
    /** Component for the section */
    component?: ConfigSectionComponent;
}

export interface NavigationItem {
    id: string;
    title: string;
    path: string;
    icon?: FC<SvgIconProps>;
    category?: string;
    description?: string;
    children?: NavigationItem[];
}

export interface CategoryItem extends NavigationItem {
    children: NavigationItem[];
}

export interface NavigationState {
    activeGroup: string | null;
    activeSection: string | null;
    breadcrumbs: NavigationItem[];
}

export type ConfigSectionComponent = FC<any>;
