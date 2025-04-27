
/**
 * Utility to generate mock data for the application
 */
export const mockData = {
  /**
   * Generate a list of mock shipments
   */
  generateMockShipments(count = 10) {
    const shipments = [];
    
    for (let i = 0; i < count; i++) {
      shipments.push(this.generateMockShipment());
    }
    
    return shipments;
  },

  /**
   * Generate a single mock shipment with optional overrides
   */
  generateMockShipment(overrides = {}) {
    const id = overrides.id || `ship_${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date();
    const pastDate = new Date(now.getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    
    const origins = [
      "Shanghai, China",
      "Rotterdam, Netherlands",
      "Singapore Port",
      "Los Angeles, USA",
      "Dubai, UAE",
      "Hamburg, Germany",
      "Tokyo, Japan",
      "Busan, South Korea"
    ];
    
    const destinations = [
      "New York, USA",
      "Sydney, Australia",
      "Mumbai, India",
      "Rio de Janeiro, Brazil",
      "Cape Town, South Africa",
      "Barcelona, Spain",
      "Vancouver, Canada",
      "Istanbul, Turkey"
    ];
    
    const statuses = ["Preparing", "In Transit", "On Hold", "Delivered", "Delayed"];
    
    const terms = ["Express", "Standard", "Economy", "Ground"];
    
    return {
      id,
      tracking_number: overrides.tracking_number || `AUR${Math.floor(100000 + Math.random() * 900000)}`,
      user_id: overrides.user_id || `user_${Math.random().toString(36).substring(2, 9)}`,
      origin: overrides.origin || origins[Math.floor(Math.random() * origins.length)],
      destination: overrides.destination || destinations[Math.floor(Math.random() * destinations.length)],
      current_location: overrides.current_location || this.getRandomLocation(),
      status: overrides.status || statuses[Math.floor(Math.random() * statuses.length)],
      weight: overrides.weight || Math.floor(Math.random() * 1000) / 10 + 0.5,
      term: overrides.term || terms[Math.floor(Math.random() * terms.length)],
      sender_name: overrides.sender_name || this.getRandomName(),
      sender_email: overrides.sender_email || `sender${Math.floor(Math.random() * 1000)}@example.com`,
      receiver_name: overrides.receiver_name || this.getRandomName(),
      receiver_email: overrides.receiver_email || `receiver${Math.floor(Math.random() * 1000)}@example.com`,
      created_at: overrides.created_at || pastDate.toISOString(),
      updated_at: overrides.updated_at || now.toISOString(),
      physical_weight: overrides.physical_weight || Math.floor(Math.random() * 900) / 10 + 0.5,
      quantity: overrides.quantity || Math.floor(Math.random() * 10) + 1,
      volume: overrides.volume || `${Math.floor(Math.random() * 5) + 1}x${Math.floor(Math.random() * 5) + 1}x${Math.floor(Math.random() * 5) + 1} m³`,
    };
  },

  /**
   * Generate tracking events for a shipment
   */
  generateMockTrackingEvents(shipmentId, count = 5) {
    const events = [];
    const now = new Date();
    const statuses = [
      "Order Received", 
      "Processing", 
      "Shipped", 
      "In Transit", 
      "Out for Delivery", 
      "Delivery Attempted", 
      "Delivered"
    ];
    
    // Generate events from oldest to newest
    for (let i = 0; i < count; i++) {
      const daysAgo = count - i - 1;
      const eventDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - Math.floor(Math.random() * 12 * 60 * 60 * 1000));
      
      events.push({
        id: `event_${Math.random().toString(36).substring(2, 9)}`,
        shipment_id: shipmentId,
        status: statuses[Math.min(i, statuses.length - 1)],
        location: this.getRandomLocation(),
        timestamp: eventDate.toISOString(),
        description: this.getRandomEventDescription(statuses[Math.min(i, statuses.length - 1)])
      });
    }
    
    return events;
  },

  /**
   * Get a random person name
   */
  getRandomName() {
    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White"];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  },

  /**
   * Get a random location
   */
  getRandomLocation() {
    const locations = [
      "New York, USA",
      "Los Angeles, USA",
      "Chicago, USA",
      "Houston, USA",
      "Phoenix, USA",
      "London, UK",
      "Shanghai, China",
      "Beijing, China",
      "Tokyo, Japan",
      "Delhi, India",
      "Mumbai, India",
      "São Paulo, Brazil",
      "Mexico City, Mexico",
      "Cairo, Egypt",
      "Sydney, Australia",
      "Istanbul, Turkey",
      "Paris, France",
      "Berlin, Germany",
      "Madrid, Spain",
      "Rome, Italy"
    ];
    
    return locations[Math.floor(Math.random() * locations.length)];
  },

  /**
   * Get a random event description based on status
   */
  getRandomEventDescription(status) {
    const descriptions = {
      "Order Received": [
        "Order has been received and is being processed.",
        "Your order has been confirmed and entered into our system.",
        "Order received and payment confirmed."
      ],
      "Processing": [
        "Package is being prepared for shipment.",
        "Your order is being processed at our facility.",
        "Items are being gathered and packaged."
      ],
      "Shipped": [
        "Package has been shipped.",
        "Your order has left our facility.",
        "Shipment has been handed to the carrier."
      ],
      "In Transit": [
        "Package is in transit to the next facility.",
        "Your shipment is on the way to its destination.",
        "Package is moving through our network."
      ],
      "Out for Delivery": [
        "Package is out for delivery.",
        "Your package is on the delivery vehicle.",
        "Delivery will be attempted today."
      ],
      "Delivery Attempted": [
        "Delivery was attempted but package couldn't be delivered.",
        "Delivery attempted, no one was available to receive the package.",
        "We tried to deliver your package but were unable to."
      ],
      "Delivered": [
        "Package has been delivered.",
        "Your package has been delivered at the front door.",
        "Shipment was received by the recipient."
      ]
    };
    
    const options = descriptions[status] || ["Status update for your package."];
    return options[Math.floor(Math.random() * options.length)];
  }
};
