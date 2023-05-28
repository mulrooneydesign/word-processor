import { render, screen, within } from '@testing-library/react';
import Login from './Login';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

describe('Login', () => {
  test('Displays the login form', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  test('Renders the login button', async () => {
    render(<RouterProvider router={router} />);
    const form = screen.getByTestId('login');
    expect(within(form).getAllByText('Login')[1]).toHaveAttribute(
      'type',
      'submit'
    );
  });

  test('Renders the email input', async () => {
    render(<RouterProvider router={router} />);
    const form = screen.getByTestId('login');
    within(form).getByPlaceholderText('email');
  });

  test('Renders the password input', async () => {
    render(<RouterProvider router={router} />);
    const form = screen.getByTestId('login');
    within(form).getByPlaceholderText('password');
  });
});
