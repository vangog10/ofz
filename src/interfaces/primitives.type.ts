
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

/** Состояния дропзоны: default — ждём файл, process — отправляем, success — отправлено, error — не удалось */
type FileUploadState = 'default' | 'process' | 'success' | 'error';

/** Состояние отправки заявки: idle — форма ждёт, pending — запрос в полёте, success / error — ответ получен */
type SubmitStatus = 'idle' | 'pending' | 'success' | 'error';

/** Вид модального окна: process — заявка отправляется, success — принята, error — не ушла */
type ModalState = 'process' | 'success' | 'error';

export type {
    primary, secondary, tertiary, accent,
    sm, md, lg,
    ButtonVariant,
    ButtonSize,
    InputSize,
    FieldState,
    FileUploadState,
    SubmitStatus,
    ModalState
};