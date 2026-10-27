import type Partner from "../interfaces/partner.interface";
import { springSnappy } from "../constants";
import { useHoverCapable } from "../hooks/useHoverCapable";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";

export default function Card({ partner }: { partner: Partner }) {
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