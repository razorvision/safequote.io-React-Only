import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('Hero', () => {
  it('should render main heading', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { name: /find the safest car & lowest insurance rate/i })).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<Hero />);

    expect(screen.getByText(/discover top-rated safe cars and compare insurance quotes/i)).toBeInTheDocument();
  });

  it('should render Get Started button', () => {
    render(<Hero />);

    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it('should render background image with correct alt text', () => {
    render(<Hero />);

    const image = screen.getByAltText(/parent handing car keys to a happy teenager/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('should scroll to start element when button is clicked', async () => {
    const user = userEvent.setup();

    // Mock the scrollIntoView function and getElementById
    const mockScrollIntoView = vi.fn();
    const mockElement = { scrollIntoView: mockScrollIntoView };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Hero />);

    const button = screen.getByRole('button', { name: /get started/i });
    await user.click(button);

    expect(document.getElementById).toHaveBeenCalledWith('start');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should not throw error when start element does not exist', async () => {
    const user = userEvent.setup();
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<Hero />);

    const button = screen.getByRole('button', { name: /get started/i });

    // Should not throw
    await expect(user.click(button)).resolves.not.toThrow();
  });

  it('should render ArrowDown icon in button', () => {
    render(<Hero />);

    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();

    // The lucide-react icon should be present (check for svg)
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
