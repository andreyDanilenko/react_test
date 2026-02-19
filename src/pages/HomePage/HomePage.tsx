import React from 'react';
import { BaseInput } from '@/shared/ui';
import SearchIcon from '@/shared/ui/icon/SearchIcon';
import { useAuth, useAuthMeQuery } from '@/features/auth/hooks';
import { useAppToast } from '@/shared/lib/hooks/useAppToast';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  // TODO: for test refresh session
  const { data: meUser, isLoading: meLoading, isError: meError } = useAuthMeQuery();
  const displayUser = meUser ?? user;


  const toast = useAppToast();

  const handleSuccess = () => {
    toast.success('Товар успешно добавлен в корзину!', {
      title: 'Успешно',
      duration: 3000,
    });
  };

  const handleError = () => {
    toast.error('Не удалось оформить заказ', {
      title: 'Ошибка',
    });
  };

  const handleInfo = () => {
    toast.info('Скоро закончится акция', {
      title: 'Внимание',
    });
  };

  const handleWarning = () => {
    toast.warning('Заполните обязательные поля', {
      title: 'Предупреждение',
    });
  };

  const handlePromise = async () => {
    const fetchData = new Promise((resolve) => 
      setTimeout(() => resolve('Данные загружены'), 2000)
    );

    await toast.promise(
      fetchData,
      {
        loading: 'Загрузка товаров...',
        success: 'Товары загружены',
        error: 'Ошибка загрузки',
      }
    );
  };

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

      <div className="flex gap-4 p-4">
      <button 
        onClick={handleSuccess}
        className="px-4 py-2 rounded-lg"
        style={{ backgroundColor: '#10b981', color: 'white' }}
      >
        Success
      </button>
      <button 
        onClick={handleError}
        className="px-4 py-2 rounded-lg"
        style={{ backgroundColor: '#ef4444', color: 'white' }}
      >
        Error
      </button>
      <button 
        onClick={handleInfo}
        className="px-4 py-2 rounded-lg"
        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
      >
        Info
      </button>
      <button 
        onClick={handleWarning}
        className="px-4 py-2 rounded-lg"
        style={{ backgroundColor: '#f59e0b', color: 'white' }}
      >
        Warning
      </button>
      <button 
        onClick={handlePromise}
        className="px-4 py-2 rounded-lg"
        style={{ backgroundColor: '#6c5ce7', color: 'white' }}
      >
        Promise
      </button>
    </div>
    </div>
  );
};

export default HomePage;
