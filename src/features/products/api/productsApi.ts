import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductsResponse } from '@/shared/api/productsTypes';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { skip?: number; limit?: number } | void
    >({
      query: (params) => {
        if (params && (params.skip !== undefined || params.limit !== undefined)) {
          const searchParams = new URLSearchParams();
          if (params.skip !== undefined) searchParams.set('skip', String(params.skip));
          if (params.limit !== undefined) searchParams.set('limit', String(params.limit));
          return { url: `products?${searchParams}` };
        }
        return { url: 'products' };
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
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
