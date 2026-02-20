import React from 'react';
import {
  LogoBadge,
  InputGroup,
  BaseButton,
  UserIcon,
  LockIcon,
  EyeIcon,
  CloseIcon,
} from '@/shared/ui';
import { useLoginFlow } from '@/features/auth/hooks';
import { useToggle } from '@/shared/lib';
import './RegistrationPage.css';

const RegistrationPage: React.FC = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const {
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    validationErrors,
    handleSubmit,
    apiError,
    isExiting,
    isPending,
  } = useLoginFlow();

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
            {apiError && (
              <p className="RegistrationPage__Error" role="alert">
                {apiError}
              </p>
            )}
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
              error={validationErrors.loginError}
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
              onRightIconClick={toggleShowPassword}
              error={validationErrors.passwordError}
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
              type="submit"
              variant="primary"
              size="lg"
              hasBorder
              className="RegistrationPage__Submit"
            >
              {isPending ? 'Вход…' : 'Войти'}
            </BaseButton>

            <div className="RegistrationPage__Divider" role="presentation">
              <div className="RegistrationPage__DividerLine" />
              <span className="RegistrationPage__DividerText">или</span>
              <div className="RegistrationPage__DividerLine" />
            </div>

            <p className="RegistrationPage__Footer">
              <a href="#">
                Нет аккаунта? <span>Создать</span>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
