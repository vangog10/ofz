import { useId, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import BackspaceOutline from './icons/BackspaceOutline.icon';
import Check from './icons/Check.icon';
import { fieldBase, fieldDisabled, fieldStates, fieldTextBase, labelBase } from './field.styles';
import type { TextField as TextFieldProps } from '../interfaces/textField.interface';
import type { InputSize } from '../interfaces/primitives.type';

const base = `flex layout-l w-full gap-2`;

/** Корень поля: подпись + рамка + подсказка столбиком, ширина — по контейнеру */
const rootBase = `flex w-full min-w-0 flex-col gap-1`;

const sizes: Record<InputSize, string> = {
  md: `h-11 pl-[10px] pr-2`,
  lg: ``, // TODO: размер lg ещё не нарисован — заглушка
};

const inputBase = `w-full min-w-0 bg-transparent outline-none`;

const clearBase = `shrink-0 layout-c rounded-sm cursor-pointer outline-none
                   focus-visible:ring-1 focus-visible:ring-green`;

function TextField({ label, hint = "", size = 'md', state = 'default', clearable = true, onClear,
  iconSize = 24, disabled = false, id, className, value, defaultValue, onChange, ...rest }: TextFieldProps) {

  const innerId = useId();
  const fieldId = id ?? innerId;
  const hintId = `${fieldId}-hint`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [innerValue, setInnerValue] = useState(String(defaultValue ?? ''));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : innerValue;
  const isFilled = currentValue.length > 0;

  const wrapperClasses = [
    fieldBase,
    base,
    sizes[size],
    disabled ? fieldDisabled : `${fieldStates[state]} cursor-text`,
    className,
  ].filter(Boolean).join(' ');

  const labelClasses = [labelBase, disabled ? `text-black/40` : `text-black`].join(' ');
  const inputClasses = [fieldTextBase, inputBase, disabled ? `text-black/30` : `text-black`].join(' ');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInnerValue(event.target.value);
    onChange?.(event);
  }

  function handleClear() {
    if (!isControlled) setInnerValue('');
    onClear?.();
    inputRef.current?.focus();
  }

  function renderIcon() {
    // по макету иконка есть только у состояний added (очистка) и success (галочка)
    if (disabled || state === 'error') return null;

    if (state === 'success') {
      return (
        <span className="shrink-0 layout-c text-green" aria-hidden="true">
          <Check size={iconSize} />
        </span>
      );
    }

    if (clearable && isFilled) {
      return (
        <button type="button" aria-label="Очистить поле" onClick={handleClear}
          className={`${clearBase} text-black/75 hover:text-black`}>
          <BackspaceOutline size={iconSize} />
        </button>
      );
    }

    return null;
  }

  return (
    <div className={rootBase}>
      {label ? <label htmlFor={fieldId} className={labelClasses}>{label}</label> : null}
      <div className={wrapperClasses}>
        <input id={fieldId} ref={inputRef} disabled={disabled} value={currentValue}
          onChange={handleChange} aria-invalid={state === 'error' || undefined}
          aria-describedby={hint ? hintId : undefined}
          className={`${inputClasses} placeholder:text-black/35`}
          {...rest} />
        {renderIcon()}
      </div>
      {hint
        ? <span id={hintId} className={`${fieldTextBase} ${state === 'error' ? `text-red` : `text-black/60`}`}>
            {hint}
          </span>
        : null}
    </div>
  );
}

export default TextField;
