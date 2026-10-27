import { animated, easings, to as combine, useReducedMotion, useSpring } from "@react-spring/web";
import { CircleAlert, Check, File, FileX, RotateCcw } from "lucide-react";
import { formatSize } from "../utils/format";
import { cn } from "../utils/cn";
import type UploadItem from "../interfaces/uploadItem.interface";

type Props = {
  file: UploadItem;
  onRetry: () => void;
  onRemove: () => void;
};

export default function FileItem({ file, onRetry, onRemove }: Props) {
  const reduce = useReducedMotion() === true;

  const popStyle = useSpring({
    from: { opacity: 0, y: 6, scale: 0.92 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { mass: 0.9, tension: 400, friction: 22 },
    immediate: reduce,
  });
  const shimmer = useSpring({
    from: { x: -100 },
    to: { x: 250 },
    loop: true,
    config: { duration: 1300, easing: easings.linear },
    immediate: reduce,
  });

  return (
    <animated.li
      style={{
        opacity: popStyle.opacity,
        transform: combine([popStyle.y, popStyle.scale], (y, s) => `translate3d(0, ${y}px, 0) scale(${s})`),
      }}
      className={cn(
        "relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 transition-colors duration-200",
        file.status === "error" && "bg-red-50"
      )}
    >
      <span
        className={cn(
          "hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:flex",
          file.status === "error" ? "bg-red-100 text-red-500" : "bg-neutral-100 text-neutral-500"
        )}
      >
        <File className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{file.name}</p>
        <p className="truncate text-[11px] font-medium text-neutral-400">
          {file.type}
          <span className="sm:hidden"> · {formatSize(file.sizeKb)}</span>
          {file.status === "error" && (
            <span className="font-semibold text-red-500 sm:hidden"> · {file.error}</span>
          )}
          {file.status === "loading" && <span className="sm:hidden"> · Загрузка</span>}
        </p>
      </div>

      <span className="hidden text-xs font-medium text-neutral-400 sm:block">{formatSize(file.sizeKb)}</span>

      <span className="flex shrink-0 justify-end text-xs font-semibold sm:w-32">
        {file.status === "error" && (
          <span className="hidden items-center gap-1.5 text-red-500 sm:flex">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span className="leading-tight">{file.error}</span>
          </span>
        )}
        {file.status === "done" && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        )}
        {file.status === "loading" && <span className="hidden text-neutral-500 sm:block">Загрузка</span>}
      </span>

      <div className="flex shrink-0 items-center gap-1.5">
        {file.status === "error" && file.retryable && (
          <button
            type="button"
            onClick={onRetry}
            aria-label={`Повторить загрузку: ${file.name}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-neutral-300 bg-white text-ink transition-[border-color,color,transform] duration-150 hover:border-brand-500 hover:text-brand-600 active:scale-90"
          >
            <RotateCcw className="h-4.5 w-4.5" />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Удалить файл: ${file.name}`}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 text-ink transition-[background-color,color,transform] duration-150 hover:bg-red-100 hover:text-red-600 active:scale-90"
        >
          <FileX className="h-4.5 w-4.5" />
        </button>
      </div>

      {file.status === "loading" && (
        <span className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-neutral-100" aria-hidden>
          <animated.span
            style={{ transform: shimmer.x.to((x) => `translate3d(${x}%, 0, 0)`) }}
            className="block h-full w-2/5 rounded-full bg-brand-500"
          />
        </span>
      )}
    </animated.li>
  );
}
