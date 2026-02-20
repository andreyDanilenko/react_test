export interface PaginationProps {
    total: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    className?: string;
  }
  