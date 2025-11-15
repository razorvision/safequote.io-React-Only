/**
 * NHTSA vPIC API Helper Functions
 * Documentation: https://vpic.nhtsa.dot.gov/api/
 */

const VPIC_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

/**
 * Popular US vehicle makes (curated list for performance)
 * Includes most common manufacturers that parents would shop for
 */
const POPULAR_US_MAKES = [
  'Acura',
  'Audi',
  'BMW',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Ford',
  'Genesis',
  'GMC',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jeep',
  'Kia',
  'Lexus',
  'Lincoln',
  'Mazda',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Ram',
  'Subaru',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo'
];

/**
 * Get popular vehicle makes (instant, no API call needed)
 * @returns {Array<{id: number, name: string}>} Array of popular vehicle makes
 */
export function getPopularMakes() {
  const makes = POPULAR_US_MAKES.map((name, index) => ({
    id: index,
    name: name
  }));
  console.log(`Loaded ${makes.length} popular vehicle makes`);
  return makes;
}

/**
 * Fetch models for a specific make and year
 * @param {string} make - Vehicle make name
 * @param {string|number} year - Model year
 * @returns {Promise<Array<{id: number, name: string}>>} Array of vehicle models
 */
export async function fetchModelsForMakeYear(make, year) {
  try {
    const encodedMake = encodeURIComponent(make);
    const response = await fetch(
      `${VPIC_BASE_URL}/GetModelsForMakeYear/make/${encodedMake}/modelyear/${year}?format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.Results || !Array.isArray(data.Results)) {
      throw new Error('Invalid response format from NHTSA API');
    }

    // Map, deduplicate by name, and sort models alphabetically
    const uniqueModels = new Map();
    data.Results.forEach(model => {
      // Keep the first occurrence of each unique model name
      if (!uniqueModels.has(model.Model_Name)) {
        uniqueModels.set(model.Model_Name, {
          id: model.Model_ID,
          name: model.Model_Name
        });
      }
    });

    const models = Array.from(uniqueModels.values())
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Loaded ${models.length} unique models for ${make} ${year}`);
    return models;
  } catch (error) {
    console.error(`Error fetching models for ${make} ${year}:`, error);
    throw error;
  }
}

/**
 * Generate a range of years for the year dropdown
 * @param {number} startYear - Starting year (default: 1995)
 * @param {number} endYear - Ending year (default: current year + 1)
 * @returns {Array<number>} Array of years in descending order
 */
export function generateYearRange(startYear = 1995, endYear = new Date().getFullYear() + 1) {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
}
