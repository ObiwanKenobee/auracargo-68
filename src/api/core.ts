
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { PostgrestError } from '@supabase/supabase-js';

type TableNames = keyof Tables;

type TableData<T extends TableNames> = Tables[T]['Row'];

/**
 * Core API utility for CRUD operations
 */
export const api = {
  /**
   * Generic fetch function for any table
   * @param table - The table to fetch from
   * @param options - Query options
   */
  async fetch<T extends TableNames>(table: T, options?: { 
    id?: string, 
    filters?: Record<string, any>, 
    limit?: number,
    order?: { column: string, ascending: boolean },
    page?: number,
    pageSize?: number
  }) {
    try {
      // Using type assertion to handle the dynamic table name
      let query = supabase.from(table as string);
      
      // Apply filters
      if (options?.id) {
        query = query.eq('id', options.id);
      }
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });
      }
      
      // Apply pagination
      if (options?.page && options?.pageSize) {
        const start = (options.page - 1) * options.pageSize;
        const end = start + options.pageSize - 1;
        query = query.range(start, end);
      }
      
      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      // Apply ordering
      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending });
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error(`Error fetching from ${table}:`, error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error(`Exception fetching from ${table}:`, error);
      return { data: null, error };
    }
  },

  /**
   * Generic get by ID function for any table
   * @param table - The table to fetch from
   * @param id - The ID of the record to fetch
   */
  async getById<T extends TableNames>(table: T, id: string) {
    try {
      const { data, error } = await supabase
        .from(table as string)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching ${table} with id ${id}:`, error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error(`Exception fetching ${table} with id ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * Generic create function for any table
   * @param table - The table to insert into
   * @param data - The data to insert
   */
  async create<T extends TableNames>(table: T, data: Partial<TableData<T>>) {
    try {
      // Using type assertion to handle the dynamic table name
      const { data: result, error } = await supabase
        .from(table as string)
        .insert(data as any)
        .select();
      
      if (error) {
        console.error(`Error creating record in ${table}:`, error);
        return { data: null, error };
      }
      
      return { data: result, error: null };
    } catch (error) {
      console.error(`Exception creating record in ${table}:`, error);
      return { data: null, error };
    }
  },

  /**
   * Generic update function for any table
   * @param table - The table to update
   * @param id - The ID of the record to update
   * @param data - The data to update
   */
  async update<T extends TableNames>(table: T, id: string, data: Partial<TableData<T>>) {
    try {
      // Using type assertion to handle the dynamic table name
      const { data: result, error } = await supabase
        .from(table as string)
        .update(data as any)
        .eq('id', id)
        .select();
      
      if (error) {
        console.error(`Error updating record in ${table} with id ${id}:`, error);
        return { data: null, error };
      }
      
      return { data: result, error: null };
    } catch (error) {
      console.error(`Exception updating record in ${table} with id ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * Generic delete function for any table
   * @param table - The table to delete from
   * @param id - The ID of the record to delete
   */
  async delete<T extends TableNames>(table: T, id: string) {
    try {
      // Using type assertion to handle the dynamic table name
      const { error } = await supabase
        .from(table as string)
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting record from ${table} with id ${id}:`, error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error(`Exception deleting record from ${table} with id ${id}:`, error);
      return { success: false, error };
    }
  }
};
