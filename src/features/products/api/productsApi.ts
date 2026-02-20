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
      query: (params) => ({
        url: 'products/search',
        params: { ...params, q: params?.q?.trim() || '' },
      }),
      providesTags: () => [{ type: 'Products', id: 'LIST' }],
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
