import { useState } from 'react';
import type { Product } from '@/entities/product';
import { useGetProductsQuery } from '@/features/products/api/productsApi';
import { DataTable } from '@/shared/ui/DataTable';
import type { DataTableColumn } from '@/shared/ui/DataTable';
import { BaseButton, Pagination } from '@/shared/ui';
import { DotsCircleIcon, PlusIcon, RefreshIcon } from '@/shared/ui/icon';
import { formatPriceParts } from '@/shared/lib';
import './ProductsTableWidget.css';

const PAGE_SIZE = 10;
const RATING_LOW_THRESHOLD = 3;

const productColumns: DataTableColumn<Product>[] = [
  {
    type: 'product',
    id: 'title',
    label: 'Наименование',
    sortable: true,
    imageKey: 'thumbnail',
    titleKey: 'title',
    subtitleKey: 'category',
  },
  {
    id: 'brand',
    label: 'Вендор',
    sortable: true,
    getValue: (row) => row.brand,
    cellClassName: 'DataTable__Td--vendor',
  },
  {
    id: 'id',
    label: 'Артикул',
    getValue: (row) => row.id,
  },
  {
    id: 'rating',
    label: 'Оценка',
    sortable: true,
    getValue: (row) => row.rating,
    cellClassName: 'DataTable__Td--rating',
    render: (_, row) => {
      const isLow = row.rating < RATING_LOW_THRESHOLD;
      return (
        <>
          <span className={isLow ? 'DataTable__RatingValue--low' : ''}>{row.rating.toFixed(1)}</span>/5
        </>
      );
    },
  },
  {
    id: 'price',
    label: 'Цена, ₽',
    sortable: true,
    getValue: (row) => row.price,
    cellClassName: 'DataTable__Td--price',
    render: (_, row) => {
      const { int, dec } = formatPriceParts(row.price);
      return (
        <>
          {int}
          <span className="DataTable__PriceDec">{dec}</span>
        </>
      );
    },
  },
];

export interface ProductsTableWidgetProps {
  searchQuery?: string;
  page?: number;
  onPageChange?: (page: number) => void;
  onAddProduct?: () => void;
}

export function ProductsTableWidget({
  searchQuery = '',
  page: controlledPage,
  onPageChange,
  onAddProduct,
}: ProductsTableWidgetProps) {
  const [internalPage, setInternalPage] = useState(1);
  const page = controlledPage ?? internalPage;
  const setPage = onPageChange ?? setInternalPage;

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data, isLoading, isError, isFetching, refetch } = useGetProductsQuery({
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    ...(searchQuery.trim() && { q: searchQuery.trim() }),
    ...(sortBy && { sortBy, order: sortOrder }),
  });

  const products = data?.products ?? [];

  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(columnId);
      setSortOrder('asc');
    }
  };

  const handleRowSelect = (id: string | number) => {
    const numId = typeof id === 'string' ? Number(id) : id;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(numId)) next.delete(numId);
      else next.add(numId);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (!products.length) return;
    const allSelected = products.every((p) => selectedIds.has(p.id));
    setSelectedIds(allSelected ? new Set() : new Set(products.map((p) => p.id)));
  };

  const headerActions = (
    <>
      <BaseButton
        variant="icon-transparent"
        size="md"
        className="DataTable__BtnRefresh"
        icon={<RefreshIcon size={22} />}
        onClick={() => refetch()}
        disabled={isFetching}
        aria-label="Обновить"
      />
      <BaseButton
        variant="primary"
        size="md"
        className="DataTable__BtnAdd"
        icon={<PlusIcon size={22} />}
        onClick={onAddProduct}
        aria-label="Добавить товар"
      >
        <span className="DataTable__BtnAddText">Добавить</span>
      </BaseButton>
    </>
  );

  const footer = (
    <Pagination
      total={data?.total ?? 0}
      pageSize={PAGE_SIZE}
      currentPage={page}
      onPageChange={setPage}
    />
  );

  const rowActions = () => (
    <>
      <BaseButton
        variant="icon-only"
        size="md"
        className="DataTable__RowActionQuickAdd"
        icon={<PlusIcon size={20} />}
        aria-label="Быстрое добавление"
      />
      <BaseButton
        variant="icon-transparent"
        className="DataTable__RowActionMore"
        icon={<DotsCircleIcon size={26} />}
        aria-label="Ещё"
      />
    </>
  );

  return (
    <div className="ProductsTableWidget__Wrap">
      <div
        className={`ProductsTableWidget__Overlay ${isFetching ? 'ProductsTableWidget__Overlay--visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-label="Загрузка данных"
        aria-hidden={!isFetching}
      >
        <div className="ProductsTableWidget__Loader" />
      </div>
      <DataTable<Product>
      title="Все позиции"
      data={products}
      columns={productColumns}
      getRowId={(row) => row.id}
      loading={isLoading}
      error={isError}
      emptyMessage="Нет товаров для отображения."
      errorMessage="Ошибка загрузки товаров. Попробуйте обновить страницу."
      headerActions={headerActions}
      footer={footer}
      selectable
      selectedIds={selectedIds}
      onSelect={handleRowSelect}
      onSelectAll={handleSelectAll}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSort={handleSort}
      rowActions={rowActions}
    />
    </div>
  );
}
