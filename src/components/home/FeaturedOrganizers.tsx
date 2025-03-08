
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';

// Mock data for featured organizers
const organizers = [
  {
    id: '1',
    name: 'Sarah & David',
    role: 'ENM Community Leaders',
    events: 24,
    imageUrl: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?q=80&w=200',
    badge: 'Verified',
  },
  {
    id: '2',
    name: 'Michael',
    role: 'BDSM Educator',
    events: 18,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    badge: 'Top Organizer',
  },
  {
    id: '3',
    name: 'Rachel',
    role: 'Polyamory Coach',
    events: 15,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    badge: 'Verified',
  },
  {
    id: '4',
    name: 'Daniel & Emma',
    role: 'Swingers Community',
    events: 30,
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200',
    badge: 'Top Organizer',
  },
];

export const FeaturedOrganizers: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('organizers.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('organizers.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {organizers.map(organizer => (
            <div 
              key={organizer.id} 
              className="bg-white dark:bg-freelo-dark/60 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative inline-block mb-4">
                <img 
                  src={organizer.imageUrl} 
                  alt={organizer.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-freelo-purple/20"
                />
                <Badge className="absolute bottom-1 right-1 bg-gradient-primary">{organizer.badge}</Badge>
              </div>
              
              <h3 className="text-lg font-semibold mb-1">{organizer.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{organizer.role}</p>
              
              <div className="text-sm font-medium">
                <span className="text-freelo-purple">{organizer.events}</span> events hosted
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOrganizers;
