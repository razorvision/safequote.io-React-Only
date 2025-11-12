const mockVehicles = [
  {
    id: 1,
    make: 'Honda',
    model: 'Civic',
    year: 2024,
    condition: 'New',
    type: 'Sedan',
    price: 25000,
    mileage: 15,
    safetyRating: 5,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/11a56110-85f2-4543-78b1-2856f616e400/public',
    safetyFeatures: ['Forward Collision Warning', 'Lane Departure Warning', 'Automatic Emergency Braking', 'Blind Spot Monitoring']
  },
  {
    id: 2,
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    condition: 'Preowned',
    type: 'Sedan',
    price: 21000,
    mileage: 12000,
    safetyRating: 5,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/170b0965-3c12-421b-4399-6d635c05c700/public',
    safetyFeatures: ['Toyota Safety Sense', 'Adaptive Cruise Control', 'Lane Keeping Assist', 'Pre-Collision System']
  },
  {
    id: 3,
    make: 'Mazda',
    model: 'CX-5',
    year: 2024,
    condition: 'New',
    type: 'SUV',
    price: 32000,
    mileage: 8,
    safetyRating: 5,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/489b4f42-a8c9-4467-27b3-c15bdc0f4f00/public',
    safetyFeatures: ['Smart Brake Support', 'Blind Spot Monitoring', 'Rear Cross Traffic Alert', 'Lane Keep Assist']
  },
  {
    id: 4,
    make: 'Subaru',
    model: 'Outback',
    year: 2023,
    condition: 'Preowned',
    type: 'SUV',
    price: 28000,
    mileage: 18000,
    safetyRating: 5,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/f3563428-1110-4c31-7ab3-e29ed80a4a00/public',
    safetyFeatures: ['EyeSight Driver Assist', 'Reverse Automatic Braking', 'Blind Spot Detection', 'Rear Cross Traffic Alert']
  },
  {
    id: 5,
    make: 'Hyundai',
    model: 'Elantra',
    year: 2024,
    condition: 'New',
    type: 'Sedan',
    price: 23000,
    mileage: 5,
    safetyRating: 4,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/99e2b173-1991-4c07-b648-b3d952613d00/public',
    safetyFeatures: ['Forward Collision-Avoidance Assist', 'Lane Keeping Assist', 'Driver Attention Warning', 'Blind-Spot Collision Warning']
  },
  {
    id: 6,
    make: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    condition: 'Preowned',
    type: 'Hatchback',
    price: 19000,
    mileage: 25000,
    safetyRating: 4,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/4c1b1836-9b6f-4029-798c-85949d873000/public',
    safetyFeatures: ['Automatic Post-Collision Braking', 'Blind Spot Monitor', 'Rear Traffic Alert', 'Forward Collision Warning']
  },
  {
    id: 7,
    make: 'Kia',
    model: 'Forte',
    year: 2024,
    condition: 'New',
    type: 'Sedan',
    price: 22000,
    mileage: 10,
    safetyRating: 4,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/7f12330a-1158-4503-4966-38600d350b00/public',
    safetyFeatures: ['Forward Collision Warning', 'Lane Departure Warning', 'Driver Attention Warning', 'Rear Cross-Traffic Collision Warning']
  },
  {
    id: 8,
    make: 'Nissan',
    model: 'Rogue',
    year: 2023,
    condition: 'Preowned',
    type: 'SUV',
    price: 27000,
    mileage: 15000,
    safetyRating: 4,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/15a13c9e-f4e9-4081-49e0-f2034033b000/public',
    safetyFeatures: ['Automatic Emergency Braking', 'Blind Spot Warning', 'Rear Cross Traffic Alert', 'Lane Departure Warning']
  },
  {
    id: 9,
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    condition: 'New',
    type: 'SUV',
    price: 33000,
    mileage: 12,
    safetyRating: 5,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/c2296b42-1271-4084-297c-3f9cb9076f00/public',
    safetyFeatures: ['Honda Sensing Suite', 'Collision Mitigation Braking', 'Road Departure Mitigation', 'Adaptive Cruise Control']
  },
  {
    id: 10,
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    condition: 'New',
    type: 'Truck',
    price: 45000,
    mileage: 20,
    safetyRating: 5,
    image: 'https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/48e55e51-f2f6-4999-7ef4-6f9a9446f200/public',
    safetyFeatures: ['Pre-Collision Assist', 'Lane-Keeping System', '360-Degree Camera', 'Blind Spot Information System']
  }
];

export const getVehicles = (filters) => {
  return mockVehicles.filter(vehicle => {
    const conditionMatch = filters.condition === 'all' || 
      vehicle.condition.toLowerCase() === filters.condition;
    
    const typeMatch = filters.vehicleType === 'all' || 
      vehicle.type.toLowerCase() === filters.vehicleType;
    
    const safetyMatch = vehicle.safetyRating >= filters.minSafetyRating;
    
    const priceMatch = vehicle.price <= filters.maxPrice;
    
    return conditionMatch && typeMatch && safetyMatch && priceMatch;
  });
};