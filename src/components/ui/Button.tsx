import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "accent" | "secondary" | "outline-light";
type ButtonSize = "md" | "lg";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-control py-2.5 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  // Navy fill, white text
  primary: "bg-navy-900 text-white hover:bg-navy-700",
  // Green fill, navy text (never green text on white)
  accent: "bg-green-500 text-navy-950 hover:bg-green-700 hover:text-white",
  secondary:
    "border border-navy-900 bg-white text-navy-900 hover:bg-sky-100",
  // For use on navy surfaces
  "outline-light": "border border-white/50 text-white hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-base",
  lg: "min-h-12 px-7 text-base sm:text-lg",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    />
  );
}

type ButtonLinkProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

/** Internal paths use next/link; tel:, mailto: and external URLs use <a>. */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });

  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes} {...rest} />;
  }

  return <a href={href} className={classes} {...rest} />;
}
