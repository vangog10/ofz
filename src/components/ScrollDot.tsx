import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";

/** Бегущая точка в индикаторе прокрутки. */
export default function ScrollDot() {
  const reduce = useReducedMotion() === true;
  const dot = useSpring({
    from: { y: 0, o: 0 },
    to: [
      { y: 12, o: 1, config: { duration: 900, easing: easings.easeOutQuad } },
      { y: 14, o: 0, config: { duration: 800, easing: easings.easeOutQuad } },
      { y: 0, o: 0, config: { duration: 0 } },
    ],
    loop: true,
    immediate: reduce,
  });

  return (
    <animated.span
      style={{ transform: dot.y.to((v) => `translate3d(0, ${v}px, 0)`), opacity: dot.o }}
      className="h-2 w-1 rounded-full bg-white"
    />
  );
}
