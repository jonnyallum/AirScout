import Hero from '@/components/home/hero';
import CategorySlider from '@/components/home/category-slider';
import FeaturedListings from '@/components/home/featured-listings';
import HostCTA from '@/components/home/host-cta';
import Testimonials from '@/components/home/testimonials';
import TravelAssistant from '@/components/home/travel-assistant';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategorySlider />
        <FeaturedListings />
        <HostCTA />
        <Testimonials />
        <TravelAssistant />
      </div>
    </div>
  );
}