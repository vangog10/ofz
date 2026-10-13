import type { FieldState } from '../interfaces/primitives.type';

const fieldBase = `rounded-sm border bg-transparent transition-colors duration-150`;

const fieldStates: Record<FieldState, string> = {
  default: `border-black/40
            hover:border-black/60
            focus-within:border-green focus-within:ring-1 focus-within:ring-green`,
  error: `border-red
          hover:border-red
          focus-within:border-red focus-within:ring-1 focus-within:ring-red`,
  success: `border-green
            hover:border-green
            focus-within:border-green focus-within:ring-1 focus-within:ring-green`,
};

const fieldDisabled = `border-black/20 cursor-not-allowed`;

const labelBase = `font-sirius text-xl font-bold leading-6 tracking-normal`;

const fieldTextBase = `font-sirius text-xs tracking-normal`;

export { fieldBase, fieldStates, fieldDisabled, labelBase, fieldTextBase };
