import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";

/** Живая точка в чипе «Приём заявок открыт». */
export default function PulseDot() {
  const reduce = useReducedMotion() === true;
  const pulse = useSpring({
    from: { scale: 1, o: 0.9 },
    to: { scale: 2.2, o: 0 },
    loop: true,
    config: { duration: 1800, easing: easings.easeOutQuad },
    immediate: reduce,
  });
  return (
    <span className="relative flex h-2 w-2">
      <animated.span
        style={{ scale: pulse.scale, opacity: pulse.o }}
        className="absolute inset-0 rounded-full bg-brand-400"
      />
      <span className="relative h-2 w-2 rounded-full bg-brand-400" />
    </span>
  );
}
