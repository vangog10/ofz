import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import { LoaderCircle } from "lucide-react";
import { cn } from "../utils/cn";

type Props = {
  className?: string;
};

export default function Spinner({ className }: Props) {
  const reduce = useReducedMotion() === true;
  const spin = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 900, easing: easings.linear },
    immediate: reduce,
  });
  return (
    <animated.span style={{ rotate: spin.rotate }} className={cn("inline-flex", className)}>
      <LoaderCircle className="h-5 w-5" />
    </animated.span>
  );
}
