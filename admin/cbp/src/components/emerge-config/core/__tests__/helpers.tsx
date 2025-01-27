import { render, RenderResult } from '@testing-library/react';
import { ConfigValue } from '../../types';
import { EmergeConfigSection } from '../EmergeConfigSection';
import { ComponentType } from 'react';

/**
 * Render a configuration section for testing
 */
export function renderConfigSection<T extends ConfigValue>(
    SectionComponent: ComponentType<any>,
    props?: Partial<React.ComponentProps<typeof EmergeConfigSection>>
): RenderResult {
    return render(<SectionComponent {...props} />);
}
/**
 * Wait for configuration to load
 */
export async function waitForConfigLoad(result: RenderResult) {
    await result.findByRole('progressbar');
    await result.findByRole('form');
}
/**
 * Create test configuration value
 */
export function createTestConfig<T extends ConfigValue>(config: Partial<T>): T {
    return {
        ...config
    } as T;
}