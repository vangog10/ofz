import type { FieldState } from '../interfaces/primitives.type';

/** Общая рамка поля: инпут или textarea */
const fieldBase = `rounded-sm border bg-transparent transition-colors duration-150`;

/** Рамка по состояниям: фокус — рамка + ring 1px, визуально 2px без сдвига контента */
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

const labelBase = `font-sirius text-base font-bold tracking-normal`;

/** Текст поля и подсказки: 12px без трекинга, как в макете */
const fieldTextBase = `font-sirius text-xs tracking-normal`;

export { fieldBase, fieldStates, fieldDisabled, labelBase, fieldTextBase };
