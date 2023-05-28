import { render, screen } from '@testing-library/react';
import Logout from './Logout';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Logout />,
  },
]);

describe('Logout', () => {
  test('Displays the logout page', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('logout')).toBeInTheDocument();
  });

  test('Renders the login link and the login button', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getAllByText('Login')).toHaveLength(2);
  });
});
