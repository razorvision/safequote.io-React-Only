export const getInsuranceQuotes = (vehicle) => {
  const basePrice = vehicle.condition === 'New' ? 180 : 150;
  const safetyDiscount = (vehicle.safetyRating || 5) * 2;
  
  return [
    {
      provider: 'SafeGuard Insurance',
      url: 'https://www.progressive.com/',
      monthlyPrice: Math.round(basePrice - safetyDiscount),
      rating: 4.8,
      discount: 15,
      recommended: true,
      coverage: [
        'Liability Coverage',
        'Collision Coverage',
        'Comprehensive Coverage',
        'Teen Driver Discount',
        '24/7 Roadside Assistance'
      ]
    },
    {
      provider: 'DriveSecure',
      url: 'https://www.geico.com/',
      monthlyPrice: Math.round(basePrice - safetyDiscount + 20),
      rating: 4.6,
      discount: 10,
      recommended: false,
      coverage: [
        'Full Coverage',
        'Accident Forgiveness',
        'New Driver Support',
        'Mobile App Tracking'
      ]
    },
    {
      provider: 'YouthShield Auto',
      url: 'https://www.statefarm.com/',
      monthlyPrice: Math.round(basePrice - safetyDiscount + 35),
      rating: 4.5,
      discount: 12,
      recommended: false,
      coverage: [
        'Liability & Collision',
        'Teen Safety Program',
        'Defensive Driving Discount',
        'Parent Portal Access'
      ]
    }
  ];
};