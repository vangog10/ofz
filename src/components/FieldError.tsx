import { animated, useReducedMotion, useSpring } from "@react-spring/web";

type Props = {
  message: string;
};

/** Ошибка поля: появляется пружиной, не ломая вёрстку. */
export default function FieldError({ message }: Props) {
  const reduce = useReducedMotion() === true;
  const style = useSpring({
    from: { opacity: 0, y: -4 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 400, friction: 26 },
    immediate: reduce,
  });
  return (
    <animated.p role="alert" style={style} className="mt-1.5 text-xs font-semibold text-red-500">
      {message}
    </animated.p>
  );
}
