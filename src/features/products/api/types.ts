import type { Product } from '@/entities/product';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductBody {
  title: string;
  price: number;
  brand: string;
  article?: string;
}
