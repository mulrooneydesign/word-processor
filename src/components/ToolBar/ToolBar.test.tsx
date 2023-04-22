import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import ToolBar from './ToolBar';

describe('ToolBar', () => {
  test('should render the ToolBar', () => {
    render(<ToolBar />);
    expect(screen.getByTestId('toolBar')).toBeInTheDocument();
  });

  test('should render the save button', () => {
    render(<ToolBar />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('should render the load button', () => {
    render(<ToolBar />);
    expect(screen.getByText('Load')).toBeInTheDocument();
  });

  test('should render the undo button', () => {
    render(<ToolBar />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });
});
