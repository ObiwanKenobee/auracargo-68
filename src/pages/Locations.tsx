
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

const Locations = () => {
  const locations = {
    usa: [
      { name: "Los Angeles, CA", slug: "los-angeles", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Miami, FL", slug: "miami", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "New York City, NY", slug: "new-york", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Houston, TX", slug: "houston", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Chicago, IL", slug: "chicago", services: ["air-freight", "road-freight", "warehousing"] },
      { name: "Atlanta, GA", slug: "atlanta", services: ["air-freight", "road-freight", "warehousing"] },
      { name: "Dallas, TX", slug: "dallas", services: ["air-freight", "road-freight", "warehousing"] },
      { name: "Seattle, WA", slug: "seattle", services: ["ocean-freight", "road-freight", "warehousing"] },
      { name: "Savannah, GA", slug: "savannah", services: ["ocean-freight", "road-freight", "warehousing"] },
      { name: "Memphis, TN", slug: "memphis", services: ["air-freight", "road-freight", "warehousing"] }
    ],
    international: [
      { name: "Dubai, UAE", slug: "dubai", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Singapore", slug: "singapore", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Rotterdam, Netherlands", slug: "rotterdam", services: ["ocean-freight", "road-freight", "warehousing"] },
      { name: "Hamburg, Germany", slug: "hamburg", services: ["ocean-freight", "road-freight", "warehousing"] },
      { name: "Shanghai, China", slug: "shanghai", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Hong Kong", slug: "hong-kong", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "London, UK", slug: "london", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Tokyo, Japan", slug: "tokyo", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Sydney, Australia", slug: "sydney", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] },
      { name: "Mumbai, India", slug: "mumbai", services: ["air-freight", "ocean-freight", "road-freight", "warehousing"] }
    ]
  };
  
  const serviceNames = {
    "air-freight": "Air Freight",
    "ocean-freight": "Ocean Freight",
    "road-freight": "Road Freight",
    "warehousing": "Warehousing"
  };

  return (
    <>
      <Helmet>
        <title>Global Logistics Locations | AuraCargo Shipping & Warehousing</title>
        <meta 
          name="description" 
          content="AuraCargo's global network of logistics hubs across North America, Europe, Asia, and the Middle East. Find your nearest office for shipping and warehousing solutions." 
        />
        <meta 
          name="keywords" 
          content="logistics locations, global shipping network, international freight offices, warehousing locations, freight forwarding network" 
        />
        <link rel="canonical" href="https://auracargo.com/locations" />
        
        {/* Schema.org Organization markup with multiple locations */}
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
                "contactType": "customer service"
              },
              "location": [
                {
                  "@type": "Place",
                  "name": "AuraCargo Los Angeles",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Los Angeles",
                    "addressRegion": "CA",
                    "addressCountry": "US"
                  }
                },
                {
                  "@type": "Place",
                  "name": "AuraCargo New York",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "New York",
                    "addressRegion": "NY",
                    "addressCountry": "US"
                  }
                },
                {
                  "@type": "Place",
                  "name": "AuraCargo Dubai",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dubai",
                    "addressCountry": "UAE"
                  }
                },
                {
                  "@type": "Place",
                  "name": "AuraCargo Singapore",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Singapore",
                    "addressCountry": "SG"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <div className="bg-primary-500/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary-500">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">Locations</span>
          </div>
        </div>
      </div>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Global Logistics Network</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              With strategic locations across the globe, we provide seamless logistics solutions wherever your business needs them.
            </p>
            
            <div className="flex justify-center mb-12">
              <Link to="/contact">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
                  Contact Your Nearest Office
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                <span className="text-gray-700">USA Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary-500"></div>
                <span className="text-gray-700">International Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent-500"></div>
                <span className="text-gray-700">Partner Locations</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* US Locations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="text-primary-500" size={24} />
              <h2 className="text-3xl font-bold">United States Locations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.usa.map((location, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition duration-300">
                  <div className="flex items-start">
                    <MapPin className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{location.name}</h3>
                      <p className="text-gray-600 mb-4">Providing comprehensive logistics solutions throughout the {location.name} area with door-to-door service.</p>
                      
                      <h4 className="font-medium text-gray-800 mb-2">Services Available:</h4>
                      <ul className="mb-4 grid grid-cols-2 gap-2">
                        {location.services.map((service, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <svg className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <Link 
                              to={`/locations/${location.slug}/${service}`}
                              className="hover:text-primary-600 hover:underline"
                            >
                              {serviceNames[service as keyof typeof serviceNames]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        to={`/locations/${location.slug}`} 
                        className="text-primary-500 font-medium hover:text-primary-700 flex items-center"
                      >
                        Visit location page
                        <ExternalLink size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* International Locations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="text-secondary-500" size={24} />
              <h2 className="text-3xl font-bold">International Locations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.international.map((location, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-secondary-300 hover:shadow-md transition duration-300">
                  <div className="flex items-start">
                    <MapPin className="text-secondary-500 mt-1 mr-2 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{location.name}</h3>
                      <p className="text-gray-600 mb-4">Strategic logistics hub providing international shipping and warehousing solutions.</p>
                      
                      <h4 className="font-medium text-gray-800 mb-2">Services Available:</h4>
                      <ul className="mb-4 grid grid-cols-2 gap-2">
                        {location.services.map((service, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <svg className="h-4 w-4 text-secondary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <Link 
                              to={`/locations/${location.slug}/${service}`}
                              className="hover:text-secondary-600 hover:underline"
                            >
                              {serviceNames[service as keyof typeof serviceNames]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        to={`/locations/${location.slug}`} 
                        className="text-secondary-500 font-medium hover:text-secondary-700 flex items-center"
                      >
                        Visit location page
                        <ExternalLink size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Location Single Page CTA */}
        <section className="py-16 bg-primary-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Logistics Services in a Specific Location?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our network extends to additional partner locations worldwide. Contact us to discuss your specific logistics requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Locations;
