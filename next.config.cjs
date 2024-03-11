/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
(async () => {
  await import('./lib/env.js');
})();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
