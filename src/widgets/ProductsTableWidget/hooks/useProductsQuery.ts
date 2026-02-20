import { useGetProductsQuery } from '@/features/products/api/productsApi';
import { PAGE_SIZE } from '../config/constants';

interface Params {
  page: number;
  searchQuery: string;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
}

export function useProductsQuery({
  page,
  searchQuery,
  sortBy,
  sortOrder,
}: Params) {
  const query = {
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    ...(searchQuery.trim() && { q: searchQuery.trim() }),
    ...(sortBy && { sortBy, order: sortOrder }),
  };

  const { data, ...rest } = useGetProductsQuery(query);

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    ...rest,
  };
}
