const MAX_DIGITS = 9;
const SPACE = '\u202F';

export function countDigits(value: string): number {
  return value.replace(/\D/g, '').length;
}

export function canAddDigit(value: string): boolean {
  return countDigits(value) < MAX_DIGITS;
}

export function formatNumber(value: string): string {
  if (!value) return '0';

  const isNegative = value.startsWith('-');
  let clean = value.replace(/[\s\u202F]/g, '');

  if (isNegative) clean = clean.slice(1);

  const parts = clean.split('.');
  const integer = parts[0];
  const decimal = parts[1];

  const formattedInt = integer.replace(/\B(?=(\d{3})+(?!\d))/g, SPACE);

  return `${isNegative ? '-' : ''}${formattedInt}${decimal ? '.' + decimal : ''}`;
}

export function removeLast(value: string): string {
  let clean = value.replace(/[\s\u202F]/g, '');

  if (clean.length <= 1) return '0';

  return formatNumber(clean.slice(0, -1));
}