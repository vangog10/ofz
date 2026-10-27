import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import Reveal from "./Reveal";
import Card from "./Card";
import { useHoverCapable } from "../hooks/useHoverCapable";
import { PARTNERS } from "../constants";


export default function Partners() {
  const reduce = useReducedMotion() === true;
  const hoverable = useHoverCapable();
  const set = [...PARTNERS, ...PARTNERS];

  const [marquee, marqueeApi] = useSpring(() => ({
    from: { x: 0 },
    to: { x: -50 },
    loop: true,
    config: { duration: 48000, easing: easings.linear },
    immediate: reduce,
  }));

  return (
    <section id="partners" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-10 bg-neutral-200 sm:w-16" />
            <p className="text-center text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">
              Уже работают с нашими студентами
            </p>
            <span aria-hidden className="h-px w-10 bg-neutral-200 sm:w-16" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={150} direction="none" className="relative mt-12">
        <div
          className="overflow-hidden py-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <animated.div
            onPointerEnter={() => hoverable && marqueeApi.pause()}
            onPointerLeave={() => hoverable && marqueeApi.resume()}
            style={{ transform: marquee.x.to((x) => `translate3d(${x}%, 0, 0)`) }}
            className="flex w-max touch-pan-y"
          >
            <ul className="flex shrink-0" aria-label="Партнёры">
              {set.map((p, i) => (
                <Card key={`a-${i}`} partner={p} />
              ))}
            </ul>
            <ul className="flex shrink-0" aria-hidden>
              {set.map((p, i) => (
                <Card key={`b-${i}`} partner={p} />
              ))}
            </ul>
          </animated.div>
        </div>
      </Reveal>
    </section>
  );
}
