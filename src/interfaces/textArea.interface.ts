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
    /** Текст кнопки отправки; если не указан — кнопка внутри поля не рендерится */
    submitLabel?: ReactNode,
    /** Клик по кнопке отправки */
    onSubmit?: () => void,
    /** Растягивать поле по высоте колонки: свободная высота уходит в textarea, но не ниже size */
    fill?: boolean,
    /** Классы рамки поля (textarea вместе с кнопкой) */
    className?: string
};
