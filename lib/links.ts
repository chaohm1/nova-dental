import { clinic } from "@/content/clinic";

export const telUrl = `tel:+${clinic.phone}`;

export const whatsappUrl = (text: string = clinic.whatsappText) =>
  `https://wa.me/${clinic.phone}?text=${encodeURIComponent(text)}`;
