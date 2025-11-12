import React from 'react';
import { motion } from 'framer-motion';
import { Car, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
const FlowSelector = ({
  setFlow
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} transition={{
    duration: 0.5
  }} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Find the ideal safe car or get insurance quotes for a vehicle you already own.</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Please pick a lane to start our journey together. </p>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <motion.div whileHover={{
        scale: 1.05
      }} className="flex-1">
          <Button onClick={() => setFlow('findCar')} className="w-full h-auto p-6 text-lg flex flex-col gap-2 bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-primary-foreground">
            <Car className="w-8 h-8 mb-2" />
            Find a Safe Car
          </Button>
        </motion.div>
        <motion.div whileHover={{
        scale: 1.05
      }} className="flex-1">
          <Button onClick={() => setFlow('getInsurance')} variant="outline" className="w-full h-auto p-6 text-lg border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary/90 flex flex-col gap-2">
            <ShieldCheck className="w-8 h-8 mb-2" />
            Get Insurance for My Car
          </Button>
        </motion.div>
      </div>
    </motion.div>;
};
export default FlowSelector;