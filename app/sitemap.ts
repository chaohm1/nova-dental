import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";

const routes = [
  "",
  "/treatments",
  "/team",
  "/clinic",
  "/faq",
  "/appointment",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${clinic.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
