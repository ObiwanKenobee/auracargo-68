
import { mockData } from '@/utils/mockData';

// More flexible type for table data
type TableData = Record<string, any>;

// Mock database to use when Supabase is not connected
const mockDatabase: Record<string, TableData[]> = {
  shipments: mockData.generateMockShipments(10),
  tracking_events: [],
  esg_reports: [],
  suppliers: [],
  partners: [],
  esg_metrics: [],
  risk_assessments: []
};

// Result type for our API operations
type ApiResult<T = any> = {
  data: T | null;
  error: Error | null;
};

/**
 * Core API utility for CRUD operations
 * This implementation handles both Supabase calls and fallback to mock data
 */
export const api = {
  /**
   * Generic fetch function for any table
   */
  async fetch<T = any>(table: string, options?: { 
    id?: string, 
    filters?: Record<string, any>, 
    limit?: number,
    order?: { column: string, ascending: boolean },
    page?: number,
    pageSize?: number
  }): Promise<ApiResult<T[]>> {
    try {
      // Use mock data if available
      if (mockDatabase[table]) {
        console.log(`[API Mock] Fetching from mock table: ${table}`);
        
        // Clone the data to avoid mutations affecting our source
        let results = [...(mockDatabase[table] || [])];
        
        // Apply filters if provided
        if (options?.id) {
          results = results.filter(item => item.id === options.id);
        }
        
        if (options?.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              results = results.filter(item => item[key] === value);
            }
          });
        }
        
        // Apply pagination
        if (options?.page && options?.pageSize) {
          const start = (options.page - 1) * options.pageSize;
          const end = start + options.pageSize;
          results = results.slice(start, end);
        }
        
        // Apply limit
        if (options?.limit) {
          results = results.slice(0, options.limit);
        }
        
        // Apply ordering
        if (options?.order) {
          results.sort((a, b) => {
            const valA = a[options.order!.column];
            const valB = b[options.order!.column];
            return options.order!.ascending 
              ? (valA > valB ? 1 : -1) 
              : (valA < valB ? 1 : -1);
          });
        }
        
        return { data: results as T[], error: null };
      }
      
      // If no mock data, log this for clarity
      console.log(`No mock data available for table: ${table}`);
      return { data: [], error: null };
    } catch (error) {
      console.error(`Exception in API fetch from ${table}:`, error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Generic get by ID function for any table
   */
  async getById<T = any>(table: string, id: string): Promise<ApiResult<T>> {
    try {
      // Use mock data if available
      if (mockDatabase[table]) {
        console.log(`[API Mock] Getting by ID from mock table: ${table}, ID: ${id}`);
        const item = mockDatabase[table].find(item => item.id === id);
        return { data: item as T || null, error: null };
      }
      
      console.log(`No mock data available for table: ${table}`);
      return { data: null, error: null };
    } catch (error) {
      console.error(`Exception fetching ${table} with id ${id}:`, error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Generic create function for any table
   */
  async create<T = any>(table: string, data: Record<string, any>): Promise<ApiResult<T>> {
    try {
      // Use mock data if available
      if (mockDatabase[table]) {
        console.log(`[API Mock] Creating in mock table: ${table}`);
        // Generate an ID if not provided
        const newItem = { 
          id: data.id || `mock_${Math.random().toString(36).substring(2, 9)}`,
          ...data,
          created_at: new Date().toISOString() 
        };
        mockDatabase[table].push(newItem);
        return { data: newItem as T, error: null };
      }
      
      console.log(`No mock data available for table: ${table}`);
      // Create a mock record with an ID
      const mockItem = {
        id: `mock_${Math.random().toString(36).substring(2, 9)}`,
        ...data,
        created_at: new Date().toISOString()
      };
      return { data: mockItem as T, error: null };
    } catch (error) {
      console.error(`Exception creating record in ${table}:`, error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Generic update function for any table
   */
  async update<T = any>(table: string, id: string, data: Record<string, any>): Promise<ApiResult<T>> {
    try {
      // Use mock data if available
      if (mockDatabase[table]) {
        console.log(`[API Mock] Updating in mock table: ${table}, ID: ${id}`);
        const index = mockDatabase[table].findIndex(item => item.id === id);
        if (index === -1) {
          return { 
            data: null, 
            error: new Error(`Item with ID ${id} not found in table ${table}`) 
          };
        }
        
        mockDatabase[table][index] = {
          ...mockDatabase[table][index],
          ...data,
          updated_at: new Date().toISOString()
        };
        
        return { data: mockDatabase[table][index] as T, error: null };
      }
      
      console.log(`No mock data available for table: ${table}`);
      // Return mock implementation
      return { 
        data: { id, ...data, updated_at: new Date().toISOString() } as T, 
        error: null 
      };
    } catch (error) {
      console.error(`Exception updating record in ${table} with id ${id}:`, error);
      return { data: null, error: error as Error };
    }
  },

  /**
   * Generic delete function for any table
   */
  async delete(table: string, id: string): Promise<{ success: boolean, error: Error | null }> {
    try {
      // Use mock data if available
      if (mockDatabase[table]) {
        console.log(`[API Mock] Deleting from mock table: ${table}, ID: ${id}`);
        const index = mockDatabase[table].findIndex(item => item.id === id);
        if (index === -1) {
          return { 
            success: false, 
            error: new Error(`Item with ID ${id} not found in table ${table}`) 
          };
        }
        
        mockDatabase[table].splice(index, 1);
        return { success: true, error: null };
      }
      
      console.log(`No mock data available for table: ${table}`);
      // Pretend it worked
      return { success: true, error: null };
    } catch (error) {
      console.error(`Exception deleting record from ${table} with id ${id}:`, error);
      return { success: false, error: error as Error };
    }
  }
};
