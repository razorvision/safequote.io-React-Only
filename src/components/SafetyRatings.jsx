
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, AlertTriangle, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SafetyRatings = () => {
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('Camry');
  const [year, setYear] = useState('2024');
  const [ratings, setRatings] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRatings = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRatings(null);
    setError(null);

    try {
      // First API call: Get basic safety ratings by year/make/model
      const response = await fetch(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${model}?format=json`);
      if (!response.ok) {
        throw new Error('Vehicle not found or API error.');
      }
      const data = await response.json();

      if (data.Count === 0 || !data.Results || data.Results.length === 0) {
        throw new Error('No safety ratings found for this vehicle. Please check the make, model, and year.');
      }

      let ratingsData = data.Results[0];

      // Second API call: Get detailed ratings using VehicleId
      if (ratingsData.VehicleId) {
        try {
          const detailedResponse = await fetch(`https://api.nhtsa.gov/SafetyRatings/VehicleId/${ratingsData.VehicleId}?format=json`);
          if (detailedResponse.ok) {
            const detailedData = await detailedResponse.json();
            if (detailedData.Count > 0 && detailedData.Results && detailedData.Results.length > 0) {
              // Merge detailed data with original data (detailed data has more specific ratings)
              ratingsData = { ...ratingsData, ...detailedData.Results[0] };
            }
          }
        } catch (err) {
          // If second call fails, continue with first call data
          console.warn('Could not fetch detailed ratings:', err);
        }
      }

      setRatings(ratingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isRated = (value) => {
    return value && value !== 'Not Rated' && value !== '' && value !== 0;
  };

  const renderStars = (rating) => {
    if (!isRated(rating)) return <span className="text-sm text-gray-500">Not Rated</span>;
    const numStars = parseInt(rating, 10);
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < numStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const renderRatingRow = (label, value) => {
    if (!isRated(value)) return null;

    // Check if it's a star rating (numeric 1-5)
    const isStarRating = /^[1-5]$/.test(value?.toString());

    return (
      <div key={label} className="flex justify-between items-center">
        <p className="text-sm md:text-base">{label}:</p>
        {isStarRating ? renderStars(value) : <span className="text-sm font-medium text-green-600">{value}</span>}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Check Vehicle Safety Ratings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Get official 5-star safety ratings from the National Highway Traffic Safety Administration (NHTSA).</p>
        </div>

        <form onSubmit={fetchRatings} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-8">
          <div className="md:col-span-1">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., 2024" required />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <Input id="make" value={make} onChange={(e) => setMake(e.target.value)} placeholder="e.g., Toyota" required />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g., Camry" required />
          </div>
          <Button type="submit" className="w-full md:col-span-1" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 mr-2" /> Check Rating</>}
          </Button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 text-center text-red-600 bg-red-50 p-4 rounded-lg max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          {ratings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-8 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/20 rounded-xl shadow-md p-6 border border-primary/20"
            >
              <div className="flex gap-4 items-start mb-6">
                {ratings.VehiclePicture && (
                  <img src={ratings.VehiclePicture} alt="Vehicle" className="w-32 h-32 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{ratings.VehicleDescription}</h3>
                  {ratings.ModelYear && (
                    <p className="text-sm text-gray-600 mt-1">Model Year: {ratings.ModelYear}</p>
                  )}
                </div>
              </div>

              {/* Main Safety Ratings */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 text-gray-900">Safety Ratings</h4>
                <div className="space-y-3 bg-white rounded-lg p-4">
                  {renderRatingRow('Overall Rating', ratings.OverallRating)}
                  {renderRatingRow('Front Crash Rating', ratings.OverallFrontCrashRating)}
                  {renderRatingRow('Side Crash Rating', ratings.OverallSideCrashRating)}
                  {renderRatingRow('Rollover Rating', ratings.RolloverRating)}
                </div>
              </div>

              {/* Detailed Crash Ratings */}
              {(isRated(ratings.FrontCrashDriversideRating) ||
                isRated(ratings.FrontCrashPassengersideRating) ||
                isRated(ratings.SideCrashDriversideRating) ||
                isRated(ratings.SideCrashPassengersideRating) ||
                isRated(ratings.SidePoleCrashRating)) && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-900">Detailed Crash Ratings</h4>
                  <div className="space-y-3 bg-white rounded-lg p-4">
                    {renderRatingRow('Front Crash - Driver Side', ratings.FrontCrashDriversideRating)}
                    {renderRatingRow('Front Crash - Passenger Side', ratings.FrontCrashPassengersideRating)}
                    {renderRatingRow('Side Crash - Driver Side', ratings.SideCrashDriversideRating)}
                    {renderRatingRow('Side Crash - Passenger Side', ratings.SideCrashPassengersideRating)}
                    {renderRatingRow('Side Pole Crash Rating', ratings.SidePoleCrashRating)}
                    {renderRatingRow('Side Barrier Rating - Front', ratings['combinedSideBarrierAndPoleRating-Front'])}
                    {renderRatingRow('Side Barrier Rating - Rear', ratings['combinedSideBarrierAndPoleRating-Rear'])}
                  </div>
                </div>
              )}

              {/* Rollover Details */}
              {(isRated(ratings.RolloverRating2) || isRated(ratings.RolloverPossibility)) && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-900">Rollover Details</h4>
                  <div className="space-y-3 bg-white rounded-lg p-4">
                    {renderRatingRow('Rollover Rating (Alternative)', ratings.RolloverRating2)}
                    {isRated(ratings.RolloverPossibility) && (
                      <div className="flex justify-between items-center">
                        <p className="text-sm md:text-base">Rollover Possibility:</p>
                        <span className="text-sm font-medium text-green-600">{(ratings.RolloverPossibility * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {isRated(ratings.RolloverPossibility2) && (
                      <div className="flex justify-between items-center">
                        <p className="text-sm md:text-base">Rollover Possibility (Alt):</p>
                        <span className="text-sm font-medium text-green-600">{(ratings.RolloverPossibility2 * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {ratings.dynamicTipResult && ratings.dynamicTipResult.trim() && (
                      <div className="flex justify-between items-center">
                        <p className="text-sm md:text-base">Dynamic Tip Result:</p>
                        <span className="text-sm font-medium text-green-600">{ratings.dynamicTipResult}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Safety Features */}
              {(isRated(ratings.NHTSAElectronicStabilityControl) ||
                isRated(ratings.NHTSAForwardCollisionWarning) ||
                isRated(ratings.NHTSALaneDepartureWarning)) && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-900">Safety Features</h4>
                  <div className="space-y-2 bg-white rounded-lg p-4">
                    {ratings.NHTSAElectronicStabilityControl && ratings.NHTSAElectronicStabilityControl.trim() && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <p className="text-sm">Electronic Stability Control: <span className="font-medium">{ratings.NHTSAElectronicStabilityControl}</span></p>
                      </div>
                    )}
                    {ratings.NHTSAForwardCollisionWarning && ratings.NHTSAForwardCollisionWarning.trim() && (
                      <div className="flex items-center gap-2">
                        <span className={ratings.NHTSAForwardCollisionWarning === 'Standard' ? 'text-green-600 font-bold' : 'text-gray-400'}>✓</span>
                        <p className="text-sm">Forward Collision Warning: <span className="font-medium">{ratings.NHTSAForwardCollisionWarning}</span></p>
                      </div>
                    )}
                    {ratings.NHTSALaneDepartureWarning && ratings.NHTSALaneDepartureWarning.trim() && (
                      <div className="flex items-center gap-2">
                        <span className={ratings.NHTSALaneDepartureWarning === 'Standard' ? 'text-green-600 font-bold' : 'text-gray-400'}>✓</span>
                        <p className="text-sm">Lane Departure Warning: <span className="font-medium">{ratings.NHTSALaneDepartureWarning}</span></p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Alerts Section */}
              <div className="mt-6 pt-4 border-t border-primary/20 space-y-2">
                {ratings.ComplaintsCount > 0 && (
                  <div className="text-sm">
                    <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" /> There have been <span className="font-semibold">{ratings.ComplaintsCount}</span> complaints filed for this model year.</p>
                  </div>
                )}
                {ratings.RecallsCount > 0 && (
                  <div className="text-sm">
                    <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" /> There are <span className="font-semibold">{ratings.RecallsCount}</span> open recalls for this model year.</p>
                  </div>
                )}
                {ratings.InvestigationCount > 0 && (
                  <div className="text-sm">
                    <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500" /> There are <span className="font-semibold">{ratings.InvestigationCount}</span> ongoing investigation(s) for this model year.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SafetyRatings;
