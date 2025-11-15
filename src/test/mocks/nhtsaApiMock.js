import { http, HttpResponse } from 'msw';

const VPIC_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const SAFETY_RATINGS_BASE_URL = 'https://api.nhtsa.gov/SafetyRatings';

// Mock data for vehicle models
export const mockModelsData = {
  Count: 3,
  Message: 'Response returned successfully',
  Results: [
    { Model_ID: 1, Model_Name: 'Camry' },
    { Model_ID: 2, Model_Name: 'Corolla' },
    { Model_ID: 3, Model_Name: 'Highlander' },
  ],
};

// Mock data for safety ratings
export const mockSafetyRatingsData = {
  Count: 1,
  Message: 'Response returned successfully',
  Results: [
    {
      VehicleDescription: '2024 Toyota Camry',
      VehicleId: 12345,
      ModelYear: '2024',
      OverallRating: '5',
      OverallFrontCrashRating: '5',
      OverallSideCrashRating: '5',
      RolloverRating: '4',
      VehiclePicture: 'https://example.com/camry.jpg',
      ComplaintsCount: 0,
      RecallsCount: 0,
      InvestigationCount: 0,
    },
  ],
};

// Mock data for detailed safety ratings
export const mockDetailedSafetyRatingsData = {
  Count: 1,
  Message: 'Response returned successfully',
  Results: [
    {
      ...mockSafetyRatingsData.Results[0],
      FrontCrashDriversideRating: '5',
      FrontCrashPassengersideRating: '5',
      SideCrashDriversideRating: '5',
      SideCrashPassengersideRating: '5',
      SidePoleCrashRating: '5',
      RolloverPossibility: 0.15,
      NHTSAElectronicStabilityControl: 'Standard',
      NHTSAForwardCollisionWarning: 'Standard',
      NHTSALaneDepartureWarning: 'Standard',
    },
  ],
};

// MSW handlers for NHTSA API
export const nhtsaApiHandlers = [
  // Mock GetModelsForMakeYear endpoint
  http.get(`${VPIC_BASE_URL}/GetModelsForMakeYear/*`, () => {
    return HttpResponse.json(mockModelsData);
  }),

  // Mock safety ratings search endpoint
  http.get(`${SAFETY_RATINGS_BASE_URL}/modelyear/:year/make/:make/model/:model`, () => {
    return HttpResponse.json(mockSafetyRatingsData);
  }),

  // Mock detailed safety ratings endpoint
  http.get(`${SAFETY_RATINGS_BASE_URL}/VehicleId/:id`, () => {
    return HttpResponse.json(mockDetailedSafetyRatingsData);
  }),
];

// Error response helpers
export const createErrorResponse = (status = 500, message = 'Internal Server Error') => {
  return HttpResponse.json(
    {
      Count: 0,
      Message: message,
      Results: [],
    },
    { status }
  );
};

// Helper to create empty results response
export const createEmptyResponse = () => {
  return HttpResponse.json({
    Count: 0,
    Message: 'No results found',
    Results: [],
  });
};
