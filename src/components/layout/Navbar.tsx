
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-freelo-dark/80" : "bg-transparent"
      )}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/91a2d98e-3eaa-4a3c-9253-6f17a7e6acd5.png" 
              alt="Freelo Logo" 
              className="h-10 w-10"
            />
            <span className="font-heading font-bold text-xl background-clip-text text-transparent bg-gradient-primary">
              {t('app.name')}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageToggle />
            
            <Link to="/" className="text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              {t('nav.home')}
            </Link>
            
            <Link to="/events" className="text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              {t('nav.events')}
            </Link>
            
            <Link to="/private-events" className="text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              {t('nav.privateEvents')}
            </Link>
            
            <Link to="/saved" className="flex items-center gap-1 text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              <Heart className="h-4 w-4" />
              <span>{t('nav.saved')}</span>
            </Link>
            
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login">
                <Button variant="ghost" className="font-medium">
                  {t('nav.login')}
                </Button>
              </Link>
              
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:shadow-lg transition-all text-white border-none font-medium">
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground/90 hover:text-freelo-purple"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background md:hidden animate-fade-in">
            <div className="flex flex-col p-6 space-y-6">
              <Link 
                to="/" 
                className="text-lg font-medium"
                onClick={toggleMenu}
              >
                {t('nav.home')}
              </Link>
              
              <Link 
                to="/events" 
                className="text-lg font-medium"
                onClick={toggleMenu}
              >
                {t('nav.events')}
              </Link>
              
              <Link 
                to="/private-events" 
                className="text-lg font-medium"
                onClick={toggleMenu}
              >
                {t('nav.privateEvents')}
              </Link>
              
              <Link 
                to="/saved" 
                className="text-lg font-medium flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Heart className="h-5 w-5" />
                <span>{t('nav.saved')}</span>
              </Link>
              
              <div className="pt-6 border-t border-border">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full mb-3 font-medium">
                    {t('nav.login')}
                  </Button>
                </Link>
                
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full bg-gradient-primary hover:shadow-lg transition-all text-white border-none font-medium">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4 flex justify-center">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
