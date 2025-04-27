
import { api } from './core';

const TABLE_NAME = 'risk_assessments';

/**
 * Risk Assessments API with CRUD operations
 */
export const riskAssessmentsApi = {
  /**
   * Get all risk assessments
   */
  async getAll(options?: {
    userId?: string,
    risk_level?: string,
    category?: string,
    limit?: number,
    page?: number,
    pageSize?: number
  }) {
    const filters: Record<string, any> = {};
    if (options?.userId) filters.user_id = options.userId;
    if (options?.risk_level) filters.risk_level = options.risk_level;
    if (options?.category) filters.category = options.category;
    
    return api.fetch(TABLE_NAME, {
      filters,
      limit: options?.limit,
      page: options?.page,
      pageSize: options?.pageSize,
      order: { column: 'created_at', ascending: false }
    });
  },
  
  /**
   * Get a risk assessment by ID
   */
  async getById(id: string) {
    return api.getById(TABLE_NAME, id);
  },
  
  /**
   * Create a new risk assessment
   */
  async create(data: {
    user_id: string;
    title: string;
    description?: string;
    impact_score: number;
    probability_score: number;
    risk_level: string;
    category: string;
    mitigation_plan?: string;
    due_date?: string;
  }) {
    return api.create(TABLE_NAME, {
      ...data,
      status: 'active'
    });
  },
  
  /**
   * Update a risk assessment
   */
  async update(id: string, data: Record<string, any>) {
    return api.update(TABLE_NAME, id, data);
  },
  
  /**
   * Delete a risk assessment
   */
  async delete(id: string) {
    return api.delete(TABLE_NAME, id);
  }
};
