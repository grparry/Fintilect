import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

// Following the minimal testing utilities pattern from testing.md


// Following the minimal testing utilities pattern from testing.md
      <MemoryRouter initialEntries={[path]}>
        <Component {...props} />
      </MemoryRouter>
    );

      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );



