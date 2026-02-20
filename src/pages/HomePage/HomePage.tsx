import React, { useState } from 'react';
import { ProductsNavbarWidget, ProductsTableWidget } from '@/widgets';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('23');
    
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
