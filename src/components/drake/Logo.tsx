import logoBlack from "@/assets/drake/logo-black.png";
import logoWhite from "@/assets/drake/logo-white.png";

export function Logo({ variant = "dark", className = "h-8" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <img
      src={variant === "light" ? logoWhite : logoBlack}
      alt="Drake Analytics"
      className={className}
      draggable={false}
    />
  );
}
