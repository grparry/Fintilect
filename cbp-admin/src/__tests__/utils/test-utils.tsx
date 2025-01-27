import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/../theme';

// Following the minimal testing utilities pattern from testing.md
export const TestUtils = {
  renderWithRouter: (Component: React.ComponentType, props = {}, path = '/') => {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Component {...props} />
      </MemoryRouter>
    );
  },

  renderWithProviders: (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  },

  mockNavigation: () => {
    return {
      navigate: jest.fn(),
      location: { pathname: '/' },
    };
  }
};

describe('Test Utils', () => {
  it('should render test components correctly', () => {
    const TestComponent = () => <div>Test Component</div>;
    const { getByText } = render(<TestComponent />);
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});

export default TestUtils;
