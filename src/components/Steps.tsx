import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import Reveal from "./Reveal";
import StepCard from "./StepCard";
import { STEPS } from "../constants";
import { useInView } from "../hooks/useInView";

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
