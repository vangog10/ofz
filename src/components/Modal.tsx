import { useEffect, useId } from 'react';
import type { ComponentType } from 'react';
import AlertCircle from './icons/AlertCircle.icon';
import Check from './icons/Check.icon';
import SendVariant from './icons/SendVariant.icon';
import SimpleButton from './SimpleButton';
import type { ModalProps } from '../interfaces/modal.interface';
import type { ModalState } from '../interfaces/primitives.type';
import type { SVG } from '../interfaces/SVG.interface';

const overlay = `fixed inset-0 z-50 flex layout-c bg-[rgba(0,0,0,0.5)]`;

const card = `max-w-[90vw] p-16 bg-white rounded-lg inline-flex flex-col justify-start items-center gap-1.25
              shadow-[var(--drop-shadow-medium-default)]`;

const titleBase = `justify-start text-black text-3xl font-bold font-['ALS_Sirius'] leading-9`;
const textBase = `text-center justify-start text-black/40 text-base font-normal font-['ALS_Sirius'] leading-5 tracking-tight`;

interface ModalContent {
  icon: ComponentType<SVG>,
  color: string,
  title: string,
  text: string
}

const contents: Record<ModalState, ModalContent> = {
  process: {
    icon: SendVariant,
    color: '#28be46',
    title: 'Отправляем заявку',
    text: 'Ждём ответа сервиса, это займёт несколько секунд',
  },
  success: {
    icon: Check,
    color: '#28be46',
    title: 'Отправлено!',
    text: 'Ваша заявка будет рассмотрена в течение 2-х рабочих дней',
  },
  error: {
    icon: AlertCircle,
    color: '#ff4460',
    title: 'Заявка не ушла',
    text: 'Проверьте соединение и попробуйте отправить ещё раз',
  },
};

function Modal({ open = false, state = 'success', errorText, onClose }: ModalProps) {
  const titleId = useId();
  const textId = `${titleId}-text`;

  useEffect(() => {
    if (!open || !onClose) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose?.();
    }

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const { icon: Icon, color, title, text } = contents[state];

  return (
    <div className={overlay} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={textId}
        className={card} onClick={(event) => event.stopPropagation()}>

        <Icon color={color} size={48} />
        <div id={titleId} className={titleBase}>{title}</div>
        <div id={textId} className={textBase}>{state === 'error' && errorText ? errorText : text}</div>

        {onClose && state !== 'process' ? (
          <SimpleButton variant="primary" size="md" className="mt-4" onClick={onClose}>Закрыть</SimpleButton>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;
