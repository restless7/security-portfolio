import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/operaciones/"],
      },
    ],
    sitemap: "https://www.sentineldev.me/sitemap.xml",
  };
}

