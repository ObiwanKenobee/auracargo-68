
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, Ship, Truck, Warehouse,
  Shield, Globe, Clock, BarChart3,
  PackagePlus, PackageCheck, MessageSquare, HeartHandshake
} from 'lucide-react';

const LogisticsFeatures = () => {
  const features = [
    {
      icon: <Plane className="w-8 h-8 text-primary-500" />,
      title: "Air Freight",
      description: "Fast and reliable air freight solutions for time-sensitive cargo with global coverage.",
      link: "/services/air-freight"
    },
    {
      icon: <Ship className="w-8 h-8 text-primary-500" />,
      title: "Ocean Freight",
      description: "Cost-effective ocean freight services for large shipments worldwide.",
      link: "/services/ocean-freight"
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-500" />,
      title: "Road Freight",
      description: "Flexible road transportation options for domestic and cross-border shipping.",
      link: "/services/road-freight"
    },
    {
      icon: <Warehouse className="w-8 h-8 text-primary-500" />,
      title: "Warehousing",
      description: "State-of-the-art warehousing and distribution facilities at strategic locations.",
      link: "/services/warehousing"
    },
    {
      icon: <PackagePlus className="w-8 h-8 text-accent-500" />,
      title: "Supply Chain Solutions",
      description: "End-to-end supply chain management to optimize your logistics operations.",
      link: "/services/supply-chain"
    },
    {
      icon: <PackageCheck className="w-8 h-8 text-accent-500" />,
      title: "Order Fulfillment",
      description: "Complete order fulfillment services from storage to delivery and returns.",
      link: "/services/order-fulfillment"
    },
    {
      icon: <Shield className="w-8 h-8 text-accent-500" />,
      title: "Cargo Insurance",
      description: "Comprehensive insurance options to protect your valuable shipments.",
      link: "/services/cargo-insurance"
    },
    {
      icon: <Globe className="w-8 h-8 text-accent-500" />,
      title: "Customs Clearance",
      description: "Expert customs brokerage services for smooth international shipping.",
      link: "/services/customs-clearance"
    },
    {
      icon: <Clock className="w-8 h-8 text-secondary-500" />,
      title: "Express Delivery",
      description: "Time-definite delivery services for urgent shipments worldwide.",
      link: "/services/express-delivery"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-secondary-500" />,
      title: "Logistics Analytics",
      description: "Data-driven insights to improve your supply chain performance.",
      link: "/services/logistics-analytics"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-secondary-500" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your logistics needs.",
      link: "/services/support"
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-secondary-500" />,
      title: "Specialized Services",
      description: "Custom logistics solutions for unique or complex shipping requirements.",
      link: "/services/specialized"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Logistics Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our full range of logistics and transportation solutions designed to meet your specific business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition duration-300 flex flex-col h-full group"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition">
                {feature.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {feature.description}
              </p>
              <span className="mt-4 inline-flex items-center text-primary-500 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogisticsFeatures;
