import { useState } from "react";
import Reveal from "./Reveal";
import FaqItem from "./FaqItem";
import { FAQ_ITEMS } from "../constants";

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
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 90}>
              <FaqItem item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
