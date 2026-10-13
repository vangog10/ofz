/**
 * Приложенные файлы: лимит размера и подписи размеров для интерфейса.
 */

/** Максимальный размер одного файла — 20 MB из макета */
const MAX_FILE_SIZE = 20 * 1024 * 1024;

/** Единицы по возрастанию: байты, килобайты, мегабайты, гигабайты */
const UNITS = ['B', 'KB', 'MB', 'GB'] as const;

/** Размер в байтах → подпись для интерфейса: 512 B, 640 KB, 1.2 MB */
function formatFileSize(bytes: number): string {
  let value = bytes;
  let unit = 0;

  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }

  // у байтов дробная часть не нужна, у остальных единиц оставляем одну цифру
  // и убираем лишний ноль: 20.0 → 20, 1.25 → 1.3
  const rounded = Number(value.toFixed(unit === 0 ? 0 : 1));

  return `${rounded} ${UNITS[unit]}`;
}

/** Суммарный размер списка файлов */
function sumFileSize(files: File[]): number {
  return files.reduce((total, file) => total + file.size, 0);
}

export { MAX_FILE_SIZE, formatFileSize, sumFileSize };
