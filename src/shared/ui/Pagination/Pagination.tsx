import React from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@/shared/ui/icon';
import type { PaginationProps } from './Pagination.types'
import './Pagination.css';


const MAX_VISIBLE_PAGES = 5;

function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [];
  const left = Math.max(1, currentPage - 1);
  const right = Math.min(totalPages, currentPage + 1);
  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push('ellipsis');
  }
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages) {
    if (right < totalPages - 1) pages.push('ellipsis');
    pages.push(totalPages);
  }
  return pages;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
  className = '',
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.max(1, Math.min(currentPage, totalPages));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className={`Pagination ${className}`.trim()}>
      <span className="Pagination__ResultsInfo">
        Показано <span className="Pagination__ResultsInfoNum">{start}</span>–<span className="Pagination__ResultsInfoNum">{end}</span> из <span className="Pagination__ResultsInfoNum">{total}</span>
      </span>
      <nav className="Pagination__Nav" aria-label="Пагинация">
        <button
          type="button"
          className="Pagination__Btn"
          aria-label="Предыдущая страница"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <CaretLeftIcon size={14} />
        </button>
        <div className="Pagination__Numbers">
          {pages.map((p, i) =>
            p === 'ellipsis' ? (
              <span key={`e-${i}`} className="Pagination__Ellipsis" aria-hidden>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className={`Pagination__Page ${p === page ? 'Pagination__Page--active' : ''}`}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          className="Pagination__Btn"
          aria-label="Следующая страница"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <CaretRightIcon size={14} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
