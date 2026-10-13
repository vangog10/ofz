import { UNITS } from '../constants';

function formatFileSize(bytes: number): string {
  let value = bytes;
  let unit = 0;

  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }

  const rounded = Number(value.toFixed(unit === 0 ? 0 : 1));

  return `${rounded} ${UNITS[unit]}`;
}

function sumFileSize(files: File[]): number {
  return files.reduce((total, file) => total + file.size, 0);
}

export { formatFileSize, sumFileSize };
