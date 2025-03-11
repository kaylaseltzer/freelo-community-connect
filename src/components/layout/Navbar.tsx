import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { Heart, Menu, X, Home, Plus, UserCircle, Ticket, Star, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserEmail(session?.user.email || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUserEmail(session?.user.email || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
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
        isScrolled ? "bg-freelo-dark/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Site Logo and Name */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/179cad41-0450-437f-bcc2-5ab390905ce9.png" 
              alt="Freelo Logo" 
              className="w-8 h-8"
            />
            <span className="font-heading font-bold text-xl text-white">
              Freelo
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageToggle />
            
            <Link to="/" className="text-foreground/90 hover:text-freelo-purple font-medium transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{t('nav.home')}</span>
            </Link>
            
            <Link to="/events" className="text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              {t('nav.events')}
            </Link>
            
            <Link to="/private-events" className="text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              {t('nav.privateEvents')}
            </Link>
            
            <Link to="/saved" className="flex items-center gap-1 text-foreground/90 hover:text-freelo-purple font-medium transition-colors">
              <Heart className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">{t('nav.saved')}</span>
            </Link>
            
            <div className="flex items-center gap-3 ml-2">
              {session ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="font-medium p-2 h-10 w-10 rounded-full relative hover:bg-muted/20"
                      aria-label="User menu"
                    >
                      <UserCircle className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-56 p-0 bg-background border border-border shadow-lg rounded-md z-50"
                    align="end"
                    sideOffset={6}
                  >
                    <div className="flex items-center gap-2 p-3 border-b border-border">
                      <UserCircle className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium truncate">{userEmail}</span>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted w-full">
                        <UserCircle className="h-4 w-4 text-muted-foreground" />
                        <span>Profile</span>
                      </Link>
                      <Link to="/tickets" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted w-full">
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                        <span>Tickets (0)</span>
                      </Link>
                      <Link to="/saved" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted w-full">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span>Liked</span>
                      </Link>
                    </div>
                    <div className="py-1 border-t border-border">
                      <Link to="/account-settings" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted w-full">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span>Account settings</span>
                      </Link>
                      <Link to="/membership" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted w-full">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>Membership</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted w-full text-left"
                      >
                        <LogOut className="h-4 w-4 text-muted-foreground" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    className="font-medium p-2 h-10 w-10 rounded-full hover:bg-muted/20"
                    aria-label="Login"
                  >
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              
              <Link to="/add-event">
                <Button className="bg-gradient-primary hover:shadow-lg transition-all text-white border-none font-medium rounded-full p-2 h-10 w-10">
                  <Plus className="h-5 w-5" />
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
          <div className="fixed inset-0 top-16 z-50 bg-freelo-dark/95 md:hidden animate-fade-in">
            <div className="flex flex-col p-6 space-y-6">
              <Link 
                to="/" 
                className="text-lg font-medium flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Home className="h-5 w-5" />
                <span>{t('nav.home')}</span>
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
                {session ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <UserCircle className="h-5 w-5" />
                      <span className="text-sm truncate">{userEmail}</span>
                    </div>
                    
                    <Link to="/profile" onClick={toggleMenu} className="flex items-center gap-2 mb-3">
                      <UserCircle className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link to="/tickets" onClick={toggleMenu} className="flex items-center gap-2 mb-3">
                      <Ticket className="h-5 w-5" />
                      <span>Tickets</span>
                    </Link>
                    
                    <Link to="/membership" onClick={toggleMenu} className="flex items-center gap-2 mb-3">
                      <Star className="h-5 w-5" />
                      <span>Membership</span>
                    </Link>
                    
                    <Link to="/account-settings" onClick={toggleMenu} className="flex items-center gap-2 mb-3">
                      <Settings className="h-5 w-5" />
                      <span>Account Settings</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="flex items-center gap-2 mb-3 bg-transparent border-none p-0 text-white"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <Link to="/auth" onClick={toggleMenu} className="flex items-center gap-2 mb-3">
                    <UserCircle className="h-5 w-5" />
                    <span>{t('nav.login')}/{t('nav.signup')}</span>
                  </Link>
                )}
                
                <Link to="/add-event" onClick={toggleMenu}>
                  <Button className="w-full bg-gradient-primary hover:shadow-lg transition-all text-white border-none font-medium flex items-center justify-center gap-2">
                    <Plus className="h-5 w-5" />
                    <span>{t('event.add')}</span>
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
