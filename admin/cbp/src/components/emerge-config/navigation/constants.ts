export const BASE_CONFIG_PATH = '/admin/emerge-config';
export const SECTION_PATH = `${BASE_CONFIG_PATH}/:groupId/:sectionId`;

export const NAVIGATION_EVENTS = {
    SECTION_REGISTERED: 'emerge-config:section-registered',
    SECTION_UNREGISTERED: 'emerge-config:section-unregistered',
    NAVIGATION_UPDATED: 'emerge-config:navigation-updated'
} as const;
