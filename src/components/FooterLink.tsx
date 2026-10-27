import type { ReactNode } from "react";
import IconChip from "./IconChip";

type Props = {
  icon: ReactNode;
  label: string;
  href: string;
};

export default function FooterLink({ icon, label, href }: Props) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3.5 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:text-white"
    >
      <IconChip>{icon}</IconChip>
      {label}
    </a>
  );
}
