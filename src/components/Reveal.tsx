import type { CSSProperties, ReactNode } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";
import { REVEAL_OFFSETS, springGentle } from "../constants";
import type { RevealDirection } from "../interfaces/primitives.types";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  style?: CSSProperties;
};

/** Плавное появление блока при прокрутке — на пружине, с поддержкой reduced motion. */
export default function Reveal({ children, className, delay = 0, direction = "up", style }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduce = useReducedMotion() === true;
  const hidden = REVEAL_OFFSETS[direction];
  const from = reduce
    ? { opacity: 0, x: 0, y: 0, scale: 1 }
    : { opacity: 0, x: hidden.x ?? 0, y: hidden.y ?? 0, scale: hidden.scale ?? 1 };

  const spring = useSpring({
    from,
    to: inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : from,
    delay,
    config: springGentle,
    immediate: reduce,
  });

  return (
    <animated.div
      ref={ref}
      style={{ ...style, ...spring }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </animated.div>
  );
}
