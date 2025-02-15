

export interface ValidationError {
    field: string;
    message: string;
}
export interface ValidationResult {
    valid: boolean;
    errors?: ValidationError[];
}
export interface SettingMetadata {
    schema?: object;
    version?: string;
    lastModified?: string;
    [key: string]: any;
}
export interface SettingBatchRequest {
    keys: string[];
}
export interface SettingBatchResponse {
    settings: Array<{
        key: string;
        value: any;
        metadata?: SettingMetadata;
    }>;
}