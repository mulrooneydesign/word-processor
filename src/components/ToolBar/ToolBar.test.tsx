import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ToolBar from './ToolBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ToolBar />,
  },
]);

describe('ToolBar', () => {
  test('should render the ToolBar', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('toolBar')).toBeInTheDocument();
  });

  test('should render the save button', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test.todo('should render the load button', () => {
    // only works when signed in
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Load')).toBeInTheDocument();
  });

  test('should render the sign up button', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
