import { ArrowRight, ArrowUpRight, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

/** Forward arrow; mirrors automatically in RTL via the .icon-forward class. */
export function ArrowForward({ className, ...props }: LucideProps) {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={1.75}
      className={cn("icon-forward size-4", className)}
      {...props}
    />
  );
}

/** Outbound arrow for external links; mirrors in RTL. */
export function ArrowOut({ className, ...props }: LucideProps) {
  return (
    <ArrowUpRight
      aria-hidden="true"
      strokeWidth={1.75}
      className={cn("icon-out size-4", className)}
      {...props}
    />
  );
}
