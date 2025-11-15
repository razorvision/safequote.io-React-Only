
import React from 'react';
import { motion } from 'framer-motion';
import { Car, ShieldCheck, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = ({ setFlow }) => {
  return (
    <motion.section 
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Your Journey to a Safer Drive Starts Here</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Find the ideal safe car, get insurance quotes for a vehicle you already own, or find the best driver's ed classes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                <Button onClick={() => setFlow('findCar')} className="w-full h-full p-6 text-lg flex flex-col gap-2 bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-primary-foreground shadow-lg">
                    <Car className="w-8 h-8 mb-2" />
                    <span>Find a Safe Car</span>
                    <span className="text-sm font-normal text-primary-foreground/80">Compare safety & prices</span>
                </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                <Button onClick={() => setFlow('getInsurance')} variant="outline" className="w-full h-full p-6 text-lg border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary/90 flex flex-col gap-2 shadow-lg">
                    <ShieldCheck className="w-8 h-8 mb-2" />
                    <span>Get Insurance Quotes</span>
                     <span className="text-sm font-normal text-primary/80">For a car you own</span>
                </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                <Button onClick={() => setFlow('driversEd')} variant="outline" className="w-full h-full p-6 text-lg border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary/90 flex flex-col gap-2 shadow-lg">
                    <BookOpen className="w-8 h-8 mb-2" />
                    <span>Find Driver's Ed</span>
                     <span className="text-sm font-normal text-primary/80">Local & online classes</span>
                </Button>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
