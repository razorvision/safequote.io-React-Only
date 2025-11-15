import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingDown, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getInsuranceQuotes } from '@/lib/insuranceData';
import { Badge } from '@/components/ui/badge';

const InsuranceComparison = ({ vehicle }) => {
  const { toast } = useToast();
  const quotes = getInsuranceQuotes(vehicle);

  const handleSelectQuote = (providerUrl) => {
    window.open(providerUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: 'Redirecting...',
      description: "You're being redirected to the provider's website to finalize your quote!",
    });
  };

  const isGeneric = vehicle.make === 'your' && vehicle.model === 'car';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-primary/10 to-secondary/30 rounded-2xl p-8 border border-primary/20"
      id="insurance"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary p-2 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Insurance Quotes</h3>
          <p className="text-gray-600">
            {isGeneric ? "Example quotes for a typical safe vehicle." : `For a ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          </p>
        </div>
      </div>
      
      {isGeneric && (
        <div className="bg-primary/10 border-l-4 border-primary text-primary/80 p-4 rounded-md mb-6">
          <p className="font-semibold">Already have a car?</p>
          <p className="text-sm">Enter your vehicle details (coming soon!) to get personalized quotes. These are sample rates.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.provider}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`bg-white rounded-xl p-6 shadow-md border-2 ${
              quote.recommended ? 'border-primary' : 'border-gray-200'
            } relative flex flex-col`}
          >
            {quote.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
              </div>
            )}
            
            <div className="text-center mb-4">
              <h4 className="text-xl font-bold mb-1">{quote.provider}</h4>
              <div className="flex items-center justify-center gap-1 text-gray-600 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{quote.rating}/5</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-1">
                ${quote.monthlyPrice}
              </div>
              <p className="text-gray-600 text-sm">per month</p>
              {quote.discount > 0 && (
                <div className="flex items-center justify-center gap-1 text-green-600 text-sm mt-2">
                  <TrendingDown className="w-4 h-4" />
                  <span>{quote.discount}% teen driver discount</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2 mb-6 flex-grow">
              {quote.coverage.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <Button
              onClick={() => handleSelectQuote(quote.url)}
              className={`w-full mt-auto ${
                quote.recommended
                  ? 'bg-gradient-to-r from-primary to-teal-500 text-primary-foreground'
                  : ''
              }`}
              variant={quote.recommended ? 'default' : 'outline'}
            >
              Get Quote
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default InsuranceComparison;