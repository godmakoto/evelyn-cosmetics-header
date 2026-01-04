import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Logging para debugging en producción
console.log('Supabase URL exists:', !!supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
  throw new Error('Missing Supabase environment variables. Check Vercel environment variables configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la base de datos
export interface Product {
  id: string;
  product_id: string;
  title: string;
  offer_price: number | null;
  regular_price: number;
  description: string | null;
  images: string[];

  // Estados del producto
  is_featured: boolean;
  is_back_in_stock: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;

  // Gestión de inventario
  stock: number;
  low_stock_threshold: number;
  in_stock: boolean;

  created_at: string;
  updated_at: string;
}

// Funciones helper para interactuar con la base de datos
export const productsAPI = {
  // Obtener todos los productos
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  // Obtener productos destacados
  async getFeatured() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('in_stock', true)
      .limit(10);

    if (error) throw error;
    return data as Product[];
  },

  // Obtener productos más vendidos
  async getBestSellers() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_best_seller', true)
      .eq('in_stock', true)
      .limit(10);

    if (error) throw error;
    return data as Product[];
  },

  // Obtener productos de vuelta en stock
  async getBackInStock() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_back_in_stock', true)
      .eq('in_stock', true)
      .limit(10);

    if (error) throw error;
    return data as Product[];
  },

  // Obtener productos en oferta
  async getOnSale() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_on_sale', true)
      .eq('in_stock', true)
      .limit(10);

    if (error) throw error;
    return data as Product[];
  },

  // Obtener producto por ID
  async getById(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('product_id', productId)
      .single();

    if (error) throw error;
    return data as Product;
  },

  // Buscar productos
  async search(query: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) throw error;
    return data as Product[];
  },

  // Obtener productos con filtros
  async getWithFilters(filters: {
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    featured?: boolean;
  }) {
    let query = supabase.from('products').select('*');

    if (filters.minPrice !== undefined) {
      query = query.gte('regular_price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('regular_price', filters.maxPrice);
    }
    if (filters.inStock !== undefined) {
      query = query.eq('in_stock', filters.inStock);
    }
    if (filters.featured !== undefined) {
      query = query.eq('is_featured', filters.featured);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Product[];
  }
};
