import { Setting, SettingGroup } from '../../../../../types/settings.types';

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
    },
    {
        key: 'Features.Login.Password.MinVersion',
        label: 'Minimum Version',
        description: 'The minimum version required for password functionality',
        value: '1.5',
        type: 'number',
        category: 'password',
        isRequired: false
    },
    {
        key: 'PasswordSettings.CanViewPasswordAsPlainTextAtLoginEnabled',
        label: 'Show Password as Plain Text',
        description: 'Whether users can view their password as plain text at login',
        value: 'false',
        type: 'boolean',
        category: 'password',
        isRequired: false
    },
    {
        key: 'PasswordSettings.ShowForgotUserIdButtonOnInvalidLoginControlEnabled',
        label: 'Show Forgot User ID Button',
        description: 'Whether to show the forgot user ID button on the invalid login control',
        value: 'false',
        type: 'boolean',
        category: 'password',
        isRequired: false
    },
    {
        key: 'PasswordSettings.UsePlainTextForShowHidePasswordToggle',
        label: 'Use Plain Text for Show/Hide Toggle',
        description: 'Use "Show" or "Hide" text instead of an eye icon for the password toggle',
        value: 'false',
        type: 'boolean',
        category: 'password',
        isRequired: false
    },
    {
        key: 'PasswordVerification.PasswordResetCannotContainSSNumber',
        label: 'Prevent SSN in Passwords',
        description: 'Whether the password reset functionality should prevent using social security numbers in passwords',
        value: 'false',
        type: 'boolean',
        category: 'password-verification',
        isRequired: false
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.Filters',
        label: 'Filters',
        description: 'Filter configurations for PSCU log file transformation',
        value: JSON.stringify([
            {
                name: 'Transaction Filter',
                valuesCausingInclusion: 'TRANSACTION_.*',
                valuesCausingExclusion: 'VOID,CANCEL',
                requiresValue: true,
                errorMessage: 'Transaction type is required'
            },
            {
                name: 'Error Filter',
                valuesCausingInclusion: 'ERROR|FAILED',
                valuesCausingExclusion: '',
                requiresValue: true,
                errorMessage: 'Error type is required'
            },
            {
                name: 'Debug Filter',
                valuesCausingInclusion: 'DEBUG:',
                valuesCausingExclusion: '',
                requiresValue: false,
                errorMessage: 'Debug level is optional'
            }
        ]),
        type: 'string',
        category: 'PscuLogFileTransformService',
        isRequired: true,
        isReadOnly: false
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.PathConfiguration',
        label: 'Path Configuration',
        description: 'Path configuration for input and output files',
        value: JSON.stringify({
            inputPath: '/var/log/pscu/incoming',
            outputPath: '/var/log/pscu/processed',
            errorPath: '/var/log/pscu/error',
            processedPath: '/var/log/pscu/archive',
            inputFilenamePattern: 'transaction_log_*.txt',
            outputFilePrefix: 'processed_log_',
            inputFileExclusiveAccessTimeout: '30000'
        }),
        type: 'string',
        category: 'PscuLogFileTransformService',
        isRequired: true,
        isReadOnly: false
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.InputFileFields',
        label: 'Input File Fields',
        description: 'Field configurations for input log files',
        value: JSON.stringify([
            {
                name: 'timestamp',
                position: 1,
                length: 19,
                required: true,
                validationPattern: '\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}',
                validationMessage: 'Invalid timestamp format'
            },
            {
                name: 'transactionId',
                position: 2,
                length: 12,
                required: true,
                validationPattern: 'TXN_\\d+',
                validationMessage: 'Invalid transaction ID format'
            },
            {
                name: 'amount',
                position: 3,
                length: 10,
                required: true,
                validationPattern: '\\$\\d+\\.\\d{2}',
                validationMessage: 'Invalid amount format'
            },
            {
                name: 'status',
                position: 4,
                length: 8,
                required: true,
                validationPattern: 'SUCCESS|FAILED|PENDING',
                validationMessage: 'Invalid status'
            }
        ]),
        type: 'string',
        category: 'PscuLogFileTransformService',
        isRequired: true,
        isReadOnly: false
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.OutputFileFields',
        label: 'Output File Fields',
        description: 'Field configurations for output CSV files',
        value: JSON.stringify([
            {
                name: 'Date',
                position: 1,
                length: 10,
                padCharacter: ' ',
                alignment: 'Left'
            },
            {
                name: 'Time',
                position: 2,
                length: 8,
                padCharacter: ' ',
                alignment: 'Left'
            },
            {
                name: 'Transaction_ID',
                position: 3,
                length: 12,
                padCharacter: '0',
                alignment: 'Right'
            },
            {
                name: 'Amount_USD',
                position: 4,
                length: 10,
                padCharacter: ' ',
                alignment: 'Right'
            },
            {
                name: 'Status',
                position: 5,
                length: 8,
                padCharacter: ' ',
                alignment: 'Left'
            }
        ]),
        type: 'string',
        category: 'PscuLogFileTransformService',
        isRequired: true,
        isReadOnly: false
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
    },
    {
        key: 'api',
        label: 'API Settings',
        description: 'API request settings',
        settings: mockSettings.filter(s => s.category === 'api'),
        order: 4
    },
    {
        key: 'password',
        label: 'Password Settings',
        description: 'Configure password display and behavior settings',
        settings: mockSettings.filter(s => s.category === 'password'),
        order: 5
    },
    {
        key: 'password-verification',
        label: 'Password Verification Settings',
        description: 'Configure password verification and validation rules',
        settings: mockSettings.filter(s => s.category === 'password-verification'),
        order: 6
    },
    {
        key: 'PscuLogFileTransformService',
        label: 'PSCU Log File Transform Service Settings',
        description: 'Configure PSCU log file transform service settings',
        settings: mockSettings.filter(s => s.category === 'PscuLogFileTransformService'),
        order: 7
    }
];