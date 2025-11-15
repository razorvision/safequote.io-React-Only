import { describe, it, expect } from 'vitest';
import { getInsuranceQuotes } from './insuranceData';

describe('insuranceData', () => {
  describe('getInsuranceQuotes', () => {
    it('should return 3 insurance quotes', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotes = getInsuranceQuotes(vehicle);

      expect(quotes).toHaveLength(3);
      expect(quotes[0]).toHaveProperty('provider');
      expect(quotes[0]).toHaveProperty('url');
      expect(quotes[0]).toHaveProperty('monthlyPrice');
      expect(quotes[0]).toHaveProperty('rating');
      expect(quotes[0]).toHaveProperty('discount');
      expect(quotes[0]).toHaveProperty('recommended');
      expect(quotes[0]).toHaveProperty('coverage');
    });

    it('should apply higher base price for new vehicles', () => {
      const newVehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const preownedVehicle = {
        condition: 'Preowned',
        safetyRating: 5,
      };

      const newQuotes = getInsuranceQuotes(newVehicle);
      const preownedQuotes = getInsuranceQuotes(preownedVehicle);

      // New vehicles have basePrice of 180, preowned have 150
      // Both have same safety discount (5 * 2 = 10)
      // So new should be 30 more expensive
      expect(newQuotes[0].monthlyPrice).toBe(preownedQuotes[0].monthlyPrice + 30);
    });

    it('should apply safety rating discount correctly', () => {
      const highSafetyVehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const lowSafetyVehicle = {
        condition: 'New',
        safetyRating: 1,
      };

      const highSafetyQuotes = getInsuranceQuotes(highSafetyVehicle);
      const lowSafetyQuotes = getInsuranceQuotes(lowSafetyVehicle);

      // Safety discount is safetyRating * 2
      // High safety: 5 * 2 = 10 discount
      // Low safety: 1 * 2 = 2 discount
      // Difference should be 8
      expect(lowSafetyQuotes[0].monthlyPrice).toBe(highSafetyQuotes[0].monthlyPrice + 8);
    });

    it('should use default safety rating of 5 if not provided', () => {
      const vehicleWithoutRating = {
        condition: 'New',
      };

      const vehicleWithRating = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotesWithoutRating = getInsuranceQuotes(vehicleWithoutRating);
      const quotesWithRating = getInsuranceQuotes(vehicleWithRating);

      expect(quotesWithoutRating[0].monthlyPrice).toBe(quotesWithRating[0].monthlyPrice);
    });

    it('should mark SafeGuard Insurance as recommended', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotes = getInsuranceQuotes(vehicle);

      expect(quotes[0].provider).toBe('SafeGuard Insurance');
      expect(quotes[0].recommended).toBe(true);
      expect(quotes[1].recommended).toBe(false);
      expect(quotes[2].recommended).toBe(false);
    });

    it('should calculate different prices for each provider', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotes = getInsuranceQuotes(vehicle);

      // Based on the implementation:
      // SafeGuard: basePrice - safetyDiscount
      // DriveSecure: basePrice - safetyDiscount + 20
      // YouthShield: basePrice - safetyDiscount + 35
      expect(quotes[1].monthlyPrice).toBe(quotes[0].monthlyPrice + 20);
      expect(quotes[2].monthlyPrice).toBe(quotes[0].monthlyPrice + 35);
    });

    it('should include coverage array for each quote', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotes = getInsuranceQuotes(vehicle);

      quotes.forEach((quote) => {
        expect(Array.isArray(quote.coverage)).toBe(true);
        expect(quote.coverage.length).toBeGreaterThan(0);
      });
    });

    it('should return valid URLs for each provider', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotes = getInsuranceQuotes(vehicle);

      quotes.forEach((quote) => {
        expect(quote.url).toMatch(/^https:\/\//);
      });
    });

    it('should have ratings between 4.5 and 5.0', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 5,
      };

      const quotes = getInsuranceQuotes(vehicle);

      quotes.forEach((quote) => {
        expect(quote.rating).toBeGreaterThanOrEqual(4.5);
        expect(quote.rating).toBeLessThanOrEqual(5.0);
      });
    });

    it('should round monthly prices to integers', () => {
      const vehicle = {
        condition: 'New',
        safetyRating: 3, // This might create fractional prices
      };

      const quotes = getInsuranceQuotes(vehicle);

      quotes.forEach((quote) => {
        expect(Number.isInteger(quote.monthlyPrice)).toBe(true);
      });
    });
  });
});
