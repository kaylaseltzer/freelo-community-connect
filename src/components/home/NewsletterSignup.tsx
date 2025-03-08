
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare } from 'lucide-react';
import { toast } from "sonner";

export const NewsletterSignup: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail('');
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <section className="py-16 bg-freelo-dark text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {t('newsletter.description')}
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="btn-primary whitespace-nowrap">
                <Send className="h-4 w-4 mr-2" />
                {t('newsletter.button')}
              </Button>
            </form>
            
            <div className="flex items-center gap-3 text-white/80">
              <span>{t('newsletter.telegram')}</span>
              <a 
                href="https://t.me/freelocommunity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white hover:text-freelo-purple transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>@freelocommunity</span>
              </a>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <img 
              src="/lovable-uploads/91a2d98e-3eaa-4a3c-9253-6f17a7e6acd5.png" 
              alt="Freelo Logo" 
              className="w-48 h-48 opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
