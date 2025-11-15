import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VehicleCard from './VehicleCard';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('VehicleCard', () => {
  const mockVehicle = {
    id: 1,
    make: 'Honda',
    model: 'Civic',
    year: 2024,
    condition: 'New',
    type: 'Sedan',
    price: 25000,
    mileage: 15,
    safetyRating: 5,
    image: 'https://example.com/civic.jpg',
    safetyFeatures: [
      'Forward Collision Warning',
      'Lane Departure Warning',
      'Automatic Emergency Braking',
      'Blind Spot Monitoring',
    ],
  };

  const mockOnSelect = vi.fn();

  it('should render vehicle information correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('2024 Honda Civic')).toBeInTheDocument();
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('25,000')).toBeInTheDocument();
    expect(screen.getByText('15 miles')).toBeInTheDocument();
  });

  it('should display safety rating with stars', () => {
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('(5/5)')).toBeInTheDocument();
  });

  it('should display vehicle image with correct alt text', () => {
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    const image = screen.getByAltText('2024 Honda Civic');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockVehicle.image);
  });

  it('should display first 3 safety features', () => {
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('Forward Collision Warning')).toBeInTheDocument();
    expect(screen.getByText('Lane Departure Warning')).toBeInTheDocument();
    expect(screen.getByText('Automatic Emergency Braking')).toBeInTheDocument();

    // Fourth feature should not be displayed (slice(0, 3))
    expect(screen.queryByText('Blind Spot Monitoring')).not.toBeInTheDocument();
  });

  it('should call onSelect when button is clicked', async () => {
    const user = userEvent.setup();
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    const button = screen.getByRole('button', { name: /get insurance quotes/i });
    await user.click(button);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockVehicle);
  });

  it('should render with different safety ratings', () => {
    const vehicleWith3Stars = { ...mockVehicle, safetyRating: 3 };
    render(<VehicleCard vehicle={vehicleWith3Stars} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('(3/5)')).toBeInTheDocument();
  });

  it('should format price with comma separators', () => {
    const expensiveVehicle = { ...mockVehicle, price: 45000 };
    render(<VehicleCard vehicle={expensiveVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('45,000')).toBeInTheDocument();
  });

  it('should format mileage with comma separators', () => {
    const highMileageVehicle = { ...mockVehicle, mileage: 25000 };
    render(<VehicleCard vehicle={highMileageVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('25,000 miles')).toBeInTheDocument();
  });

  it('should display preowned condition badge', () => {
    const preownedVehicle = { ...mockVehicle, condition: 'Preowned' };
    render(<VehicleCard vehicle={preownedVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('Preowned')).toBeInTheDocument();
  });

  it('should display different vehicle types', () => {
    const suvVehicle = { ...mockVehicle, type: 'SUV' };
    render(<VehicleCard vehicle={suvVehicle} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('SUV')).toBeInTheDocument();
  });

  it('should render button with correct styling classes', () => {
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    const button = screen.getByRole('button', { name: /get insurance quotes/i });
    expect(button).toHaveClass('w-full');
  });

  it('should display year in title and year section', () => {
    render(<VehicleCard vehicle={mockVehicle} index={0} onSelect={mockOnSelect} />);

    // Year appears in the title "2024 Honda Civic"
    expect(screen.getByText('2024 Honda Civic')).toBeInTheDocument();
    // Year also appears separately in the calendar section
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('should handle vehicles with fewer than 3 safety features', () => {
    const vehicleWithFewFeatures = {
      ...mockVehicle,
      safetyFeatures: ['Forward Collision Warning', 'Lane Departure Warning'],
    };
    render(<VehicleCard vehicle={vehicleWithFewFeatures} index={0} onSelect={mockOnSelect} />);

    expect(screen.getByText('Forward Collision Warning')).toBeInTheDocument();
    expect(screen.getByText('Lane Departure Warning')).toBeInTheDocument();
  });
});
