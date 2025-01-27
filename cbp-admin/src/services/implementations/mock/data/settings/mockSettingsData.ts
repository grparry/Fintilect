import { Setting, SettingGroup } from '@/../../../../types/settings.types';

export const mockSettings: Setting[] = [
    {
        key: 'app.name',
        label: 'Application Name',
        description: 'The name of the application',
        value: 'CBP Admin',
        type: 'string',
        category: 'general',
        isRequired: true,
        isReadOnly: false
    },
    {
        key: 'app.version',
        label: 'Application Version',
        description: 'The current version of the application',
        value: '1.0.0',
        type: 'string',
        category: 'general',
        isRequired: true,
        isReadOnly: true
    },
    {
        key: 'theme.mode',
        label: 'Theme Mode',
        description: 'The current theme mode',
        value: 'light',
        type: 'string',
        category: 'appearance',
        isRequired: true,
        validationRules: {
            options: [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' }
            ]
        }
    },
    {
        key: 'notifications.enabled',
        label: 'Enable Notifications',
        description: 'Whether to enable notifications',
        value: true,
        type: 'boolean',
        category: 'notifications',
        isRequired: false
    },
    {
        key: 'notifications.sound',
        label: 'Notification Sound',
        description: 'Whether to play sound for notifications',
        value: true,
        type: 'boolean',
        category: 'notifications',
        isRequired: false
    },
    {
        key: 'api.timeout',
        label: 'API Timeout',
        description: 'API request timeout in seconds',
        value: 30,
        type: 'number',
        category: 'api',
        isRequired: true,
        validationRules: {
            min: 1,
            max: 60
        }
    },
    {
        key: 'api.retries',
        label: 'API Retries',
        description: 'Number of times to retry failed API requests',
        value: 3,
        type: 'number',
        category: 'api',
        isRequired: true,
        validationRules: {
            min: 0,
            max: 5
        }
    }
];

export const mockSettingGroups: SettingGroup[] = [
    {
        key: 'general',
        label: 'General Settings',
        description: 'Basic application settings',
        settings: mockSettings.filter(s => s.category === 'general'),
        order: 1
    },
    {
        key: 'appearance',
        label: 'Appearance',
        description: 'Visual settings for the application',
        settings: mockSettings.filter(s => s.category === 'appearance'),
        order: 2
    },
    {
        key: 'notifications',
        label: 'Notifications',
        description: 'Notification settings',
        settings: mockSettings.filter(s => s.category === 'notifications'),
        order: 3
    }
];
