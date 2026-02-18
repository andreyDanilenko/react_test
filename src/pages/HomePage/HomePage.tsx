import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '@/shared/ui';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/app/router/routes';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ROOT);
  };

  return (
    <div className="HomePage">
      <div className="HomePage__Card">
        <h1 className="HomePage__Title">Главная</h1>
        <p className="HomePage__Subtitle">
          {user ? `${user.firstName} ${user.lastName}, вы успешно вошли` : 'Вы успешно вошли в аккаунт'}
        </p>
        <BaseButton
          variant="ghost"
          className="HomePage__Logout"
          onClick={handleLogout}
        >
          Выйти
        </BaseButton>
      </div>
    </div>
  );
};

export default HomePage;
