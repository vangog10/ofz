import type { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioButton extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** Подпись справа от радиокнопки */
    children?: ReactNode,
    /** Сторона иконки в px: видимый круг занимает 5/12 этой величины */
    iconSize?: number
};
