
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WorkflowSection from '../components/WorkflowSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { Helmet } from 'react-helmet-async';
import TrackOrder from '../components/TrackOrder';
import LocationsSection from '../components/LocationsSection';
import UpdatesSection from '../components/UpdatesSection';
import LogisticsFeatures from '../components/LogisticsFeatures';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>AuraCargo - Global Logistics Solutions | Warehousing, Freight, and Delivery</title>
        <meta 
          name="description" 
          content="Efficient logistics services: warehousing, air, sea & road freight. Real-time tracking & 24/7 support. Get a quote today!" 
        />
        <meta name="keywords" content="logistics solutions, air freight services, ocean freight logistics, warehousing services, road freight shipping, international delivery solutions, real-time order tracking" />
        <link rel="canonical" href="https://auracargo.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auracargo.com/" />
        <meta property="og:title" content="AuraCargo - Global Logistics Solutions" />
        <meta property="og:description" content="Comprehensive logistics services including warehousing, air freight, ocean freight, and road freight with real-time tracking." />
        <meta property="og:image" content="/lovable-uploads/1e21aeaa-540f-4dde-8a28-4ab829e83c16.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://auracargo.com/" />
        <meta property="twitter:title" content="AuraCargo - Global Logistics Solutions" />
        <meta property="twitter:description" content="Comprehensive logistics services including warehousing, air freight, ocean freight, and road freight with real-time tracking." />
        <meta property="twitter:image" content="/lovable-uploads/1e21aeaa-540f-4dde-8a28-4ab829e83c16.png" />
        
        {/* Schema.org markup for Organization and Service */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AuraCargo",
              "url": "https://auracargo.com",
              "logo": "https://auracargo.com/lovable-uploads/1e21aeaa-540f-4dde-8a28-4ab829e83c16.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-123-4567",
                "contactType": "customer service",
                "availableLanguage": ["English", "Spanish"]
              },
              "sameAs": [
                "https://www.facebook.com/auracargo",
                "https://www.twitter.com/auracargo",
                "https://www.linkedin.com/company/auracargo"
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Logistics",
              "provider": {
                "@type": "Organization",
                "name": "AuraCargo"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "40.7128",
                  "longitude": "-74.0060"
                },
                "geoRadius": "5000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Logistics Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Air Freight"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Ocean Freight"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Road Freight"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Warehousing"
                    }
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <main className="min-h-screen">
        <HeroSection />
        
        <section id="tracking" className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Track Your Shipment</h2>
            <TrackOrder />
          </div>
        </section>
        
        <ServicesSection />
        
        <LogisticsFeatures />
        
        <WorkflowSection />
        
        <StatsSection />
        
        <LocationsSection />
        
        <TestimonialsSection />
        
        <UpdatesSection />
        
        <section className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Supply Chain?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact our logistics experts today and discover how AuraCargo can streamline your shipping operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-white text-primary-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
              >
                Get a Quote
              </Link>
              <Link 
                to="/services" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
