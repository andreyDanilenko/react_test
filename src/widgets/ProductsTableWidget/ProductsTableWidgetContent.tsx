import { useCallback } from 'react';
import { DataTable, Pagination } from '@/shared/ui';
import type { Product } from '@/entities/product';
import { productColumns } from './config/columns';
import { useProductsTableState } from './hooks/useProductsTableState';
import { useProductsQuery } from './hooks/useProductsQuery';
import { ProductsTableHeaderActions } from './components/ProductsTableHeaderActions';
import { ProductsTableRowActions } from './components/ProductsTableRowActions';
import { ProductsTableOverlay } from './components/ProductsTableOverlay';
import { PAGE_SIZE } from './config/constants';

interface Props {
  searchQuery: string;
}

export function ProductsTableWidgetContent({ searchQuery }: Props) {
  const {
    page,
    setPage,
    sortBy,
    sortOrder,
    selectedIds,
    handleSort,
    handleRowSelect,
    handleSelectAll,
  } = useProductsTableState();

  const {
    products,
    total,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useProductsQuery({
    page,
    searchQuery,
    sortBy,
    sortOrder,
  });

  const onSelectAll = useCallback(
    () => handleSelectAll(products),
    [handleSelectAll, products]
  );

  const rowActions = useCallback(
    (product: Product) => <ProductsTableRowActions product={product} />,
    []
  );

  return (
    <div className="ProductsTableWidget__Wrap">
      <ProductsTableOverlay visible={isFetching} />

      <DataTable<Product>
        title="Все позиции"
        data={products}
        columns={productColumns}
        getRowId={(row) => row.id}
        loading={isLoading}
        error={isError}
        emptyMessage="Нет товаров для отображения."
        errorMessage="Ошибка загрузки товаров. Попробуйте обновить страницу."
        headerActions={
          <ProductsTableHeaderActions
            onRefresh={refetch}
            isFetching={isFetching}
          />
        }
        footer={
          <Pagination
            total={total}
            pageSize={PAGE_SIZE}
            currentPage={page}
            onPageChange={setPage}
          />
        }
        selectable
        selectedIds={selectedIds}
        onSelect={handleRowSelect}
        onSelectAll={onSelectAll}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        rowActions={rowActions}
      />
    </div>
  );
}
