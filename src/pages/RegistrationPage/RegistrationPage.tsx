import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogoBadge,
  InputGroup,
  BaseButton,
  UserIcon,
  LockIcon,
  EyeIcon,
} from '@/shared/ui';
import { authApi } from '@/shared/api';
import './RegistrationPage.css';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setLoading(true);
    try {
      await authApi.login({
        username: username.trim(),
        password,
        expiresInMins: 30,
      });
      navigate('/home');
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message ?? 'Ошибка входа'
          : 'Ошибка входа'
      );
    } finally {
      setLoading(false);
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
            <h1 className="RegistrationPage__Title">Регистрация</h1>
            <p className="RegistrationPage__Subtitle">Создайте новый аккаунт</p>
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
              {loading ? 'Вход…' : 'Зарегистрироваться'}
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
