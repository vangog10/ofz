import type { CSSProperties } from "react";
import { animated, to as combine, useReducedMotion, useSpring } from "@react-spring/web";
import { Check } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { HERO_FLOAT_AMP, HERO_FLOAT_DELAY, HERO_FLOAT_DUR, springGentle } from "../constants";
import type HeroCard from "../interfaces/heroCard.interface";

type Props = {
  card: HeroCard;
  index: number;
  className?: string;
};

/** Парящая карточка: содержимое прежнее (иконка-галочка, заголовок и подпись),
 *  блок — в языке чипа «Приём заявок открыт»: скруглённая плашка со светлой
 *  гранью и размытием. Вход пружиной, левитация — CSS на композиторе. */
export default function FloatingCard({ card, index, className }: Props) {
  const reduce = useReducedMotion() === true;
  const [ref, inView] = useInView<HTMLDivElement>();

  const enter = useSpring({
    from: { opacity: 0, y: 24, scale: 0.96 },
    to: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 },
    delay: 1150 + index * 150,
    config: springGentle,
    immediate: reduce,
  });

  const floatStyle = {
    "--float-amp": HERO_FLOAT_AMP[index],
    "--float-dur": HERO_FLOAT_DUR[index],
    "--float-delay": HERO_FLOAT_DELAY[index],
  } as CSSProperties;

  return (
    <animated.div
      ref={ref}
      className={className}
      style={{
        opacity: enter.opacity,
        transform: combine([enter.y, enter.scale], (y, s) => `translate3d(0, ${y}px, 0) scale(${s})`),
      }}
    >
      <div
        className="glass-float will-change-transform flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 py-2 pr-4 pl-3 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.7)]"
        style={floatStyle}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-md shadow-brand-500/30">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <div>
          <p className="text-xs font-bold leading-tight whitespace-nowrap text-white">{card.title}</p>
          <p className="mt-0.5 text-[10px] font-medium leading-none whitespace-nowrap text-white/55">{card.text}</p>
        </div>
      </div>
    </animated.div>
  );
}
