
import { api } from './core';

const TABLE_NAME = 'esg_metrics';

/**
 * ESG Metrics API with CRUD operations
 */
export const esgMetricsApi = {
  /**
   * Get all ESG metrics
   */
  async getAll(options?: {
    userId?: string,
    metric_type?: string,
    limit?: number,
    page?: number,
    pageSize?: number
  }) {
    const filters: Record<string, any> = {};
    if (options?.userId) filters.user_id = options.userId;
    if (options?.metric_type) filters.metric_type = options.metric_type;
    
    return api.fetch(TABLE_NAME, {
      filters,
      limit: options?.limit,
      page: options?.page,
      pageSize: options?.pageSize,
      order: { column: 'timestamp', ascending: false }
    });
  },
  
  /**
   * Get an ESG metric by ID
   */
  async getById(id: string) {
    return api.getById(TABLE_NAME, id);
  },
  
  /**
   * Create a new ESG metric
   */
  async create(data: {
    user_id: string;
    metric_name: string;
    metric_type: string;
    metric_value: number;
    unit: string;
    source?: string;
  }) {
    return api.create(TABLE_NAME, data);
  },
  
  /**
   * Update an ESG metric
   */
  async update(id: string, data: Record<string, any>) {
    return api.update(TABLE_NAME, id, data);
  },
  
  /**
   * Delete an ESG metric
   */
  async delete(id: string) {
    return api.delete(TABLE_NAME, id);
  },
  
  /**
   * Get metrics by type
   */
  async getByType(metricType: string, userId?: string) {
    const filters: Record<string, any> = { metric_type: metricType };
    if (userId) filters.user_id = userId;
    
    return api.fetch(TABLE_NAME, {
      filters,
      order: { column: 'timestamp', ascending: false }
    });
  }
};
