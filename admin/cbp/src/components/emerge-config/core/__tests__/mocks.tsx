import { ConfigValue, ConfigMetadata, LayoutDefinition } from '../../types';
import { EmergeConfigSection } from '../EmergeConfigSection';
import { Box, TextField, Switch } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

/**
 * Mock configuration value
 */
export interface MockConfig extends ConfigValue {
    name: string;
    enabled: boolean;
    count: number;
    [key: string]: unknown;
}
/**
 * Mock configuration section for testing
 */
export class MockConfigSection extends EmergeConfigSection<MockConfig> {
    static metadata: ConfigMetadata = {
        key: 'mock-config',
        title: 'Mock Config',
        description: 'Mock configuration for testing',
        icon: HomeIcon,
        permissions: ['mock.view', 'mock.edit'],
        navigation: {
            parent: 'mock',
            order: 1
        }
    };
    protected getValidationRules() {
        return {
            name: { required: true },
            enabled: { required: true },
            count: { required: true, min: 0 }
        };
    }
    protected getLayout(): LayoutDefinition {
        return {
            sections: [
                {
                    title: 'Mock Settings',
                    fields: [
                        {
                            name: 'name',
                            label: 'Name',
                            component: TextField
                        },
                        {
                            name: 'enabled',
                            label: 'Enabled',
                            component: Switch
                        },
                        {
                            name: 'count',
                            label: 'Count',
                            component: TextField,
                            props: {
                                type: 'number'
                            }
                        }
                    ]
                }
            ]
        };
    }
    protected getDefaultValue(): MockConfig {
        return {
            name: '',
            enabled: false,
            count: 0
        };
    }
    protected renderForm() {
        return (
            <Box sx={{ p: 2 }}>Mock Form</Box>
        );
    }
}