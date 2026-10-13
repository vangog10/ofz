import type { InputHTMLAttributes, ReactNode } from 'react';
import type { FieldState } from './primitives.type';

export interface Checkbox extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** Подпись справа от чекбокса */
    children?: ReactNode,
    /** Сторона иконки в px: видимый квадрат занимает 1/3 этой величины */
    iconSize?: number,
    /** Визуальное состояние: default | error | success; в error квадрат и подпись краснеют */
    state?: FieldState
};

