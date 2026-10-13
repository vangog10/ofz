import { UNITS } from '../constants';
import type { FormAttachment } from '../interfaces/form.interface';

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

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const separator = result.indexOf(',');

      resolve(separator === -1 ? result : result.slice(separator + 1));
    };

    reader.onerror = () => reject(reader.error ?? new Error(`Не удалось прочитать файл «${file.name}»`));

    reader.readAsDataURL(file);
  });
}

async function toAttachments(files: File[]): Promise<FormAttachment[]> {
  return Promise.all(files.map(async (file) => ({
    name: file.name,
    type: file.type,
    size: file.size,
    content: await readFileAsBase64(file),
  })));
}

export { formatFileSize, sumFileSize, readFileAsBase64, toAttachments };
