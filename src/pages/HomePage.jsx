
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SearchFilters from '@/components/SearchFilters';
import VehicleGrid from '@/components/VehicleGrid';
import InsuranceComparison from '@/components/InsuranceComparison';
import { getVehicles } from '@/lib/vehicleData';
import { AnimatePresence, motion } from 'framer-motion';
import TopSafetyPicks from '@/components/TopSafetyPicks';
import DriversEd from '@/components/DriversEd';
import SafetyRatings from '@/components/SafetyRatings'; // Import SafetyRatings

const HomePage = () => {
  const location = useLocation();
  const [flow, setFlow] = useState(null);
  const [filters, setFilters] = useState({
    condition: 'all',
    minSafetyRating: 4,
    maxPrice: 50000,
    vehicleType: 'all'
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const flowParam = params.get('flow');
    if (flowParam) {
      setFlow(flowParam);
      setTimeout(() => {
        const elementId = flowParam === 'findCar' ? 'vehicles' : flowParam;
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
        setFlow(null);
    }
  }, [location.search]);

  const vehicles = getVehicles(filters);
  const safestVehicles = getVehicles({ ...filters, minSafetyRating: 5, condition: 'all', vehicleType: 'all' });

  const resetFlow = () => {
    setFlow(null);
    setSelectedVehicle(null);
    setFilters({
      condition: 'all',
      minSafetyRating: 4,
      maxPrice: 50000,
      vehicleType: 'all'
    });
  };
  
  const handleSelectFromTopPicks = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFlow('findCar');
    setTimeout(() => {
      document.getElementById('insurance')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 py-12 space-y-20" id="start">
        <AnimatePresence mode="wait">
          {!flow ? (
            <motion.div
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20" // Add space-y-20 here to separate elements
            >
              <Features setFlow={setFlow} />
              <SafetyRatings /> {/* Embed the SafetyRatings component here */}
            </motion.div>
          ) : (
            <motion.div 
              key="content" 
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button onClick={resetFlow} className="text-primary hover:underline font-semibold">
                &larr; Start Over
              </button>

              {flow === 'findCar' && (
                <>
                  <div id="vehicles">
                    <TopSafetyPicks vehicles={safestVehicles} onSelect={handleSelectFromTopPicks} />
                  </div>
                  <SearchFilters filters={filters} setFilters={setFilters} />
                  <VehicleGrid 
                    vehicles={vehicles} 
                    onSelectVehicle={setSelectedVehicle}
                  />
                </>
              )}

              {flow === 'getInsurance' && (
                <div id="insurance">
                  <InsuranceComparison vehicle={{ make: 'your', model: 'car' }} />
                </div>
              )}
              
              {flow === 'driversEd' && (
                <DriversEd />
              )}

              {selectedVehicle && (
                <div id="insurance">
                  <InsuranceComparison vehicle={selectedVehicle} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default HomePage;
