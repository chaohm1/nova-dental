export const doctors = [
  {
    id: "amina",
    initials: "AB",
    name: "Dr. Amina Belkacem",
    role: "Clinical Director · General & Restorative Dentistry",
    colorKey: "general",
    focusAreas: [
      "Check-ups and prevention",
      "Fillings, crowns, and bridges",
      "Root canal treatment",
      "Aesthetic treatments",
    ],
    approach:
      "Dr. Belkacem starts every visit by listening — what is bothering you, what you have tried, and what you want your teeth to do for you. She explains what she finds in plain language, lays out the options with honest costs, and only treats once you have chosen together. Nervous patients get longer appointments, and nothing happens without your agreement.",
  },
  {
    id: "rayan",
    initials: "RM",
    name: "Dr. Rayan Meziane",
    role: "Orthodontist",
    colorKey: "ortho",
    focusAreas: [
      "Braces for teens and adults",
      "Clear aligners",
      "Retainers and follow-up",
    ],
    approach:
      "Dr. Meziane plans orthodontic treatment around the person, not the appliance. He shows you what he sees, explains what braces or aligners can and cannot change, and gives you a realistic timeline before you commit. Through treatment he checks progress regularly and tells you plainly when things are on track — and when they are not.",
  },
  {
    id: "sofia",
    initials: "SH",
    name: "Dr. Sofia Haddad",
    role: "Pediatric Dentist & Oral Surgeon",
    colorKey: "pediatric",
    focusAreas: [
      "Children's first visits",
      "Extractions",
      "Minor oral surgery",
    ],
    approach:
      "Dr. Haddad works at the speed of her patient, whether that is a five-year-old on a first visit or an adult facing an extraction. She explains each step before doing it, stops when asked, and never treats a child who is not ready that day — prevention and trust come before procedures.",
  },
] as const;

export type Doctor = (typeof doctors)[number];
