export const treatments = [
  {
    slug: "general",
    title: "General dentistry",
    blurb:
      "Check-ups, cleanings, and small fillings that stop problems while they are still small.",
    description:
      "General dentistry is the routine care that keeps your mouth healthy: examinations, professional cleaning, and treating decay early. Most people need a check-up at least once a year, but the right interval for you depends on your teeth — we'll recommend one after your examination.",
    services: [
      "Examination and diagnosis",
      "Scale and polish",
      "Fillings",
      "Preventive advice",
    ],
    iconKey: "general",
    colorKey: "general",
    doctorIds: ["amina"],
  },
  {
    slug: "pediatric",
    title: "Children's dentistry",
    blurb:
      "Gentle first visits, prevention, and treatment sized for children — building trust matters more than rushing care.",
    description:
      "Children's appointments move at a slower pace and use simpler words. The first visits are mostly about getting comfortable: counting teeth, a gentle clean, and advice for parents on brushing, diet, and habits like thumb-sucking. Treatment is only ever as much as the child can cope with that day.",
    services: [
      "First visit and check-ups",
      "Fluoride and sealants",
      "Fillings for baby and adult teeth",
      "Advice for parents",
    ],
    iconKey: "pediatric",
    colorKey: "pediatric",
    doctorIds: ["sofia"],
  },
  {
    slug: "ortho",
    title: "Orthodontics",
    blurb:
      "Braces and clear aligners that straighten teeth and correct bites — for teenagers and adults alike.",
    description:
      "Orthodontic treatment moves teeth into a healthier position using braces or clear aligners. It can address crowding, gaps, and bite problems that make cleaning harder. Every case starts with an assessment and imaging, and a plan with realistic timelines — treatment length depends on what needs to move.",
    services: [
      "Assessment and treatment planning",
      "Fixed braces",
      "Clear aligners",
      "Retainers and follow-up",
    ],
    iconKey: "ortho",
    colorKey: "ortho",
    doctorIds: ["rayan"],
  },
  {
    slug: "restorative",
    title: "Restorative dentistry",
    blurb:
      "Repairing damaged or missing teeth with fillings, crowns, bridges, dentures, and root canal treatment.",
    description:
      "When a tooth is decayed, broken, or missing, restorative treatment brings back function and appearance. That ranges from a small filling to a crown, a bridge, or a denture. Root canal treatment saves a tooth whose nerve is infected rather than removing it. We'll explain what is possible for your tooth before you decide anything.",
    services: [
      "Fillings and inlays",
      "Crowns and bridges",
      "Root canal treatment",
      "Full and partial dentures",
    ],
    iconKey: "restorative",
    colorKey: "restorative",
    doctorIds: ["amina"],
  },
  {
    slug: "implant",
    title: "Dental implants",
    blurb:
      "A fixed replacement for missing teeth: a titanium root topped with a crown, bridge, or denture.",
    description:
      "An implant is a small titanium post placed in the jaw that carries a replacement tooth. It can replace a single tooth, support a bridge, or hold a denture steady. Implants need healthy gums and enough bone, and suitability is confirmed after examination and imaging — not everyone is a candidate, and we'll say so honestly.",
    services: [
      "Consultation and imaging",
      "Single-tooth implants",
      "Implant-supported bridges",
      "Implant-stabilised dentures",
    ],
    iconKey: "implant",
    colorKey: "implant",
    doctorIds: ["sofia", "amina"],
  },
  {
    slug: "aesthetic",
    title: "Aesthetic dentistry",
    blurb:
      "Whitening, veneers, and bonding that improve how your smile looks while protecting the teeth underneath.",
    description:
      "Aesthetic treatment changes the appearance of teeth — their shade, shape, or small irregularities. Whitening brightens natural teeth; bonding and veneers reshape chipped or uneven ones. Any aesthetic plan starts from healthy teeth, and we'll tell you plainly when a simpler treatment would serve you better.",
    services: [
      "Whitening",
      "Veneers",
      "Composite bonding",
      "Smile assessment",
    ],
    iconKey: "aesthetic",
    colorKey: "aesthetic",
    doctorIds: ["amina"],
  },
  {
    slug: "surgery",
    title: "Oral surgery",
    blurb:
      "Extractions, wisdom teeth, and minor procedures done gently, with clear aftercare and follow-up.",
    description:
      "Some problems need a surgical answer: a tooth too broken to save, a wisdom tooth causing pain, or small procedures on the gums and bone. Oral surgery at NOVA is planned carefully, done under local anaesthetic, and followed by written aftercare instructions and a check that you are healing well.",
    services: [
      "Extractions",
      "Wisdom-tooth removal",
      "Frenectomy and minor soft-tissue procedures",
      "Post-surgical follow-up",
    ],
    iconKey: "surgery",
    colorKey: "surgery",
    doctorIds: ["sofia"],
  },
] as const;

export type Treatment = (typeof treatments)[number];
