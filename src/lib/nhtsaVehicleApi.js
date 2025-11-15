/**
 * NHTSA vPIC (Vehicle Product Information Catalog) API Helper
 *
 * Provides functions to fetch vehicle makes and models from the NHTSA vPIC API.
 * Used to populate dropdown selectors for vehicle safety rating lookups.
 *
 * API Documentation: https://vpic.nhtsa.dot.gov/api/
 */

const VPIC_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

/**
 * Fetches all vehicle makes from the NHTSA vPIC API
 * @returns {Promise<Array<{id: number, name: string}>>} Array of make objects
 * @throws {Error} If the API request fails
 */
export async function fetchAllMakes() {
  try {
    const response = await fetch(`${VPIC_BASE_URL}/GetAllMakes?format=json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API response to simpler format and sort alphabetically
    const makes = data.Results
      .map(make => ({
        id: make.Make_ID,
        name: make.Make_Name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return makes;
  } catch (error) {
    console.error('Error fetching vehicle makes:', error);
    throw new Error('Failed to load vehicle makes. Please try again.');
  }
}

/**
 * Fetches models for a specific make and year from the NHTSA vPIC API
 * @param {string} make - The vehicle make (e.g., "Toyota")
 * @param {string|number} year - The model year (e.g., "2024" or 2024)
 * @returns {Promise<Array<{id: number, name: string}>>} Array of model objects
 * @throws {Error} If the API request fails or parameters are invalid
 */
export async function fetchModelsForMakeYear(make, year) {
  if (!make || !year) {
    throw new Error('Make and year are required');
  }

  try {
    const encodedMake = encodeURIComponent(make);
    const response = await fetch(
      `${VPIC_BASE_URL}/GetModelsForMakeYear/make/${encodedMake}/modelyear/${year}?format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API response to simpler format and sort alphabetically
    const models = data.Results
      .map(model => ({
        id: model.Model_ID,
        name: model.Model_Name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return models;
  } catch (error) {
    console.error(`Error fetching models for ${make} ${year}:`, error);
    throw new Error(`Failed to load models for ${make}. Please try again.`);
  }
}

/**
 * Generates an array of years for the year dropdown
 * @param {number} startYear - The earliest year to include (default: 1995)
 * @param {number} endYear - The latest year to include (default: current year + 1)
 * @returns {Array<number>} Array of years in descending order
 */
export function generateYearRange(startYear = 1995, endYear = new Date().getFullYear() + 1) {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
}
