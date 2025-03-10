
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-freelo-red/20 via-freelo-purple/15 to-freelo-dark/30 z-0"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5OTk5OTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] z-0"></div>
      
      {/* Hero Content */}
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gradient">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8 text-muted-foreground md:w-10/12">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/events">
                <Button className="btn-primary text-base">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/private-events">
                <Button variant="outline" className="text-base">
                  {t('nav.privateEvents')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative lg:flex justify-center hidden">
            <div className="relative w-[380px] h-[380px] rounded-full bg-gradient-primary blur-[100px] opacity-30 animate-pulse-slow"></div>
            <img 
              src="/lovable-uploads/37ccff8b-e56e-4e5e-93d4-aa86f37e370e.png" 
              alt="Freelo Logo" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
