
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import EventCard, { EventProps } from '@/components/events/EventCard';

// Mock data for upcoming events
const upcomingEvents: EventProps[] = [
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
];

export const UpcomingEvents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">{t('upcoming.title')}</h2>
          <Link to="/events">
            <Button variant="ghost" className="font-medium">
              {t('upcoming.viewAll')} →
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
