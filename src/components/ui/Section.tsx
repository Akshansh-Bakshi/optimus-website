import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionTone = "white" | "tint" | "navy";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white",
  tint: "bg-sky-50",
  navy: "surface-dark bg-navy-950 text-sky-200",
};

type SectionProps = {
  tone?: SectionTone;
  id?: string;
  /** id of the heading inside this section, for aria-labelledby */
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  tone = "white",
  id,
  labelledBy,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-y scroll-mt-20", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}