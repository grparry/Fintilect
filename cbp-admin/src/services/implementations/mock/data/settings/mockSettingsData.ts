import { Setting, SettingGroup } from '@models/settings/types';

export const mockSettings: Setting[] = [
    {
        key: 'Features.TravelNotification.TravelNotificationEnabled',
        value: 'true',
        dataType: 'boolean',
        description: 'Enable/disable travel notification feature',
        validation: {
            required: true
        }
    },
    {
        key: 'Features.TravelNotification.MinVersion',
        value: '2.0',
        dataType: 'number',
        description: 'Minimum version required for travel notifications',
        validation: {
            required: true,
            range: { min: 1, max: 10 }
        }
    },
    {
        key: 'Features.TravelNotification.SubjectLine',
        value: 'Travel Notification',
        dataType: 'string',
        description: 'Subject line for travel notification emails',
        validation: {
            required: true,
            maxLength: 100
        }
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.Filters',
        value: JSON.stringify([{
            Name: "Transaction Post Date",
            ValuesCausingInclusion: "",
            ValuesCausingExclusion: "",
            RequiresValue: true,
            ErrorMessage: "Transaction Post Date is required"
        }]),
        dataType: 'json',
        description: 'Filter configurations for the transform service',
        validation: {
            required: true
        }
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.InputFileFields',
        value: JSON.stringify([{
            Name: "Savings Account Number",
            DataType: "System.String",
            EmptyAllowed: false
        }]),
        dataType: 'json',
        description: 'Input field configurations for the transform service',
        validation: {
            required: true
        }
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.OutputFileFields',
        value: JSON.stringify([{
            Position: 0,
            WhitespaceLength: 0,
            Name: "Savings Account Number",
            CustomFormatter: null,
            TruncateToLength: 9,
            TruncateFromPosition: "",
            MinimumOutputLength: 9,
            MinimumOutputPadFromPosition: "",
            OutputFormatString: "",
            StaticTextValue: ""
        }]),
        dataType: 'json',
        description: 'Output field configurations for the transform service',
        validation: {
            required: true
        }
    },
    {
        key: 'PsiServices.PscuLogFileTransformService.Paths',
        value: JSON.stringify({
            InputPath: "C:\\PSCU\\Input",
            InputFilenamePattern: "*.txt",
            OutputPath: "C:\\PSCU\\Output",
            ErrorPath: "C:\\PSCU\\Error",
            ProcessedPath: "C:\\PSCU\\Processed",
            CompletedPath: "C:\\PSCU\\Completed",
            OutputFilePrefix: "PSCU_",
            InputFileExclusiveAccessTimeout: "00:01:00"
        }),
        dataType: 'json',
        description: 'Path configurations for the transform service',
        validation: {
            required: true
        }
    }
];

export const mockSettingGroups: Record<string, SettingGroup> = {
    'TravelNotificationFeature': {
        settings: mockSettings.filter(s => s.key.startsWith('Features.TravelNotification')),
        metadata: {
            __metadata: {
                'enabled': 'Features.TravelNotification.TravelNotificationEnabled',
                'minVersion': 'Features.TravelNotification.MinVersion',
                'subjectLine': 'Features.TravelNotification.SubjectLine'
            },
            __validations: {
                'minVersion': {
                    range: { min: 1, max: 10 }
                },
                'subjectLine': {
                    maxLength: { length: 100 }
                }
            },
            __display: {
                'enabled': {
                    name: 'Enable Travel Notifications',
                    description: 'Turn travel notification feature on/off'
                },
                'minVersion': {
                    name: 'Minimum Version',
                    description: 'Minimum version required for the feature'
                }
            }
        }
    },
    'AccountSettings': {
        settings: mockSettings.filter(s => s.key.startsWith('Accounts')),
        metadata: {
            __metadata: {},
            __validations: {},
            __display: {}
        }
    },
    'PscuLogFileTransformService': {
        settings: mockSettings.filter(s => s.key.startsWith('PsiServices.PscuLogFileTransformService')),
        metadata: {
            __metadata: {
                'filters': 'PsiServices.PscuLogFileTransformService.Filters',
                'inputFileFields': 'PsiServices.PscuLogFileTransformService.InputFileFields',
                'outputFileFields': 'PsiServices.PscuLogFileTransformService.OutputFileFields',
                'paths': 'PsiServices.PscuLogFileTransformService.Paths'
            },
            __validations: {
                'filters': {
                    required: true,
                    type: 'array'
                },
                'inputFileFields': {
                    required: true,
                    type: 'array'
                },
                'outputFileFields': {
                    required: true,
                    type: 'array'
                },
                'paths': {
                    required: true,
                    type: 'object'
                }
            },
            __display: {
                'filters': {
                    name: 'Filter Configurations',
                    description: 'Configure filters for the PSCU log file transform'
                },
                'inputFileFields': {
                    name: 'Input Field Configurations',
                    description: 'Configure input fields for the transform service'
                },
                'outputFileFields': {
                    name: 'Output Field Configurations',
                    description: 'Configure output fields and their formatting'
                },
                'paths': {
                    name: 'Path Configurations',
                    description: 'Configure input, output, and processing paths'
                }
            }
        }
    }
};
