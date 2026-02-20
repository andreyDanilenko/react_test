import { BaseInput } from '@/shared/ui';
import { SearchIcon } from '@/shared/ui/icon';
import './ProductsNavbarWidget.css';

export interface ProductsNavbarWidgetProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  title?: string;
}

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
          <BaseInput
            variant="filled"
            placeholder="Поиск товаров, категорий..."
            icon={<SearchIcon />}
            aria-label="Поиск"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}
