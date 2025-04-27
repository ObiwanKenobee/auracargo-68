
import { api } from './core';

const TABLE_NAME = 'esg_reports';

/**
 * ESG Reports API with CRUD operations
 */
export const esgReportsApi = {
  /**
   * Get all ESG reports
   */
  async getAll(options?: {
    userId?: string,
    report_type?: string,
    status?: string,
    limit?: number,
    page?: number,
    pageSize?: number
  }) {
    const filters: Record<string, any> = {};
    if (options?.userId) filters.user_id = options.userId;
    if (options?.report_type) filters.report_type = options.report_type;
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
   * Get an ESG report by ID
   */
  async getById(id: string) {
    return api.getById(TABLE_NAME, id);
  },
  
  /**
   * Create a new ESG report
   */
  async create(data: {
    user_id: string;
    title: string;
    report_type: string;
    content: any;
    reporting_period?: string;
  }) {
    return api.create(TABLE_NAME, {
      ...data,
      status: 'draft'
    });
  },
  
  /**
   * Update an ESG report
   */
  async update(id: string, data: Record<string, any>) {
    return api.update(TABLE_NAME, id, data);
  },
  
  /**
   * Delete an ESG report
   */
  async delete(id: string) {
    return api.delete(TABLE_NAME, id);
  },
  
  /**
   * Publish an ESG report
   */
  async publish(id: string) {
    return api.update(TABLE_NAME, id, {
      status: 'published',
      published_at: new Date().toISOString()
    });
  }
};
