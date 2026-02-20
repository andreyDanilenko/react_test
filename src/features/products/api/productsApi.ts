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
        const searchParams = new URLSearchParams();
        if (params?.limit !== undefined) searchParams.set('limit', String(params.limit));
        if (params?.skip !== undefined) searchParams.set('skip', String(params.skip));
        if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
        if (params?.order === 'asc' || params?.order === 'desc') searchParams.set('order', params.order);

        const q = params?.q?.trim();
        if (q) {
          searchParams.set('q', q);
          return { url: `products/search?${searchParams.toString()}` };
        }
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
