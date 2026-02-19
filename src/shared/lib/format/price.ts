export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPriceParts(value: number): { int: string; dec: string } {
  const full = formatPrice(value);
  const i = full.lastIndexOf(',');
  if (i >= 0) return { int: full.slice(0, i), dec: full.slice(i) };
  return { int: full, dec: '' };
}
