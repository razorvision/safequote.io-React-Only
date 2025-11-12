
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, MapPin, Globe } from 'lucide-react';

const DriversEd = () => {
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <div className="text-center mb-8">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Find Driver's Ed Classes</h2>
        <p className="text-gray-600 mt-2">Search for local and online courses to get your teen road-ready.</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-4">
        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input type="text" placeholder="Enter your City or ZIP Code" className="pl-10 h-12 text-base"/>
        </div>
        <Button type="submit" className="w-full h-12 text-base">Search Local Classes</Button>
         <div className="flex items-center justify-center my-4">
            <span className="flex-grow bg-gray-200 h-px"></span>
            <span className="px-4 text-gray-500 font-medium text-sm">OR</span>
            <span className="flex-grow bg-gray-200 h-px"></span>
        </div>
         <Button type="submit" variant="secondary" className="w-full h-12 text-base flex items-center gap-2">
            <Globe className="w-5 h-5"/>
            Browse Online Classes
        </Button>
      </form>
    </motion.div>
  );
};

export default DriversEd;
