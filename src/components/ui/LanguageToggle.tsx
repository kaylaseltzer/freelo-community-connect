
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="relative group"
      aria-label="Toggle language"
    >
      <Globe className="h-5 w-5" />
      <span className="ml-1 text-sm font-medium">
        {language === 'en' ? 'עב' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
