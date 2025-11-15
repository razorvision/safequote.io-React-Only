import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, DollarSign, Calendar, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VehicleCard = ({ vehicle, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 backdrop-blur-sm shadow">
          {vehicle.condition}
        </Badge>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm">{vehicle.type}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Shield className="w-5 h-5 text-primary" />
            <div className="flex ml-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < vehicle.safetyRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-base">({vehicle.safetyRating}/5)</span>
          </div>
          
          <div className="flex items-center gap-1 text-green-700 font-bold text-xl">
            <DollarSign className="w-5 h-5" />
            {vehicle.price.toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
           <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            <span>{vehicle.mileage.toLocaleString()} miles</span>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-2">Key Safety Features:</p>
          <div className="flex flex-wrap gap-1">
            {vehicle.safetyFeatures.slice(0, 3).map((feature, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => onSelect(vehicle)}
          className="w-full bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-primary-foreground"
        >
          Get Insurance Quotes
        </Button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;