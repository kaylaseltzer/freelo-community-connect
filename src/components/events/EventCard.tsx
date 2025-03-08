
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  categories: string[];
  isPrivate?: boolean;
  isNew?: boolean;
}

export const EventCard: React.FC<EventProps> = ({
  id,
  title,
  date,
  time,
  location,
  imageUrl,
  categories,
  isPrivate = false,
  isNew = false,
}) => {
  const { t } = useLanguage();

  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden bg-white dark:bg-freelo-dark/60 shadow-md card-hover relative",
        isPrivate ? "border border-freelo-purple/30" : ""
      )}
    >
      {isNew && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-freelo-purple text-white animate-pulse-slow">New</Badge>
        </div>
      )}
      
      {/* Event Image */}
      <div className="relative aspect-video overflow-hidden">
        {isPrivate ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-freelo-dark/60 backdrop-blur-sm z-10">
            <Lock className="h-8 w-8 text-white mb-2" />
            <p className="text-white font-medium">{t('private.description')}</p>
            <Button 
              className="mt-3 bg-gradient-primary hover:opacity-90"
              size="sm"
            >
              {t('private.join')}
            </Button>
          </div>
        ) : null}
        
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=500'} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 hover:scale-105",
            isPrivate ? "blur-sm" : ""
          )}
        />
      </div>
      
      {/* Event Content */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs font-medium"
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold line-clamp-1 mb-3">
          {isPrivate ? `${title.substring(0, 15)}...` : title}
        </h3>
        
        {!isPrivate && (
          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-freelo-red" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-freelo-purple" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-freelo-purple" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
        )}
        
        {!isPrivate ? (
          <Link to={`/events/${id}`}>
            <Button className="w-full bg-gradient-primary hover:opacity-90 mt-2">
              {t('event.viewEvent')}
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default EventCard;
