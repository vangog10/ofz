import { useState } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import Reveal from "./Reveal";
import { ChevronIcon } from "./Icons";
import { cn } from "../utils/cn";

const FAQ = [
  { q: "Могу ли я предложить идею без ТЗ?", a: "Да, достаточно описания" },
  { q: "Могу ли я являясь студентом отправить заявку?", a: "Да, инициативы студентов только приветствуются" },
  { q: "Рассматриваются ли другие формы сотрудничества?", a: "Да, необходимо лишь подробно рассказать о вашей идее" },
  { q: "Сколько ждать ответа?", a: "Ваша заявка будет рассмотрена в срок до 2 рабочих дней" },
  { q: "Есть ли гарантия конфиденциальности?", a: "Да, подписываем NDA при необходимости" },
];

type Item = (typeof FAQ)[number];

function FaqItem({ item, index, open, onToggle }: { item: Item; index: number; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion() === true;

  // Аккордеон на пружине: grid-rows 0fr ↔ 1fr + прозрачность.
  const panel = useSpring({
    gridTemplateRows: open ? "1fr" : "0fr",
    opacity: open ? 1 : 0,
    config: { mass: 1, tension: 240, friction: 24 },
    immediate: reduce,
  });
  const chevron = useSpring({
    rotate: open ? 180 : 0,
    config: { mass: 1, tension: 380, friction: 26 },
    immediate: reduce,
  });

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300",
        open
          ? "border-brand-500/50 bg-white/[0.09] shadow-[0_0_0_1px_rgba(44,192,79,0.15),0_20px_60px_-20px_rgba(44,192,79,0.35)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
      )}
    >
      <button
        type="button"
        id={`faq-btn-${index}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-colors duration-200 active:bg-white/[0.08] sm:px-7 sm:py-6"
      >
        <span className="text-base font-extrabold text-white sm:text-xl">{item.q}</span>
        <animated.span
          style={{ rotate: chevron.rotate }}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            open ? "bg-brand-500 text-white" : "bg-white/10 text-brand-400"
          )}
        >
          <ChevronIcon className="h-5 w-5" />
        </animated.span>
      </button>

      <animated.div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        style={{ gridTemplateRows: panel.gridTemplateRows, opacity: panel.opacity }}
        className="grid"
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-base font-medium text-neutral-300 sm:px-7 sm:text-lg">{item.a}</p>
        </div>
      </animated.div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-dots-light relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-brand-500/15 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow-light">Вопросы и ответы</p>
            <h2 className="mb-10 mt-4 text-3xl font-extrabold tracking-tight text-balance text-white sm:mb-14 sm:text-5xl">
              Частые вопросы
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3 sm:space-y-4">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 90}>
              <FaqItem item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
