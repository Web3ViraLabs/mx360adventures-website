import type { MetadataRoute } from "next";
import { getAllExperiences } from "@/db/queries";
import { categories, siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const experiences = await getAllExperiences();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/adventures`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/adventures/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${base}/adventures/${e.category}/${e.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...experienceRoutes];
}
