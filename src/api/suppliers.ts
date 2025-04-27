
import { api } from './core';

const TABLE_NAME = 'suppliers';

/**
 * Suppliers API with CRUD operations
 */
export const suppliersApi = {
  /**
   * Get all suppliers
   */
  async getAll(options?: {
    category?: string,
    location?: string,
    status?: string,
    verified?: boolean,
    risk_score_min?: number,
    risk_score_max?: number,
    limit?: number,
    page?: number,
    pageSize?: number
  }) {
    const filters: Record<string, any> = {};
    if (options?.category) filters.category = options.category;
    if (options?.location) filters.location = options.location;
    if (options?.status) filters.status = options.status;
    if (options?.verified !== undefined) filters.verified = options.verified;
    
    return api.fetch(TABLE_NAME, {
      filters,
      limit: options?.limit,
      page: options?.page,
      pageSize: options?.pageSize,
      order: { column: 'risk_score', ascending: false }
    });
  },
  
  /**
   * Get a supplier by ID
   */
  async getById(id: string) {
    return api.getById(TABLE_NAME, id);
  },
  
  /**
   * Create a new supplier
   */
  async create(data: {
    name: string;
    category: string;
    location: string;
    contact_email: string;
    contact_phone: string;
    risk_score: number;
    status?: string;
    verified?: boolean;
  }) {
    return api.create(TABLE_NAME, {
      ...data,
      status: data.status || 'active',
      verified: data.verified || false
    });
  },
  
  /**
   * Update a supplier
   */
  async update(id: string, data: Record<string, any>) {
    return api.update(TABLE_NAME, id, data);
  },
  
  /**
   * Delete a supplier
   */
  async delete(id: string) {
    return api.delete(TABLE_NAME, id);
  },
  
  /**
   * Verify a supplier
   */
  async verify(id: string) {
    return api.update(TABLE_NAME, id, { verified: true });
  },
  
  /**
   * Update supplier risk score
   */
  async updateRiskScore(id: string, score: number) {
    return api.update(TABLE_NAME, id, { risk_score: score });
  }
};
