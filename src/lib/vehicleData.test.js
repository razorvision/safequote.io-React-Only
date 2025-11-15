import { describe, it, expect } from 'vitest';
import { getVehicles } from './vehicleData';

describe('vehicleData', () => {
  describe('getVehicles', () => {
    it('should return all vehicles when filters allow all', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBe(10); // Based on mockVehicles array
    });

    it('should filter by condition (new only)', () => {
      const filters = {
        condition: 'new',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.condition).toBe('New');
      });
    });

    it('should filter by condition (preowned only)', () => {
      const filters = {
        condition: 'preowned',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.condition).toBe('Preowned');
      });
    });

    it('should filter by vehicle type (sedan)', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'sedan',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.type).toBe('Sedan');
      });
    });

    it('should filter by vehicle type (suv)', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'suv',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.type).toBe('SUV');
      });
    });

    it('should filter by minimum safety rating', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 5,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.safetyRating).toBeGreaterThanOrEqual(5);
      });
    });

    it('should filter by maximum price', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 25000,
      };

      const vehicles = getVehicles(filters);

      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.price).toBeLessThanOrEqual(25000);
      });
    });

    it('should apply multiple filters together', () => {
      const filters = {
        condition: 'new',
        vehicleType: 'sedan',
        minSafetyRating: 5,
        maxPrice: 30000,
      };

      const vehicles = getVehicles(filters);

      vehicles.forEach((vehicle) => {
        expect(vehicle.condition).toBe('New');
        expect(vehicle.type).toBe('Sedan');
        expect(vehicle.safetyRating).toBeGreaterThanOrEqual(5);
        expect(vehicle.price).toBeLessThanOrEqual(30000);
      });
    });

    it('should return empty array when no vehicles match filters', () => {
      const filters = {
        condition: 'new',
        vehicleType: 'truck',
        minSafetyRating: 5,
        maxPrice: 10000, // Too low for any truck
      };

      const vehicles = getVehicles(filters);

      expect(vehicles).toEqual([]);
    });

    it('should handle edge case with exact price match', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 25000, // Some vehicles are exactly 25000
      };

      const vehicles = getVehicles(filters);

      const exactMatch = vehicles.find((v) => v.price === 25000);
      expect(exactMatch).toBeDefined();
    });

    it('should handle edge case with exact safety rating match', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 4,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      const exactMatch = vehicles.find((v) => v.safetyRating === 4);
      expect(exactMatch).toBeDefined();
    });

    it('should return vehicles with all required properties', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      vehicles.forEach((vehicle) => {
        expect(vehicle).toHaveProperty('id');
        expect(vehicle).toHaveProperty('make');
        expect(vehicle).toHaveProperty('model');
        expect(vehicle).toHaveProperty('year');
        expect(vehicle).toHaveProperty('condition');
        expect(vehicle).toHaveProperty('type');
        expect(vehicle).toHaveProperty('price');
        expect(vehicle).toHaveProperty('mileage');
        expect(vehicle).toHaveProperty('safetyRating');
        expect(vehicle).toHaveProperty('image');
        expect(vehicle).toHaveProperty('safetyFeatures');
      });
    });

    it('should maintain original vehicle data structure', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);
      const firstVehicle = vehicles[0];

      expect(typeof firstVehicle.id).toBe('number');
      expect(typeof firstVehicle.make).toBe('string');
      expect(typeof firstVehicle.model).toBe('string');
      expect(typeof firstVehicle.year).toBe('number');
      expect(typeof firstVehicle.price).toBe('number');
      expect(Array.isArray(firstVehicle.safetyFeatures)).toBe(true);
    });

    it('should handle lowercase condition values', () => {
      const filters = {
        condition: 'new', // lowercase
        vehicleType: 'all',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      // Should match vehicles with condition "New"
      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.condition).toBe('New');
      });
    });

    it('should handle lowercase vehicle type values', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'sedan', // lowercase
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      // Should match vehicles with type "Sedan"
      expect(vehicles.length).toBeGreaterThan(0);
      vehicles.forEach((vehicle) => {
        expect(vehicle.type).toBe('Sedan');
      });
    });

    it('should filter specific vehicle types correctly', () => {
      const filters = {
        condition: 'all',
        vehicleType: 'truck',
        minSafetyRating: 1,
        maxPrice: 100000,
      };

      const vehicles = getVehicles(filters);

      vehicles.forEach((vehicle) => {
        expect(vehicle.type).toBe('Truck');
      });
    });
  });
});
