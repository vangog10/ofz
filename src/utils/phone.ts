/**
 * Маска телефона: +7-999-000-00-00.
 * Первую группу (код страны) пользователь вводит сам — маска ничего не подставляет,
 * кроме «+» и четырёх дефисов, поэтому длина значения без «+» — 15 символов
 * (11 цифр и 4 разделителя).
 */

/** Первая группа — код страны, его набирает пользователь */
const CODE_SIZE = 1;

/** Группы цифр в поле: код страны, затем 999-000-00-00 */
const GROUPS = [CODE_SIZE, 3, 3, 2, 2] as const;

/** Сколько цифр помещается в поле */
const MAX_DIGITS = GROUPS.reduce((sum, size) => sum + size, 0);

/** Максимум для атрибута maxlength: 15 символов без «+» плюс сам «+» */
const PHONE_MAX_LENGTH = MAX_DIGITS + (GROUPS.length - 1) + 1;

/** Есть ли в значении хоть одна цифра кроме кода страны */
function isPhoneFilled(value: string): boolean {
  return digitsOf(value).length > CODE_SIZE;
}

/** Только цифры значения, без «+» и разделителей */
function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

/** Значение поля по маске +7-999-000-00-00; пустой ввод остаётся пустым */
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

/**
 * Значение поля после правки: ввод форматируется по маске.
 * Если стёрт разделитель (цифры те же, а строка короче), убираем последнюю цифру —
 * иначе маска вернула бы дефис на место и backspace «залипал» бы на нём.
 */
function applyPhoneMask(nextValue: string, prevValue: string): string {
  const nextDigits = digitsOf(nextValue);
  const erasedSeparator = nextDigits === digitsOf(prevValue) && nextValue.length < prevValue.length;

  return formatPhone(erasedSeparator ? nextDigits.slice(0, -1) : nextValue);
}

export { applyPhoneMask, formatPhone, isPhoneFilled, PHONE_MAX_LENGTH };
