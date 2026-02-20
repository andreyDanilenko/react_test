import React, { useState } from 'react';
import { ProductsNavbarWidget, ProductsTableWidget } from '@/widgets';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
    
  return (
    <div className="HomePage">
      <ProductsNavbarWidget
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="HomePage__TableWrap">
        <ProductsTableWidget searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default HomePage;
