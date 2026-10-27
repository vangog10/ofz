import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import Reveal from "./Reveal";
import { CheckIcon } from "./Icons";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";
import { springSnappy } from "../utils/springs";
import { useHoverCapable } from "../hooks/useHoverCapable";

const STEPS = [
  { title: "Вы заполняете форму", text: "указываете задачу, прикладываете ТЗ" },
  { title: "Мы анализируем", text: "передаем в профильный институт (1–2 дня)" },
  { title: "Формируем команду", text: "студенты и ученые под вашу задачу" },
  { title: "Вы получаете решение", text: "презентуем результат и передаём материалы" },
];

type Step = (typeof STEPS)[number];

/**
 * Один шаг. Все шаги оформлены одинаково; финальный отличается только
 * градиентным кругом с галочкой — это «цель», а не ховер-состояние.
 */
function StepCard({ step, i, last, inView }: { step: Step; i: number; last: boolean; inView: boolean }) {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();
  const [lift, liftApi] = useSpring(() => ({ y: 0, config: springSnappy }));

  const circle = useSpring({
    from: { opacity: 0, y: 24, scale: 0.6 },
    to: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.6 },
    delay: inView ? 250 + i * 220 : 0,
    config: { mass: 0.9, tension: 320, friction: 20 },
    immediate: reduce,
  });

  // Одиночный импульс, когда линия «доезжает» до шага.
  const pulse = useSpring({
    from: { scale: 0.9, opacity: 0.55 },
    to: inView ? { scale: 1.7, opacity: 0 } : { scale: 0.9, opacity: 0.55 },
    delay: inView ? 520 + i * 220 : 0,
    config: { duration: 1000, easing: easings.easeOutQuad },
    immediate: reduce,
  });

  return (
    <animated.div
      role="listitem"
      onPointerEnter={() => !reduce && hoverable && liftApi.start({ y: -6 })}
      onPointerLeave={() => !reduce && liftApi.start({ y: 0 })}
      style={{ transform: lift.y.to((v) => `translate3d(0, ${v}px, 0)`) }}
      className="group flex items-start gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center"
    >
      <animated.div style={circle} className="relative shrink-0">
        <animated.span
          aria-hidden
          style={pulse}
          className={cn("absolute inset-0 rounded-full", last ? "bg-brand-400/40" : "bg-brand-400/50")}
        />
        <div
          className={cn(
            "relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-4xl font-extrabold ring-8 ring-white transition-[box-shadow,outline-color] duration-300",
            last
              ? "bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-xl shadow-brand-500/40"
              : "bg-white text-brand-500 shadow-lg shadow-black/5 outline-2 -outline-offset-2 outline-brand-500/30 group-hover:outline-brand-500/70"
          )}
        >
          {last ? <CheckIcon className="h-8 w-8" /> : i + 1}
        </div>
      </animated.div>

      <div className="flex-1 lg:w-full lg:flex-none">
        <h3 className="flex items-center gap-2 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl lg:justify-center">
          {step.title}
        </h3>
        <p className="mt-2 text-[15px] font-medium leading-relaxed text-neutral-500">{step.text}</p>
      </div>
    </animated.div>
  );
}

export default function Steps() {
  const reduce = useReducedMotion() === true;
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  // Линия «прорисовывается» пружиной, когда блок попадает во viewport.
  const lineX = useSpring({
    scaleX: inView ? 1 : 0,
    config: { mass: 1, tension: 60, friction: 26 },
    immediate: reduce,
  });
  const lineY = useSpring({
    scaleY: inView ? 1 : 0,
    config: { mass: 1, tension: 60, friction: 26 },
    immediate: reduce,
  });

  return (
    <section id="steps" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-100/60 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Процесс</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Как это работает?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base font-medium text-neutral-500 sm:text-lg">
              От заявки до готового решения — четыре шага.
            </p>
          </div>
        </Reveal>

        <div ref={ref} role="list" className="relative mt-14 grid gap-8 sm:mt-20 lg:grid-cols-4 lg:gap-6">
          {/* Соединительная линия (десктоп) */}
          <div
            className="pointer-events-none absolute left-[9%] right-[9%] top-9 hidden h-0.5 rounded-full bg-neutral-200 lg:block"
            aria-hidden
          >
            <animated.div
              style={{ scaleX: lineX.scaleX, transformOrigin: "left center" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-300 via-brand-500 to-brand-600"
            />
          </div>
          {/* Вертикальная линия (мобильные) */}
          <div
            className="pointer-events-none absolute bottom-6 left-[2.2rem] top-6 w-0.5 rounded-full bg-neutral-200 lg:hidden"
            aria-hidden
          >
            <animated.div
              style={{ scaleY: lineY.scaleY, transformOrigin: "top center" }}
              className="h-full rounded-full bg-gradient-to-b from-brand-300 to-brand-600"
            />
          </div>

          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} i={i} last={i === STEPS.length - 1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
