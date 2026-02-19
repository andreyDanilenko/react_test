import React from 'react';
import { Checkbox } from '@/shared/ui';
import type { DataTableColumn, DataTableProps, SortOrder } from './types';
import { isProductColumn } from './types';
import './DataTable.css';

const SortIcon: React.FC<{
  order: SortOrder | null;
  columnId: string;
  current: string | null;
}> = ({ order, columnId, current }) => {
  if (current !== columnId) {
    return (
      <span className="DataTable__SortIcon DataTable__SortIcon--none" aria-hidden>
        ↕
      </span>
    );
  }
  return (
    <span className="DataTable__SortIcon" aria-label={order === 'asc' ? 'по возрастанию' : 'по убыванию'}>
      {order === 'asc' ? '↑' : '↓'}
    </span>
  );
};

export function DataTable<T>({
  title,
  data,
  columns,
  getRowId,
  loading = false,
  error = false,
  emptyMessage = 'Нет данных для отображения.',
  errorMessage = 'Ошибка загрузки данных.',
  headerActions,
  footer,
  selectable = false,
  selectedIds = new Set(),
  onSelect,
  onSelectAll,
  sortBy = null,
  sortOrder = 'asc',
  onSort,
  rowActions,
  className = '',
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && data.every((row) => selectedIds.has(getRowId(row)));
  const colCount = (selectable ? 1 : 0) + columns.length + (rowActions ? 1 : 0);

  return (
    <section className={`DataTable__Card ${className}`.trim()}>
      <header className="DataTable__Header">
        <h2 className="DataTable__Title">{title}</h2>
        {headerActions != null && <div className="DataTable__Actions">{headerActions}</div>}
      </header>

      {loading && (
        <div className="DataTable__ProgressWrap" role="status" aria-label="Загрузка">
          <div className="DataTable__ProgressBar" />
        </div>
      )}

      <div className="DataTable__ScrollWrap">
        <table className="DataTable__Table">
          <colgroup>
            {selectable && <col className="DataTable__ColCheckbox" />}
            {columns.map((col) => (
              <col key={col.id} className="DataTable__ColData" />
            ))}
            {rowActions && <col className="DataTable__ColActions" />}
          </colgroup>
          <thead>
            <tr>
              {selectable && (
                <th className="DataTable__Th DataTable__Th--checkbox">
                  <Checkbox
                    checked={allSelected}
                    onChange={onSelectAll ?? (() => {})}
                    aria-label="Выбрать все"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`DataTable__Th ${col.type === 'product' ? 'DataTable__Th--product' : ''}`}
                >
                  {col.sortable && onSort ? (
                    <button
                      type="button"
                      className="DataTable__ThSort"
                      onClick={() => onSort(col.id)}
                      aria-pressed={sortBy === col.id}
                    >
                      {col.label}
                      <SortIcon columnId={col.id} current={sortBy} order={sortBy === col.id ? sortOrder : null} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              {rowActions && <th className="DataTable__Th DataTable__Th--actions" />}
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={colCount} className="DataTable__Message" role="alert">
                  {errorMessage}
                </td>
              </tr>
            )}
            {!error && !loading && data.length === 0 && (
              <tr>
                <td colSpan={colCount} className="DataTable__Message">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {!error &&
              data.map((row) => (
                <DataTableRow
                  key={String(getRowId(row))}
                  row={row}
                  columns={columns}
                  selectable={selectable}
                  isSelected={selectedIds.has(getRowId(row))}
                  onSelect={onSelect ? () => onSelect(getRowId(row)) : undefined}
                  rowActions={rowActions}
                />
              ))}
          </tbody>
        </table>
      </div>

      {footer != null && <footer className="DataTable__Footer">{footer}</footer>}
    </section>
  );
}

function DataTableRow<T>({
  row,
  columns,
  selectable,
  isSelected,
  onSelect,
  rowActions,
}: {
  row: T;
  columns: DataTableColumn<T>[];
  selectable: boolean;
  isSelected: boolean;
  onSelect?: () => void;
  rowActions?: (row: T) => React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (!onSelect) return;
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="checkbox"]')) return;
    onSelect();
  };

  return (
    <tr
      className={`DataTable__Row ${isSelected ? 'DataTable__Row--selected' : ''}`}
      onClick={handleClick}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={
        onSelect
          ? (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelect())
          : undefined
      }
      aria-selected={isSelected}
    >
      {selectable && (
        <td className="DataTable__Td DataTable__Td--checkbox">
          <Checkbox
            checked={isSelected}
            onChange={onSelect ?? (() => {})}
            aria-label={`Выбрать строку`}
          />
        </td>
      )}
      {columns.map((col) => {
        if (isProductColumn(col)) {
          const img = row[col.imageKey];
          const title = String(row[col.titleKey] ?? '');
          const subtitle = String(row[col.subtitleKey] ?? '');
          return (
            <td key={col.id} className="DataTable__Td DataTable__Td--product">
              <div className="DataTable__ProductCell">
                <div className="DataTable__ProductPhoto">
                  {img && typeof img === 'string' ? (
                    <img src={img} alt="" width={48} height={48} className="DataTable__ProductImg" />
                  ) : (
                    <span>IMG</span>
                  )}
                </div>
                <div className="DataTable__ProductInfo">
                  <span className="DataTable__ProductName" title={title}>
                    {title}
                  </span>
                  <span className="DataTable__ProductCategory">{subtitle}</span>
                </div>
              </div>
            </td>
          );
        }
        const dataCol = col as { getValue: (row: T) => unknown; render?: (value: unknown, row: T) => React.ReactNode; cellClassName?: string };
        const value = dataCol.getValue(row);
        const content = dataCol.render ? dataCol.render(value, row) : String(value ?? '');
        const cellClass = dataCol.cellClassName ?? '';
        return (
          <td
            key={col.id}
            className={`DataTable__Td ${col.align === 'left' ? 'DataTable__Td--product' : ''} ${cellClass}`.trim()}
          >
            {content}
          </td>
        );
      })}
      {rowActions && (
        <td className="DataTable__Td DataTable__Td--actions">
          <div className="DataTable__RowActions">{rowActions(row)}</div>
        </td>
      )}
    </tr>
  );
}
