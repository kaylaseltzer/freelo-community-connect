
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Heart, 
  Share2, 
  Ticket, 
  ExternalLink,
  Users,
  Calendar,
  Info,
  PenTool,
  MessageCircle,
  Mail,
  Phone,
  Link as LinkIcon,
  User,
  Tag,
  Flag,
  LayoutList,
  Hash,
  Language
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { allEvents } from './Events'; // Import event data temporarily

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch event data
  useEffect(() => {
    if (id) {
      // For now, we're getting data from the mock array
      // In a real app, this would be a Supabase query
      const foundEvent = allEvents.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // If event not found, navigate to 404
        console.error(`404 Error: Event with ID ${id} not found`);
        navigate('/not-found');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('event.linkCopied'));
    }
  };

  const handleSave = () => {
    toast.success(t('event.saved'));
  };

  const handleSignUp = () => {
    // In a real app, this would navigate to the ticket link
    if (event?.ticketLink) {
      window.open(event.ticketLink, '_blank');
    } else {
      toast.info(t('event.noTickets'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-pulse text-lg">{t('general.loading')}</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-lg">{t('general.notFound')}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          {/* Event Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Event Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <img 
                src={event.imageUrl || 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=500'} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Event Details */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                {event.categories && event.categories.map((category: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs font-medium"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="space-y-3 mb-auto">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-freelo-red" />
                  <span className="text-lg">{event.date}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-freelo-purple" />
                  <span className="text-lg">{event.time}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-freelo-purple" />
                  <span className="text-lg">{event.location}</span>
                </div>

                {event.host && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-freelo-purple" />
                    <span className="text-lg">Host: {event.host}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button 
                  className="bg-gradient-primary hover:opacity-90 flex-1 text-base flex items-center gap-2"
                  size="lg"
                  onClick={handleSignUp}
                >
                  <Ticket className="h-5 w-5" />
                  {t('event.signUp')}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-12 w-12"
                    onClick={handleSave}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-12 w-12"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Description */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{t('event.description')}</h2>
              <p className="whitespace-pre-line">
                {event.description || "Join us for this amazing event! More details coming soon."}
              </p>
            </CardContent>
          </Card>
          
          {/* Event Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{t('event.logistics')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> {t('event.attendeeLimit')}
                    </h3>
                    <p>{event.attendeeLimit || "No limit"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {t('event.ageRestriction')}
                    </h3>
                    <p>{event.ageRange || "No age restriction"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                      <Tag className="h-4 w-4" /> {t('event.accessMode')}
                    </h3>
                    <p>{event.accessMode || "Free"}</p>
                  </div>
                  {event.languages && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <Language className="h-4 w-4" /> Languages
                      </h3>
                      <p>{event.languages}</p>
                    </div>
                  )}
                  {event.topic && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <Hash className="h-4 w-4" /> Topic
                      </h3>
                      <p>{event.topic}</p>
                    </div>
                  )}
                  {event.format && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <LayoutList className="h-4 w-4" /> Format
                      </h3>
                      <p>{event.format}</p>
                    </div>
                  )}
                  {event.level && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <Flag className="h-4 w-4" /> Experience Level
                      </h3>
                      <p>{event.level}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{t('event.organizer')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" /> {t('event.host')}
                    </h3>
                    <p>{event.host || "Anonymous"}</p>
                  </div>
                  {event.contact && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" /> {t('event.contact')}
                      </h3>
                      <p>{event.contact}</p>
                    </div>
                  )}
                  {event.email && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </h3>
                      <p>{event.email}</p>
                    </div>
                  )}
                  {event.phone && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Phone
                      </h3>
                      <p>{event.phone}</p>
                    </div>
                  )}
                  {event.website && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" /> Website
                      </h3>
                      <a 
                        href={event.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-freelo-purple hover:underline"
                      >
                        {event.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Event Sign Up Box */}
          <Card className="border-freelo-purple/30 bg-gradient-to-b from-freelo-dark/80 to-freelo-dark/60">
            <CardContent className="pt-6 flex flex-col items-center text-center p-8">
              <h2 className="text-2xl font-bold mb-3">{t('event.interestedPrompt')}</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                {t('event.signUpPrompt')}
              </p>
              <Button 
                className="bg-gradient-primary hover:opacity-90 text-base flex items-center gap-2"
                size="lg"
                onClick={handleSignUp}
              >
                <Ticket className="h-5 w-5" />
                {t('event.signUp')}
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
