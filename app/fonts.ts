import { Marcellus, Plus_Jakarta_Sans, Grenze } from "next/font/google";

export const marcellus = Marcellus({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

// Non-variable fonts require a specific weight

export const Jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const grenze = Grenze({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
