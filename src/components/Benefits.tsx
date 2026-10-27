import Reveal from "./Reveal";
import BenefitCard from "./BenefitCard";
import { BENEFITS } from "../constants";

export default function Benefits() {
  return (
    <section className="bg-dots relative bg-neutral-100 py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-brand-100/60 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Почему ТПУ</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Что вы получаете
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-medium text-neutral-500 sm:text-lg">
              Работаем как проектный офис: быстро собираем команду и сопровождаем проект до результата.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 120} className="h-full">
              <BenefitCard benefit={benefit} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
