import type { Button } from '../interfaces/button.interface';
import type { ButtonSize, ButtonVariant } from '../interfaces/primitives.type';

const base = `flex layout-c rounded-sm`

const styles = {
  primary: `bg-green text-white
            hover:bg-primary-hover hover:text-white
            active:bg-primary-active active:text-white
            disabled:bg-green/60 disabled:text-white/80`,
  secondary: `border-[1.5px] border-green text-green bg-transparent
              hover:border-green hover:text-white hover:bg-green
              active:border-primary-active active:text-white active:bg-primary-active
              disabled:border-green/50 disabled:text-green/50 disabled:bg-transparent`,
  tertiary: `bg-black/15 text-black/80
             hover:bg-black/7 hover:text-black/80
             active:bg-black/20 active:text-black/80
             disabled:bg-black/5 disabled:text-black/40`,
  accent: `bg-yellow text-black/80
           hover:bg-accent-hover hover:text-black/80
           active:bg-accent-active active:text-black/80
           disabled:bg-yellow/50 disabled:text-black/40`,
};

const sizes = {
  sm: `h-8 gap-2 px-[8px]`,
  md: `h-[44px] gap-2 px-[10px]`,
  lg: ``
};

function buildButtonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return [base, styles[variant], sizes[size], className].filter(Boolean).join(' ');
}

function SimpleButton({ variant = 'primary', size = 'md', type = 'button', 
  className, leftIcon, rightIcon, children, ...rest }: Button) {

  const classes = buildButtonClasses(variant, size, className);

  return (
    <button type={type} className={classes} {...rest}>
      {leftIcon ? <span>{leftIcon}</span> : null}
      <span className="justify-start text-white text-xl font-bold font-['ALS_Sirius'] leading-6 tracking-wide">{children}</span>
      {rightIcon ? <span>{rightIcon}</span> : null}
    </button>
  );
}

export default SimpleButton;
