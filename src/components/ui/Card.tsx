import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  as?: ElementType;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

/** Light border instead of heavy shadow, 12px radius. */
export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-sky-200 bg-white",
        interactive && "transition-colors hover:border-navy-700",
        className,
      )}
    >
      {children}
    </Tag>
  );
}