
type primary = 'primary';
type secondary = 'secondary';
type tertiary = 'tertiary'
type accent = 'accent';
type ButtonVariant =  primary | secondary | tertiary | accent;

type sm = 'sm';
type md = 'md';
type lg = 'lg';
type ButtonSize = sm | md | lg;
type InputSize = md | lg;

type FieldState = 'default' | 'error' | 'success';

export type {
    primary, secondary, tertiary, accent,
    sm, md, lg,
    ButtonVariant,
    ButtonSize,
    InputSize,
    FieldState
};