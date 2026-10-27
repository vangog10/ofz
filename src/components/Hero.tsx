import { useEffect } from "react";
import type { CSSProperties } from "react";
import {
  animated,
  easings,
  to as combine,
  useReducedMotion,
  useSpring,
  useTrail,
} from "@react-spring/web";
import heroImg from "../assets/hero.png";
import { TpuMark } from "./TpuLogo";
import PrimaryButton from "./PrimaryButton";
import { ArrowRightIcon, CheckIcon } from "./Icons";
import { cn } from "../utils/cn";
import { springCine, springGentle } from "../utils/springs";

const LINES = [
  ["Ваш", "вызов", "—"],
  ["наша", "компетенция"],
];
const WORD_COUNT = LINES.reduce((n, line) => n + line.length, 0);

const HERO_CARDS = [
  { title: "Старт за 2 недели", text: "быстрый запуск проекта" },
  { title: "Ответ за 2 дня", text: "рассмотрение в профильном институте" },
  { title: "NDA при необходимости", text: "конфиденциальность под защитой" },
];

// Амплитуда, период и фаза левитации — у каждой карточки своя, чтобы
// «дышали» вразнобой. Отрицательные задержки стартуют цикл с середины.
const FLOAT_AMP = ["-16px", "-22px", "-18px"];
const FLOAT_DUR = ["6.5s", "8s", "7s"];
const FLOAT_DELAY = ["0s", "-1.6s", "-3.2s"];

/** Парящий знак ТПУ на фоне: медленный цикл вверх-вниз с лёгким поворотом. */
function FloatingMark({ className, duration }: { className?: string; duration: number }) {
  const reduce = useReducedMotion() === true;
  const t = useSpring({
    from: { v: 0 },
    to: { v: 1 },
    loop: { reverse: true },
    config: { duration, easing: easings.easeInOutSine },
    immediate: reduce,
  });
  const y = t.v.to({ range: [0, 1], output: [0, -16] });
  const rot = t.v.to({ range: [0, 1], output: [0, 2] });

  return (
    <animated.span
      aria-hidden
      style={{ transform: combine([y, rot], (yy, r) => `translate3d(0, ${yy}px, 0) rotate(${r}deg)`) }}
      className={cn("pointer-events-none absolute", className)}
    >
      <TpuMark variant="dark" className="h-full w-auto" />
    </animated.span>
  );
}

/** Бегущая точка в индикаторе прокрутки. */
function ScrollDot() {
  const reduce = useReducedMotion() === true;
  const dot = useSpring({
    from: { y: 0, o: 0 },
    to: [
      { y: 12, o: 1, config: { duration: 900, easing: easings.easeOutQuad } },
      { y: 14, o: 0, config: { duration: 800, easing: easings.easeOutQuad } },
      { y: 0, o: 0, config: { duration: 0 } },
    ],
    loop: true,
    immediate: reduce,
  });

  return (
    <animated.span
      style={{ transform: dot.y.to((v) => `translate3d(0, ${v}px, 0)`), opacity: dot.o }}
      className="h-2 w-1 rounded-full bg-white"
    />
  );
}

/** Живая точка в чипе «Приём заявок открыт». */
function PulseDot() {
  const reduce = useReducedMotion() === true;
  const pulse = useSpring({
    from: { scale: 1, o: 0.9 },
    to: { scale: 2.2, o: 0 },
    loop: true,
    config: { duration: 1800, easing: easings.easeOutQuad },
    immediate: reduce,
  });
  return (
    <span className="relative flex h-2 w-2">
      <animated.span
        style={{ scale: pulse.scale, opacity: pulse.o }}
        className="absolute inset-0 rounded-full bg-brand-400"
      />
      <span className="relative h-2 w-2 rounded-full bg-brand-400" />
    </span>
  );
}

/** Парящая карточка-стекло: вход пружиной, левитация — CSS на композиторе. */
function FloatingCard({ card, index }: { card: (typeof HERO_CARDS)[number]; index: number }) {
  const reduce = useReducedMotion() === true;

  const enter = useSpring({
    from: { opacity: 0, y: 24, scale: 0.96 },
    to: { opacity: 1, y: 0, scale: 1 },
    delay: 1150 + index * 150,
    config: springGentle,
    immediate: reduce,
  });

  const floatStyle = {
    "--float-amp": FLOAT_AMP[index],
    "--float-dur": FLOAT_DUR[index],
    "--float-delay": FLOAT_DELAY[index],
  } as CSSProperties;

  return (
    <animated.div
      style={{
        opacity: enter.opacity,
        transform: combine([enter.y, enter.scale], (y, s) => `translate3d(0, ${y}px, 0) scale(${s})`),
      }}
    >
      <div className="glass-card glass-float flex items-center gap-2.5 rounded-xl px-3 py-2" style={floatStyle}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-md shadow-brand-500/30">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="whitespace-nowrap text-xs font-bold leading-tight text-white">{card.title}</p>
          <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium leading-none text-white/55">{card.text}</p>
        </div>
      </div>
    </animated.div>
  );
}

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
  const [words] = useTrail(WORD_COUNT, (i) => ({
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
      {/* Знаки — в свободных зонах по краям, вне текстового контента */}
      <FloatingMark duration={7000} className="right-[5%] top-[7%] hidden h-20 w-auto opacity-25 lg:block" />
      <FloatingMark duration={11000} className="right-[6%] bottom-[8%] hidden h-12 w-auto opacity-20 lg:block" />

      {/* Парящие карточки преимуществ — поверх фото, справа */}
      <div className="pointer-events-none absolute right-[3%] top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex">
        {HERO_CARDS.map((card, i) => (
          <FloatingCard key={card.title} card={card} index={i} />
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
          {LINES.map((line, li) => (
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
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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
