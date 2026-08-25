export const nameRule = {
  min: 2,
  max: 60,
  message: "Please enter your full name (2–60 characters).",
};

export const phoneRule = {
  pattern: /^(0|\+213)\d{9}$/,
  htmlPattern: "[0+][0-9\\s.-]{9,18}",
  message:
    "Enter a valid phone number — 10 digits starting with 0, or +213 followed by 9 digits.",
};

export const noteRule = {
  max: 300,
  message: "Notes are limited to 300 characters.",
};

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

export function dayOfWeek(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

export function validateDate(
  value: string,
  dayPref: "weekday" | "weekend" | undefined,
  today: string,
): string | undefined {
  if (!value) return undefined;
  const max = addDays(today, 7);
  if (value < today || value > max) {
    return `Choose a date between ${today} and ${max}.`;
  }
  if (dayPref) {
    const dow = dayOfWeek(value);
    const isWeekend = dow === 0 || dow === 6;
    if (dayPref === "weekday" && isWeekend) {
      return `That date falls on a weekend — choose a weekday between ${today} and ${max}.`;
    }
    if (dayPref === "weekend" && !isWeekend) {
      return `That date falls on a weekday — choose a Saturday or Sunday between ${today} and ${max}.`;
    }
  }
  return undefined;
}

export function validateName(value: string): string | undefined {
  const v = value.trim();
  return v.length >= nameRule.min && v.length <= nameRule.max
    ? undefined
    : nameRule.message;
}

export function validatePhone(value: string): string | undefined {
  const cleaned = value.replace(/[\s.-]/g, "");
  return phoneRule.pattern.test(cleaned) ? undefined : phoneRule.message;
}

export function validateNote(value: string): string | undefined {
  return value.trim().length <= noteRule.max ? undefined : noteRule.message;
}
