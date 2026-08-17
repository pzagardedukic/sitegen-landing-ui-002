import { Cinzel, Montserrat, Beau_Rivage } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cinzel",
});

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const beauRivage = Beau_Rivage({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  variable: "--font-beau-rivage",
});

export const fontConfig = {
  body: montserrat,
  heading: cinzel,
  slogan: beauRivage,
};
