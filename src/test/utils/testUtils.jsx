import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Custom render function that wraps components with necessary providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @returns {Object} Render result with custom utilities
 */
export function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  const Wrapper = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

/**
 * Wait for async updates to complete
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
export const waitFor = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

// Re-export everything from React Testing Library
export * from '@testing-library/react';
