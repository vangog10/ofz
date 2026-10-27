import { useEffect, useState } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import tpuLogo from "../assets/logos/TPU.logo.svg";
import PrimaryButton from "./PrimaryButton";
import { springGentle } from "../constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion() === true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const entrance = useSpring({
    from: { opacity: 0, y: -24 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 170, friction: 22 },
    immediate: reduce,
  });

  // Состояние «пилюли» после скролла — тоже на пружине.
  const pill = useSpring({
    s: scrolled ? 1 : 0,
    config: springGentle,
    immediate: reduce,
  });

  const pillStyle = {
    backgroundColor: pill.s.to({
      range: [0, 1],
      output: ["rgba(255,255,255,0.75)", "rgba(255,255,255,0.92)"],
    }),
    borderColor: pill.s.to({
      range: [0, 1],
      output: ["rgba(255,255,255,0.4)", "rgba(0,0,0,0.06)"],
    }),
    boxShadow: pill.s.to({
      range: [0, 1],
      output: [
        "0 10px 40px -15px rgba(0,0,0,0.35)",
        "0 10px 40px -10px rgba(0,0,0,0.18)",
      ],
    }),
  };

  return (
    <animated.header
      style={entrance}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-[max(1rem,env(safe-area-inset-top))]"
    >
      <animated.div
        style={pillStyle}
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 backdrop-blur-xl sm:px-6"
      >
        <a
          href="https://tpu.ru/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Томский политехнический университет — перейти на tpu.ru"
        >
          <img
            src={tpuLogo}
            alt="Томский политехнический университет"
            className="h-8 w-auto sm:h-10"
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-8">
          <div className="hidden text-right leading-tight sm:block">
            <a
              href="tel:+73822701777"
              className="block text-[15px] font-extrabold text-ink transition-colors hover:text-brand-600"
            >
              +7 (3822) 701-777
            </a>
            <a
              href="mailto:tpu@tpu.ru"
              className="block text-xs font-medium text-neutral-500 transition-colors hover:text-brand-600"
            >
              tpu@tpu.ru
            </a>
          </div>
          <PrimaryButton href="#apply" className="px-3.5 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm">
            Отправить заявку
          </PrimaryButton>
        </div>
      </animated.div>
    </animated.header>
  );
}
