import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sebastián García — SentinelDev",
    short_name: "SG · SentinelDev",
    description:
      "Systems Architect · Applied AI & Security Engineering. Engineering Beyond the Prototype.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1119",
    theme_color: "#0B1119",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

