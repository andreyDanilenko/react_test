import { DebouncedSearch } from '@/shared/ui';
import { SearchIcon } from '@/shared/ui/icon';
import type { ProductsNavbarWidgetProps } from './ProductsNavbarWidget.types';
import './ProductsNavbarWidget.css';

export function ProductsNavbarWidget({
  searchQuery,
  onSearchChange,
  title = 'Товары',
}: ProductsNavbarWidgetProps) {
  return (
    <nav className="ProductsNavbarWidget" aria-label="Навигация товаров">
      <div className="ProductsNavbarWidget__Logo">
        <span className="ProductsNavbarWidget__Title">{title}</span>
      </div>
      <div className="ProductsNavbarWidget__Menu">
        <div className="ProductsNavbarWidget__SearchWrap">
          <DebouncedSearch
            variant="filled"
            placeholder="Поиск товаров, категорий..."
            icon={<SearchIcon />}
            aria-label="Поиск"
            initialValue={searchQuery}
            onDebouncedChange={onSearchChange}
            delay={500}
          />
        </div>
      </div>
    </nav>
  );
}
