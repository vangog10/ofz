import type { ReactNode } from "react";
import IconChip from "./IconChip";

type Props = {
  icon: ReactNode;
  label: string;
};

export default function FooterRow({ icon, label }: Props) {
  return (
    <div className="flex items-center gap-3.5 text-sm font-medium text-neutral-300">
      <IconChip>{icon}</IconChip>
      {label}
    </div>
  );
}
