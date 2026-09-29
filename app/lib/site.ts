export const PRIMARY_DOMAIN = "https://www.ahmadsadiqdev.com";
export const FALLBACK_DOMAIN = "https://ahmad-sadiq-pf.vercel.app";

/**
 * Returns the currently active site URL.
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL environment variable (if explicitly configured)
 * 2. Automatic Vercel deployment URL (VERCEL_URL)
 * 3. Fallback production hosting URL (ahmad-sadiq-pf.vercel.app)
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    return envUrl.startsWith("http")
      ? envUrl.replace(/\/$/, "")
      : `https://${envUrl}`.replace(/\/$/, "");
  }

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`.replace(/\/$/, "");
  }

  return FALLBACK_DOMAIN;
}
