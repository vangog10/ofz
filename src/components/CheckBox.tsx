import { useState } from 'react';
import type { ChangeEvent } from 'react';
import CheckBoxIcon from './icons/CheckBox.icon';
import CheckBoxCheckedIcon from './icons/CheckBoxChecked.icon';
import type { Checkbox } from '../interfaces/checkbox.interface';

const base = `group inline-flex layout-l gap-[12px] select-none`;

const iconBase = `inline-flex shrink-0 transition-colors duration-150`;

const styles = {
  unchecked: `text-black/90 group-hover:text-black`,
  checked: `text-green group-hover:text-primary-hover`,
  error: `text-red`,
  disabled: `text-black/30`,
};

function buildIconClasses(checked: boolean, disabled: boolean, isError: boolean): string {
  if (disabled) return `${iconBase} ${styles.disabled}`;
  if (isError) return `${iconBase} ${styles.error}`;
  return `${iconBase} ${checked ? styles.checked : styles.unchecked}`;
}

/** Глиф 16×16 нарисован по центру кадра 48×48 (см. CheckBox.icon/CheckBoxChecked.icon),
    поэтому видимый квадрат отстоит от края кадра на 15/48 своей величины. Сдвигаем иконку
    на этот внутренний отступ — край квадрата встаёт на левый край блока, как у полей формы. */
const glyphInset = (iconSize: number) => (iconSize * 15) / 48;

function CheckBox({ checked, defaultChecked = false, onChange, disabled = false, state = 'default',
  iconSize = 48, className, children, ...rest }: Checkbox) {

  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : innerChecked;
  const isError = state === 'error';

  const labelClasses = [base, disabled ? `cursor-not-allowed` : `cursor-pointer`, className]
    .filter(Boolean).join(' ');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInnerChecked(event.target.checked);
    onChange?.(event);
  }

  return (
    <label className={labelClasses}>
      <input type="checkbox" className="sr-only" checked={isChecked}
        disabled={disabled} onChange={handleChange} aria-invalid={isError || undefined} {...rest} />
      <span className={buildIconClasses(isChecked, disabled, isError)}
        style={{ marginLeft: -glyphInset(iconSize) }} aria-hidden="true">
        {isChecked
          ? <CheckBoxCheckedIcon size={iconSize} />
          : <CheckBoxIcon size={iconSize} />}
      </span>
      {children ? <span className={`font-sirius text-base ${isError ? `text-red` : ``}`}>{children}</span> : null}
    </label>
  );
}

export default CheckBox;
