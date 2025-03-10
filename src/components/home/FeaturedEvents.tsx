
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import EventCard, { EventProps } from '@/components/events/EventCard';

// Mock data for featured events with high-quality images
const featuredEvents: EventProps[] = [
  {
    id: 'featured-1',
    title: 'Forbidden Desires Party',
    date: '2023-09-15',
    time: '22:00 - 04:00',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200',
    categories: ['Party', 'BDSM', 'Social'],
    isFeatured: true,
  },
  {
    id: 'featured-2',
    title: 'Open Relationships Workshop',
    date: '2023-09-18',
    time: '19:00 - 22:00',
    location: 'Herzliya, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1200',
    categories: ['Workshop', 'ENM', 'Education'],
    isFeatured: true,
  },
  {
    id: 'featured-3',
    title: 'Rope Mastery Course',
    date: '2023-09-20',
    time: '20:00 - 23:00',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200',
    categories: ['Workshop', 'BDSM', 'Education'],
    isFeatured: true,
  },
  {
    id: 'featured-4',
    title: 'Polyamory Social Gathering',
    date: '2023-09-22',
    time: '19:30 - 23:30',
    location: 'Haifa, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200',
    categories: ['Social', 'Polyamory'],
    isFeatured: true,
  },
];

export const FeaturedEvents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-freelo-purple/10 to-freelo-red/10">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-10 text-center">
          {t('featured.title') || 'Featured Events'}
        </h2>
        
        <Carousel className="w-full">
          <CarouselContent>
            {featuredEvents.map((event) => (
              <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 px-4">
                <EventCard {...event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative mr-2 static translate-y-0" />
            <CarouselNext className="relative ml-2 static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedEvents;
