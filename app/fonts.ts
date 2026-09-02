import {
  Inter,
  Montserrat,
  Roboto,
  Roboto_Serif,
  Roboto_Mono,
  Roboto_Slab,
  Roboto_Flex,
  Roboto_Condensed,
  Marcellus,
  Plus_Jakarta_Sans,
  Grenze,
} from "next/font/google";

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

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
export const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
export const roboto_con = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
export const robotoserif = Roboto_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
export const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
