import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, ComponentType, DragEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import Check from './icons/Check.icon';
import FileDocumentPlus from './icons/FileDocumentPlus.icon';
import FileDocumentRemove from './icons/FileDocumentRemove.icon';
import SendVariant from './icons/SendVariant.icon';
import { formatFileSize, sumFileSize } from '../utils/files';
import { MAX_FILE_SIZE, STUB_UPLOAD_TIME } from '../constants';
import type { FileDropzone as FileDropzoneProps, FileUploadError } from '../interfaces/fileDropzone.interface';
import type { FileUploadState } from '../interfaces/primitives.type';
import type { SVG } from '../interfaces/SVG.interface';

const stateIcons: Record<FileUploadState, ComponentType<SVG>> = {
  default: FileDocumentPlus,
  process: SendVariant,
  success: Check,
  error: FileDocumentRemove,
};

const base = `flex layout-l w-full gap-4 rounded-sm px-4 py-3 transition-colors duration-150 outline-none`;

const boxes: Record<FileUploadState, string> = {
  default: `dashed-inset bg-globe text-black/40 hover:text-black/60`,
  process: `dashed-inset bg-white text-green`,
  success: `border-[1.5px] border-green bg-island`,
  error: `border-[1.5px] border-red bg-red/10`,
};

const iconColors: Record<FileUploadState, string> = {
  default: `text-black/60`,
  process: `text-black/60`,
  success: `text-green`,
  error: `text-red`,
};

async function uploadStub(files: File[]): Promise<void> {
  await Promise.all(files.map((file) => file.arrayBuffer()));
  await new Promise((resolve) => setTimeout(resolve, STUB_UPLOAD_TIME));
}

function FileDropzone({ accept, multiple = true, maxSize = MAX_FILE_SIZE, iconSize = 40, disabled = false,
  state, errorText, upload, files, defaultFiles, onFilesChange, onError, className, ...rest }: FileDropzoneProps) {

  const fieldId = useId();
  const titleId = `${fieldId}-title`;
  const textId = `${fieldId}-text`;

  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const requestId = useRef(0);

  const [innerFiles, setInnerFiles] = useState<File[]>(defaultFiles ?? []);
  const [failure, setFailure] = useState<FileUploadError | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const isControlled = files !== undefined;
  const uploaded = files ?? innerFiles;

  const currentState: FileUploadState = state
    ?? (uploading ? 'process' : failure ? 'error' : uploaded.length > 0 ? 'success' : 'default');
  const isBusy = currentState === 'process';
  const isInteractive = !disabled && !isBusy;

  // Ответ отправки после размонтирования уже не нужен
  useEffect(() => () => { requestId.current += 1; }, []);

  const maxSizeText = `Максимальный размер: ${formatFileSize(maxSize)}`;

  let title = 'Перетащите файлы сюда';
  let text: ReactNode = maxSizeText;

  if (currentState === 'process') {
    title = 'Загружаем файлы';
  } else if (currentState === 'success') {
    title = `Загружено файлов: ${uploaded.length}`;
    text = `Общий размер: ${formatFileSize(sumFileSize(uploaded))}`;
  } else if (currentState === 'error') {
    title = 'Ошибка загрузки';
    text = errorText ?? failure?.message ?? `Превышен максимальный размер: ${formatFileSize(maxSize)}`;
  }

  function openDialog() {
    if (!isInteractive) return;
    if (inputRef.current) inputRef.current.value = '';
    inputRef.current?.click();
  }

  async function startUpload(picked: File[]) {
    if (picked.length === 0) return;

    const oversized = picked.find((file) => file.size > maxSize);
    if (oversized) {
      showError({
        reason: 'size',
        files: [oversized],
        message: `Превышен максимальный размер: ${formatFileSize(maxSize)}`,
      });
      return;
    }

    const request = requestId.current + 1;
    requestId.current = request;
    setFailure(null);
    setUploading(true);

    try {
      await (upload ?? uploadStub)(picked);
      if (requestId.current !== request) return;
      commitFiles(picked);
    } catch {
      if (requestId.current !== request) return;
      showError({
        reason: 'upload',
        files: picked,
        message: 'Не удалось загрузить файлы. Попробуйте ещё раз',
      });
    } finally {
      if (requestId.current === request) setUploading(false);
    }
  }

  function commitFiles(next: File[]) {
    if (!isControlled) setInnerFiles(next);
    onFilesChange?.(next);
  }

  function showError(nextFailure: FileUploadError) {
    setFailure(nextFailure);
    onError?.(nextFailure);
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === inputRef.current) return;
    openDialog();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openDialog();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    void startUpload(Array.from(event.target.files ?? []));
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!isInteractive) return;
    dragDepth.current += 1;
    setDragging(true);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (isInteractive) event.dataTransfer.dropEffect = 'copy';
  }

  function handleDragLeave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    if (!isInteractive) return;
    void startUpload(Array.from(event.dataTransfer.files));
  }

  const Icon = stateIcons[currentState];

  const boxClasses = [
    base,
    boxes[currentState],
    disabled ? `cursor-not-allowed opacity-60` : isBusy ? `cursor-progress` : `cursor-pointer`,
    dragging ? `ring-2 ring-green/60 ring-inset` : ``,
    `focus-visible:ring-1 focus-visible:ring-green`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div role="button" tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-busy={isBusy || undefined}
      aria-labelledby={titleId} aria-describedby={textId}
      onClick={handleClick} onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter} onDragOver={handleDragOver}
      onDragLeave={handleDragLeave} onDrop={handleDrop}
      className={boxClasses} {...rest}>

      <span className={`inline-flex shrink-0 ${iconColors[currentState]}`} aria-hidden="true">
        <Icon size={iconSize} />
      </span>

      <span className="flex min-w-0 flex-col" aria-live="polite">
        <span id={titleId} className="justify-start text-black text-xl font-bold leading-6">{title}</span>
        <span id={textId} className={`text-base leading-5 ${currentState === 'error' ? `text-red` : `text-black/40`}`}>
          {text}
        </span>
      </span>

      <input ref={inputRef} type="file" className="sr-only" tabIndex={-1}
        accept={accept} multiple={multiple} disabled={disabled}
        onChange={handleInputChange} />
    </div>
  );
}

export default FileDropzone;
