
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, Trophy, Link } from 'lucide-react';
import { toast } from 'sonner';

const PublishOptions: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [publishOption, setPublishOption] = useState('free');
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [extraLinks, setExtraLinks] = useState([{ url: '', title: '' }]);

  useEffect(() => {
    // Retrieve event data from session storage
    const storedData = sessionStorage.getItem('eventData');
    if (storedData) {
      setEventData(JSON.parse(storedData));
    } else {
      // If no data, redirect back to add event page
      navigate('/add-event');
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleAddLink = () => {
    setExtraLinks([...extraLinks, { url: '', title: '' }]);
  };

  const handleLinkChange = (index: number, field: 'url' | 'title', value: string) => {
    const updatedLinks = [...extraLinks];
    updatedLinks[index][field] = value;
    setExtraLinks(updatedLinks);
  };

  const handleRemoveLink = (index: number) => {
    if (extraLinks.length > 1) {
      const updatedLinks = [...extraLinks];
      updatedLinks.splice(index, 1);
      setExtraLinks(updatedLinks);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Combine event data with publishing options
      const finalEventData = {
        ...eventData,
        publishingType: publishOption,
        extraLinks: publishOption === 'extraLinks' ? extraLinks : [],
        featured: publishOption === 'featured',
      };
      
      console.log('Publishing event to Supabase:', finalEventData);
      
      // In a real implementation, this is where you would send data to Supabase
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success notification
      toast.success(t('publishOptions.success'));
      
      // Clear session storage
      sessionStorage.removeItem('eventData');
      
      // Redirect to events page
      navigate('/events');
      
    } catch (error) {
      console.error('Error publishing event:', error);
      toast.error(t('publishOptions.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!eventData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">{t('publishOptions.title')}</h1>
            <p className="text-muted-foreground text-center mb-8">{t('publishOptions.description')}</p>
            
            <RadioGroup value={publishOption} onValueChange={setPublishOption} className="grid gap-6">
              {/* Free Publishing Option */}
              <Card className={`relative cursor-pointer transition-all ${publishOption === 'free' ? 'border-primary' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${publishOption === 'free' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {publishOption === 'free' && <Check className="h-4 w-4" />}
                    </div>
                    {t('publishOptions.freeTitle')}
                  </CardTitle>
                  <CardDescription>{t('publishOptions.freeDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{t('publishOptions.free')}</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.freeFeature1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.freeFeature2')}</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="absolute top-4 right-4">
                  <RadioGroupItem value="free" id="free" className="sr-only" />
                </div>
              </Card>
              
              {/* Featured Event Option */}
              <Card className={`relative cursor-pointer transition-all ${publishOption === 'featured' ? 'border-primary' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${publishOption === 'featured' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {publishOption === 'featured' && <Check className="h-4 w-4" />}
                    </div>
                    {t('publishOptions.featuredTitle')}
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                  <CardDescription>{t('publishOptions.featuredDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{t('publishOptions.featuredPrice')}</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.featuredFeature1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.featuredFeature2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.featuredFeature3')}</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="absolute top-4 right-4">
                  <RadioGroupItem value="featured" id="featured" className="sr-only" />
                </div>
              </Card>
              
              {/* Extra Links Option */}
              <Card className={`relative cursor-pointer transition-all ${publishOption === 'extraLinks' ? 'border-primary' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${publishOption === 'extraLinks' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {publishOption === 'extraLinks' && <Check className="h-4 w-4" />}
                    </div>
                    {t('publishOptions.extraLinksTitle')}
                    <Link className="h-5 w-5 text-blue-500" />
                  </CardTitle>
                  <CardDescription>{t('publishOptions.extraLinksDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{t('publishOptions.extraLinksPrice')}</div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.extraLinksFeature1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{t('publishOptions.extraLinksFeature2')}</span>
                    </li>
                  </ul>
                  
                  {publishOption === 'extraLinks' && (
                    <div className="space-y-4 mt-4 pt-4 border-t">
                      <h3 className="font-medium">{t('publishOptions.addExtraLinks')}</h3>
                      {extraLinks.map((link, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                          <div className="md:col-span-2">
                            <Input
                              placeholder={t('publishOptions.linkTitle')}
                              value={link.title}
                              onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Input
                              placeholder={t('publishOptions.linkUrl')}
                              value={link.url}
                              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                            />
                          </div>
                          <div>
                            <Button 
                              variant="outline" 
                              size="icon"
                              type="button"
                              onClick={() => handleRemoveLink(index)}
                              disabled={extraLinks.length === 1}
                            >
                              &times;
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={handleAddLink}
                        className="mt-2"
                      >
                        {t('publishOptions.addLink')}
                      </Button>
                    </div>
                  )}
                </CardContent>
                <div className="absolute top-4 right-4">
                  <RadioGroupItem value="extraLinks" id="extraLinks" className="sr-only" />
                </div>
              </Card>
            </RadioGroup>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/add-event')}
              >
                {t('publishOptions.back')}
              </Button>
              <Button 
                className="bg-gradient-primary hover:opacity-90 font-medium"
                size="lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? t('publishOptions.publishing') : t('publishOptions.publish')}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublishOptions;
