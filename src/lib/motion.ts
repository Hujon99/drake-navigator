import type { Variants, Transition } from "motion/react";

export const easeOut: Transition["ease"] = [0.2, 0, 0, 1];

export const slideVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: easeOut } },
  exit: { opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.3, ease: easeOut } },
};

export const stagger = (delay = 0.06): Variants => ({
  animate: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};
