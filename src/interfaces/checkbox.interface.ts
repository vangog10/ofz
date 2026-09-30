import type { InputHTMLAttributes, ReactNode } from 'react';

export interface Checkbox extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** Подпись справа от чекбокса */
    children?: ReactNode,
    /** Сторона иконки в px: видимый квадрат занимает 1/3 этой величины */
    iconSize?: number
};
