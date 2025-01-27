import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>


    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );

