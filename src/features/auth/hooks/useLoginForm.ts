import { useState, useCallback } from 'react';

const REQUIRED_MESSAGE = 'Обязательное поле';

export function useLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const loginError = submitted && !username.trim() ? REQUIRED_MESSAGE : undefined;
  const passwordError = submitted && !password ? REQUIRED_MESSAGE : undefined;
  const hasErrors = !username.trim() || !password;

  const setSubmittedTrue = useCallback(() => setSubmitted(true), []);

  return {
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    setSubmitted: setSubmittedTrue,
    validationErrors: { loginError, passwordError },
    hasErrors,
  };
}
