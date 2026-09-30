import type { ReactNode, TextareaHTMLAttributes } from 'react';
import type { FieldState, InputSize } from './primitives.type';

export interface TextArea extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** Подпись над полем */
    label?: ReactNode,
    /** Подсказка под полем: текст ошибки в состоянии error, иначе пояснение */
    hint?: ReactNode,
    /** Размер поля: md — базовый, lg — пока заглушка */
    size?: InputSize,
    /** Визуальное состояние: default | error | success */
    state?: FieldState,
    /** Текст кнопки отправки */
    submitLabel?: ReactNode,
    /** Клик по кнопке отправки */
    onSubmit?: () => void,
    /** Классы рамки поля (textarea вместе с кнопкой) */
    className?: string
};
