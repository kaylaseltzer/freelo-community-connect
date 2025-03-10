
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CalendarDays, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SliderEventProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  categories: string[];
}

const sliderEvents: SliderEventProps[] = [
  {
    id: 'slider-1',
    title: 'Exploring Boundaries Workshop',
    description: 'A comprehensive workshop on setting and respecting boundaries in alternative relationships.',
    date: '2023-09-25',
    time: '19:00 - 22:00',
    location: 'Tel Aviv, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=1200',
    categories: ['Workshop', 'Polyamory', 'ENM'],
  },
  {
    id: 'slider-2',
    title: 'Masquerade Swinger Party',
    description: 'An elegant evening of mystery and connection for the swinging community.',
    date: '2023-10-01',
    time: '21:00 - 03:00',
    location: 'Herzliya, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200',
    categories: ['Party', 'Swingers'],
  },
  {
    id: 'slider-3',
    title: 'Consent and Communication',
    description: 'Essential skills for navigating ethical non-monogamy and BDSM relationships.',
    date: '2023-10-05',
    time: '18:30 - 21:30',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200',
    categories: ['Workshop', 'Education', 'BDSM'],
  },
];

export const EventSlider: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10">
      <div className="container-custom">
        <Carousel className="w-full">
          <CarouselContent>
            {sliderEvents.map((event) => (
              <CarouselItem key={event.id} className="w-full">
                <div className="relative w-full h-[70vh] overflow-hidden rounded-xl">
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-freelo-dark/90 via-freelo-dark/50 to-transparent z-10"></div>
                  
                  {/* Background Image */}
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.categories.map((category, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-freelo-purple/80 hover:bg-freelo-purple text-white"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{event.title}</h2>
                    
                    <p className="text-white/80 text-lg mb-6 max-w-2xl">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-6 mb-8 text-white/70">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-freelo-red" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-freelo-purple" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-freelo-red" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <Link to={`/events/${event.id}`}>
                      <Button className="bg-gradient-primary hover:opacity-90 text-white">
                        {t('event.viewEvent')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 z-30" />
          <CarouselNext className="absolute right-4 top-1/2 z-30" />
        </Carousel>
      </div>
    </section>
  );
};

export default EventSlider;
