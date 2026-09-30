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
  disabled: `text-black/30`,
};

function buildIconClasses(checked: boolean, disabled: boolean): string {
  if (disabled) return `${iconBase} ${styles.disabled}`;
  return `${iconBase} ${checked ? styles.checked : styles.unchecked}`;
}

function CheckBox({ checked, defaultChecked = false, onChange, disabled = false,
  iconSize = 48, className, children, ...rest }: Checkbox) {

  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : innerChecked;

  const labelClasses = [base, disabled ? `cursor-not-allowed` : `cursor-pointer`, className]
    .filter(Boolean).join(' ');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInnerChecked(event.target.checked);
    onChange?.(event);
  }

  return (
    <label className={labelClasses}>
      <input type="checkbox" className="sr-only" checked={isChecked}
        disabled={disabled} onChange={handleChange} {...rest} />
      <span className={buildIconClasses(isChecked, disabled)} aria-hidden="true">
        {isChecked
          ? <CheckBoxCheckedIcon size={iconSize} />
          : <CheckBoxIcon size={iconSize} />}
      </span>
      {children ? <span className="font-sirius text-base">{children}</span> : null}
    </label>
  );
}

export default CheckBox;
