import { MetadataRoute } from "next";
import citiesData from "@/data/cities.json";
import shopsData from "@/data/shops.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hela.do";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/que-es-helado`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const cityPages = citiesData.map((city) => ({
    url: `${baseUrl}/ciudad/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const shopPages = shopsData.map((shop) => ({
    url: `${baseUrl}/heladeria/${shop.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...cityPages, ...shopPages];
}
