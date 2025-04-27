
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import TrackOrder from '../components/TrackOrder';

const LocationService = () => {
  const { location, service } = useParams<{ location: string; service: string }>();
  
  // Capitalized and formatted location and service for display
  const formattedLocation = location ? location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
  const formattedService = service ? service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

  // Services data - would be fetched from API in production
  const serviceData = {
    'air-freight': {
      name: 'Air Freight',
      description: `Our premium air freight services in ${formattedLocation} provide fast, reliable transportation for time-sensitive cargo. With strategic partnerships with major airlines and dedicated cargo planes, we ensure your shipments arrive on schedule, every time.`,
      features: [
        'Express and standard air freight options',
        'Door-to-door delivery services',
        'Temperature-controlled air freight',
        'Hazardous materials handling capabilities',
        'Real-time shipment tracking',
        'Customs clearance assistance'
      ],
      image: '/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png',
      alt: 'Air freight cargo being loaded onto a plane'
    },
    'ocean-freight': {
      name: 'Ocean Freight',
      description: `Our comprehensive ocean freight services in ${formattedLocation} deliver cost-effective solutions for large volume shipments. With regular sailings from major ports worldwide, we ensure reliable transportation for your cargo regardless of size or destination.`,
      features: [
        'FCL (Full Container Load) shipping',
        'LCL (Less than Container Load) shipping',
        'Break bulk and project cargo',
        'Refrigerated container solutions',
        'Port-to-port and door-to-door options',
        'Competitive rates with major shipping lines'
      ],
      image: '/lovable-uploads/adca88c5-d496-48f1-ad5b-d09424c574af.png',
      alt: 'Ocean freight container ship at port'
    },
    'road-freight': {
      name: 'Road Freight',
      description: `Our efficient road freight services in ${formattedLocation} provide flexible transportation solutions for businesses of all sizes. Our extensive fleet and carrier network ensure reliable delivery across the region with competitive transit times.`,
      features: [
        'FTL (Full Truckload) services',
        'LTL (Less than Truckload) options',
        'Expedited delivery services',
        'Cross-border transportation',
        'Specialized equipment for oversized cargo',
        'Last-mile delivery solutions'
      ],
      image: '/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png',
      alt: 'Road freight truck on highway'
    },
    'warehousing': {
      name: 'Warehousing',
      description: `Our state-of-the-art warehousing facilities in ${formattedLocation} provide secure storage and inventory management services. With advanced technology and strategic locations, we help optimize your supply chain and reduce operating costs.`,
      features: [
        'Short and long-term storage solutions',
        'Climate-controlled warehousing',
        'Order fulfillment services',
        'Cross-docking capabilities',
        'Inventory management systems',
        'Value-added services (labeling, kitting, etc.)'
      ],
      image: '/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png',
      alt: 'Modern warehouse facility with storage racks'
    }
  };
  
  // If service doesn't exist in our data
  const currentService = service ? serviceData[service as keyof typeof serviceData] : null;
  
  if (!currentService) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Service not found</h1>
        <p className="mb-8">The requested service information is not available.</p>
        <Link to="/services">
          <Button>View all services</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${currentService.name} in ${formattedLocation} | AuraCargo Logistics Solutions`}</title>
        <meta 
          name="description" 
          content={`Professional ${currentService.name.toLowerCase()} services in ${formattedLocation}. Reliable, efficient, and cost-effective logistics solutions customized for your business needs.`} 
        />
        <meta 
          name="keywords" 
          content={`${currentService.name.toLowerCase()}, ${formattedLocation} logistics, ${service} services, supply chain, ${formattedLocation} shipping, cargo services`} 
        />
        <link rel="canonical" href={`https://auracargo.com/locations/${location}/${service}`} />
        
        {/* Schema.org LocalBusiness markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "AuraCargo ${formattedLocation}",
              "image": "${currentService.image}",
              "description": "${currentService.description}",
              "@id": "https://auracargo.com/locations/${location}",
              "url": "https://auracargo.com/locations/${location}/${service}",
              "telephone": "+1-800-123-4567",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Logistics Way",
                "addressLocality": "${formattedLocation}",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.7128",
                "longitude": "-74.0060"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.facebook.com/auracargo",
                "https://www.twitter.com/auracargo",
                "https://www.linkedin.com/company/auracargo"
              ],
              "priceRange": "$$"
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "${currentService.name}",
              "provider": {
                "@type": "LocalBusiness",
                "name": "AuraCargo ${formattedLocation}"
              },
              "areaServed": {
                "@type": "City",
                "name": "${formattedLocation}"
              },
              "serviceOutput": "Efficient ${currentService.name.toLowerCase()} services",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="bg-primary-500/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary-500">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/locations" className="text-gray-600 hover:text-primary-500">Locations</Link>
            <span className="mx-2">›</span>
            <Link to={`/locations/${location}`} className="text-gray-600 hover:text-primary-500">{formattedLocation}</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">{currentService.name}</span>
          </div>
        </div>
      </div>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                  {currentService.name} Services in {formattedLocation}
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  {currentService.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600">
                    Get a Quote
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={currentService.image}
                  alt={currentService.alt}
                  className="w-full h-auto rounded-lg shadow-lg"
                  width="600"
                  height="400"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Tracking Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Track Your {currentService.name} Shipment</h2>
            <TrackOrder />
          </div>
        </section>
        
        {/* Service Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our {currentService.name} Services in {formattedLocation}</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Discover our comprehensive range of {currentService.name.toLowerCase()} solutions designed to meet your specific business requirements.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-5 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition duration-300">
                  <CheckCircle2 className="text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
                  Discuss Your Requirements
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Location Contact */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Our {formattedLocation} Office</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Office Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">123 Logistics Way, {formattedLocation}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+1-800-123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{location}@auracargo.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">{currentService.name} FAQ</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Common questions about our {currentService.name.toLowerCase()} services in {formattedLocation}
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What is the average transit time for {currentService.name.toLowerCase()} in {formattedLocation}?
                </h3>
                <p className="text-gray-600">
                  Transit times vary depending on the specific route and service level selected. For {formattedLocation}, typical transit times range from 1-2 days for express services and 3-7 days for standard services. Contact our team for a precise estimate for your specific shipment.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do you offer customs clearance for {currentService.name.toLowerCase()} shipments?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive customs clearance services for all {currentService.name.toLowerCase()} shipments to and from {formattedLocation}. Our experienced team handles documentation, classification, and compliance to ensure smooth border crossings.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What tracking capabilities do you offer for {currentService.name.toLowerCase()}?
                </h3>
                <p className="text-gray-600">
                  All our {currentService.name.toLowerCase()} services include real-time tracking through our online portal and mobile app. You'll receive regular status updates and notifications at key milestones throughout the shipping process.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do I get a quote for {currentService.name.toLowerCase()} services in {formattedLocation}?
                </h3>
                <p className="text-gray-600">
                  You can request a quote by filling out our online quote form, calling our {formattedLocation} office directly, or using the contact form on this page. Our team will provide a detailed quote based on your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Ship with AuraCargo in {formattedLocation}?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our local experts are ready to assist with your {currentService.name.toLowerCase()} needs and provide customized logistics solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales Team
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LocationService;
