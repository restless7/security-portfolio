import type { MetadataRoute } from "next";

const baseUrl = "https://www.sentineldev.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/projects/cloud-hardening",
    "/projects/redteam",
    "/about",
    "/skills",
    "/blog",
    "/blog/saas-startups-fail-security",
    "/blog/react-lead-capture-security-best-practices",
    "/services",
    "/certifications",
    "/security-posture",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-11-23"),
    changeFrequency: route === "" || route === "/projects" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/projects" || route === "/about" ? 0.9 : 0.7,
  }));
}

