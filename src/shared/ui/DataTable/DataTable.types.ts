import type { ReactNode } from 'react';

export type SortOrder = 'asc' | 'desc';

export interface DataTableColumnBase {
  id: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center';
}

export interface DataTableColumnProduct<T> extends DataTableColumnBase {
  type: 'product';
  imageKey: keyof T;
  titleKey: keyof T;
  subtitleKey: keyof T;
}

export interface DataTableColumnData<T> extends DataTableColumnBase {
  type?: 'data';
  getValue: (row: T) => unknown;
  render?: (value: unknown, row: T) => ReactNode;
  cellClassName?: string;
}

export type DataTableColumn<T> = DataTableColumnProduct<T> | DataTableColumnData<T>;

export interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string | number;
  loading?: boolean;
  error?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  selectable?: boolean;
  selectedIds?: Set<string | number>;
  onSelect?: (id: string | number) => void;
  onSelectAll?: () => void;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  onSort?: (columnId: string) => void;
  rowActions?: (row: T) => ReactNode;
  className?: string;
}
