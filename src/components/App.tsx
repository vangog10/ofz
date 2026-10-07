import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import Callout from "./Callout"
import CardItem from "./CardItem"
import CheckBox from "./CheckBox"
import SimpleButton from "./SimpleButton"
import TextArea from "./TextArea"
import TextField from "./TextField"
import AccountGroup from "./icons/AccountGroup.icon"
import SchoolHat from "./icons/SchoolHat.icon"
import SendVariant from "./icons/SendVariant.icon"
import TimerPlay from "./icons/TimerPlay.icon"
import Tune from "./icons/Tune.icon"
import yandexLogo from "../assets/Yandex_logo_Cyrillic 1.png"
import rosatomLogo from "../assets/rosatom-logo-eng 1.png"
import tbankLogo from "../assets/t-bank-full 1.png"
import peopleImg from "../assets/Rectangle.png"

function App() {
  return (
    <>
      <header className="fixed w-full">
        <AppHeader />
      </header>
      <main>
        <div className="w-full h-24"></div>
        <div
          id="image"
          className="bg-hero bg-cover bg-center bg-no-repeat self-stretch h-[960px] px-16 py-8"
        >
          <div className="size- inline-flex flex-col justify-start items-start gap-32">
            <div className="size- flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-white text-8xl font-bold font-['ALS_Sirius'] leading-25">Ваш вызов — наша <br/>компетенция</div>
              <div className="self-stretch justify-start text-white/80 text-5xl font-bold font-['ALS_Sirius'] leading-10">Оставьте заявку, и мы соберём<br/> команду под вашу задачу</div>
            </div>
          </div>
        </div>


        <div className="self-stretch h-96 w-full p-16 bg-white inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
          <div className="layout-b text-black/40 text-xl font-bold font-['ALS_Sirius'] leading-6 tracking-wide">Уже работают с нашими студентами</div>
          {/* 1312px = ширина ряда карточек (4 × 310 + 3 × 24) = контент макета 1440 без p-16.
              Логотипы держат природные 80px, поэтому на широком экране ряд ломается: ограничиваем
              его шириной ряда карточек и центрируем. */}
          <div className="self-center h-40 w-full max-w-[1312px] items-center justify-between flex">
            <img src={yandexLogo} alt="Яндекс" className="h-20 w-auto" />
            <img src={rosatomLogo} alt="Росатом" className="h-20 w-auto" />
            <img src={tbankLogo} alt="Т-Банк" className="h-20 w-auto" />
          </div>
        </div>


        <div className="self-stretch p-16 bg-zinc-100 flex layout-c gap-6 overflow-hidden">
          <CardItem icon={<Tune size={48} color="#28be46"/>} title="Гибкие форматы" text="от разовых исследований до долгосрочных R&D-проектов."/>
          <CardItem icon={<SchoolHat size={48} color="#28be46"/>} title="Академическая валидация" text="ваши идеи проходят экспертную оценку."/>
          <CardItem icon={<AccountGroup size={48} color="#28be46"/>} title="Доступ к таланта" text="студенты, аспиранты под руководством научных руководителей."/>
          <CardItem icon={<TimerPlay size={48} color="#28be46"/>} title="Скорость запуска" text="старт проекта в течение 2 недель."/>
        </div>


        <div className="flex flex-col gap-12 p-16 bg-white border-t border-b border-[#e1e2e6]">
          <div className="self-stretch text-center justify-start text-black/40 text-2xl font-bold font-['ALS_Sirius'] leading-7">Как это работает?</div>
          {/* Ширина 1440-макета без p-16: колонки стоят на месте, а на широком экране
              растут только боковые отступы (mx-auto). */}
          <div className="mx-auto w-full max-w-[1312px] grid grid-cols-2 gap-6">
            <div className="size-lf-stretch p-6 inline-flex justify-start items-center gap-4">
              <div className="justify-start text-green-500 text-8xl font-bold font-['ALS_Sirius'] leading-25">1</div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-black text-[40px] font-bold font-['ALS_Sirius'] leading-10">Вы заполняете форму</div>
                <div className="self-stretch justify-start text-black/40 text-[20px] font-normal font-['ALS_Sirius'] leading-6">указываете задачу, прикладываете ТЗ</div>
              </div>
            </div>
            <div className="size-lf-stretch p-6 inline-flex justify-start items-center gap-4">
                <div className="justify-start text-green-500 text-8xl font-bold font-['ALS_Sirius'] leading-25">2</div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-black text-[40px] font-bold font-['ALS_Sirius'] leading-10">Мы анализируем</div>
                    <div className="self-stretch justify-start text-black/40 text-[20px] font-normal font-['ALS_Sirius'] leading-6">передаем в профильный институт (1–2 дня)</div>
                </div>
            </div>
            <div className="size-lf-stretch p-6 inline-flex justify-start items-center gap-4">
                <div className="justify-start text-green-500 text-8xl font-bold font-['ALS_Sirius'] leading-25">3</div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-black text-[40px] font-bold font-['ALS_Sirius'] leading-10">Формируем команду</div>
                    <div className="self-stretch justify-start text-black/40 text-[20px] font-normal font-['ALS_Sirius'] leading-6">студенты / ученые под вашу задачу</div>
                </div>
            </div>
            <div className="size-lf-stretch p-6 inline-flex justify-start items-center gap-4">
                <div className="justify-start text-green-500 text-8xl font-bold font-['ALS_Sirius'] leading-25">4</div>
                <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                    <div className="self-stretch justify-start text-black text-[40px] font-bold font-['ALS_Sirius'] leading-10 text-nowrap">Вы получаете решение!</div>
                </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-12 p-16 bg-[#f9f9fa]">
          <div className="self-stretch justify-start text-black text-[42px] font-bold font-['ALS_Sirius'] leading-10">Часто задаваемые вопросы (FAQ)</div>
          <div className="flex flex-col gap-4">
            <Callout title="Могу ли я предложить идею без ТЗ?">Да, достаточно описания</Callout>
            <Callout title="Могу ли я, являясь студентом, отправить заявку?">Да, инициативы студентов только приветствуются</Callout>
            <Callout title="Рассматриваются ли другие формы сотрудничества?">Да, необходимо лишь подробно рассказать о вашей идее</Callout>
            <Callout title="Сколько ждать ответа?">Ваша заявка будет рассмотрена в срок до 2 рабочих дней</Callout>
            <Callout title="Есть ли гарантия конфиденциальности?">Да, подписываем NDA при необходимости</Callout>
          </div>
        </div>


        {/* Заголовок, картинка и форма — три грид-элемента. Заголовок занимает отдельную
            строку, поэтому форма начинается ровно от верха картинки и растягивается
            по её высоте: высоту строки задаёт картинка в колонке 2fr. */}
        <div id="form" className="grid grid-cols-[2fr_3fr] gap-x-20 gap-y-6 p-16">
          <div className="col-start-1 row-start-1 justify-start text-black text-3xl font-bold font-['ALS_Sirius'] leading-9">Заполните анкету</div>
          <img src={peopleImg} alt="Студенты и научный руководитель обсуждают проект" className="col-start-1 row-start-2 self-start w-full h-auto"/>
          <form className="col-start-2 row-start-2 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <TextField label="Как вас зовут?" name="name" autoComplete="name" placeholder="Иванов Иван"/>
              <TextField label="Название организации" name="organization" placeholder='ООО "Ромашка"'/>
              <TextField label="E-mail" name="email" type="email" autoComplete="email" placeholder="ivanov_ivan@mail.ru"/>
              <TextField label="Телефон" name="phone" type="tel" autoComplete="tel" placeholder="+7 (999) 000-00-00"/>
            </div>

            <TextArea label="Описание задачи" name="task" placeholder="Опишите задачу..." fill/>

            <div className="flex flex-col gap-4">
              <div className="flex layout-l w-full gap-4 rounded-sm dashed-inset border-green text-green/40 px-4 py-3">
                <span className="inline-flex shrink-0 text-black/60" aria-hidden="true">
                  <SendVariant size={28}/>
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="justify-start text-black text-xl font-bold font-['ALS_Sirius'] leading-6">Загружаем файлы</span>
                  <span className="justify-start text-black/40 text-base font-normal font-['ALS_Sirius'] leading-5">Максимальный размер: 20 MB</span>
                </div>
              </div>
            </div>

            <CheckBox name="consent">Я согласен на обработку персональных данных</CheckBox>

            <SimpleButton type="submit" size="lg" className="self-end">Отправить заявку</SimpleButton>
          </form>
        </div>
      </main>
      <footer>
        <AppFooter />
      </footer>
    </>
  )
}

export default App
