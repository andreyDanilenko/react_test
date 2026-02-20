import React, { useState } from 'react';
import { AddProductModal } from '@/features/products';
import { ProductsNavbarWidget, ProductsTableWidget } from '@/widgets';
import { useModal } from '@/shared/lib/modal';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { openModal } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [tablePage, setTablePage] = useState(1);

  // const debouncedSearch = useDebounce(searchQuery, 500);


  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setTablePage(1);
  };

  const handleOpenAddProduct = () => {
    openModal({
      component: AddProductModal,
      options: {
        size: 'md',
        closeOnOverlayClick: false,
      },
    });
  };

  return (
    <div className="HomePage">
      <ProductsNavbarWidget
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="HomePage__TableWrap">
        <ProductsTableWidget
          searchQuery={searchQuery}
          page={tablePage}
          onPageChange={setTablePage}
          onAddProduct={handleOpenAddProduct}
        />
      </div>
    </div>
  );
};

export default HomePage;
