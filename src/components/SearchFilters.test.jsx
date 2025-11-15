import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchFilters from './SearchFilters';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('SearchFilters', () => {
  const mockFilters = {
    condition: 'all',
    vehicleType: 'all',
    minSafetyRating: 4,
    maxPrice: 35000,
  };

  const mockSetFilters = vi.fn();

  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  it('should render the filters heading', () => {
    render(<SearchFilters filters={mockFilters} setFilters={mockSetFilters} />);

    expect(screen.getByText('Refine Your Search')).toBeInTheDocument();
  });

  it('should render all filter labels', () => {
    render(<SearchFilters filters={mockFilters} setFilters={mockSetFilters} />);

    expect(screen.getByText('Condition')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Type')).toBeInTheDocument();
    expect(screen.getByText(/min safety rating/i)).toBeInTheDocument();
    expect(screen.getByText(/max price/i)).toBeInTheDocument();
  });

  it('should display current safety rating value', () => {
    render(<SearchFilters filters={mockFilters} setFilters={mockSetFilters} />);

    expect(screen.getByText('Min Safety Rating: 4/5')).toBeInTheDocument();
  });

  it('should display formatted max price value', () => {
    render(<SearchFilters filters={mockFilters} setFilters={mockSetFilters} />);

    expect(screen.getByText('Max Price: $35,000')).toBeInTheDocument();
  });

  it('should render Filter icon', () => {
    render(<SearchFilters filters={mockFilters} setFilters={mockSetFilters} />);

    // The lucide-react Filter icon should be present
    const heading = screen.getByText('Refine Your Search').closest('div');
    const svg = heading?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should display different safety rating values', () => {
    const filtersWithRating5 = { ...mockFilters, minSafetyRating: 5 };
    render(<SearchFilters filters={filtersWithRating5} setFilters={mockSetFilters} />);

    expect(screen.getByText('Min Safety Rating: 5/5')).toBeInTheDocument();
  });

  it('should display different price values', () => {
    const filtersWithDifferentPrice = { ...mockFilters, maxPrice: 45000 };
    render(<SearchFilters filters={filtersWithDifferentPrice} setFilters={mockSetFilters} />);

    expect(screen.getByText('Max Price: $45,000')).toBeInTheDocument();
  });

  it('should handle edge case of minimum price', () => {
    const filtersWithMinPrice = { ...mockFilters, maxPrice: 10000 };
    render(<SearchFilters filters={filtersWithMinPrice} setFilters={mockSetFilters} />);

    expect(screen.getByText('Max Price: $10,000')).toBeInTheDocument();
  });

  it('should handle edge case of maximum price', () => {
    const filtersWithMaxPrice = { ...mockFilters, maxPrice: 50000 };
    render(<SearchFilters filters={filtersWithMaxPrice} setFilters={mockSetFilters} />);

    expect(screen.getByText('Max Price: $50,000')).toBeInTheDocument();
  });
});
