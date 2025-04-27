
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, MessageSquare, Globe, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import TrackOrder from '../components/TrackOrder';

const Service = () => {
  const { service } = useParams<{ service: string }>();
  
  // Services data with SEO-friendly content
  const servicesData = {
    'air-freight': {
      name: 'Air Freight',
      headline: 'Fast and Reliable Global Air Freight Solutions',
      description: 'Our premium air freight services deliver speed, reliability, and flexibility for your time-sensitive cargo. With strategic airline partnerships and dedicated cargo planes, we ensure your shipments arrive on schedule, every time.',
      image: '/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png',
      alt: 'Air freight cargo being loaded onto a plane',
      features: [
        'Express and standard air freight options for flexibility',
        'Door-to-door delivery services worldwide',
        'Temperature-controlled air freight for sensitive cargo',
        'Hazardous materials handling capabilities',
        'Real-time shipment tracking and visibility',
        'Customs clearance assistance in all major markets'
      ],
      benefits: [
        'Fastest transit times for urgent shipments',
        'Global reach to remote destinations',
        'Reduced warehousing needs with just-in-time delivery',
        'Enhanced security with fewer touchpoints',
        'Simplified supply chain with end-to-end solutions'
      ],
      locations: ['Los Angeles', 'New York', 'Chicago', 'Miami', 'Dubai', 'Singapore', 'London', 'Tokyo']
    },
    'ocean-freight': {
      name: 'Ocean Freight',
      headline: 'Cost-Effective Global Ocean Freight Services',
      description: 'Our comprehensive ocean freight services deliver reliable and cost-effective solutions for large volume shipments. With regular sailings from major ports worldwide, we ensure dependable transportation for your cargo regardless of size or destination.',
      image: '/lovable-uploads/adca88c5-d496-48f1-ad5b-d09424c574af.png',
      alt: 'Ocean freight container ship at port',
      features: [
        'FCL (Full Container Load) shipping worldwide',
        'LCL (Less than Container Load) consolidation services',
        'Break bulk and project cargo handling',
        'Refrigerated container solutions for perishables',
        'Port-to-port and door-to-door delivery options',
        'Competitive rates with major shipping lines'
      ],
      benefits: [
        'Most cost-effective solution for large shipments',
        'Environmentally friendly transportation option',
        'Higher weight and volume capacity than air freight',
        'Stable pricing with long-term rate agreements',
        'Regular scheduled departures for reliable planning'
      ],
      locations: ['Los Angeles', 'New York', 'Seattle', 'Savannah', 'Miami', 'Rotterdam', 'Singapore', 'Shanghai', 'Hong Kong', 'Dubai']
    },
    'road-freight': {
      name: 'Road Freight',
      headline: 'Efficient and Flexible Road Transportation Solutions',
      description: 'Our road freight services provide flexible and reliable transportation solutions for businesses of all sizes. With an extensive fleet and carrier network, we ensure dependable delivery across regions with optimized transit times and competitive rates.',
      image: '/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png',
      alt: 'Road freight truck on highway',
      features: [
        'FTL (Full Truckload) services for exclusive use',
        'LTL (Less than Truckload) options for cost savings',
        'Expedited delivery services for urgent shipments',
        'Cross-border transportation with customs expertise',
        'Specialized equipment for oversized or unusual cargo',
        'Last-mile delivery solutions for complete coverage'
      ],
      benefits: [
        'Door-to-door delivery with no transloading required',
        'Flexible scheduling and route planning options',
        'High visibility and tracking throughout transit',
        'Cost-effective for short to medium distances',
        'Extensive geographic coverage with interconnected networks'
      ],
      locations: ['All US locations', 'All European locations', 'Dubai', 'Singapore', 'Major cities in Asia and Australia']
    },
    'warehousing': {
      name: 'Warehousing',
      headline: 'Strategic Warehousing and Distribution Solutions',
      description: 'Our state-of-the-art warehousing facilities provide secure storage and efficient inventory management services. With advanced technology and strategic locations, we help optimize your supply chain and reduce operating costs while improving delivery times.',
      image: '/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png',
      alt: 'Modern warehouse facility with storage racks',
      features: [
        'Short and long-term storage solutions with flexible terms',
        'Climate-controlled warehousing for sensitive products',
        'Order fulfillment services with pick and pack',
        'Cross-docking capabilities for streamlined distribution',
        'Inventory management systems with real-time visibility',
        'Value-added services including labeling, kitting, and quality control'
      ],
      benefits: [
        'Strategic locations near major transportation hubs',
        'Reduced capital expenditure with outsourced warehousing',
        'Scalable space to accommodate business fluctuations',
        'Specialized handling for industry-specific requirements',
        'Integrated technology for seamless supply chain visibility'
      ],
      locations: ['All major US cities', 'Rotterdam', 'Singapore', 'Dubai', 'Hong Kong', 'London', 'Sydney', 'Tokyo']
    }
  };
  
  // If service doesn't exist in our data
  const currentService = service ? servicesData[service as keyof typeof servicesData] : null;
  
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

  // Convert service slug to URL format
  const serviceSlug = service || '';

  return (
    <>
      <Helmet>
        <title>{`${currentService.name} Services | Global Logistics Solutions | AuraCargo`}</title>
        <meta 
          name="description" 
          content={`Professional ${currentService.name.toLowerCase()} services. ${currentService.description.substring(0, 120)}...`} 
        />
        <meta 
          name="keywords" 
          content={`${currentService.name.toLowerCase()}, logistics solutions, international shipping, freight services, global ${service} services, supply chain, cargo services`} 
        />
        <link rel="canonical" href={`https://auracargo.com/services/${serviceSlug}`} />
        
        {/* Schema.org markup for the service */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "${currentService.name}",
              "provider": {
                "@type": "Organization",
                "name": "AuraCargo",
                "url": "https://auracargo.com"
              },
              "description": "${currentService.description}",
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
                "name": "${currentService.name} Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "${currentService.name}"
                    }
                  }
                ]
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
            <Link to="/services" className="text-gray-600 hover:text-primary-500">Services</Link>
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
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                  {currentService.headline}
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  {currentService.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600">
                    Get a Quote
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div>
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
            <h2 className="text-3xl font-bold text-center mb-4">{currentService.name} Services Features</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Discover our comprehensive range of {currentService.name.toLowerCase()} solutions designed to meet your specific business requirements.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-5 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition duration-300">
                  <CheckCircle2 className="text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our {currentService.name} Services</h2>
              
              <div className="space-y-6">
                {currentService.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary-500 rounded-full p-2 text-white flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Global Network */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our Global {currentService.name} Network</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              We provide {currentService.name.toLowerCase()} services in strategic locations worldwide, ensuring seamless logistics solutions for your business.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Globe className="text-primary-500" size={28} />
                <h3 className="text-2xl font-semibold">Available Locations</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentService.locations.map((location, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin size={16} className="text-secondary-500" />
                    <Link 
                      to={`/locations/${location.toLowerCase().replace(' ', '-')}/${serviceSlug}`} 
                      className="hover:text-primary-600 hover:underline"
                    >
                      {location}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why AuraCargo for {currentService.name}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-500 mb-4">
                  <Globe size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Network</h3>
                <p className="text-gray-600">
                  Extensive network covering major trade lanes and logistics hubs worldwide
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-500 mb-4">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-gray-600">
                  Consistent on-time performance with proactive shipment monitoring
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-500 mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security</h3>
                <p className="text-gray-600">
                  Advanced security measures to protect your valuable cargo throughout transit
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-500 mb-4">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer service from our dedicated team of logistics experts
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">{currentService.name} FAQ</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Common questions about our {currentService.name.toLowerCase()} services
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What is the average transit time for {currentService.name.toLowerCase()} shipments?
                </h3>
                <p className="text-gray-600">
                  Transit times vary depending on the specific route and service level selected. Contact our team for a precise estimate based on your origin and destination points.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do you offer customs clearance for {currentService.name.toLowerCase()} shipments?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive customs clearance services for all {currentService.name.toLowerCase()} shipments. Our experienced team handles documentation, classification, and compliance to ensure smooth border crossings.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What tracking capabilities do you offer for {currentService.name.toLowerCase()}?
                </h3>
                <p className="text-gray-600">
                  All our {currentService.name.toLowerCase()} services include real-time tracking through our online portal and mobile app. You'll receive regular status updates and notifications throughout the shipping process.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do I get a quote for {currentService.name.toLowerCase()} services?
                </h3>
                <p className="text-gray-600">
                  You can request a quote by filling out our online quote form, calling our customer service team, or using the contact form on our website. Our team will provide a detailed quote based on your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Ship with AuraCargo?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact our experts today to discuss your {currentService.name.toLowerCase()} requirements and discover how we can optimize your logistics operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
                  Get a Quote
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Other Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Service;
