import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';

/**


/**
 * Renders a component within a Router context for testing navigation
 */
  { route = '/', path = '/' } = {}
) {

    <BrowserRouter>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </BrowserRouter>
  );

/**
 * Creates a mock navigation event
 */
