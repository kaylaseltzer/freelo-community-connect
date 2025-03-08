
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SavedEvents: React.FC = () => {
  const { t } = useLanguage();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="text-center max-w-2xl mx-auto">
            <Heart className="h-10 w-10 mx-auto mb-4 text-freelo-red" />
            <h1 className="text-4xl font-bold mb-4">{t('nav.saved')}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Please log in to see your saved events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="outline" className="min-w-[120px]">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-primary min-w-[120px]">
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedEvents;
