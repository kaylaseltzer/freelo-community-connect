
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Membership: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  
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
      
      // For demo purposes, we're setting a fake current plan
      // In a real app, you would fetch this from your database
      setCurrentPlan(null);
      
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

  const handleSubscribe = (plan: string) => {
    // In a real app, this would redirect to a payment page or process
    console.log(`Subscribing to ${plan} plan`);
    alert(`This would redirect to payment for the ${plan} plan. This is just a demo.`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
            <p className="text-lg text-muted-foreground">
              Choose the membership plan that suits your needs and unleash the full potential of Freelo.
            </p>
          </div>
          
          <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly (Save 15%)</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monthly" className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
              {/* Free Plan */}
              <Card className={`border ${currentPlan === 'free' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Basic access to public events</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    ₪0 <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>View and sign up to all public events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Create an event profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Basic support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={currentPlan === 'free'}
                  >
                    {currentPlan === 'free' ? 'Current Plan' : 'Get Started'}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Premium Plan */}
              <Card className={`border ${currentPlan === 'premium' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Premium</CardTitle>
                    <div className="bg-primary/20 text-primary text-xs font-medium py-1 px-2 rounded-full">
                      Popular
                    </div>
                  </div>
                  <CardDescription>Enhanced access with private events</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    ₪16 <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>All Free features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>View and sign up to private events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>10 private event registrations per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleSubscribe('premium')}
                    disabled={currentPlan === 'premium'}
                  >
                    {currentPlan === 'premium' ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Gold Plan */}
              <Card className={`border ${currentPlan === 'gold' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Gold</CardTitle>
                    <div className="bg-amber-500/20 text-amber-500 text-xs font-medium py-1 px-2 rounded-full">
                      Unlimited
                    </div>
                  </div>
                  <CardDescription>Full unlimited access</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    ₪32 <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Unlimited private event registrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Early access to exclusive events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>VIP support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleSubscribe('gold')}
                    disabled={currentPlan === 'gold'}
                  >
                    {currentPlan === 'gold' ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="yearly" className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
              {/* Free Plan (Yearly) */}
              <Card className={`border ${currentPlan === 'free' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Basic access to public events</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    ₪0 <span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>View and sign up to all public events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Create an event profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Basic support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={currentPlan === 'free'}
                  >
                    {currentPlan === 'free' ? 'Current Plan' : 'Get Started'}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Premium Plan (Yearly) */}
              <Card className={`border ${currentPlan === 'premium_yearly' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Premium</CardTitle>
                    <div className="bg-primary/20 text-primary text-xs font-medium py-1 px-2 rounded-full">
                      Popular
                    </div>
                  </div>
                  <CardDescription>Enhanced access with private events</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    ₪163 <span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                  <div className="text-sm text-green-500">Save ₪29 compared to monthly</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>All Free features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>View and sign up to private events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>10 private event registrations per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleSubscribe('premium_yearly')}
                    disabled={currentPlan === 'premium_yearly'}
                  >
                    {currentPlan === 'premium_yearly' ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Gold Plan (Yearly) */}
              <Card className={`border ${currentPlan === 'gold_yearly' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Gold</CardTitle>
                    <div className="bg-amber-500/20 text-amber-500 text-xs font-medium py-1 px-2 rounded-full">
                      Unlimited
                    </div>
                  </div>
                  <CardDescription>Full unlimited access</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    ₪326 <span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                  <div className="text-sm text-green-500">Save ₪58 compared to monthly</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Unlimited private event registrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Early access to exclusive events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>VIP support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleSubscribe('gold_yearly')}
                    disabled={currentPlan === 'gold_yearly'}
                  >
                    {currentPlan === 'gold_yearly' ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Membership;
