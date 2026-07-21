import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-cream hover:bg-maroon-dark shadow-[var(--shadow-soft)] hover:-translate-y-0.5",
  gold: "bg-gold text-maroon-dark hover:bg-gold-dark hover:text-cream hover:-translate-y-0.5",
  outline:
    "border border-maroon/40 text-maroon hover:border-maroon hover:bg-maroon hover:text-cream",
  ghost: "text-maroon hover:text-gold-dark",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/** Renders an <a>/Link when `href` is given, otherwise a <button>. */
export default function Button(
  props: CommonProps &
    (
      | ({ href: string } & React.ComponentProps<typeof Link>)
      | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    ),
) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href) {
    return (
      <Link className={classes} {...(rest as React.ComponentProps<typeof Link>)}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
