
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, AlertTriangle, Search, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPopularMakes, fetchModelsForMakeYear, generateYearRange } from '@/lib/nhtsaVehicleApi';

const SafetyRatings = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2024');
  const [ratings, setRatings] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [years] = useState(generateYearRange());

  // Load popular makes on component mount (instant, no API call)
  useEffect(() => {
    const makesData = getPopularMakes();
    setMakes(makesData);
  }, []);

  // Fetch models when year or make changes
  useEffect(() => {
    if (make && year) {
      const loadModels = async () => {
        setIsLoadingModels(true);
        try {
          const modelsData = await fetchModelsForMakeYear(make, year);
          setModels(modelsData);

          // Only reset model if it's not available in the new model list
          if (model && !modelsData.some(m => m.name === model)) {
            setModel('');
          }
        } catch (err) {
          console.error('Failed to load models:', err);
          setModels([]);
          setModel('');
        } finally {
          setIsLoadingModels(false);
        }
      };
      loadModels();
    } else {
      setModels([]);
      setModel('');
    }
  }, [make, year]);

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
        // Try to find model variants by searching all models for this make/year
        console.log(`No exact match for ${model}, searching for variants...`);
        const allModelsResponse = await fetch(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}?format=json`);

        if (allModelsResponse.ok) {
          const allModelsData = await allModelsResponse.json();

          // Find models that start with or contain the selected model name
          const matchingModels = allModelsData.Results?.filter(result => {
            const apiModel = result.Model.toUpperCase();
            const selectedModel = model.toUpperCase();

            // Try exact match, starts with, or contains
            return apiModel === selectedModel ||
                   apiModel.startsWith(selectedModel) ||
                   apiModel.includes(selectedModel) ||
                   selectedModel.startsWith(apiModel);
          }) || [];

          if (matchingModels.length > 0) {
            // If we found variants, use the first one (we could later let user choose)
            console.log(`Found ${matchingModels.length} variant(s):`, matchingModels.map(m => m.Model));

            // Query the specific variant to get actual VehicleId
            const variantModel = matchingModels[0].Model;
            const variantResponse = await fetch(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${encodeURIComponent(variantModel)}?format=json`);

            if (variantResponse.ok) {
              const variantData = await variantResponse.json();

              if (variantData.Count > 0 && variantData.Results && variantData.Results.length > 0) {
                let ratingsData = variantData.Results[0];

                // Get detailed ratings using VehicleId
                if (ratingsData.VehicleId) {
                  try {
                    const detailedResponse = await fetch(`https://api.nhtsa.gov/SafetyRatings/VehicleId/${ratingsData.VehicleId}?format=json`);
                    if (detailedResponse.ok) {
                      const detailedData = await detailedResponse.json();
                      if (detailedData.Count > 0 && detailedData.Results && detailedData.Results.length > 0) {
                        ratingsData = { ...ratingsData, ...detailedData.Results[0] };
                      }
                    }
                  } catch (err) {
                    console.warn('Could not fetch detailed ratings:', err);
                  }
                }

                setRatings(ratingsData);
                setIsLoading(false);
                return;
              }
            }
          }
        }

        throw new Error(`No safety ratings found for ${year} ${make} ${model}. NHTSA may not have tested this vehicle yet, especially for newer model years. Try selecting an earlier year (2021 or older) for better results.`);
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
      <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
        <p className="text-base md:text-lg font-medium text-gray-700">{label}:</p>
        {isStarRating ? renderStars(value) : <span className="text-base font-semibold text-green-600">{value}</span>}
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

        <form onSubmit={fetchRatings} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
          <div className="md:col-span-1">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" className="w-full">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <Select value={make} onValueChange={setMake}>
              <SelectTrigger id="make" className="w-full">
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {makes.map((m) => (
                  <SelectItem key={m.id} value={m.name}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <Select value={model} onValueChange={setModel} disabled={isLoadingModels || !make}>
              <SelectTrigger id="model" className="w-full">
                <SelectValue placeholder={isLoadingModels ? "Loading models..." : !make ? "Select make first" : "Select model"} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.name}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full md:col-span-1" disabled={isLoading || !make || !model || !year}>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 mr-2" /> Check Rating</>}
          </Button>
        </form>

        <div className="max-w-3xl mx-auto mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> Safety ratings typically become available 6-12 months after a vehicle's release.
            For the newest vehicles, check <a href="https://www.iihs.org/ratings" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-900">IIHS.org</a> for additional ratings.
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-yellow-900 mb-2">No Safety Ratings Available</h4>
                  <p className="text-yellow-800 text-sm leading-relaxed mb-3">{error}</p>
                  <div className="pt-3 border-t border-yellow-200">
                    <p className="text-sm text-yellow-900 font-semibold mb-2">Alternative Resources:</p>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Check <a href={`https://www.iihs.org/ratings/vehicle/${make ? make.toLowerCase().replace(/\s+/g, '-') : ''}-${model ? model.toLowerCase().replace(/\s+/g, '-') : ''}-${year}`} target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-900">IIHS Top Safety Pick awards</a> for newer vehicles</li>
                      <li>• Try an earlier model year (2021 or older) for NHTSA ratings</li>
                      <li>• Contact the manufacturer for the latest safety information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {ratings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200"
            >
              {/* Vehicle Header Section */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8 pb-6 border-b-2 border-gray-200">
                {ratings.VehiclePicture && (
                  <img
                    src={ratings.VehiclePicture}
                    alt="Vehicle"
                    className="w-48 h-48 object-contain rounded-xl shadow-md bg-white p-2"
                  />
                )}
                <div className="flex-1 text-center md:text-left">
                  <a
                    href={`https://www.nhtsa.gov/vehicle/${ratings.ModelYear}/${ratings.Make}/${ratings.Model}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors underline decoration-2 decoration-blue-400 underline-offset-4"
                  >
                    {ratings.VehicleDescription}
                  </a>
                  {ratings.ModelYear && (
                    <p className="text-lg text-gray-600 font-medium mt-2">Model Year: {ratings.ModelYear}</p>
                  )}
                </div>
              </div>

              {/* Main Safety Ratings */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-7 h-7 text-blue-600" />
                  <h4 className="text-2xl font-bold text-gray-900">Safety Ratings</h4>
                </div>
                <div className="space-y-4 bg-white rounded-xl p-6 shadow-md border border-gray-200">
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
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">Detailed Crash Ratings</h4>
                  <div className="space-y-3 bg-white rounded-xl p-6 shadow-md border border-gray-200">
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
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">Rollover Details</h4>
                  <div className="space-y-3 bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    {renderRatingRow('Rollover Rating (Alternative)', ratings.RolloverRating2)}
                    {isRated(ratings.RolloverPossibility) && (
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium text-gray-700">Rollover Possibility:</p>
                        <span className="text-lg font-bold text-blue-600">{(ratings.RolloverPossibility * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {isRated(ratings.RolloverPossibility2) && (
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium text-gray-700">Rollover Possibility (Alt):</p>
                        <span className="text-lg font-bold text-blue-600">{(ratings.RolloverPossibility2 * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {ratings.dynamicTipResult && ratings.dynamicTipResult.trim() && (
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium text-gray-700">Dynamic Tip Result:</p>
                        <span className="text-base font-semibold text-green-600">{ratings.dynamicTipResult}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Safety Features */}
              {(isRated(ratings.NHTSAElectronicStabilityControl) ||
                isRated(ratings.NHTSAForwardCollisionWarning) ||
                isRated(ratings.NHTSALaneDepartureWarning)) && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">Safety Features</h4>
                  <div className="space-y-3 bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    {ratings.NHTSAElectronicStabilityControl && ratings.NHTSAElectronicStabilityControl.trim() && (
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-green-600 font-bold text-xl">✓</span>
                        <p className="text-base"><span className="font-semibold text-gray-700">Electronic Stability Control:</span> <span className="text-gray-600">{ratings.NHTSAElectronicStabilityControl}</span></p>
                      </div>
                    )}
                    {ratings.NHTSAForwardCollisionWarning && ratings.NHTSAForwardCollisionWarning.trim() && (
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className={`font-bold text-xl ${ratings.NHTSAForwardCollisionWarning === 'Standard' ? 'text-green-600' : 'text-gray-400'}`}>✓</span>
                        <p className="text-base"><span className="font-semibold text-gray-700">Forward Collision Warning:</span> <span className="text-gray-600">{ratings.NHTSAForwardCollisionWarning}</span></p>
                      </div>
                    )}
                    {ratings.NHTSALaneDepartureWarning && ratings.NHTSALaneDepartureWarning.trim() && (
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className={`font-bold text-xl ${ratings.NHTSALaneDepartureWarning === 'Standard' ? 'text-green-600' : 'text-gray-400'}`}>✓</span>
                        <p className="text-base"><span className="font-semibold text-gray-700">Lane Departure Warning:</span> <span className="text-gray-600">{ratings.NHTSALaneDepartureWarning}</span></p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Alerts Section */}
              {(ratings.ComplaintsCount > 0 || ratings.RecallsCount > 0 || ratings.InvestigationCount > 0) && (
                <div className="mt-8 pt-6 border-t-2 border-gray-200">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">Safety Alerts</h4>
                  <div className="space-y-3">
                    {ratings.ComplaintsCount > 0 && (
                      <div className="flex items-center gap-3 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <p className="text-base"><span className="font-semibold text-orange-900">{ratings.ComplaintsCount}</span> <span className="text-orange-800">complaints filed for this model year</span></p>
                      </div>
                    )}
                    {ratings.RecallsCount > 0 && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <p className="text-base"><span className="font-semibold text-red-900">{ratings.RecallsCount}</span> <span className="text-red-800">open recalls for this model year</span></p>
                      </div>
                    )}
                    {ratings.InvestigationCount > 0 && (
                      <div className="flex items-center gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                        <p className="text-base"><span className="font-semibold text-yellow-900">{ratings.InvestigationCount}</span> <span className="text-yellow-800">ongoing investigation(s) for this model year</span></p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Insurance Quote CTA */}
              <div className="mt-10 pt-8 border-t-2 border-gray-200">
                <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Protect Your {ratings.ModelYear} {ratings.Make} {ratings.Model}
                  </h3>
                  <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                    Now that you know it's safe, get the best insurance rates tailored to your vehicle's excellent safety features.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-gray-50 font-bold text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => window.location.href = '/?flow=compareInsurance'}
                  >
                    Get Your Insurance Quote →
                  </Button>
                  <p className="text-white/80 text-sm mt-4">
                    Compare rates from top providers • Free quotes • No obligation
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SafetyRatings;
