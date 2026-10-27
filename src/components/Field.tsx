import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import FieldError from "./FieldError";

type Props = {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export default function Field({ label, error, children, className }: Props) {
  return (
    <div className={cn("block", className)}>
      <label className="block">
        <span className="mb-2 block text-[15px] font-extrabold">{label}</span>
        {children}
      </label>
      {error && <FieldError message={error} />}
    </div>
  );
}
