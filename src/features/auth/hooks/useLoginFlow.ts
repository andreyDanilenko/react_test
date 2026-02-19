import { useCallback, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/router/routes';
import { useLoginMutation } from './useLoginMutation';
import { useLoginForm } from './useLoginForm';
import { useLoginSubmit } from './useLoginSubmit';

const EXIT_TRANSITION_MS = 400;

export function useLoginFlow() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const form = useLoginForm();
  const onSuccess = useCallback(
    () => setTimeout(() => navigate(ROUTES.HOME), EXIT_TRANSITION_MS),
    [navigate]
  );
  const submit = useLoginSubmit(loginMutation, onSuccess);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.setSubmitted();
      if (form.hasErrors) return;
      await submit.submit({
        username: form.username.trim(),
        password: form.password,
        expiresInMins: 30,
        rememberMe: form.rememberMe,
      });
    },
    [form, submit]
  );

  return {
    username: form.username,
    setUsername: form.setUsername,
    password: form.password,
    setPassword: form.setPassword,
    rememberMe: form.rememberMe,
    setRememberMe: form.setRememberMe,
    validationErrors: form.validationErrors,
    handleSubmit,
    apiError: submit.apiError,
    isExiting: submit.isExiting,
    isPending: submit.isPending,
  };
}
