import { Fragment } from 'react';

import SimpleButton from "./SimpleButton"
import ChevronRight from './icons/ChevronRight.icon';
import EmailFast from './icons/EmailFast.icon';
import RadioButton from "./RadioButton"
import TextField from "./TextField"
import TextArea from "./TextArea"
import type { TextField as TextFieldProps } from '../interfaces/textField.interface';
import type { TextArea as TextAreaProps } from '../interfaces/textArea.interface';

const radioRows = [
  { title: 'default', disabled: false },
  { title: 'hover', disabled: false },
  { title: 'disabled', disabled: true },
];

type TextFieldRow = { title: string; props: Omit<TextFieldProps, 'label' | 'size'> };

const textFieldRows: TextFieldRow[] = [
  { title: 'default', props: { placeholder: 'Иванов Иван' } },
  { title: 'hover', props: { placeholder: 'Иванов Иван' } },
  { title: 'focused', props: {} },
  { title: 'added', props: { defaultValue: 'Смирнов Сергей' } },
  { title: 'disabled', props: { placeholder: 'Иванов Иван', disabled: true } },
  {
    title: 'error',
    props: { defaultValue: 'Смирнов Сергей', state: 'error', hint: 'Это поле обязательно' },
  },
  { title: 'success', props: { defaultValue: 'Смирнов Сергей', state: 'success' } },
];

type TextAreaRow = { title: string; props: Omit<TextAreaProps, 'label' | 'size'> };

const textAreaValue = 'Необходимо разработать продукт для супер крутого бизнеса';

const textAreaRows: TextAreaRow[] = [
  { title: 'default', props: { placeholder: 'Опишите задачу...' } },
  { title: 'hover', props: { placeholder: 'Опишите задачу...' } },
  { title: 'focused', props: {} },
  { title: 'added', props: { defaultValue: textAreaValue } },
  { title: 'disabled', props: { placeholder: 'Опишите задачу...', disabled: true } },
  {
    title: 'error',
    props: { defaultValue: textAreaValue, state: 'error', hint: 'Это поле обязательно' },
  },
  { title: 'success', props: { defaultValue: textAreaValue, state: 'success' } },
];

function App() {
  return (
    <div className="min-h-screen bg-globe px-8 py-10">
      <SimpleButton leftIcon={<EmailFast size={24}/>} rightIcon={<ChevronRight size={24}/>}>
        <span className='font-sirius text-base leading-6 tracking-[0.04em]'>Отправить заявку</span>
      </SimpleButton>

      <section className="mt-10">
        <h2 className="font-sirius text-xl">Текстовое поле</h2>
        <div className="mt-6 grid grid-cols-[88px_240px_240px] items-start gap-x-8 gap-y-3">
          <span />
          <h3 className="text-center font-sirius text-xl">medium</h3>
          <h3 className="text-center font-sirius text-xl">large</h3>
          {textFieldRows.map(({ title, props }, index) => (
            <Fragment key={title}>
              <span className="self-center font-sirius text-xs text-black/40">{title}</span>
              <TextField label="Как вас зовут?" {...props} />
              {index === 0
                ? <div className="layout-c h-11 rounded-sm border border-dashed border-black/30
                                  font-sirius text-xs text-black/40">
                    заглушка
                  </div>
                : <div />}
            </Fragment>
          ))}
        </div>
        <p className="mt-4 font-sirius text-xs text-black/40">
          Строка hover — наведите курсор на поле, focused — поставьте фокус в поле.
          Размер lg пока не нарисован, поэтому в колонке large стоит заглушка.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-sirius text-xl">Многострочное поле</h2>
        <div className="mt-6 grid grid-cols-[88px_240px_240px] items-start gap-x-8 gap-y-3">
          <span />
          <h3 className="text-center font-sirius text-xl">
            medium
            <span className="block font-sirius text-xs font-normal text-black/40">1 строка — 44px</span>
          </h3>
          <h3 className="text-center font-sirius text-xl">large</h3>
          {textAreaRows.map(({ title, props }, index) => (
            <Fragment key={title}>
              <span className="self-center font-sirius text-xs text-black/40">{title}</span>
              <TextArea label="Описание задачи" {...props} />
              {index === 0
                ? <div className="layout-c min-h-[164px] rounded-sm border border-dashed border-black/30
                                  font-sirius text-xs text-black/40">
                    заглушка
                  </div>
                : <div />}
            </Fragment>
          ))}
        </div>
        <p className="mt-4 font-sirius text-xs text-black/40">
          Состояния те же, что у однострочного поля: hover — наведите курсор, focused — поставьте фокус,
          added — появляется кнопка отправки, disabled — кнопка тоже выключена.
        </p>
      </section>

      <section className="mt-10 flex flex-col gap-3">
        <h2 className="font-sirius text-xl">Радиокнопка</h2>
        <div className="inline-grid grid-cols-[96px_180px_180px] items-center justify-items-start gap-y-6">
          {radioRows.map(({ title, disabled }) => (
            <Fragment key={title}>
              <span className="font-sirius text-base text-black/60">{title}</span>
              <RadioButton name={`radio-${title}-off`} disabled={disabled}>Выбрать</RadioButton>
              <RadioButton name={`radio-${title}-on`} defaultChecked disabled={disabled}>Выбрать</RadioButton>
            </Fragment>
          ))}
        </div>
        <p className="font-sirius text-xs text-black/40">
          Строка hover — наведите курсор на радиокнопку.
        </p>
      </section>
    </div>
  )
}

export default App
