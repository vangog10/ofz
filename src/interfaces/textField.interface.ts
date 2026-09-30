import type { InputHTMLAttributes, ReactNode } from 'react';
import type { FieldState, InputSize } from './primitives.type';

export interface TextField extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Подпись над полем */
    label?: ReactNode,
    /** Подсказка под полем: текст ошибки в состоянии error, иначе пояснение */
    hint?: ReactNode,
    /** Размер поля: md — базовый, lg — пока заглушка */
    size?: InputSize,
    /** Визуальное состояние: default | error | success */
    state?: FieldState,
    /** Показывать иконку очистки, когда в поле есть текст */
    clearable?: boolean,
    /** Клик по иконке очистки: при контролируемом value очистить его нужно здесь */
    onClear?: () => void,
    /** Сторона иконок в px */
    iconSize?: number,
    /** Классы рамки поля (инпут вместе с иконкой) */
    className?: string
};
