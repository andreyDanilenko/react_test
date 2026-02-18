import React from 'react';
import { BaseInput } from '@/shared/ui';
import SearchIcon from '@/shared/ui/icon/SearchIcon';
import { useAuth } from '@/features/auth';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="HomePage">
      <nav className="HomePage__Navbar">
        <div className="HomePage__NavbarLogo">
          <span className="HomePage__NavbarTitle">Товары</span>
        </div>

        <div className="HomePage__NavbarMenu">
          <div className="HomePage__SearchWrap">
            <BaseInput
              variant="filled"
              placeholder="Поиск товаров, категорий..."
              icon={<SearchIcon />}
              aria-label="Поиск"
            />
          </div>
        </div>
      </nav>

      <div className="HomePage__Card">
        <h1 className="HomePage__Title">Главная</h1>
        <p className="HomePage__Subtitle">
          {user ? `${user.firstName} ${user.lastName}, вы успешно вошли` : 'Вы успешно вошли в аккаунт'}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
