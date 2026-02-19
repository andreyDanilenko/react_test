const DEFAULT_MESSAGE = 'Ошибка входа';

export function getApiErrorMessage(err: unknown, defaultMessage = DEFAULT_MESSAGE): string {
  if (typeof err !== 'object' || err === null || !('response' in err)) return defaultMessage;
  const data = (err as { response?: { data?: { message?: string } } }).response?.data;
  return data?.message ?? defaultMessage;
}
