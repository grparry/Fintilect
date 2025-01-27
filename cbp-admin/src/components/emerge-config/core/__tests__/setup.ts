import '@testing-library/jest-dom';
import { SettingsService } from '@services/settings';
import { ValidationResult } from '@/../types';

/**
 * Mock settings service for testing
 */
export class MockSettingsService implements SettingsService {
    private static instance: MockSettingsService;
    private values: Map<string, unknown>;

    private constructor() {
        this.values = new Map();
    }

    static getInstance(): MockSettingsService {
        if (!MockSettingsService.instance) {
            MockSettingsService.instance = new MockSettingsService();
        }
        return MockSettingsService.instance;
    }

    async getValue<T>(key: string): Promise<T | null> {
        return this.values.get(key) as T || null;
    }

    async setValue(key: string, value: unknown): Promise<void> {
        this.values.set(key, value);
    }

    async validate(value: unknown): Promise<ValidationResult> {
        return { valid: true };
    }

    reset() {
        this.values.clear();
    }
}

/**
 * Setup test environment
 */
export function setupTestEnvironment() {
    // Mock settings service
    jest.mock('@services/settings', () => ({
        SettingsService: MockSettingsService
    }));
}

/**
 * Reset test environment
 */
export function resetTestEnvironment() {
    MockSettingsService.getInstance().reset();
    jest.resetModules();
}
