/**
 * NHTSA vPIC API Helper Functions
 * Documentation: https://vpic.nhtsa.dot.gov/api/
 */

const VPIC_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

/**
 * Fetch all vehicle makes from NHTSA vPIC API
 * @returns {Promise<Array<{id: number, name: string}>>} Array of vehicle makes
 */
export async function fetchAllMakes() {
  try {
    const response = await fetch(`${VPIC_BASE_URL}/GetAllMakes?format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.Results || !Array.isArray(data.Results)) {
      throw new Error('Invalid response format from NHTSA API');
    }

    // Map and sort makes alphabetically
    const makes = data.Results
      .map(make => ({
        id: make.Make_ID,
        name: make.Make_Name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Loaded ${makes.length} vehicle makes`);
    return makes;
  } catch (error) {
    console.error('Error fetching makes:', error);
    throw error;
  }
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

    // Map and sort models alphabetically
    const models = data.Results
      .map(model => ({
        id: model.Model_ID,
        name: model.Model_Name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Loaded ${models.length} models for ${make} ${year}`);
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
