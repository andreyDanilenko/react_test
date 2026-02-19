import { useState, useCallback } from 'react';
import { getApiErrorMessage } from '@/shared/lib';
import type { useLoginMutation } from './useLoginMutation';

type LoginMutationReturn = ReturnType<typeof useLoginMutation>;
type LoginPayload = Parameters<LoginMutationReturn['mutateAsync']>[0];

export function useLoginSubmit(
  loginMutation: LoginMutationReturn,
  onSuccess: (() => void) | undefined
) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const submit = useCallback(
    async (payload: LoginPayload) => {
      setApiError(null);
      try {
        await loginMutation.mutateAsync(payload);
        setIsExiting(true);
        onSuccess?.();
      } catch (err) {
        setApiError(getApiErrorMessage(err));
      }
    },
    [loginMutation, onSuccess]
  );

  return {
    submit,
    apiError,
    isExiting,
    isPending: loginMutation.isPending,
  };
}
