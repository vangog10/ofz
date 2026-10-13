import type { HTMLAttributes, ReactNode } from 'react';
import type { FileUploadState } from './primitives.type';

/** Ошибка загрузки: причина, файлы-виновники и готовый текст для состояния error */
export interface FileUploadError {
    /** size — файл больше лимита, upload — отправка не удалась */
    reason: 'size' | 'upload',
    /** Файлы, из-за которых загрузка не состоялась */
    files: File[],
    /** Текст, который показывается в состоянии error */
    message: string
};

export interface FileDropzone extends Omit<HTMLAttributes<HTMLDivElement>,
    'children' | 'onChange' | 'onError' | 'onDrop' | 'onDragEnter' | 'onDragOver' | 'onDragLeave'> {
    /** Отбор файлов в диалоге выбора: MIME-типы или расширения, как у input[type=file] */
    accept?: string,
    /** Разрешить выбирать и перетаскивать несколько файлов */
    multiple?: boolean,
    /** Максимальный размер одного файла в байтах */
    maxSize?: number,
    /** Сторона иконки состояния в px */
    iconSize?: number,
    /** Поле выключено: файлы не принимаются, диалог не открывается */
    disabled?: boolean,
    /** Внешнее состояние: перекрывает внутреннее — им можно показать любой из четырёх видов макета */
    state?: FileUploadState,
    /** Свой текст ошибки; по умолчанию — сообщение о превышении размера */
    errorText?: ReactNode,
    /** Отправка файлов на сервер; по умолчанию — заглушка, которая держит паузу и читает файлы в память */
    upload?: (files: File[]) => Promise<void> | void,
    /** Успешно загруженные файлы — контролируемое значение: список ведёт форма и отправляет его с заявкой */
    files?: File[],
    /** Начальный список файлов, когда список не контролируется */
    defaultFiles?: File[],
    /** Список загруженных файлов изменился: при контролируемом files обновить его нужно здесь */
    onFilesChange?: (files: File[]) => void,
    /** Ошибка загрузки: файл больше лимита или отправка не удалась */
    onError?: (error: FileUploadError) => void,
    /** Классы коробки дропзоны */
    className?: string
};
