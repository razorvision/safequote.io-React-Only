
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, User, LayoutDashboard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/LoginModal';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    toast({
      description: "🚧 The Dashboard will be available after you log in! 🚀"
    });
  };
  
  const handleFeatureClick = () => {
    toast({
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleNavClick = (e, flow) => {
    e.preventDefault();
    navigate(`/?flow=${flow}`);
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setLoginModalOpen} />
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-teal-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">safequote</span>
                  <span className="text-teal-600">.io</span>
                </h1>
                <p className="text-xs text-gray-600 -mt-1">Peace of mind one search at a time</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-2 md:gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <a href="/?flow=findCar" onClick={(e) => handleNavClick(e, 'findCar')} className="text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer">
                  Vehicles
                </a>
                <a href="/?flow=getInsurance" onClick={(e) => handleNavClick(e, 'getInsurance')} className="text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer">
                  Insurance
                </a>
                <Link 
                  to="/safequote-safety-ratings"
                  className="text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer flex items-center"
                >
                  <Search className="w-4 h-4 mr-2"/>
                  Safety Ratings
                </Link>
                <a onClick={handleDashboardClick} className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer">
                   <LayoutDashboard className="w-4 h-4 mr-2"/>
                   Dashboard
                </a>
              </nav>
              <Button onClick={() => setLoginModalOpen(true)} variant="ghost" className="hidden md:flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login
              </Button>
              <Button onClick={handleFeatureClick} variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
