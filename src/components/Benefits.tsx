import type { ComponentType, SVGProps } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import Reveal from "./Reveal";
import { GradCapIcon, SlidersIcon, TimerIcon, UsersIcon } from "./Icons";
import { useHoverCapable } from "../hooks/useHoverCapable";

type Benefit = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: SlidersIcon,
    title: "Гибкие форматы",
    text: "от разовых исследований до долгосрочных R&D-проектов.",
  },
  {
    icon: GradCapIcon,
    title: "Академическая валидация",
    text: "ваши идеи проходят экспертную оценку.",
  },
  {
    icon: UsersIcon,
    title: "Доступ к талантам",
    text: "студенты, аспиранты под руководством научных руководителей.",
  },
  {
    icon: TimerIcon,
    title: "Скорость запуска",
    text: "старт проекта в течение 2 недель.",
  },
];

function Card({ icon: Icon, title, text }: Benefit) {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();
  const [spring, api] = useSpring(() => ({
    y: 0,
    rotate: 0,
    glow: 0,
    line: 0,
    config: { mass: 1, tension: 320, friction: 26 },
  }));

  const enter = () => !reduce && hoverable && api.start({ y: -8, rotate: -6, glow: 1, line: 1 });
  const leave = () => !reduce && api.start({ y: 0, rotate: 0, glow: 0, line: 0 });

  return (
    <animated.article
      onPointerEnter={enter}
      onPointerLeave={leave}
      style={{ transform: spring.y.to((v) => `translate3d(0, ${v}px, 0)`) }}
      className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(11,13,12,0.05),0_12px_32px_-16px_rgba(11,13,12,0.14)] ring-1 ring-black/5 transition-[box-shadow] duration-300 hover:shadow-[0_2px_4px_rgba(11,13,12,0.06),0_28px_60px_-24px_rgba(44,192,79,0.4)] hover:ring-brand-300"
    >
      {/* Свечение при наведении */}
      <animated.div
        style={{ opacity: spring.glow }}
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-400/35 blur-3xl"
      />
      {/* Нижняя линия-акцент */}
      <animated.div
        style={{ scaleX: spring.line, transformOrigin: "left center" }}
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600"
      />

      <animated.div
        style={{ rotate: spring.rotate }}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-500/40 group-hover:ring-brand-500"
      >
        <Icon className="h-7 w-7" />
      </animated.div>

      <h3 className="relative mt-8 text-xl font-extrabold leading-tight tracking-tight">{title}</h3>
      <p className="relative mt-2.5 text-[15px] font-medium leading-relaxed text-neutral-500">{text}</p>
    </animated.article>
  );
}

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
              <Card {...benefit} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
