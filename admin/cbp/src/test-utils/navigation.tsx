import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';

/**
 * Renders a component within a Router context for testing navigation
 */
export function renderWithRouter(
  ui: ReactElement,
  { route = '/', path = '/' } = {}
) {
  window.history.pushState({}, 'Test page', route);
  return render(
    <BrowserRouter>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </BrowserRouter>
  );
}
/**
 * Creates a mock navigation event
 */
export function createMockNavigationEvent(path: string) {
  return new PopStateEvent('popstate', { state: { path } });
}