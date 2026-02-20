import { useState, useCallback } from 'react';
import type { Product } from '@/entities/product';

export function useProductsTableState() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleSort = useCallback((columnId: string) => {
    if (sortBy === columnId) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(columnId);
      setSortOrder('asc');
    }
  }, [sortBy]);

  const handleRowSelect = useCallback((id: string | number) => {
    const numId = typeof id === 'string' ? Number(id) : id;

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(numId)) next.delete(numId);
      else next.add(numId);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback((products: Product[]) => {
    if (!products.length) return;

    setSelectedIds((prev) => {
      const allSelected = products.every((p) => prev.has(p.id));
      return allSelected
        ? new Set()
        : new Set(products.map((p) => p.id));
    });
  }, []);

  return {
    page,
    setPage,
    sortBy,
    sortOrder,
    selectedIds,
    handleSort,
    handleRowSelect,
    handleSelectAll,
  };
}
