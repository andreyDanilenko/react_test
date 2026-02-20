import { ProductsTableWidgetContent } from './ProductsTableWidgetContent';
import './ProductsTableWidget.css';

export interface ProductsTableWidgetProps {
  searchQuery?: string;
}

export function ProductsTableWidget({ searchQuery = '' }: ProductsTableWidgetProps) {
  return (
    <ProductsTableWidgetContent key={searchQuery} searchQuery={searchQuery} />
  );
}
