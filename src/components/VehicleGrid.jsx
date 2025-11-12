import React from 'react';
import { motion } from 'framer-motion';
import VehicleCard from '@/components/VehicleCard';

const VehicleGrid = ({ vehicles, onSelectVehicle }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Available Vehicles</h3>
        <span className="text-gray-600">{vehicles.length} vehicles found</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {vehicles.map((vehicle, index) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            index={index}
            onSelect={onSelectVehicle}
          />
        ))}
      </motion.div>
      
      {vehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No vehicles match your filters. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;