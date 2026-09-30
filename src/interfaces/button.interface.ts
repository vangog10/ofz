import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant, ButtonSize } from './primitives.type';

export interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant,
  size?: ButtonSize,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode
};
