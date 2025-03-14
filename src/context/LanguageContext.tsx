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
    'event.add': 'Add Event',
    
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
    
    // Auth
    'auth.title': 'Welcome Back',
    'auth.description': 'Sign in to your account or create a new one',
    'login.processing': 'Logging in...',
    'login.success': 'Login successful!',
    'login.errorRequiredFields': 'Please fill in all required fields',
    'login.noAccount': 'Don\'t have an account?',
    
    // Signup
    'signup.name': 'Full Name',
    'signup.namePlaceholder': 'Enter your name',
    'signup.email': 'Email',
    'signup.emailPlaceholder': 'your@email.com',
    'signup.password': 'Password',
    'signup.passwordPlaceholder': 'Create a password',
    'signup.confirmPassword': 'Confirm Password',
    'signup.confirmPasswordPlaceholder': 'Confirm your password',
    'signup.agreeTerms': 'I agree to the',
    'signup.termsLink': 'Terms of Service',
    'signup.age18': 'I am at least 18 years old',
    'signup.alreadyAccount': 'Already have an account?',
    'signup.description': 'Create a new account to join our community',
    'signup.processing': 'Creating account...',
    'signup.success': 'Account created successfully!',
    'signup.errorRequiredFields': 'Please fill in all required fields',
    'signup.errorPasswordMatch': 'Passwords do not match',
    'signup.errorAgreement': 'You must agree to the terms and be at least 18 years old',
    
    // Add Event
    'addEvent.title': 'Add New Event',
    'addEvent.description': 'Fill in the details to create a new event',
    'addEvent.basicInfo': 'Event Information',
    'addEvent.name': 'Event Name',
    'addEvent.namePlaceholder': 'Enter event name',
    'addEvent.host': 'Host Name',
    'addEvent.hostDescription': 'This is the name that will be displayed to users',
    'addEvent.hostPlaceholder': 'Enter host name',
    'addEvent.date': 'Event Date',
    'addEvent.selectDate': 'Select a date',
    'addEvent.time': 'Event Time',
    'addEvent.type': 'Event Type',
    'addEvent.location': 'Location',
    'addEvent.locationType': 'Location Type',
    'addEvent.address': 'Address',
    'addEvent.addressPlaceholder': 'Enter the full address or meeting point details',
    'addEvent.details': 'Event Details',
    'addEvent.descriptionField': 'Event Description',
    'addEvent.descriptionPlaceholder': 'Describe your event, what participants can expect, etc.',
    'addEvent.attendeeLimit': 'Attendee Limit',
    'addEvent.accessMode': 'Who can attend?',
    'addEvent.eventHas': 'Event Features',
    'addEvent.attendeeType': 'Attendee Types',
    'addEvent.ageRange': 'Age Restrictions',
    'addEvent.next': 'Next: Publish Options',
    'addEvent.submitting': 'Saving...',
    'addEvent.success': 'Event information saved!',
    'addEvent.error': 'Error saving event information',
    'addEvent.eventImage': 'Event Image',
    'addEvent.uploadImageText': 'Drag and drop an image here or click to browse',
    'addEvent.browseFiles': 'Browse Files',
    'addEvent.removeImage': 'Remove',
    'addEvent.imageRequirements': 'Recommended: High-quality JPG or PNG, 1200x630px or larger',
    'addEvent.additionalInfo': 'Important Information',
    'addEvent.infoItem1': 'All events require moderator approval before being published',
    'addEvent.infoItem2': 'Images containing explicit content may be rejected',
    'addEvent.infoItem3': 'Make sure to provide accurate location information',
    'addEvent.ticketLink': 'Ticket Link (Optional)',
    'addEvent.ticketLinkPlaceholder': 'https://ticketing-site.com/your-event',
    'addEvent.carticketRequired': 'Carticket required for entry',

    // Publish Options
    'publishOptions.title': 'Choose Publishing Options',
    'publishOptions.description': 'Select how you want to promote your event',
    'publishOptions.freeTitle': 'Free Publishing',
    'publishOptions.freeDescription': 'Basic one-time listing for your event',
    'publishOptions.free': 'Free',
    'publishOptions.freeFeature1': 'Standard listing in events page',
    'publishOptions.freeFeature2': 'Visible for 30 days',
    'publishOptions.featuredTitle': 'Featured Event',
    'publishOptions.featuredDescription': 'Get more visibility for your event',
    'publishOptions.featuredPrice': '$20',
    'publishOptions.featuredFeature1': 'All free features',
    'publishOptions.featuredFeature2': 'Highlighted in featured events section',
    'publishOptions.featuredFeature3': 'Priority placement for 7 days',
    'publishOptions.extraLinksTitle': 'Extra Links Package',
    'publishOptions.extraLinksDescription': 'Add additional links to your event',
    'publishOptions.extraLinksPrice': '$15',
    'publishOptions.extraLinksFeature1': 'All free features',
    'publishOptions.extraLinksFeature2': 'Add up to 5 custom links to your event',
    'publishOptions.addExtraLinks': 'Add your links below',
    'publishOptions.linkTitle': 'Link Title',
    'publishOptions.linkUrl': 'URL',
    'publishOptions.addLink': 'Add Another Link',
    'publishOptions.back': 'Back to Event Details',
    'publishOptions.publish': 'Publish Event',
    'publishOptions.publishing': 'Publishing...',
    'publishOptions.success': 'Event published successfully!',
    'publishOptions.error': 'Error publishing event',
    
    // Event Types
    'eventType.fetish': 'Fetish Party',
    'eventType.swingers': 'Swingers',
    'eventType.orgy': 'Orgy',
    'eventType.lifestyle': 'Lifestyle',
    'eventType.private': 'Private',
    'eventType.bdsm': 'BDSM',
    'eventType.couples': 'Couples',
    'eventType.mixed': 'Mixed',
    
    // Location Types
    'locationType.club': 'Club',
    'locationType.privateHome': 'Private Home',
    'locationType.outdoors': 'Outdoors',
    'locationType.bar': 'Bar/Club',
    'locationType.hotel': 'Hotel',
    'locationType.publicSpace': 'Public Space',
    
    // Attendee Limits
    'attendeeLimit.10': 'Up to 10 people',
    'attendeeLimit.20': 'Up to 20 people',
    'attendeeLimit.30': 'Up to 30 people',
    'attendeeLimit.40': 'Up to 40 people',
    'attendeeLimit.50': 'Up to 50 people',
    'attendeeLimit.100': 'Up to 100 people',
    'attendeeLimit.unlimited': 'No participant limit',
    
    // Access Modes
    'accessMode.free': 'Free Registration',
    'accessMode.registration': 'Pre-Approved Registration',
    
    // Event Has
    'eventHas.genderMix': 'Gender Mix',
    'eventHas.bdsm': 'BDSM Elements',
    'eventHas.noSexual': 'No Sexual Activity',
    'eventHas.publicMix': 'Public Mixing',
    
    // Attendee Types
    'attendeeType.all': 'Everyone',
    'attendeeType.verified': 'Verified Members Only',
    'attendeeType.menOnly': 'Men Only',
    'attendeeType.womenOnly': 'Women Only',
    'attendeeType.couplesOnly': 'Couples Only',
    'attendeeType.invitation': 'By Invitation Only',
    'attendeeType.lgbtq': 'LGBTQ+ Focused',
    
    // Age Ranges
    'ageRange.noLimit': 'No Age Limit (18+)',
    'ageRange.25to45': '25-45 years',
    'ageRange.30to50': '30-50 years',
    
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
    'event.add': 'הוסף אירוע',
    
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
    
    // Auth
    'auth.title': 'ברוכים השבים',
    'auth.description': 'התחבר לחשבונך או צור חשבון חדש',
    'login.processing': 'מתחבר...',
    'login.success': 'התחברת בהצלחה!',
    'login.errorRequiredFields': 'אנא מלא את כל השדות הנדרשים',
    'login.noAccount': 'אין לך חשבון?',
    
    // Signup
    'signup.name': 'שם מלא',
    'signup.namePlaceholder': 'הכנס את שמך',
    'signup.email': 'אימייל',
    'signup.emailPlaceholder': 'your@email.com',
    'signup.password': 'סיסמה',
    'signup.passwordPlaceholder': 'צור סיסמה',
    'signup.confirmPassword': 'אשר סיסמה',
    'signup.confirmPasswordPlaceholder': 'אשר את הסיסמה שלך',
    'signup.agreeTerms': 'אני מסכים ל',
    'signup.termsLink': 'תנאי השימוש',
    'signup.age18': 'אני לפחות בן 18',
    'signup.alreadyAccount': 'כבר יש לך חשבון?',
    'signup.description': 'צור חשבון חדש כדי להצטרף לקהילה שלנו',
    'signup.processing': 'יוצר חשבון...',
    'signup.success': 'החשבון נוצר בהצלחה!',
    'signup.errorRequiredFields': 'אנא מלא את כל השדות הנדרשים',
    'signup.errorPasswordMatch': 'הסיסמאות אינן תואמות',
    'signup.errorAgreement': 'עליך להסכים לתנאים ולהיות לפחות בן 18',
    
    // Add Event
    'addEvent.title': 'פרסום אירוע חדש',
    'addEvent.description': 'מלא את הפרטים לפרסום האירוע שלך',
    'addEvent.basicInfo': 'פרטי אירוע',
    'addEvent.name': 'שם האירוע',
    'addEvent.namePlaceholder': 'הכנס את שם האירוע',
    'addEvent.host': 'שם המארגן',
    'addEvent.hostDescription': 'זה השם שיוצג למשתמשים',
    'addEvent.hostPlaceholder': 'הכנס את שם המארגן',
    'addEvent.date': 'תאריך האירוע',
    'addEvent.selectDate': 'בחר תאריך',
    'addEvent.time': 'שעת האירוע',
    'addEvent.type': 'סוג האירוע',
    'addEvent.location': 'מיקום',
    'addEvent.locationType': 'סוג המיקום',
    'addEvent.address': 'כתובת',
    'addEvent.addressPlaceholder': 'הכנס את הכתובת המלאה או פרטי נקודת המפגש',
    'addEvent.details': 'פרטי האירוע',
    'addEvent.descriptionField': 'תיאור האירוע',
    'addEvent.descriptionPlaceholder': 'תאר את האירוע שלך, מה המשתתפים יכולים לצפות, וכו\'',
    'addEvent.attendeeLimit': 'מגבלת משתתפים',
    'addEvent.accessMode': 'מי יכול להשתתף?',
    'addEvent.eventHas': 'מאפייני האירוע',
    'addEvent.attendeeType': 'סוגי משתתפים',
    'addEvent.ageRange': 'הגבלות גיל',
    'addEvent.next': 'הבא: אפשרויות פרסום',
    'addEvent.submitting': 'שומר...',
    'addEvent.success': 'פרטי האירוע נשמרו בהצלחה!',
    'addEvent.error': 'שגיאה בשמירת פרטי האירוע',
    'addEvent.eventImage': 'תמונת האירוע',
    'addEvent.uploadImageText': 'גרור ושחרר תמונה כאן או לחץ לעיון',
    'addEvent.browseFiles': 'עיון בקבצים',
    'addEvent.removeImage': 'הסר',
    'addEvent.imageRequirements': 'מומלץ: JPG או PNG באיכות גבוהה, 1200x630 פיקסלים או גדול יותר',
    'addEvent.additionalInfo': 'מידע חשוב',
    'addEvent.infoItem1': 'כל האירועים דורשים אישור מנהל לפני פרסום',
    'addEvent.infoItem2': 'תמונות המכילות תוכן מפורש עלולות להידחות',
    'addEvent.infoItem3': 'הקפד לספק מידע מדויק על המיקום',
    'addEvent.ticketLink': 'קישור לכרטיסים (אופציונלי)',
    'addEvent.ticketLinkPlaceholder': 'https://ticketing-site.com/your-event',
    'addEvent.carticketRequired': 'נדרש כרטיס לכניסה',

    // Publish Options
    'publishOptions.title': 'בחר אפשרויות פרסום',
    'publishOptions.description': 'בחר כיצד תרצה לקדם את האירוע שלך',
    'publishOptions.freeTitle': 'פרסום חינם',
    'publishOptions.freeDescription': 'רישום בסיסי חד-פעמי לאירוע שלך',
    'publishOptions.free': 'חינם',
    'publishOptions.freeFeature1': 'רישום סטנדרטי בדף האירועים',
    'publishOptions.freeFeature2': 'נראה למשך 30 יום',
    'publishOptions.featuredTitle': 'אירוע מומלץ',
    'publishOptions.featuredDescription': 'קבל יותר חשיפה לאירוע שלך',
    'publishOptions.featuredPrice': '₪75',
    'publishOptions.featuredFeature1': 'כל התכונות החינמיות',
    'publishOptions.featuredFeature2': 'מודגש בסעיף אירועים מומלצים',
    'publishOptions.featuredFeature3': 'מיקום עדיפות למשך 7 ימים',
    'publishOptions.extraLinksTitle': 'חבילת קישורים נוספים',
    'publishOptions.extraLinksDescription': 'הוסף קישורים נוספים לאירוע שלך',
    'publishOptions.extraLinksPrice': '₪55',
    'publishOptions.extraLinksFeature1': 'כל התכונות החינמיות',
    'publishOptions.extraLinksFeature2': 'הוסף עד 5 קישורים מותאמים אישית לאירוע שלך',
    'publishOptions.addExtraLinks': 'הוסף את הקישורים שלך למטה',
    'publishOptions.linkTitle': 'כותרת הקישור',
    'publishOptions.linkUrl': 'כתובת URL',
    'publishOptions.addLink': 'הוסף קישור נוסף',
    'publishOptions.back': 'חזרה לפרטי האירוע',
    'publishOptions.publish': 'פרסם אירוע',
    'publishOptions.publishing': 'מפרסם...',
    'publishOptions.success': 'האירוע פורסם בהצלחה!',
    'publishOptions.error': 'שגיאה בפרסום האירוע',
    
    // Event Types
    'eventType.fetish': 'מסיבת פטיש',
    'eventType.swingers': 'סווינגרס',
    'eventType.orgy': 'אורגיה',
    'eventType.lifestyle': 'לייפסטייל',
    'eventType.private': 'פרטי',
    'eventType.bdsm': 'אירוע בדס"מ',
    'eventType.couples': 'זוגות בלבד',
    'eventType.mixed': 'מעורב',
    
    // Location Types
    'locationType.club': 'במועדון',
    'locationType.privateHome': 'בדירה / בית פרטי',
    'locationType.outdoors': 'אונליין',
    'locationType.bar': 'בבר / פאב',
    'locationType.hotel': 'במתחם פרטי (וילה / לופט / סטודיו)',
    'locationType.publicSpace': 'בטבע / שטח פתוח',
    
    // Attendee Limits
    'attendeeLimit.10': 'עד 10 איש',
    'attendeeLimit.20': 'עד 20 איש',
    'attendeeLimit.30': 'עד 30 איש',
    'attendeeLimit.40': 'עד 40 איש',
    'attendeeLimit.50': 'עד 50 איש',
    'attendeeLimit.100': 'עד 100 איש',
    'attendeeLimit.unlimited': 'ללא מגבלת משתתפים',
    
    // Access Modes
    'accessMode.free': 'הגעה חופשית',
    'accessMode.registration': 'באישור מראש בלבד',
    
    // Event Has
    'eventHas.genderMix': 'אירוע עם מיניות',
    'eventHas.bdsm': 'אירוע בדס"מ',
    'eventHas.noSexual': 'אירוע ללא מיניות',
    'eventHas.publicMix': 'ערבוב פומבי',
    
    // Attendee Types
    'attendeeType.all': 'ללא צורך באישור - כולם מוזמנים',
    'attendeeType.verified': 'באישור מנהלי',
    'attendeeType.menOnly': 'אנשים מהקשת הלהטבקית',
    'attendeeType.womenOnly': 'נשים יחידות',
    'attendeeType.couplesOnly': 'זוגות בלבד',
    'attendeeType.invitation': 'באישור מנהלי',
    'attendeeType.lgbtq': 'אנשים מהקשת הלהטבקית',
    
    // Age Ranges
    'ageRange.noLimit': 'ללא הגבלת גיל',
    'ageRange.25to45': 'גיל 25 עד 45',
    'ageRange.30to50': 'גיל 30 עד 50',
    
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
