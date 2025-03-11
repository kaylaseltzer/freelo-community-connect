
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-freelo-red/30 via-freelo-purple/25 to-freelo-dark/40 z-10"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-20 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl animate-fade-up backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gradient">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8 text-white/90 md:w-10/12">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/events">
                <Button className="btn-primary text-base">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/private-events">
                <Button variant="outline" className="text-base bg-white/10 hover:bg-white/20 text-white border-white/20">
                  {t('nav.privateEvents')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
