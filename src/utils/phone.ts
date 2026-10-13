import { CODE_SIZE, GROUPS, MAX_DIGITS } from '../constants';

function isPhoneFilled(value: string): boolean {
  return digitsOf(value).length > CODE_SIZE;
}

function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

function formatPhone(value: string): string {
  const digits = digitsOf(value).slice(0, MAX_DIGITS);
  if (!digits) return '';

  const groups: string[] = [];
  let left = digits;

  for (const size of GROUPS) {
    if (!left) break;
    groups.push(left.slice(0, size));
    left = left.slice(size);
  }

  return `+${groups.join('-')}`;
}

function applyPhoneMask(nextValue: string, prevValue: string): string {
  const nextDigits = digitsOf(nextValue);
  const erasedSeparator = nextDigits === digitsOf(prevValue) && nextValue.length < prevValue.length;

  return formatPhone(erasedSeparator ? nextDigits.slice(0, -1) : nextValue);
}

export { applyPhoneMask, formatPhone, isPhoneFilled };
