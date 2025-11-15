import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Heart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const LoginModal = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      description: "🚧 Login isn't implemented yet, but it's coming soon! You can ask for it next. 🚀"
    });
    onOpenChange(false);
  };

  const benefits = [
    { icon: <Heart className="w-5 h-5 text-pink-500" />, text: "Save your favorite cars to your personal garage." },
    { icon: <Zap className="w-5 h-5 text-yellow-500" />, text: "Get faster, personalized search results." },
    { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "Track and compare insurance quotes easily." },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">Unlock Your Personalized Dashboard</DialogTitle>
          <DialogDescription className="text-center text-gray-600 pt-2">
            Create a free account to get the most out of SafeQuote.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 px-2 space-y-4">
            <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                           {benefit.icon}
                        </div>
                        <span className="text-gray-700">{benefit.text}</span>
                    </li>
                ))}
            </ul>
        </div>
        <DialogFooter>
          <div className="w-full flex flex-col gap-3">
            <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90 text-white">
                Login or Sign Up (Coming Soon!)
            </Button>
             <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full">
                Maybe Later
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;