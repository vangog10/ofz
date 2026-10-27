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
