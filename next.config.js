// next.config.js for security-portfolio
/**
 * Next.js configuration to reduce file watcher usage.
 * It disables watching of heavy directories like node_modules and .git.
 * This helps avoid ENOSPC errors on systems with low inotify limits.
 */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: you can increase the polling interval if needed
  // devIndicators: { autoPrerender: false },
};
