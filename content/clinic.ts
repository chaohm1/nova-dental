export const clinic = {
  name: "NOVA Dental",
  nameLines: ["NOVA", "Dental"],
  tagline: "Calm, clear dental care for every age.",
  siteUrl: "https://nova-dental.example",
  phone: "213676923327",
  phoneDisplay: "+213 676 92 33 27",
  whatsappText: "Hello, I'd like to request an appointment.",
  hours: {
    weekdays: "Monday to Friday · 08:30–17:00",
    saturday: "Saturday · 09:00–13:00",
    closed: "Closed on Sunday",
  },
  hoursSpec: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:00",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  social: {
    instagram: "",
  },
  whyNova: [
    {
      iconKey: "layers",
      title: "Comprehensive care under one roof",
      body: "Check-ups, braces, implants, and children's visits happen in the same place, with the same records and the same team.",
    },
    {
      iconKey: "users",
      title: "A team, not a solo practice",
      body: "Three dentists with different specialities work together, so the right clinician treats the right problem.",
    },
    {
      iconKey: "armchair",
      title: "A calm environment",
      body: "Quiet rooms, unhurried appointments, and a team that expects nervous patients — tell us, and we'll adapt the visit.",
    },
    {
      iconKey: "message-circle",
      title: "Clear explanations before treatment",
      body: "You'll know what we found, what the options are, and what each one costs before anything starts.",
    },
  ],
} as const;
