
// This file is used to generate mock data for the application
// Useful during development or when the backend is not connected

export const mockData = {
  // Generate a mock shipment with customizable properties
  generateMockShipment: (options: { id?: string } = {}) => {
    const id = options.id || `ship_${Math.random().toString(36).substring(2, 9)}`;
    return {
      id,
      tracking_number: `AUR${Math.floor(100000 + Math.random() * 900000)}`,
      status: "In Transit",
      origin: "Lagos, Nigeria",
      destination: "Abuja, Nigeria",
      current_location: "Ibadan Outskirts",
      weight: (10 + Math.random() * 100).toFixed(2),
      sender_name: "John Business Ltd",
      sender_email: "johndoe@example.com",
      receiver_name: "Jane Enterprise",
      receiver_email: "jane@example.com",
      term: "Express",
      created_at: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      estimated_delivery: new Date(Date.now() + (2 + Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString()
    };
  },

  // Generate multiple mock shipments
  generateMockShipments: (count: number = 10) => {
    return Array(count).fill(null).map(() => mockData.generateMockShipment());
  },

  // Generate mock tracking events for a shipment
  generateMockTrackingEvents: (shipmentId: string, count: number = 5) => {
    const events = [
      "Order Placed",
      "Processing",
      "Picked Up",
      "In Transit",
      "At Local Facility",
      "Out for Delivery",
      "Delivered"
    ];
    
    const locations = [
      "Lagos Warehouse",
      "Lagos Processing Center",
      "Ibadan Distribution Center",
      "Ibadan Outskirts",
      "Oshogbo Transfer Station",
      "Abuja Processing Center",
      "Abuja Distribution Center"
    ];
    
    return Array(count).fill(null).map((_, index) => {
      const daysAgo = count - index - 1;
      return {
        id: `event_${Math.random().toString(36).substring(2, 9)}`,
        shipment_id: shipmentId,
        status: events[Math.min(index, events.length - 1)],
        location: locations[Math.min(index, locations.length - 1)],
        timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        description: `Shipment ${events[Math.min(index, events.length - 1)].toLowerCase()} at ${locations[Math.min(index, locations.length - 1)]}`
      };
    }).reverse(); // Most recent events first
  },

  // Generate mock supplier data
  generateMockSupplier: (options: { id?: string } = {}) => {
    const id = options.id || `supp_${Math.random().toString(36).substring(2, 9)}`;
    const categories = ["Raw Materials", "Electronics", "Textiles", "Logistics", "Packaging"];
    const locations = ["Lagos, Nigeria", "Accra, Ghana", "Nairobi, Kenya", "Johannesburg, South Africa"];
    
    return {
      id,
      name: `Supplier ${Math.floor(Math.random() * 1000)}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      risk_score: Math.floor(Math.random() * 100),
      status: Math.random() > 0.2 ? "active" : "inactive",
      verified: Math.random() > 0.3,
      contact_email: `supplier${Math.floor(Math.random() * 1000)}@example.com`,
      contact_phone: `+${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000000)}`,
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    };
  },

  // Generate multiple mock suppliers
  generateMockSuppliers: (count: number = 10) => {
    return Array(count).fill(null).map(() => mockData.generateMockSupplier());
  },

  // Generate mock partner data
  generateMockPartner: (options: { id?: string } = {}) => {
    const id = options.id || `part_${Math.random().toString(36).substring(2, 9)}`;
    const partnershipTypes = ["Technology", "Distribution", "Logistics", "Financial", "Research"];
    const industries = ["Renewable Energy", "Agriculture", "Manufacturing", "Technology", "Healthcare"];
    const locations = ["Lagos, Nigeria", "Accra, Ghana", "Nairobi, Kenya", "Johannesburg, South Africa"];
    
    return {
      id,
      name: `Partner ${Math.floor(Math.random() * 1000)} Ltd`,
      partnership_type: partnershipTypes[Math.floor(Math.random() * partnershipTypes.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      description: `Strategic partner specializing in ${partnershipTypes[Math.floor(Math.random() * partnershipTypes.length)].toLowerCase()} solutions.`,
      logo_url: `https://via.placeholder.com/150?text=${encodeURIComponent("Partner")}`,
      website_url: `https://partner${Math.floor(Math.random() * 1000)}.example.com`,
      contact_email: `partner${Math.floor(Math.random() * 1000)}@example.com`,
      status: Math.random() > 0.2 ? "active" : "inactive",
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    };
  },

  // Generate multiple mock partners
  generateMockPartners: (count: number = 5) => {
    return Array(count).fill(null).map(() => mockData.generateMockPartner());
  },
  
  // Generate mock ESG report
  generateMockESGReport: (options: { id?: string, userId?: string } = {}) => {
    const id = options.id || `esg_${Math.random().toString(36).substring(2, 9)}`;
    const reportTypes = ["Carbon Footprint", "Sustainability", "Social Impact", "Governance", "Annual ESG"];
    const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
    
    return {
      id,
      user_id: options.userId || `user_${Math.random().toString(36).substring(2, 9)}`,
      title: `${reportType} Report - Q${Math.floor(Math.random() * 4) + 1} ${new Date().getFullYear()}`,
      report_type: reportType,
      content: {
        summary: `This report outlines our ${reportType.toLowerCase()} initiatives and progress for the quarter.`,
        key_metrics: [
          { name: "Carbon Emissions", value: Math.floor(Math.random() * 1000), unit: "tons CO₂e" },
          { name: "Water Usage", value: Math.floor(Math.random() * 10000), unit: "cubic meters" }
        ],
        highlights: [
          "Reduced carbon emissions by 15%",
          "Implemented new sustainability policies",
          "Increased community engagement"
        ]
      },
      reporting_period: `Q${Math.floor(Math.random() * 4) + 1} ${new Date().getFullYear()}`,
      status: Math.random() > 0.3 ? "published" : "draft",
      created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      published_at: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null
    };
  },

  // Generate multiple mock ESG reports
  generateMockESGReports: (count: number = 5, userId?: string) => {
    return Array(count).fill(null).map(() => mockData.generateMockESGReport({ userId }));
  },

  // Generate mock ESG metric
  generateMockESGMetric: (options: { id?: string, userId?: string } = {}) => {
    const id = options.id || `metric_${Math.random().toString(36).substring(2, 9)}`;
    const metricTypes = ["Environmental", "Social", "Governance"];
    const metricNames = [
      "Carbon Emissions", "Water Usage", "Energy Consumption",
      "Employee Satisfaction", "Community Investment", "Gender Diversity",
      "Board Independence", "Ethics Violations", "Sustainability Goals"
    ];
    
    const metricType = metricTypes[Math.floor(Math.random() * metricTypes.length)];
    const metricName = metricNames[Math.floor(Math.random() * metricNames.length)];
    
    const units = {
      "Carbon Emissions": "tons CO₂e",
      "Water Usage": "cubic meters",
      "Energy Consumption": "kWh",
      "Employee Satisfaction": "percent",
      "Community Investment": "USD",
      "Gender Diversity": "percent",
      "Board Independence": "percent",
      "Ethics Violations": "count",
      "Sustainability Goals": "percent completed"
    };
    
    return {
      id,
      user_id: options.userId || `user_${Math.random().toString(36).substring(2, 9)}`,
      metric_name: metricName,
      metric_type: metricType,
      metric_value: metricName.includes("percent") ? 
        Math.floor(Math.random() * 100) : 
        Math.floor(Math.random() * 1000),
      unit: units[metricName as keyof typeof units],
      source: Math.random() > 0.5 ? "Internal Audit" : "External Verification",
      timestamp: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString()
    };
  },

  // Generate multiple mock ESG metrics
  generateMockESGMetrics: (count: number = 10, userId?: string) => {
    return Array(count).fill(null).map(() => mockData.generateMockESGMetric({ userId }));
  },

  // Generate mock risk assessment
  generateMockRiskAssessment: (options: { id?: string, userId?: string } = {}) => {
    const id = options.id || `risk_${Math.random().toString(36).substring(2, 9)}`;
    const categories = ["Supply Chain", "Environmental", "Geopolitical", "Financial", "Operational"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    const impactScore = Math.floor(Math.random() * 10) + 1;
    const probabilityScore = Math.floor(Math.random() * 10) + 1;
    const riskLevel = 
      impactScore * probabilityScore > 50 ? "high" : 
      impactScore * probabilityScore > 25 ? "medium" : "low";
    
    return {
      id,
      user_id: options.userId || `user_${Math.random().toString(36).substring(2, 9)}`,
      title: `${category} Risk - ${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      description: `Potential risk related to ${category.toLowerCase()} factors that could impact operations.`,
      category,
      impact_score: impactScore,
      probability_score: probabilityScore,
      risk_level: riskLevel,
      mitigation_plan: `Implement ${category.toLowerCase()} contingency measures and regular monitoring.`,
      due_date: new Date(Date.now() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    };
  },

  // Generate multiple mock risk assessments
  generateMockRiskAssessments: (count: number = 5, userId?: string) => {
    return Array(count).fill(null).map(() => mockData.generateMockRiskAssessment({ userId }));
  }
};

export default mockData;
