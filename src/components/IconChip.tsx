import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function IconChip({ children }: Props) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-400 transition-colors duration-200 group-hover:border-brand-500/50 group-hover:bg-brand-500/10">
      {children}
    </span>
  );
}
