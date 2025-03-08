
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import PrivateEvents from '@/components/home/PrivateEvents';
import RecentEvents from '@/components/home/RecentEvents';
import MembershipCTA from '@/components/home/MembershipCTA';
import FeaturedOrganizers from '@/components/home/FeaturedOrganizers';
import NewsletterSignup from '@/components/home/NewsletterSignup';

const Index: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <UpcomingEvents />
        <PrivateEvents />
        <RecentEvents />
        <MembershipCTA />
        <FeaturedOrganizers />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
