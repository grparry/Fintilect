import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/../theme';

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Test Utils', () => {
  it('should render test components correctly', () => {
    const TestComponent = () => <div>Test Component</div>;
    const { getByText } = render(<TestComponent />);
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
