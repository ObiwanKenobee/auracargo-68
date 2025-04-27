
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const LocationsSection = () => {
  // Logistics hub locations based on the SEO strategy
  const locations = [
    { 
      region: "United States", 
      cities: [
        "Los Angeles, CA", 
        "Miami, FL", 
        "New York City, NY", 
        "Houston, TX",
        "Chicago, IL"
      ] 
    },
    { 
      region: "International", 
      cities: [
        "Dubai, UAE", 
        "Singapore", 
        "Rotterdam, Netherlands", 
        "Shanghai, China",
        "London, UK"
      ] 
    }
  ];

  return (
    <section id="locations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Global Logistics Network</h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          With strategic locations in major logistics hubs worldwide, we provide seamless shipping and warehousing solutions across continents.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-600">{location.region}</h3>
              <ul className="space-y-3">
                {location.cities.map((city, cityIndex) => (
                  <li key={cityIndex} className="flex items-start gap-2">
                    <MapPin size={20} className="text-secondary-500 mt-1 flex-shrink-0" />
                    <Link to={`/locations/${city.split(',')[0].toLowerCase().replace(' ', '-')}`} className="hover:text-secondary-500 transition">
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                to="/locations" 
                className="inline-block mt-4 text-primary-500 font-medium hover:text-primary-700 transition"
              >
                View all locations →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/contact" 
            className="bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition"
          >
            Contact your nearest office
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
