import type { Product } from '@/entities/product';
import { baseApi } from '@/shared/api/baseApi';
import type { CreateProductBody, ProductsResponse } from './types';

export type GetProductsParams = {
  limit?: number;
  skip?: number;
  q?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
};

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams | void>({
      query: (params) => {
        const q = params?.q?.trim();
        if (q) {
          const searchParams = new URLSearchParams();
          searchParams.set('q', q);
          if (params?.limit !== undefined) searchParams.set('limit', String(params.limit));
          if (params?.skip !== undefined) searchParams.set('skip', String(params.skip));
          return { url: `products/search?${searchParams.toString()}` };
        }
        const searchParams = new URLSearchParams();
        if (params?.limit !== undefined) searchParams.set('limit', String(params.limit));
        if (params?.skip !== undefined) searchParams.set('skip', String(params.skip));
        const query = searchParams.toString();
        return { url: query ? `products?${query}` : 'products' };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map((p) => ({ type: 'Products' as const, id: p.id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => ({ url: `products/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<Product, CreateProductBody>({
      query: (body) => ({
        url: 'products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productsApi;
