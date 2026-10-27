import { useEffect } from "react";
import { animated, useReducedMotion, useSpring, useTrail } from "@react-spring/web";
import heroImg from "../assets/hero.png";
import { ArrowRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import ScrollDot from "./ScrollDot";
import PulseDot from "./PulseDot";
import FloatingCard from "./FloatingCard";
import { cn } from "../utils/cn";
import { HERO_CARDS, HERO_CARD_POS, HERO_LINES, HERO_WORD_COUNT, springCine, springGentle } from "../constants";

export default function Hero() {
  const reduce = useReducedMotion() === true;

  // Параллакс на пружине: скролл задаёт цель, пружина — движение.
  const [parallax, parallaxApi] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 120, friction: 24 },
  }));

  useEffect(() => {
    if (reduce) return;
    // Параллакс — только для точных указателей и широких экранов:
    // на таче скользящее фото выглядит как баг.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 768;
    if (!fine) return;
    const onScroll = () => parallaxApi.start({ y: Math.min(window.scrollY, 1200) });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallaxApi, reduce]);

  // Кинематографичное проявление фото.
  const ken = useSpring({
    from: { scale: reduce ? 1 : 1.12, opacity: 0.6 },
    to: { scale: 1, opacity: 1 },
    config: springCine,
  });

  // Заголовок: слова поднимаются из-под маски по очереди.
  const [words] = useTrail(HERO_WORD_COUNT, (i) => ({
    from: { y: "115%", rotate: 4 },
    to: { y: "0%", rotate: 0 },
    delay: 300 + i * 110,
    config: { mass: 1, tension: 120, friction: 14 },
    immediate: reduce,
  }));

  const line = useSpring({
    from: { opacity: 0, scaleX: 0 },
    to: { opacity: 1, scaleX: 1 },
    delay: 950,
    config: { mass: 1, tension: 120, friction: 14 },
    immediate: reduce,
  });

  const lead = useSpring({
    from: { opacity: 0, y: 28 },
    to: { opacity: 1, y: 0 },
    delay: 1100,
    config: springGentle,
    immediate: reduce,
  });

  const indicator = useSpring({
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0 },
    delay: 1500,
    config: springGentle,
    immediate: reduce,
  });

  // Чип и CTA-ряд появляются после заголовка.
  const chip = useSpring({
    from: { opacity: 0, y: 12 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: springGentle,
    immediate: reduce,
  });

  const cta = useSpring({
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0 },
    delay: 1300,
    config: springGentle,
    immediate: reduce,
  });

  const bgTransform = parallax.y.to((v) => `translate3d(0, ${v * 0.22}px, 0)`);
  const contentTransform = parallax.y.to((v) => `translate3d(0, ${v * -0.08}px, 0)`);
  const contentOpacity = parallax.y.to((v) => Math.max(0, 1 - v / 700));

  let wordIndex = 0;

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
      {/* Фото */}
      <animated.div
        style={{ transform: bgTransform }}
        className="absolute inset-x-0 -top-16 -bottom-16 will-change-transform"
      >
        <animated.img
          src={heroImg}
          alt="Студенты Томского политеха за работой в компьютерном классе"
          fetchPriority="high"
          style={{ scale: ken.scale, opacity: ken.opacity }}
          className="img-graded h-full w-full object-cover object-[60%_center]"
        />
      </animated.div>

      {/* Затемнение для читаемости */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      {/* Зерно: убирает «пластиковую» гладкость тёмных зон */}
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

      {/* Декор */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-500/30 blur-[110px]" />

      {/* Парящие карточки преимуществ — поверх фото, вразброс по правой части */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {HERO_CARDS.map((card, i) => (
          <FloatingCard
            key={card.title}
            card={card}
            index={i}
            className={cn("absolute", HERO_CARD_POS[i])}
          />
        ))}
      </div>

      {/* Контент */}
      <animated.div
        style={{ transform: contentTransform, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-36 will-change-transform sm:px-8 md:justify-center md:pb-24"
      >
        <animated.div style={chip} className="mb-7">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <PulseDot />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/90">
              Приём заявок открыт
            </span>
          </span>
        </animated.div>

        <h1 className="max-w-3xl text-[clamp(2.1rem,4.6vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance">
          {HERO_LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word) => {
                const i = wordIndex++;
                const accent = word === "компетенция";
                const dim = word === "—";
                return (
                  <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <animated.span
                      style={words[i]}
                      className={cn(
                        "inline-block",
                        accent &&
                          "bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent",
                        dim && "text-white/40"
                      )}
                    >
                      {word}
                    </animated.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <animated.div
          style={{ opacity: line.opacity, scaleX: line.scaleX, transformOrigin: "left center" }}
          className="mt-5 h-0.5 w-20 rounded-full bg-brand-500"
        />

        <animated.p
          style={{ opacity: lead.opacity, y: lead.y }}
          className="mt-5 max-w-md text-lg font-bold leading-snug text-white/85 sm:text-xl"
        >
          Соберём команду студентов и учёных под вашу задачу — от брифа до готового решения
        </animated.p>

        <animated.div style={cta} className="mt-6 flex flex-wrap items-center gap-5 sm:gap-7">
          <PrimaryButton href="#apply" className="px-7 py-3 text-base">
            Оставить заявку
          </PrimaryButton>
          <a
            href="#steps"
            className="group inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors duration-200 hover:text-white"
          >
            Как это работает
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </animated.div>
      </animated.div>

      {/* Индикатор прокрутки */}
      <animated.a
        href="#partners"
        aria-label="Прокрутить вниз"
        style={{ opacity: indicator.opacity, y: indicator.y }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">Листайте</span>
        <span className="flex h-12 w-7 justify-center rounded-full border-2 border-white/60 pt-2 transition-colors hover:border-brand-400">
          <ScrollDot />
        </span>
      </animated.a>
    </section>
  );
}
