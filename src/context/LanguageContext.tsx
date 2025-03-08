
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'app.name': 'Freelo',
    
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.privateEvents': 'Private Events',
    'nav.saved': 'Saved',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Hero Section
    'hero.title': 'Events for the Open-Minded',
    'hero.description': 'Connect with a community that celebrates authenticity, diversity, and freedom of expression.',
    'hero.cta': 'Discover Events',
    
    // Events Sections
    'upcoming.title': 'Upcoming Events',
    'upcoming.viewAll': 'View All',
    'private.title': 'Private Events',
    'private.description': 'Exclusive events for our community members.',
    'private.join': 'Join to Access',
    'recent.title': 'Recently Added',
    
    // Event Card
    'event.viewEvent': 'View Event',
    'event.date': 'Date',
    'event.time': 'Time',
    'event.location': 'Location',
    
    // CTA Sections
    'membership.title': 'Join Our Private Community',
    'membership.description': 'Get access to exclusive events, connect with like-minded individuals, and enjoy a space where privacy and respect are paramount.',
    'membership.cta': 'Become a Member',
    
    // Featured Organizers
    'organizers.title': 'Featured Organizers',
    'organizers.description': 'The trusted community leaders who create unforgettable experiences.',
    
    // Newsletter
    'newsletter.title': 'Stay Updated',
    'newsletter.description': 'Subscribe to receive notifications about new events and community updates.',
    'newsletter.placeholder': 'Your email address',
    'newsletter.button': 'Subscribe',
    'newsletter.telegram': 'Or join our Telegram channel',
    
    // Footer
    'footer.about': 'About Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.rights': 'All rights reserved',
  },
  he: {
    // Common
    'app.name': 'פרילו',
    
    // Navigation
    'nav.home': 'בית',
    'nav.events': 'אירועים',
    'nav.privateEvents': 'אירועים פרטיים',
    'nav.saved': 'שמור',
    'nav.login': 'התחברות',
    'nav.signup': 'הרשמה',
    
    // Hero Section
    'hero.title': 'אירועים לפתוחי מחשבה',
    'hero.description': 'התחבר לקהילה שחוגגת אותנטיות, גיוון וחופש ביטוי.',
    'hero.cta': 'גלה אירועים',
    
    // Events Sections
    'upcoming.title': 'אירועים קרובים',
    'upcoming.viewAll': 'צפה בכולם',
    'private.title': 'אירועים פרטיים',
    'private.description': 'אירועים בלעדיים לחברי הקהילה שלנו.',
    'private.join': 'הצטרף לגישה',
    'recent.title': 'נוספו לאחרונה',
    
    // Event Card
    'event.viewEvent': 'צפה באירוע',
    'event.date': 'תאריך',
    'event.time': 'שעה',
    'event.location': 'מיקום',
    
    // CTA Sections
    'membership.title': 'הצטרף לקהילה הפרטית שלנו',
    'membership.description': 'קבל גישה לאירועים בלעדיים, התחבר לאנשים עם תפיסת עולם דומה, ותיהנה ממרחב בו פרטיות וכבוד הם ערכים מרכזיים.',
    'membership.cta': 'הפוך לחבר',
    
    // Featured Organizers
    'organizers.title': 'מארגנים מובילים',
    'organizers.description': 'מנהיגי הקהילה האמינים שיוצרים חוויות בלתי נשכחות.',
    
    // Newsletter
    'newsletter.title': 'הישאר מעודכן',
    'newsletter.description': 'הירשם לקבלת עדכונים על אירועים חדשים ועדכוני קהילה.',
    'newsletter.placeholder': 'כתובת האימייל שלך',
    'newsletter.button': 'הירשם',
    'newsletter.telegram': 'או הצטרף לערוץ הטלגרם שלנו',
    
    // Footer
    'footer.about': 'אודותינו',
    'footer.privacy': 'מדיניות פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.contact': 'צור קשר',
    'footer.faq': 'שאלות נפוצות',
    'footer.rights': 'כל הזכויות שמורות',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    // Set dir attribute for RTL support
    document.documentElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
    
    // Store language preference
    localStorage.setItem('language', language);
  }, [language]);
  
  useEffect(() => {
    // Load user's language preference on initial load
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
