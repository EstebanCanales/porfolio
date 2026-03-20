import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://andromedatsx.dev";

  const projectUrls = [
    { url: `${baseUrl}/qxenith` },
    { url: `${baseUrl}/koenigsegg-cc850` },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
