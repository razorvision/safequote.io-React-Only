import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToStart = () => {
    document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Parent and teenager with car keys"
          className="w-full h-full object-cover"
          src="/hero-image.jpg" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-balance text-shadow-lg" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
            Find the Safest Car & Lowest Insurance Rate
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-balance" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
            Discover top-rated safe cars and compare insurance quotes instantly. Your teen's safety and your budget, perfectly aligned.
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            onClick={scrollToStart}
          >
            Get Started
            <ArrowDown className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;