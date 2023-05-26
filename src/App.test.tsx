import { render, screen } from '@testing-library/react';
import { describe, expect, it as test } from 'vitest';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

describe('App', () => {
  test('should render the header', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Markdown')).toBeInTheDocument();
  });

  test('should render the toolbar', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('toolBar')).toBeInTheDocument();
  });
});
