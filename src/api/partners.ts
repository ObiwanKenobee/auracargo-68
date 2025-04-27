
import { api } from './core';

const TABLE_NAME = 'partners';

/**
 * Partners API with CRUD operations
 */
export const partnersApi = {
  /**
   * Get all partners
   */
  async getAll(options?: {
    status?: string,
    industry?: string,
    partnership_type?: string,
    limit?: number,
    page?: number,
    pageSize?: number
  }) {
    const filters: Record<string, any> = {};
    if (options?.status) filters.status = options.status;
    if (options?.industry) filters.industry = options.industry;
    if (options?.partnership_type) filters.partnership_type = options.partnership_type;
    
    return api.fetch(TABLE_NAME, {
      filters,
      limit: options?.limit,
      page: options?.page,
      pageSize: options?.pageSize,
      order: { column: 'created_at', ascending: false }
    });
  },
  
  /**
   * Get a partner by ID
   */
  async getById(id: string) {
    return api.getById(TABLE_NAME, id);
  },
  
  /**
   * Create a new partner
   */
  async create(data: {
    name: string;
    partnership_type: string;
    industry?: string;
    location?: string;
    description?: string;
    logo_url?: string;
    website_url?: string;
    contact_email?: string;
  }) {
    return api.create(TABLE_NAME, {
      ...data,
      status: 'active'
    });
  },
  
  /**
   * Update a partner
   */
  async update(id: string, data: Record<string, any>) {
    return api.update(TABLE_NAME, id, data);
  },
  
  /**
   * Delete a partner
   */
  async delete(id: string) {
    return api.delete(TABLE_NAME, id);
  }
};
