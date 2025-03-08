
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import EventCard, { EventProps } from '@/components/events/EventCard';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  {
    id: '13',
    title: 'Couples Only Retreat',
    date: '2023-09-15',
    time: '18:00 - 23:00',
    location: 'Dead Sea, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=500',
    categories: ['Retreat', 'Couples'],
    isPrivate: true,
  },
  {
    id: '14',
    title: 'Fetish Night',
    date: '2023-09-20',
    time: '22:00 - 04:00',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=500',
    categories: ['Party', 'BDSM'],
    isPrivate: true,
  },
  {
    id: '15',
    title: 'Polyamory Weekend Getaway',
    date: '2023-09-22',
    time: 'All Weekend',
    location: 'Galilee, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=500',
    categories: ['Retreat', 'Polyamory'],
    isPrivate: true,
  },
];

const PrivateEvents: React.FC = () => {
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Lock className="h-10 w-10 mx-auto mb-4 text-freelo-purple" />
            <h1 className="text-4xl font-bold mb-4">{t('private.title')}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {t('private.description')}
            </p>
            <Link to="/signup">
              <Button className="btn-primary">
                {t('membership.cta')}
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {privateEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivateEvents;
