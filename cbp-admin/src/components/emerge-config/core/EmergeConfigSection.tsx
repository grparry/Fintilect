import React, { Component } from 'react';
import { Box, Alert, LinearProgress } from '@mui/material';
import {
    ConfigValue,
    ConfigMetadata,
    ConfigSectionProps,
    ConfigSectionState,
    ValidationRules,
    ValidationResult,
    LayoutDefinition
} from '@/types';
import { SettingsService } from '@services/settings';

/**
 * Base class for all configuration sections
 */
export abstract class EmergeConfigSection<T extends ConfigValue> extends Component<ConfigSectionProps<T>, ConfigSectionState<T>> {
    /** Configuration metadata */
    static metadata: ConfigMetadata;
    
    /** Settings service instance */
    private settingsService: SettingsService;

    constructor(props: ConfigSectionProps<T>) {
        super(props);
        this.settingsService = SettingsService.getInstance();
        this.state = {
            loading: true,
            error: null,
            value: null,
            validationResult: null
        };
    }

    componentDidMount() {
        this.loadConfig();
    }

    /**
     * Get validation rules for the configuration
     */
    protected abstract getValidationRules(): ValidationRules;

    /**
     * Get layout definition for the configuration
     */
    protected abstract getLayout(): LayoutDefinition;

    /**
     * Load configuration from settings service
     */
    protected async loadConfig() {
        try {
            const metadata = (this.constructor as typeof EmergeConfigSection).metadata;
            const value = await this.settingsService.getValue<T>(metadata.key);
            
            this.setState({
                loading: false,
                value: value || this.getDefaultValue(),
                error: null
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: 'Failed to load configuration'
            });
        }
    }

    /**
     * Save configuration to settings service
     */
    protected async saveConfig(value: T) {
        try {
            const metadata = (this.constructor as typeof EmergeConfigSection).metadata;
            await this.settingsService.setValue(metadata.key, value);
            
            this.setState({
                value,
                error: null
            });

            this.props.onSave?.(value);
        } catch (error) {
            this.setState({
                error: 'Failed to save configuration'
            });
        }
    }

    /**
     * Validate configuration value
     */
    protected async validateConfig(value: T): Promise<ValidationResult> {
        try {
            const result = await this.settingsService.validate(value);
            this.setState({ validationResult: result });
            this.props.onValidate?.(result);
            return result;
        } catch (error) {
            const errorResult: ValidationResult = {
                valid: false,
                errors: [{
                    field: '',
                    message: 'Validation failed'
                }]
            };
            this.setState({ validationResult: errorResult });
            return errorResult;
        }
    }

    /**
     * Handle field value change
     */
    protected handleFieldChange = (field: keyof T, value: unknown) => {
        const newValue = {
            ...this.state.value,
            [field]: value
        } as T;

        this.setState({ value: newValue });
        this.validateConfig(newValue);
        this.props.onChange?.(newValue);
    };

    /**
     * Get default value for the configuration
     */
    protected getDefaultValue(): T {
        return {} as T;
    }

    /**
     * Render error state
     */
    protected renderError() {
        if (!this.state.error) return null;
        return <Alert severity="error">{this.state.error}</Alert>;
    }

    /**
     * Render loading state
     */
    protected renderLoading() {
        return <LinearProgress />;
    }

    /**
     * Render configuration form
     */
    protected abstract renderForm(): React.ReactNode;

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        }

        return (
            <Box sx={{ p: 2 }}>
                {this.renderError()}
                {this.renderForm()}
            </Box>
        );
    }
}
