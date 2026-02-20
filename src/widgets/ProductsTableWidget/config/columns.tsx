import type { DataTableColumn } from '@/shared/ui';
import type { Product } from '@/entities/product';
import { ProductRatingCell } from '../cells/ProductRatingCell';
import { ProductPriceCell } from '../cells/ProductPriceCell';

export const productColumns: DataTableColumn<Product>[] = [
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
    render: (_, row) => <ProductRatingCell rating={row.rating} />,
  },
  {
    id: 'price',
    label: 'Цена, ₽',
    sortable: true,
    getValue: (row) => row.price,
    cellClassName: 'DataTable__Td--price',
    render: (_, row) => <ProductPriceCell price={row.price} />,
  },
];
