import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-bold uppercase tracking-[0.14em]",
            dark ? "text-green-500" : "text-green-700",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={cn("text-h2", dark && "text-white")}>
        {title}
      </Heading>
      <span
        aria-hidden="true"
        className={cn("mt-5 block h-1 w-12 rounded-full bg-green-500", centered && "mx-auto")}
      />
      {description ? (
        <p className={cn("mt-5 text-lead", dark ? "text-sky-200" : "text-ink-500")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}