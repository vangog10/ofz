import type { SpringConfig } from "@react-spring/web";

/**
 * Пресеты пружин проекта (подход Apple):
 * по умолчанию критические затухания без отскока, отскок — только
 * для «физичных» появлений (попы бейджей, шаги, чекбоксы).
 */

/** Появления, доводки, параллакс — плавно, без отскока (damping ≈ 1). */
export const springGentle: SpringConfig = { mass: 1, tension: 170, friction: 26 };

/** Быстрый отклик на ховер и нажатие. */
export const springSnappy: SpringConfig = { mass: 1, tension: 420, friction: 30 };

/** Медленная кинематографичная доводка (фото). */
export const springCine: SpringConfig = { mass: 1, tension: 55, friction: 24 };
