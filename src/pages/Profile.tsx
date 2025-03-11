
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Calendar, MapPin, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
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
      
      if (data.session) {
        // For demo purposes we're creating a mock profile
        setProfile({
          name: data.session.user.email?.split('@')[0] || 'User',
          email: data.session.user.email,
          joined: new Date().toLocaleDateString(),
          location: 'Tel Aviv, Israel',
          bio: 'No bio added yet.',
          interests: []
        });
      }
      
      setLoading(false);
    };
    
    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      
      if (session) {
        // Update profile when session changes
        setProfile({
          name: session.user.email?.split('@')[0] || 'User',
          email: session.user.email,
          joined: new Date().toLocaleDateString(),
          location: 'Tel Aviv, Israel',
          bio: 'No bio added yet.',
          interests: []
        });
      }
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
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Sidebar */}
              <div className="w-full md:w-1/3">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                      <UserCircle className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <CardTitle>{profile?.name}</CardTitle>
                    <CardDescription>{profile?.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {profile?.joined}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profile?.location}</span>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" className="w-full" onClick={() => navigate('/account-settings')}>
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="w-full md:w-2/3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{profile?.bio}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Interests</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/interests')}>
                      Add Interests
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {profile?.interests && profile.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest: string, index: number) => (
                          <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                            {interest}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No interests added yet.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Saved Events</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/saved')}>
                      <Heart className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">You haven't saved any events yet.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
