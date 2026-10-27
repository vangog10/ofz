import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { Check } from "lucide-react";
import Spinner from "./Spinner";
import type { SubmitStatus } from "../interfaces/primitives.types";

type Props = {
  status: SubmitStatus;
};

/** Подпись кнопки отправки: меняется по key и «попадает» при каждой смене. */
export default function ButtonLabel({ status }: Props) {
  const reduce = useReducedMotion() === true;
  const style = useSpring({
    from: { opacity: 0, y: 8 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 380, friction: 26 },
    immediate: reduce,
  });
  return (
    <animated.span style={style} className="inline-flex items-center gap-2">
      {status === "sending" && <Spinner />}
      {status === "success" && <Check className="h-5 w-5" strokeWidth={3} />}
      {status === "idle" ? "Отправить" : status === "sending" ? "Отправляем…" : "Отправлено"}
    </animated.span>
  );
}
