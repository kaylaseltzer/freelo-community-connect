
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import EventCard, { EventProps } from '@/components/events/EventCard';

// Mock data for recent events
const recentEvents: EventProps[] = [
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
];

export const RecentEvents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">{t('recent.title')}</h2>
          <Link to="/events">
            <Button variant="ghost" className="font-medium">
              {t('upcoming.viewAll')} →
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;
