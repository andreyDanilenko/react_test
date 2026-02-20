import type { DataTableColumn, DataTableColumnProduct } from './DataTable.types';

export function isProductColumn<T>(col: DataTableColumn<T>): col is DataTableColumnProduct<T> {
    return col.type === 'product';
  }
  