import { useId, useState } from 'react';
import type { ChangeEvent } from 'react';
import SimpleButton from './SimpleButton';
import { fieldBase, fieldDisabled, fieldStates, fieldTextBase, labelBase } from './field.styles';
import type { TextArea as TextAreaProps } from '../interfaces/textArea.interface';
import type { InputSize } from '../interfaces/primitives.type';

const base = `flex flex-col w-full gap-2`;

const sizes: Record<InputSize, string> = {
  md: `min-h-[164px] p-[10px]`,
  lg: ``, // TODO: размер lg ещё не нарисован — заглушка
};

/** Строка текста = 24px (в макете подпись «1 строка — 44px» относится к однострочному полю) */
const textareaBase = `w-full min-h-0 flex-1 resize-none bg-transparent outline-none leading-6`;

function TextArea({ label, hint, size = 'md', state = 'default', submitLabel = 'Отправить',
  onSubmit, disabled = false, id, className, value, defaultValue, onChange, ...rest }: TextAreaProps) {

  const innerId = useId();
  const fieldId = id ?? innerId;
  const hintId = `${fieldId}-hint`;

  const [innerValue, setInnerValue] = useState(String(defaultValue ?? ''));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : innerValue;

  const wrapperClasses = [
    fieldBase,
    base,
    sizes[size],
    disabled ? fieldDisabled : `${fieldStates[state]} cursor-text`,
    className,
  ].filter(Boolean).join(' ');

  const labelClasses = [labelBase, disabled ? `text-black/40` : `text-black`].join(' ');
  const textareaClasses = [fieldTextBase, textareaBase, disabled ? `text-black/30` : `text-black`].join(' ');

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (!isControlled) setInnerValue(event.target.value);
    onChange?.(event);
  }

  return (
    <div className="flex w-full flex-col gap-1">
      {label ? <label htmlFor={fieldId} className={labelClasses}>{label}</label> : null}
      <div className={wrapperClasses}>
        <textarea id={fieldId} disabled={disabled} value={currentValue}
          onChange={handleChange} aria-invalid={state === 'error' || undefined}
          aria-describedby={hint ? hintId : undefined}
          className={`${textareaClasses} placeholder:text-black/35`}
          {...rest} />
        <SimpleButton size="sm" variant="primary" disabled={disabled} onClick={onSubmit}
          className="shrink-0 self-end">
          <span className="font-sirius text-base tracking-normal">{submitLabel}</span>
        </SimpleButton>
      </div>
      {hint
        ? <span id={hintId} className={`${fieldTextBase} ${state === 'error' ? `text-red` : `text-black/60`}`}>
            {hint}
          </span>
        : null}
    </div>
  );
}

export default TextArea;
