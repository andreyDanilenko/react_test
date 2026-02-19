import { useState } from 'react';
import type { Product } from '@/entities/product';
import { useGetProductsQuery } from '@/features/products/api/productsApi';
import { DataTable } from '@/shared/ui/DataTable';
import type { DataTableColumn } from '@/shared/ui/DataTable';
import { BaseButton, Pagination } from '@/shared/ui';
import { PlusIcon, RefreshIcon } from '@/shared/ui/icon';
import { formatPriceParts } from '@/shared/lib';

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
  onAddProduct?: () => void;
}

export function ProductsTableWidget({ onAddProduct }: ProductsTableWidgetProps) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    ...(sortBy && { sortBy, order: sortOrder }),
  });

  const products = data?.products ?? [];

  const handleSort = (columnId: string) => {
    setPage(1);
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
        disabled={isLoading}
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
        <span className="DataTable__BtnAddText">Add New Product</span>
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
      <button type="button" className="DataTable__BtnQuickAdd" aria-label="Быстрое добавление">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <button type="button" className="DataTable__BtnMore" aria-label="Ещё">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </button>
    </>
  );

  return (
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
  );
}
