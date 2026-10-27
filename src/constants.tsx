import type { SpringConfig } from "@react-spring/web";
import { GraduationCap, SlidersHorizontal, Timer, Users } from "lucide-react";
import yandex from "./assets/logos/yandex.png";
import rosatom from "./assets/logos/rosatom.png";
import tbank from "./assets/logos/tbank.png";
import gazprom from "./assets/logos/gasprom.png";
import sibur from "./assets/logos/sibur.png";
import rubius from "./assets/logos/rubius.png";
import type Partner from "./interfaces/partner.interface";
import type FormState from "./interfaces/formState.interface";
import type Benefit from "./interfaces/benefit.interface";
import type Step from "./interfaces/step.interface";
import type HeroCard from "./interfaces/heroCard.interface";
import type FaqItem from "./interfaces/faqItem.interface";
import type { RevealDirection } from "./interfaces/primitives.types";

/* ---------- Пружины ---------- */

/** Появления, доводки, параллакс — плавно, без отскока (damping ≈ 1). */
const springGentle: SpringConfig = { mass: 1, tension: 170, friction: 26 };

/** Быстрый отклик на ховер и нажатие. */
const springSnappy: SpringConfig = { mass: 1, tension: 420, friction: 30 };

/** Медленная кинематографичная доводка (фото). */
const springCine: SpringConfig = { mass: 1, tension: 55, friction: 24 };

/* ---------- Reveal ---------- */

const REVEAL_OFFSETS: Record<RevealDirection, { x?: string; y?: string; scale?: number }> = {
  up: { y: "2.5rem" },
  down: { y: "-2.5rem" },
  left: { x: "3rem" },
  right: { x: "-3rem" },
  none: {},
  zoom: { scale: 0.96 },
};

/* ---------- Hero ---------- */

const HERO_LINES = [
  ["Ваш", "вызов", "—"],
  ["наша", "компетенция"],
];

const HERO_WORD_COUNT = HERO_LINES.reduce((n, line) => n + line.length, 0);

const HERO_CARDS: HeroCard[] = [
  { title: "Старт за 2 недели", text: "быстрый запуск проекта" },
  { title: "Ответ за 2 дня", text: "рассмотрение в профильном институте" },
  { title: "NDA при необходимости", text: "конфиденциальность под защитой" },
];

// Амплитуда, период и фаза левитации — у каждой карточки своя, чтобы
// «дышали» вразнобой. Отрицательные задержки стартуют цикл с середины.
const HERO_FLOAT_AMP = ["-16px", "-22px", "-18px"];
const HERO_FLOAT_DUR = ["6.5s", "8s", "7s"];
const HERO_FLOAT_DELAY = ["0s", "-1.6s", "-3.2s"];

// Раскладка вразброс, а не в колонку: каждая карточка стоит на своём
// отступе от правого края, чтобы «зигзаг» не зависел от их ширины.
const HERO_CARD_POS = ["right-[3%] top-[18%]", "right-[11%] top-[46%]", "right-[1%] top-[74%]"];

/* ---------- Partners ---------- */

const PARTNERS: Partner[] = [
  {
    name: "Яндекс",
    node: <img src={yandex} alt="Яндекс" className="h-10 w-auto" draggable={false} loading="lazy" />,
  },
  {
    name: "Росатом",
    node: <img src={rosatom} alt="Росатом" className="h-10 w-auto" draggable={false} loading="lazy" />,
  },
  {
    name: "Т-Банк",
    node: <img src={tbank} alt="Т-банк" className="h-10 w-auto" draggable={false} loading="lazy" />,
  },
  {
    name: "Газпром",
    node: <img src={gazprom} alt="Газпром" className="h-10 w-auto" draggable={false} loading="lazy" />,
  },
  {
    name: "Rubius",
    node: <img src={rubius} alt="Рубиус" className="h-10 w-auto" draggable={false} loading="lazy" />,
  },
  {
    name: "Сибур",
    node: <img src={sibur} alt="Сибур" className="h-10 w-auto" draggable={false} loading="lazy" />,
  },
];

/* ---------- Benefits ---------- */

const BENEFITS: Benefit[] = [
  {
    icon: SlidersHorizontal,
    title: "Гибкие форматы",
    text: "от разовых исследований до долгосрочных R&D-проектов.",
  },
  {
    icon: GraduationCap,
    title: "Академическая валидация",
    text: "ваши идеи проходят экспертную оценку.",
  },
  {
    icon: Users,
    title: "Доступ к талантам",
    text: "студенты, аспиранты под руководством научных руководителей.",
  },
  {
    icon: Timer,
    title: "Скорость запуска",
    text: "старт проекта в течение 2 недель.",
  },
];

/* ---------- Steps ---------- */

const STEPS: Step[] = [
  { title: "Вы заполняете форму", text: "указываете задачу, прикладываете ТЗ" },
  { title: "Мы анализируем", text: "передаем в профильный институт (1–2 дня)" },
  { title: "Формируем команду", text: "студенты и ученые под вашу задачу" },
  { title: "Вы получаете решение", text: "презентуем результат и передаём материалы" },
];

/* ---------- FAQ ---------- */

const FAQ_ITEMS: FaqItem[] = [
  { q: "Могу ли я предложить идею без ТЗ?", a: "Да, достаточно описания" },
  { q: "Могу ли я являясь студентом отправить заявку?", a: "Да, инициативы студентов только приветствуются" },
  { q: "Рассматриваются ли другие формы сотрудничества?", a: "Да, необходимо лишь подробно рассказать о вашей идее" },
  { q: "Сколько ждать ответа?", a: "Ваша заявка будет рассмотрена в срок до 2 рабочих дней" },
  { q: "Есть ли гарантия конфиденциальности?", a: "Да, подписываем NDA при необходимости" },
];

/* ---------- Форма ---------- */

const MAX_FILES: number = 5;
const MAX_FILE_KB: number = 1.2 * 1024;

/**
 * Пределы длины для полей формы. У телефона лимит считается без учёта «+»:
 * сам плюс к длине не добавляется, поэтому в input допустимо на символ больше.
 */
const FIELD_LIMITS = { name: 100, org: 100, email: 50, phone: 15 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY_FORM: FormState = {
  name: "",
  org: "",
  email: "",
  phone: "",
  task: "",
  consent: false,
};

const TYPE_LABELS: Record<string, string> = {
  xlsx: "Таблица Excel",
  xls: "Таблица Excel",
  csv: "Таблица CSV",
  png: "Изображение PNG",
  jpg: "Изображение JPG",
  jpeg: "Изображение JPG",
  pdf: "Документ PDF",
  doc: "Документ Word",
  docx: "Документ Word",
  ppt: "Презентация",
  pptx: "Презентация",
  zip: "Архив ZIP",
};

/* ---------- Footer ---------- */

const FOOTER_COLUMN_TITLE_CLS = "text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500";

export {
  springGentle,
  springSnappy,
  springCine,
  REVEAL_OFFSETS,
  HERO_LINES,
  HERO_WORD_COUNT,
  HERO_CARDS,
  HERO_FLOAT_AMP,
  HERO_FLOAT_DUR,
  HERO_FLOAT_DELAY,
  HERO_CARD_POS,
  PARTNERS,
  BENEFITS,
  STEPS,
  FAQ_ITEMS,
  MAX_FILES,
  MAX_FILE_KB,
  FIELD_LIMITS,
  EMAIL_RE,
  EMPTY_FORM,
  TYPE_LABELS,
  FOOTER_COLUMN_TITLE_CLS,
};
