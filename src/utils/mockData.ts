
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
  }
};

export default mockData;
