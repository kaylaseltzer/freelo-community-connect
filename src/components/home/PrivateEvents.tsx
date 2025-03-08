
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import EventCard, { EventProps } from '@/components/events/EventCard';

// Mock data for private events
const privateEvents: EventProps[] = [
  {
    id: '4',
    title: 'Exclusive Swinger Party',
    date: '2023-08-12',
    time: '21:00 - 03:00',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500',
    categories: ['Party', 'Swingers'],
    isPrivate: true,
  },
  {
    id: '5',
    title: 'Private ENM Social Gathering',
    date: '2023-08-15',
    time: '20:00 - 00:00',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=500',
    categories: ['Social', 'ENM'],
    isPrivate: true,
  },
  {
    id: '6',
    title: 'BDSM Play Party',
    date: '2023-08-19',
    time: '22:00 - 04:00',
    location: 'Haifa, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=500',
    categories: ['Play Party', 'BDSM'],
    isPrivate: true,
  },
];

export const PrivateEvents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-freelo-red/5 to-freelo-purple/5">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">{t('private.title')}</h2>
          <Link to="/private-events">
            <Button variant="ghost" className="font-medium">
              {t('upcoming.viewAll')} →
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {privateEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivateEvents;
