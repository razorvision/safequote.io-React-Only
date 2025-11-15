import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SearchFilters = ({ filters, setFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Refine Your Search</h3>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select
            value={filters.condition}
            onValueChange={(value) => setFilters({ ...filters, condition: value })}
          >
            <SelectTrigger id="condition" className="focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="new">New Only</SelectItem>
              <SelectItem value="preowned">Preowned Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Select
            value={filters.vehicleType}
            onValueChange={(value) => setFilters({ ...filters, vehicleType: value })}
          >
            <SelectTrigger id="vehicleType" className="focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label>Min Safety Rating: {filters.minSafetyRating}/5</Label>
          <Slider
            value={[filters.minSafetyRating]}
            onValueChange={(value) => setFilters({ ...filters, minSafetyRating: value[0] })}
            max={5}
            step={1}
            className="mt-2"
          />
        </div>
        
        <div className="space-y-3">
          <Label>Max Price: ${filters.maxPrice.toLocaleString()}</Label>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={(value) => setFilters({ ...filters, maxPrice: value[0] })}
            min={10000}
            max={50000}
            step={1000}
            className="mt-2"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilters;