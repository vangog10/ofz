import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import type FaqItemData from "../interfaces/faqItem.interface";

type Props = {
  item: FaqItemData;
  index: number;
  open: boolean;
  onToggle: () => void;
};

export default function FaqItem({ item, index, open, onToggle }: Props) {
  const reduce = useReducedMotion() === true;

  // Аккордеон на пружине: grid-rows 0fr ↔ 1fr + прозрачность.
  const panel = useSpring({
    gridTemplateRows: open ? "1fr" : "0fr",
    opacity: open ? 1 : 0,
    config: { mass: 1, tension: 240, friction: 24 },
    immediate: reduce,
  });
  const chevron = useSpring({
    rotate: open ? 180 : 0,
    config: { mass: 1, tension: 380, friction: 26 },
    immediate: reduce,
  });

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300",
        open
          ? "border-brand-500/50 bg-white/[0.09] shadow-[0_0_0_1px_rgba(44,192,79,0.15),0_20px_60px_-20px_rgba(44,192,79,0.35)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
      )}
    >
      <button
        type="button"
        id={`faq-btn-${index}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-colors duration-200 active:bg-white/[0.08] sm:px-7 sm:py-6"
      >
        <span className="text-base font-extrabold text-white sm:text-xl">{item.q}</span>
        <animated.span
          style={{ rotate: chevron.rotate }}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            open ? "bg-brand-500 text-white" : "bg-white/10 text-brand-400"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </animated.span>
      </button>

      <animated.div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        style={{ gridTemplateRows: panel.gridTemplateRows, opacity: panel.opacity }}
        className="grid"
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-base font-medium text-neutral-300 sm:px-7 sm:text-lg">{item.a}</p>
        </div>
      </animated.div>
    </div>
  );
}
