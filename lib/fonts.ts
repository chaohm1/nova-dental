import { Newsreader, Geist } from "next/font/google";

export const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});