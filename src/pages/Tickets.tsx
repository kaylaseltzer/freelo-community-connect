
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Ticket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Tickets: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    const getSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    
    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !session) {
      navigate('/auth');
    }
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
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
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Ticket className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">My Tickets</h1>
            <p className="text-lg text-muted-foreground">
              View and manage all your event tickets.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <CardTitle>No Tickets Yet</CardTitle>
                <CardDescription>
                  You don't have any tickets for upcoming events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When you register for events, your tickets will appear here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tickets;
