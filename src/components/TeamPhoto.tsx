import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import teamImg from "../assets/team.png";
import { cn } from "../utils/cn";
import { springCine } from "../constants";
import { useHoverCapable } from "../hooks/useHoverCapable";

type Props = {
  className?: string;
};

/** Фото команды: чистая карточка без выступающих рамок, мягкий зум на пружине. */
export default function TeamPhoto({ className }: Props) {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();
  const [spring, api] = useSpring(() => ({ scale: 1, config: springCine }));
  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-200 shadow-[0_2px_4px_rgba(11,13,12,0.06),0_32px_64px_-24px_rgba(11,13,12,0.3)]",
        className
      )}
      onPointerEnter={() => !reduce && hoverable && api.start({ scale: 1.05 })}
      onPointerLeave={() => !reduce && api.start({ scale: 1 })}
    >
      {/* Абсолютное фото: карточка не «тянет» высоту контента,
          поэтому снаружи её можно ограничить свободным местом колонки. */}
      <animated.img
        src={teamImg}
        alt="Студенты обсуждают проект у монитора"
        width={500}
        height={703}
        style={{ scale: spring.scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
