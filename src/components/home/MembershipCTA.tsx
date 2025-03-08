
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Users, CalendarDays } from 'lucide-react';

export const MembershipCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-freelo-red/5 via-white to-freelo-purple/5 dark:from-freelo-red/10 dark:via-transparent dark:to-freelo-purple/10">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('membership.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('membership.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Benefit 1 */}
          <div className="bg-white dark:bg-freelo-dark/60 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Private Events Access</h3>
            <p className="text-muted-foreground">
              Gain exclusive access to private events where you can connect with like-minded individuals in a safe, controlled environment.
            </p>
          </div>
          
          {/* Benefit 2 */}
          <div className="bg-white dark:bg-freelo-dark/60 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Verified Community</h3>
            <p className="text-muted-foreground">
              Join a community of verified members who share your interests and values, ensuring authentic connections.
            </p>
          </div>
          
          {/* Benefit 3 */}
          <div className="bg-white dark:bg-freelo-dark/60 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community Support</h3>
            <p className="text-muted-foreground">
              Connect with mentors, participate in discussion groups, and get support from experienced community members.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/signup">
            <Button className="btn-primary text-base px-10">
              {t('membership.cta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipCTA;
