import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogoBadge,
  InputGroup,
  BaseButton,
  UserIcon,
  LockIcon,
  EyeIcon,
  CloseIcon,
} from '@/shared/ui';
import { useLoginMutation } from '@/features/auth';
import { ROUTES } from '@/app/router/routes';
import './RegistrationPage.css';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }
    try {
      await loginMutation.mutateAsync({
        username: username.trim(),
        password,
        expiresInMins: 30,
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message ?? 'Ошибка входа'
          : 'Ошибка входа'
      );
    }
  };

  return (
    <div className="RegistrationPage">
      <div className="RegistrationPage__Card">
        <div className="RegistrationPage__Inner">
          <div className="RegistrationPage__Logo">
            <LogoBadge />
          </div>

          <header className="RegistrationPage__Header">
            <h1 className="RegistrationPage__Title">Добро пожаловать!</h1>
            <p className="RegistrationPage__Subtitle">Пожалуйста, авторизируйтесь</p>
          </header>

          <form className="RegistrationPage__Form" onSubmit={handleSubmit}>
            {error && <p className="RegistrationPage__Error">{error}</p>}
            <InputGroup
              label="Логин"
              name="login"
              type="text"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<UserIcon size={24} />}
              rightIcon={username ? <CloseIcon size={17} /> : undefined}
              onRightIconClick={() => setUsername('')}
            />
            <InputGroup
              label="Пароль"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<LockIcon size={24} />}
              rightIcon={<EyeIcon size={24} isHidden={!showPassword} />}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            <BaseButton
              variant="primary"
              hasBorder
              className="RegistrationPage__Submit"
            >
              {loginMutation.isPending ? 'Вход…' : 'Войти'}
            </BaseButton>

            <div className="RegistrationPage__Divider" role="presentation">
              <div className="RegistrationPage__DividerLine" />
              <span className="RegistrationPage__DividerText">или</span>
              <div className="RegistrationPage__DividerLine" />
            </div>

            <p className="RegistrationPage__Footer">
              <a href="#">
                Уже есть аккаунт? <span>Войти</span>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
