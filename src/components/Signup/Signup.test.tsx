import { render, screen, within } from '@testing-library/react';
import Signup from './Signup';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup />,
  },
]);

describe('Signup', () => {
  test('Displays the signup form', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('signup')).toBeInTheDocument();
  });

  test('Renders the submit button', async () => {
    render(<RouterProvider router={router} />);
    const form = screen.getByTestId('signup');
    within(form).getByText('Sign up!');
  });

  test('Renders the email input', async () => {
    render(<RouterProvider router={router} />);
    const form = screen.getByTestId('signup');
    within(form).getByPlaceholderText('email');
  });

  test('Renders the password input', async () => {
    render(<RouterProvider router={router} />);
    const form = screen.getByTestId('signup');
    within(form).getByPlaceholderText('password');
  });
});
