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
import { getApiErrorMessage } from '@/shared/lib';
import './RegistrationPage.css';

const EXIT_TRANSITION_MS = 400;
const REQUIRED_MESSAGE = 'Обязательное поле';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loginMutation = useLoginMutation();

  const loginError = submitted && !username.trim() ? REQUIRED_MESSAGE : undefined;
  const passwordError = submitted && !password ? REQUIRED_MESSAGE : undefined;
  const hasValidationErrors = !username.trim() || !password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    setSubmitted(true);
    if (hasValidationErrors) return;
    try {
      await loginMutation.mutateAsync({
        username: username.trim(),
        password,
        expiresInMins: 30,
        rememberMe,
      });
      setIsExiting(true);
      setTimeout(() => navigate(ROUTES.HOME), EXIT_TRANSITION_MS);
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    }
  };

  return (
    <div className={`RegistrationPage ${isExiting ? 'RegistrationPage--exiting' : ''}`}>
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
            {apiError && <p className="RegistrationPage__Error" role="alert">{apiError}</p>}
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
              error={loginError}
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
              error={passwordError}
            />

            <label className="RegistrationPage__Remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="RegistrationPage__RememberCheckbox"
                aria-describedby="remember-hint"
              />
              <span className="RegistrationPage__RememberLabel">Запомнить меня</span>
            </label>

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
