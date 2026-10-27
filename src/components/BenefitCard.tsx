import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { useHoverCapable } from "../hooks/useHoverCapable";
import type Benefit from "../interfaces/benefit.interface";

type Props = {
  benefit: Benefit;
};

export default function BenefitCard({ benefit }: Props) {
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

  const Icon = benefit.icon;

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

      <h3 className="relative mt-8 text-xl font-extrabold leading-tight tracking-tight">{benefit.title}</h3>
      <p className="relative mt-2.5 text-[15px] font-medium leading-relaxed text-neutral-500">{benefit.text}</p>
    </animated.article>
  );
}
