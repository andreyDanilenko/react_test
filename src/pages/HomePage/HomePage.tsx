import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '@/shared/ui';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <div className="HomePage__Card">
        <h1 className="HomePage__Title">Главная</h1>
        <p className="HomePage__Subtitle">Вы успешно вошли в аккаунт</p>
        <BaseButton
          variant="ghost"
          className="HomePage__Logout"
          onClick={() => navigate('/')}
        >
          Выйти
        </BaseButton>
      </div>
    </div>
  );
};

export default HomePage;
