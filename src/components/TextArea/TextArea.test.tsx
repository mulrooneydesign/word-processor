import { describe, expect, it as test } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TextArea from './TextArea';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TextArea />,
  },
]);

const AppWithRouter = () => <RouterProvider router={router} />;

describe('TextArea as rendered in main app', () => {
  test('should render the textarea', () => {
    render(<AppWithRouter />);
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });

  test('should render the textarea', () => {
    render(<AppWithRouter />);
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });

  test('should a allow user to type in the textarea', async () => {
    render(<AppWithRouter />);

    const textarea = screen.getByTestId('textarea');

    userEvent.clear(textarea);
    userEvent.type(textarea, 'Hello world');

    await waitFor(async () => {
      const textArea = await screen.findByTestId('textarea');
      expect(textArea).toHaveValue('Hello world');
    });
  });
});

describe('App functionality that relies on TextArea', () => {
  test('Should render markdown to h1 html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '# Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<h1>Hello World</h1>');
    });
  });

  test('Should render markdown to h2 html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '## Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<h2>Hello World</h2>');
    });
  });

  test('Should render markdown to h3 html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '### Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<h3>Hello World</h3>');
    });
  });

  test('Should render markdown to h4 html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '#### Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<h4>Hello World</h4>');
    });
  });

  test('Should render markdown to h5 html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '##### Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<h5>Hello World</h5>');
    });
  });

  test('Should render markdown to h6 html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '###### Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<h6>Hello World</h6>');
    });
  });

  test('Should render markdown to p html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, 'Hello World');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<p>Hello World</p>');
    });
  });

  test('Should render markdown to strong html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '**Hello World**');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<strong>Hello World</strong>');
    });
  });

  test('Should render markdown to em html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');
    userEvent.type(textarea, '*Hello World*');

    await waitFor(() => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toHaveTextContent('Hello World');
      expect(container).toContainHTML('<em>Hello World</em>');
    });
  });

  test('Should render markdown to a html elements to container', async () => {
    render(<AppWithRouter />);
    const textarea = screen.getByTestId('textarea');

    fireEvent.change(textarea, {
      target: { value: '[www.google.com](https://www.google.com)' },
    });

    await waitFor(async () => {
      const container = screen.getByTestId('markDownContainer');
      expect(container).toContainHTML(
        '<a href="https://www.google.com">www.google.com</a>'
      );
    });

    test.only('Should render markdown to code html elements to container', async () => {
      render(<AppWithRouter />);
      const textarea = screen.getByTestId('textarea');
      userEvent.type(textarea, '```javascript\nconst hello = "world";\n```');

      await waitFor(() => {
        const container = screen.getByTestId('markDownContainer');
        expect(container).toHaveTextContent('const hello = "world";');
        expect(container).toContainHTML('<code>const hello = "world";</code>');
      });
    });
  });
});
