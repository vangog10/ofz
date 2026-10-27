import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { Check } from "lucide-react";

export default function SuccessBanner() {
  const reduce = useReducedMotion() === true;
  const style = useSpring({
    from: { opacity: 0, y: 12, scale: 0.97 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { mass: 0.9, tension: 320, friction: 20 },
    immediate: reduce,
  });
  return (
    <animated.div
      role="status"
      style={{ opacity: style.opacity, y: style.y, scale: style.scale }}
      className="mt-6 rounded-2xl bg-brand-50 px-5 py-4 ring-1 ring-brand-200"
    >
      <p className="flex items-center gap-2 text-sm font-extrabold text-brand-700">
        <Check className="h-5 w-5" strokeWidth={3} /> Заявка отправлена!
      </p>
      <p className="mt-1 text-sm font-medium text-neutral-600">Мы свяжемся с вами в течение 2 рабочих дней.</p>
    </animated.div>
  );
}
