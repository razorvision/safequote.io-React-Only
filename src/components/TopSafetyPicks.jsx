import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const TopSafetyPicks = ({ vehicles, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/10 to-secondary/30 rounded-2xl p-8 border border-primary/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold">Top Safety Picks</h2>
      </div>
      <p className="text-gray-600 mb-6 max-w-3xl">
        These vehicles have received the highest possible safety rating (5/5). Click one to see estimated insurance quotes instantly.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vehicles.slice(0, 4).map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group"
          >
            <Button
              variant="outline"
              onClick={() => onSelect(vehicle)}
              className="w-full h-full p-4 flex flex-col items-center justify-center gap-2 text-center bg-white/70 hover:bg-white border-gray-200 hover:border-primary transition"
            >
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="w-full h-20 object-contain rounded-md mb-2"
              />
              <p className="font-semibold text-sm text-gray-800">
                {vehicle.make} {vehicle.model}
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {vehicle.year}
              </Badge>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopSafetyPicks;