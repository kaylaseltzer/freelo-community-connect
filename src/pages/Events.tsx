
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import EventCard, { EventProps } from '@/components/events/EventCard';

// Mock data combining all event types
const allEvents: EventProps[] = [
  // Upcoming events
  {
    id: '1',
    title: 'Polyamory Meetup & Workshop',
    date: '2023-07-25',
    time: '19:00 - 22:00',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=500',
    categories: ['Workshop', 'Social'],
  },
  {
    id: '2',
    title: 'Alternative Relationships Discussion Group',
    date: '2023-07-28',
    time: '20:00 - 23:00',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=500',
    categories: ['Discussion', 'Social'],
  },
  {
    id: '3',
    title: 'BDSM Introduction Workshop',
    date: '2023-08-05',
    time: '19:30 - 23:00',
    location: 'Haifa, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=80&w=500',
    categories: ['Workshop', 'Education'],
  },
  // Recent events
  {
    id: '7',
    title: 'ENM Communication Workshop',
    date: '2023-08-22',
    time: '19:00 - 21:30',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=500',
    categories: ['Workshop', 'ENM'],
    isNew: true,
  },
  {
    id: '8',
    title: 'Rope Bondage for Beginners',
    date: '2023-08-25',
    time: '19:30 - 22:00',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=500',
    categories: ['Workshop', 'BDSM'],
    isNew: true,
  },
  {
    id: '9',
    title: 'Polyamory Support Group',
    date: '2023-08-27',
    time: '18:00 - 20:00',
    location: 'Online',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=500',
    categories: ['Support Group', 'Polyamory'],
    isNew: true,
  },
  // Additional events
  {
    id: '10',
    title: 'Swinger Couples Meetup',
    date: '2023-09-02',
    time: '20:00 - 00:00',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500',
    categories: ['Social', 'Swingers'],
  },
  {
    id: '11',
    title: 'Non-Monogamy Panel Discussion',
    date: '2023-09-07',
    time: '19:00 - 21:00',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=500',
    categories: ['Discussion', 'ENM'],
  },
  {
    id: '12',
    title: 'Kink & Consent Workshop',
    date: '2023-09-12',
    time: '19:30 - 22:30',
    location: 'Haifa, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=500',
    categories: ['Workshop', 'BDSM'],
  },
];

const Events: React.FC = () => {
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
          <h1 className="text-4xl font-bold mb-8">{t('nav.events')}</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
