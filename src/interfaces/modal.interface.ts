import type { ModalState } from './primitives.type';

export interface ModalProps {
    /** Показывать окно и затемнение под ним */
    open?: boolean,
    /** Что показываем: ход отправки, успех или ошибку */
    state?: ModalState,
    /** Свой текст ошибки для state = 'error' */
    errorText?: string,
    /** Закрытие окна: клик по фону, Esc или кнопка */
    onClose?: () => void
};
