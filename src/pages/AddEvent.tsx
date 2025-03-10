
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const AddEvent: React.FC = () => {
  const { t, language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [locationType, setLocationType] = useState('club');
  const [attendeeLimit, setAttendeeLimit] = useState('10');
  const [accessMode, setAccessMode] = useState('free');
  const [ageRange, setAgeRange] = useState('no-limit');
  
  const eventTypeOptions = [
    { value: 'fetish', label: t('eventType.fetish') },
    { value: 'swingers', label: t('eventType.swingers') },
    { value: 'orgy', label: t('eventType.orgy') },
    { value: 'lifestyle', label: t('eventType.lifestyle') },
    { value: 'private', label: t('eventType.private') },
    { value: 'bdsm', label: t('eventType.bdsm') },
    { value: 'couples', label: t('eventType.couples') },
    { value: 'mixed', label: t('eventType.mixed') },
    { value: 'other', label: 'Other' }
  ];
  
  const locationTypeOptions = [
    { value: 'club', label: t('locationType.club') },
    { value: 'privateHome', label: t('locationType.privateHome') },
    { value: 'outdoors', label: t('locationType.outdoors') },
    { value: 'bar', label: t('locationType.bar') },
    { value: 'hotel', label: t('locationType.hotel') },
    { value: 'publicSpace', label: t('locationType.publicSpace') },
    { value: 'other', label: 'Other' }
  ];
  
  const attendeeLimitOptions = [
    { value: '10', label: t('attendeeLimit.10') },
    { value: '20', label: t('attendeeLimit.20') },
    { value: '30', label: t('attendeeLimit.30') },
    { value: '40', label: t('attendeeLimit.40') },
    { value: '50', label: t('attendeeLimit.50') },
    { value: '100', label: t('attendeeLimit.100') },
    { value: 'unlimited', label: t('attendeeLimit.unlimited') },
    { value: 'other', label: 'Other' }
  ];
  
  const accessModeOptions = [
    { value: 'free', label: t('accessMode.free') },
    { value: 'registration', label: t('accessMode.registration') },
    { value: 'other', label: 'Other' }
  ];
  
  const eventHasOptions = [
    { value: 'gender-mix', label: t('eventHas.genderMix') },
    { value: 'bdsm', label: t('eventHas.bdsm') },
    { value: 'no-sexual', label: t('eventHas.noSexual') }, 
    { value: 'public-mix', label: t('eventHas.publicMix') }
  ];
  
  const attendeeTypeOptions = [
    { value: 'all', label: t('attendeeType.all') },
    { value: 'verified', label: t('attendeeType.verified') },
    { value: 'men-only', label: t('attendeeType.menOnly') },
    { value: 'women-only', label: t('attendeeType.womenOnly') },
    { value: 'couples-only', label: t('attendeeType.couplesOnly') },
    { value: 'invitation', label: t('attendeeType.invitation') },
    { value: 'lgbtq', label: t('attendeeType.lgbtq') },
    { value: 'other', label: 'Other' }
  ];
  
  const ageRangeOptions = [
    { value: 'no-limit', label: t('ageRange.noLimit') },
    { value: '25-45', label: t('ageRange.25to45') },
    { value: '30-50', label: t('ageRange.30to50') },
    { value: 'other', label: 'Other' }
  ];
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t('addEvent.success'));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm dark:bg-freelo-dark/60 rounded-xl p-8 shadow-lg border border-border">
            <h1 className="text-3xl font-bold mb-2 text-center">{t('addEvent.title')}</h1>
            <p className="text-muted-foreground text-center mb-8">{t('addEvent.description')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">{t('addEvent.basicInfo')}</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="text-base">
                    {t('addEvent.name')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="eventName"
                    placeholder={t('addEvent.namePlaceholder')}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hostName" className="text-base">
                    {t('addEvent.host')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t('addEvent.hostDescription')}
                  </p>
                  <Input
                    id="hostName"
                    placeholder={t('addEvent.hostPlaceholder')}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-base">
                      {t('addEvent.date')} <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>{t('addEvent.selectDate')}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventTime" className="text-base">
                      {t('addEvent.time')} <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        id="startTime"
                        type="time"
                        required
                      />
                      <Input
                        id="endTime"
                        type="time"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.type')} <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {eventTypeOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox id={`event-type-${option.value}`} />
                        <Label htmlFor={`event-type-${option.value}`} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="text-xl font-semibold mb-2">{t('addEvent.location')}</h2>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.locationType')} <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={locationType} onValueChange={setLocationType}>
                    <div className="grid grid-cols-2 gap-4">
                      {locationTypeOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`location-type-${option.value}`} />
                          <Label htmlFor={`location-type-${option.value}`} className="text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base">
                    {t('addEvent.address')}
                  </Label>
                  <Textarea
                    id="address"
                    placeholder={t('addEvent.addressPlaceholder')}
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </div>
              
              {/* Event Details */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="text-xl font-semibold mb-2">{t('addEvent.details')}</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    {t('addEvent.descriptionField')} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder={t('addEvent.descriptionPlaceholder')}
                    className="resize-none"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.attendeeLimit')} <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={attendeeLimit} onValueChange={setAttendeeLimit}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {attendeeLimitOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`attendee-limit-${option.value}`} />
                          <Label htmlFor={`attendee-limit-${option.value}`} className="text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.accessMode')} <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={accessMode} onValueChange={setAccessMode}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {accessModeOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`access-mode-${option.value}`} />
                          <Label htmlFor={`access-mode-${option.value}`} className="text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.eventHas')}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {eventHasOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox id={`event-has-${option.value}`} />
                        <Label htmlFor={`event-has-${option.value}`} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.attendeeType')} <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {attendeeTypeOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox id={`attendee-type-${option.value}`} />
                        <Label htmlFor={`attendee-type-${option.value}`} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {t('addEvent.ageRange')}
                  </Label>
                  <RadioGroup value={ageRange} onValueChange={setAgeRange}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {ageRangeOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`age-range-${option.value}`} />
                          <Label htmlFor={`age-range-${option.value}`} className="text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              {/* Submission */}
              <div className="pt-4 border-t border-border">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-primary hover:opacity-90 font-medium text-base py-2.5"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? t('addEvent.submitting') : t('addEvent.submit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddEvent;
