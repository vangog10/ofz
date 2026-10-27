import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import { Check } from "lucide-react";
import { cn } from "../utils/cn";
import { springSnappy } from "../constants";
import { useHoverCapable } from "../hooks/useHoverCapable";
import type Step from "../interfaces/step.interface";

type Props = {
  step: Step;
  i: number;
  last: boolean;
  inView: boolean;
};

/**
 * Один шаг. Все шаги оформлены одинаково; финальный отличается только
 * градиентным кругом с галочкой — это «цель», а не ховер-состояние.
 */
export default function StepCard({ step, i, last, inView }: Props) {
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
              : "bg-white text-brand-500 shadow-[0_2px_6px_rgba(11,13,12,0.10),0_16px_32px_-14px_rgba(11,13,12,0.38)] outline-2 -outline-offset-2 outline-brand-500/30 group-hover:outline-brand-500/70"
          )}
        >
          {last ? <Check className="h-8 w-8" strokeWidth={3} /> : i + 1}
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
