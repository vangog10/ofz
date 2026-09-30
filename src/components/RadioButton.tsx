import RadioButtonFalseIcon from './icons/RadioButtonFalse.icon';
import RadioButtonTrueIcon from './icons/RadioButtonTrue.icon';
import type { RadioButton as RadioButtonProps } from '../interfaces/radioButton.interface';

const base = `group inline-flex layout-l gap-[12px] select-none`;

const iconBase = `shrink-0 transition-colors duration-150`;

const styles = {
  unchecked: `text-black/90 group-hover:text-black`,
  checked: `text-green group-hover:text-primary-hover`,
  disabled: `text-black/30`,
};

function buildIconClasses(checked: boolean, disabled: boolean): string {
  const color = disabled ? styles.disabled : checked ? styles.checked : styles.unchecked;
  return checked
    ? `${iconBase} hidden peer-checked:inline-flex ${color}`
    : `${iconBase} inline-flex peer-checked:hidden ${color}`;
}

function RadioButton({ disabled = false, iconSize = 48, className, children, ...rest }: RadioButtonProps) {

  const labelClasses = [base, disabled ? `cursor-not-allowed` : `cursor-pointer`, className]
    .filter(Boolean).join(' ');

  return (
    <label className={labelClasses}>
      <input {...rest} type="radio" className="peer sr-only" disabled={disabled} />
      <span className={buildIconClasses(false, disabled)} aria-hidden="true">
        <RadioButtonFalseIcon size={iconSize} />
      </span>
      <span className={buildIconClasses(true, disabled)} aria-hidden="true">
        <RadioButtonTrueIcon size={iconSize} />
      </span>
      {children ? <span className="font-sirius text-base">{children}</span> : null}
    </label>
  );
}

export default RadioButton;
