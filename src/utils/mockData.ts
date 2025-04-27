
import { v4 as uuidv4 } from 'uuid';

/**
 * Mock data utilities for the application
 */
export const mockData = {
  /**
   * Generate mock shipment data
   */
  generateMockShipment(override = {}) {
    return {
      id: uuidv4(),
      tracking_number: `AUR${Math.floor(100000 + Math.random() * 900000)}`,
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      weight: Math.floor(1 + Math.random() * 100),
      status: 'In Transit',
      created_at: new Date().toISOString(),
      user_id: uuidv4(),
      sender_name: 'John Doe',
      sender_email: 'john@example.com',
      receiver_name: 'Jane Smith',
      receiver_email: 'jane@example.com',
      term: 'Express',
      physical_weight: Math.floor(1 + Math.random() * 90),
      quantity: Math.floor(1 + Math.random() * 5),
      ...override
    };
  },
  
  /**
   * Generate mock tracking events
   */
  generateMockTrackingEvents(shipmentId: string, count = 3) {
    const events = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
      events.push({
        id: uuidv4(),
        shipment_id: shipmentId,
        status: i === 0 ? 'In Transit' : i === count - 1 ? 'Picked Up' : 'Processing',
        location: i === 0 ? 'Chicago, IL' : i === count - 1 ? 'New York, NY' : 'Columbus, OH',
        timestamp: new Date(now.getTime() - (i * 24 * 60 * 60 * 1000)).toISOString(),
        description: i === 0 ? 'Package is in transit' : i === count - 1 ? 'Package has been picked up by courier' : 'Package is being processed'
      });
    }
    
    return events;
  },
  
  /**
   * Generate mock notification
   */
  generateMockNotification(override = {}) {
    return {
      id: uuidv4(),
      title: 'Shipment Update',
      content: 'Your shipment is now in transit.',
      user_id: uuidv4(),
      created_at: new Date().toISOString(),
      read: false,
      ...override
    };
  }
};
