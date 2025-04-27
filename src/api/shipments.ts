
import { api } from './core';

const TABLE_NAME = 'messages'; // Using messages table as fallback since shipments isn't available in Supabase

/**
 * Shipments API with CRUD operations
 */
export const shipmentsApi = {
  /**
   * Get all shipments with optional filtering
   */
  async getAll(options?: { 
    userId?: string,
    status?: string,
    limit?: number,
    page?: number,
    pageSize?: number
  }) {
    const filters: Record<string, any> = {};
    if (options?.userId) filters.user_id = options.userId;
    if (options?.status) filters.status = options.status;
    
    return api.fetch(TABLE_NAME, {
      filters,
      limit: options?.limit,
      page: options?.page,
      pageSize: options?.pageSize,
      order: { column: 'created_at', ascending: false }
    });
  },
  
  /**
   * Get a shipment by ID
   */
  async getById(id: string) {
    return api.getById(TABLE_NAME, id);
  },
  
  /**
   * Create a new shipment
   */
  async create(data: {
    user_id: string;
    origin: string;
    destination: string;
    weight: number;
    sender_name: string;
    sender_email: string;
    receiver_name: string;
    receiver_email: string;
    term: string;
    physical_weight?: number;
    quantity?: number;
  }) {
    // Generate a tracking number
    const trackingNumber = `AUR${Math.floor(100000 + Math.random() * 900000)}`;
    
    // We're using thread_id as a proxy for tracking_number in the messages table
    return api.create(TABLE_NAME, {
      sender_id: data.user_id,
      thread_id: trackingNumber,
      content: JSON.stringify({
        origin: data.origin,
        destination: data.destination,
        weight: data.weight,
        sender_name: data.sender_name,
        sender_email: data.sender_email,
        receiver_name: data.receiver_name,
        receiver_email: data.receiver_email,
        term: data.term,
        physical_weight: data.physical_weight,
        quantity: data.quantity
      })
    });
  },
  
  /**
   * Update a shipment
   */
  async update(id: string, data: Record<string, any>) {
    return api.update(TABLE_NAME, id, data);
  },
  
  /**
   * Delete a shipment
   */
  async delete(id: string) {
    return api.delete(TABLE_NAME, id);
  },
  
  /**
   * Track a shipment by tracking number
   */
  async trackByNumber(trackingNumber: string) {
    try {
      const { data, error } = await api.fetch(TABLE_NAME, {
        filters: { thread_id: trackingNumber }
      });
      
      if (error) return { data: null, error };
      
      // Simulate tracking data
      const mockTrackingData = {
        tracking_number: trackingNumber,
        status: 'In Transit',
        estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        events: [
          { 
            timestamp: new Date().toISOString(),
            location: 'Chicago, IL',
            status: 'In Transit',
            description: 'Package is in transit'
          },
          { 
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            location: 'New York, NY',
            status: 'Picked Up',
            description: 'Package has been picked up by courier'
          }
        ]
      };
      
      return { data: mockTrackingData, error: null };
    } catch (error) {
      console.error(`Exception tracking shipment ${trackingNumber}:`, error);
      return { data: null, error };
    }
  }
};
