import { cn } from "../utils/cn";

type Variant = "light" | "dark";

/** Палитры граней [верх, лево, право] для каждого цвета кубика. */
const PALETTE: Record<Variant, Record<"g" | "k", [string, string, string]>> = {
  // для светлого фона: зелёные и чёрные кубики
  light: {
    g: ["#4fd26e", "#2cc04f", "#1f9a3d"],
    k: ["#3a3d3c", "#1a1c1b", "#0b0c0b"],
  },
  // для тёмного фона: чёрные грани заменяются белыми
  dark: {
    g: ["#4fd26e", "#2cc04f", "#1f9a3d"],
    k: ["#ffffff", "#e6e9e7", "#c8ccca"],
  },
};

/** Раскладка кубиков: [верх, лево, право] — цвет каждой грани. */
const PATTERN: ("g" | "k")[][][] = [
  [
    ["g", "k", "g"],
    ["k", "g", "k"],
    ["g", "k", "k"],
  ],
  [
    ["k", "g", "g"],
    ["g", "g", "k"],
    ["k", "k", "g"],
  ],
  [
    ["g", "g", "k"],
    ["k", "k", "g"],
    ["g", "k", "g"],
  ],
];

const S = 10;
const W = (S * Math.sqrt(3)) / 2;

const pts = (arr: number[][]) => arr.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");

export function TpuMark({
  variant = "light",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const palette = PALETTE[variant];
  const stroke = variant === "light" ? "#ffffff" : "#171918";

  return (
    <svg
      viewBox={`0 0 ${(7 * W).toFixed(2)} ${5 * S}`}
      className={className}
      role="img"
      aria-label="Логотип ТПУ"
    >
      {PATTERN.map((row, i) =>
        row.map((faces, j) => {
          const cx = (i % 2 === 0 ? W : 2 * W) + j * 2 * W;
          const cy = S + i * 1.5 * S;
          const p = [
            [cx, cy - S],
            [cx + W, cy - S / 2],
            [cx + W, cy + S / 2],
            [cx, cy + S],
            [cx - W, cy + S / 2],
            [cx - W, cy - S / 2],
          ];
          const c = [cx, cy];
          const shapes = [
            { pts: [c, p[5], p[0], p[1]], color: palette[faces[0]][0] },
            { pts: [c, p[3], p[4], p[5]], color: palette[faces[1]][1] },
            { pts: [c, p[1], p[2], p[3]], color: palette[faces[2]][2] },
          ];
          return (
            <g key={`${i}-${j}`}>
              {shapes.map((s, k) => (
                <polygon
                  key={k}
                  points={pts(s.pts)}
                  fill={s.color}
                  stroke={stroke}
                  strokeWidth={0.7}
                  strokeLinejoin="round"
                />
              ))}
            </g>
          );
        })
      )}
    </svg>
  );
}

type LogoProps = {
  variant?: Variant;
  size?: "sm" | "lg";
  className?: string;
};

export default function TpuLogo({ variant = "light", size = "sm", className }: LogoProps) {
  const dark = variant === "dark";
  return (
    <div className={cn("flex items-center", size === "sm" ? "gap-2.5 sm:gap-3" : "gap-4 sm:gap-5", className)}>
      <TpuMark
        variant={variant}
        className={cn(
          "shrink-0 transition-transform duration-300 hover:rotate-[-4deg] hover:scale-105",
          size === "sm" ? "h-8 w-auto sm:h-10" : "h-14 w-auto sm:h-24"
        )}
      />
      <div
        className={cn(
          "font-extrabold uppercase",
          dark ? "text-white" : "text-ink",
          size === "sm"
            ? "text-[8.5px] leading-[1.2] tracking-[0.08em] max-[380px]:hidden sm:text-[11px]"
            : "text-[0.95rem] leading-[1.25] tracking-[0.1em] sm:text-2xl sm:tracking-[0.14em]"
        )}
      >
        <span className="block">Томский</span>
        <span className="block">политехнический</span>
        <span className="block">университет</span>
      </div>
    </div>
  );
}
