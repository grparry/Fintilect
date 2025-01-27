import React from 'react';
import { screen } from '@testing-library/react';
import { TestUtils } from './test-utils';

describe('Test Utils', () => {
  it('should render component with providers', () => {
    const TestComponent = () => <div>Test Content</div>;
    TestUtils.renderWithProviders(<TestComponent />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});