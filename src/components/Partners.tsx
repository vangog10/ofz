import type { ReactNode } from "react";
import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import yandex from "../assets/logos/yandex.svg";
import rosatom from "../assets/logos/rosatom.svg";
import tbank from "../assets/logos/tbank.svg";
import gazprom from "../assets/logos/gazprom.svg";
import sibur from "../assets/logos/sibur.png";
import Reveal from "./Reveal";
import { springSnappy } from "../utils/springs";
import { useHoverCapable } from "../hooks/useHoverCapable";

function RubiusLogo() {
  return (
    <span className="flex items-center gap-2.5" role="img" aria-label="Rubius">
      <svg viewBox="0 0 32 50" className="h-11 w-auto" aria-hidden>
        <path d="M3 9.5C3 4 8 1 14 1c-.5 5.5-4.5 8.5-11 8.5Z" fill="#3f9a3d" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 10.6}
              y={11 + r * 10.2}
              width={9.2}
              height={9}
              rx={0.6}
              fill="#a3191f"
            />
          ))
        )}
      </svg>
      <span className="text-[1.7rem] font-extrabold tracking-tight text-neutral-600">Rubius</span>
    </span>
  );
}

type Partner = { name: string; node: ReactNode };

const img = (src: string, name: string, cls: string): ReactNode => (
  <img src={src} alt={name} className={cls} draggable={false} loading="lazy" />
);

const PARTNERS: Partner[] = [
  { name: "Яндекс", node: img(yandex, "Яндекс", "h-9 w-auto") },
  { name: "Росатом", node: img(rosatom, "Росатом", "h-10 w-auto") },
  { name: "Т-Банк", node: img(tbank, "Т-Банк", "h-10 w-auto") },
  { name: "Газпром", node: img(gazprom, "Газпром", "h-12 w-auto") },
  { name: "Rubius", node: <RubiusLogo /> },
  { name: "Сибур", node: img(sibur, "Сибур", "h-14 w-auto") },
];

function Card({ partner }: { partner: Partner }) {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();
  const [lift, liftApi] = useSpring(() => ({
    y: 0,
    scale: 1,
    config: springSnappy,
  }));

  return (
    <animated.li
      onPointerEnter={() => !reduce && hoverable && liftApi.start({ y: -6, scale: 1.05 })}
      onPointerLeave={() => !reduce && liftApi.start({ y: 0, scale: 1 })}
      style={{ transform: lift.y.to((v) => `translate3d(0, ${v}px, 0)`) }}
      className="group mr-5 flex h-28 w-60 shrink-0 items-center justify-center rounded-3xl border border-neutral-200/80 bg-white px-8 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10 sm:mr-6 sm:w-64"
    >
      <animated.div
        style={{ scale: lift.scale }}
        className="flex max-w-full items-center justify-center opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      >
        {partner.node}
      </animated.div>
    </animated.li>
  );
}

export default function Partners() {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();
  // Один «сет» — два прохода по списку, чтобы он гарантированно шире экрана.
  const set = [...PARTNERS, ...PARTNERS];

  // Бегущая строка: линейная пружина с циклом, пауза при наведении (только мышь).
  const [marquee, marqueeApi] = useSpring(() => ({
    from: { x: 0 },
    to: { x: -50 },
    loop: true,
    config: { duration: 48000, easing: easings.linear },
    immediate: reduce,
  }));

  return (
    <section id="partners" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-10 bg-neutral-200 sm:w-16" />
            <p className="text-center text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">
              Уже работают с нашими студентами
            </p>
            <span aria-hidden className="h-px w-10 bg-neutral-200 sm:w-16" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={150} direction="none" className="relative mt-12">
        <div
          className="overflow-hidden py-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <animated.div
            onPointerEnter={() => hoverable && marqueeApi.pause()}
            onPointerLeave={() => hoverable && marqueeApi.resume()}
            style={{ transform: marquee.x.to((x) => `translate3d(${x}%, 0, 0)`) }}
            className="flex w-max touch-pan-y"
          >
            <ul className="flex shrink-0" aria-label="Партнёры">
              {set.map((p, i) => (
                <Card key={`a-${i}`} partner={p} />
              ))}
            </ul>
            <ul className="flex shrink-0" aria-hidden>
              {set.map((p, i) => (
                <Card key={`b-${i}`} partner={p} />
              ))}
            </ul>
          </animated.div>
        </div>
      </Reveal>
    </section>
  );
}
