import React from 'react';
import { BaseInput } from '@/shared/ui';
import SearchIcon from '@/shared/ui/icon/SearchIcon';
import { useAuth, useAuthMeQuery } from '@/features/auth/hooks';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  // TODO: for test refresh session
  const { data: meUser, isLoading: meLoading, isError: meError } = useAuthMeQuery();
  const displayUser = meUser ?? user;

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
          {meLoading && 'Загрузка профиля (запрос /me для проверки refresh)…'}
          {meError && 'Ошибка загрузки профиля'}
          {!meLoading && !meError && displayUser &&
            `${displayUser.firstName} ${displayUser.lastName}, вы успешно вошли`}
          {!meLoading && !meError && !displayUser && 'Вы успешно вошли в аккаунт'}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
