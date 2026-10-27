import type { CSSProperties, PointerEventHandler, ReactNode } from "react";
import { animated, easings, to, useReducedMotion, useSpring } from "@react-spring/web";
import { cn } from "../utils/cn";
import { springSnappy } from "../utils/springs";
import { useHoverCapable } from "../hooks/useHoverCapable";

type Props = {
  children: ReactNode;
  className?: string;
  /** Если указан — рендерится как ссылка. */
  href?: string;
  /** Для кнопки: тип. */
  type?: "button" | "submit";
  disabled?: boolean;
  style?: CSSProperties;
  "aria-label"?: string;
};

/**
 * Основная кнопка проекта.
 * Отклик мгновенный (Apple: реакция на pointer-down, а не на клик),
 * подъём и блик — на пружинах, с уважением к prefers-reduced-motion.
 */
export default function PrimaryButton({
  children,
  className,
  href,
  type = "button",
  disabled,
  style,
  ...rest
}: Props) {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();

  const [press, pressApi] = useSpring(() => ({
    y: 0,
    scale: 1,
    config: springSnappy,
  }));
  const [shine, shineApi] = useSpring(() => ({
    x: -130,
    config: { duration: 700, easing: easings.linear },
  }));

  const onPointerDown: PointerEventHandler = () => {
    if (disabled) return;
    pressApi.set({ scale: 0.97 });
  };
  const onPointerUp: PointerEventHandler = () => {
    if (disabled) return;
    pressApi.start({ scale: 1 });
  };
  const onPointerEnter: PointerEventHandler = () => {
    if (disabled || reduce || !hoverable) return;
    pressApi.start({ y: -2 });
    shineApi.start({ from: { x: -130 }, to: { x: 130 } });
  };
  const onPointerLeave: PointerEventHandler = () => {
    if (disabled) return;
    pressApi.start({ y: 0, scale: 1 });
    shineApi.set({ x: -130 });
  };

  const transform = to(
    [press.y, press.scale],
    (y, s) => `translate3d(0, ${y}px, 0) scale(${s})`
  ) as unknown as string;
  const cls = cn("btn-primary", className);
  const content = (
    <>
      <animated.span
        aria-hidden
        className="btn-shine"
        style={{ transform: shine.x.to((x) => `translate3d(${x}%, 0, 0)`) }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <animated.a
        href={href}
        className={cls}
        style={{ ...style, transform }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        {...rest}
      >
        {content}
      </animated.a>
    );
  }

  return (
    <animated.button
      type={type}
      disabled={disabled}
      className={cls}
      style={{ ...style, transform }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      {content}
    </animated.button>
  );
}
