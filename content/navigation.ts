export const navigation = {
  nav: [
    { href: "/", label: "Home" },
    { href: "/treatments", label: "Treatments" },
    { href: "/team", label: "Team" },
    { href: "/clinic", label: "Clinic" },
    { href: "/faq", label: "FAQ" },
  ],
  cta: {
    href: "/appointment",
    label: "Request an appointment",
    short: "Book a visit",
  },
  footer: {
    explore: [
      { href: "/treatments", label: "Treatments" },
      { href: "/team", label: "Team" },
      { href: "/clinic", label: "Clinic" },
      { href: "/faq", label: "FAQ" },
      { href: "/appointment", label: "Request an appointment" },
    ],
    legal: [{ href: "/privacy", label: "Privacy" }],
  },
} as const;
