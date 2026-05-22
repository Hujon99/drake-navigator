import { Logo } from "./Logo";

export function SlideFooterLogo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 opacity-90">
      <Logo variant={variant} className="h-6" />
    </div>
  );
}
