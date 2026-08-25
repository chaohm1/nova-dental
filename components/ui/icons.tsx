import {
  Anchor,
  Armchair,
  Baby,
  CalendarCheck,
  CalendarPlus,
  ClipboardList,
  Crown,
  HeartHandshake,
  Layers,
  MessageCircle,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Users,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons = {
  general: Stethoscope,
  pediatric: Baby,
  ortho: Smile,
  restorative: Crown,
  implant: Anchor,
  aesthetic: Sparkles,
  surgery: Syringe,
} as const satisfies Record<string, LucideIcon>;

export type CategoryKey = keyof typeof categoryIcons;

export const whyIcons = {
  layers: Layers,
  users: Users,
  armchair: Armchair,
  "message-circle": MessageCircle,
} as const satisfies Record<string, LucideIcon>;

export type WhyKey = keyof typeof whyIcons;

export const stepIcons = {
  "calendar-plus": CalendarPlus,
  armchair: Armchair,
  "clipboard-list": ClipboardList,
  "heart-handshake": HeartHandshake,
  "calendar-check": CalendarCheck,
} as const satisfies Record<string, LucideIcon>;

export type StepKey = keyof typeof stepIcons;

export const categoryTint: Record<CategoryKey, string> = {
  general: "bg-cat-general/8 text-cat-general",
  pediatric: "bg-cat-pediatric/8 text-cat-pediatric",
  ortho: "bg-cat-ortho/8 text-cat-ortho",
  restorative: "bg-cat-restorative/8 text-cat-restorative",
  implant: "bg-cat-implant/8 text-cat-implant",
  aesthetic: "bg-cat-aesthetic/8 text-cat-aesthetic",
  surgery: "bg-cat-surgery/8 text-cat-surgery",
};

export const categoryColor: Record<CategoryKey, string> = {
  general: "text-cat-general",
  pediatric: "text-cat-pediatric",
  ortho: "text-cat-ortho",
  restorative: "text-cat-restorative",
  implant: "text-cat-implant",
  aesthetic: "text-cat-aesthetic",
  surgery: "text-cat-surgery",
};

export const categoryBorder: Record<CategoryKey, string> = {
  general: "border-cat-general",
  pediatric: "border-cat-pediatric",
  ortho: "border-cat-ortho",
  restorative: "border-cat-restorative",
  implant: "border-cat-implant",
  aesthetic: "border-cat-aesthetic",
  surgery: "border-cat-surgery",
};

export const categoryHoverTint: Record<CategoryKey, string> = {
  general: "hover:bg-cat-general/8",
  pediatric: "hover:bg-cat-pediatric/8",
  ortho: "hover:bg-cat-ortho/8",
  restorative: "hover:bg-cat-restorative/8",
  implant: "hover:bg-cat-implant/8",
  aesthetic: "hover:bg-cat-aesthetic/8",
  surgery: "hover:bg-cat-surgery/8",
};

export function CategoryIcon({
  name,
  size = 24,
  className,
  label,
}: {
  name: CategoryKey;
  size?: 24 | 32;
  className?: string;
  label?: string;
}) {
  const Icon = categoryIcons[name];
  return (
    <Icon
      strokeWidth={1.5}
      size={size}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
