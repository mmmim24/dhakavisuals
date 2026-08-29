import {
  Inter,
  Macondo,
  Exo,
  Marcellus,
  Roboto_Slab,
  Artifika,
  Montserrat,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const macondo = Macondo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const exo = Exo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const marcellus = Marcellus({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

// Non-variable fonts require a specific weight
export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const artifika = Artifika({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
