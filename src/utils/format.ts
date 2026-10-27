export const fmtNum = (n: number) => String(n).replace(".", ",");

export function formatSize(kb: number): string {
  if (kb >= 1024) return `${fmtNum(Math.round((kb / 1024) * 10) / 10)} MB`;
  return `${fmtNum(Math.round(kb * 10) / 10)} KB`;
}

export function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}

/**
 * Тело номера без кода страны: только цифры, не больше 10.
 * Код отбрасываем аккуратно: если в значении уже есть маска «+7», ведущая 7 —
 * это код из маски; если пришёл готовый номер из 11 цифр — ведущая 7/8 это код.
 * Иначе первая цифра принадлежит номеру (например, тело «812…» — это не код 8).
 */
function phoneBody(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  const body = trimmed.startsWith("+7") && digits.startsWith("7")
    ? digits.slice(1)
    : digits.length > 10 && /^[78]/.test(digits)
      ? digits.slice(1)
      : digits;
  return body.slice(0, 10);
}

/** Показывать ли поле пустым: в нём нет ничего, кроме кода страны. */
export function isPhoneEmpty(value: string): boolean {
  return phoneBody(value).length === 0;
}

/** Набран ли номер целиком: 10 цифр тела, как в маске «+7 999-123-45-67». */
export function isPhoneComplete(value: string): boolean {
  return phoneBody(value).length === 10;
}

/** Код страны, который подставляется в поле по фокусу. */
export const PHONE_PREFIX = "+7 ";

/**
 * Приводит ввод к маске «+7 999-123-45-67». Плюс и разделители ставятся сами,
 * лишние цифры отбрасываются — поэтому в поле физически не набрать больше
 * 10 цифр (15 символов без учёта «+»). Пустой ввод остаётся пустым: «+7»
 * подставляется по фокусу, а не висит в пустом необязательном поле.
 */
export function formatPhone(value: string): string {
  const body = phoneBody(value);
  if (!body) return "";
  const groups = [body.slice(0, 3), body.slice(3, 6), body.slice(6, 8), body.slice(8, 10)].filter(Boolean);
  return `${PHONE_PREFIX}${groups.join("-")}`;
}
