import type { MetaProps } from '@/types/seo';

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(props: MetaProps): string {
  const {
    title,
    description,
    image = '',
    path = '',
    locale = 'en',
    siteName = 'Visa Itinerary',
    twitterHandle = '@visaitinerary'
  } = props;

  // Default values
  const defaultTitle = `${title} | ${siteName}`;
  const defaultDescription = description || 'Discover visa requirements and travel information for destinations worldwide.';
  const defaultImage = image || `${getSiteUrl()}/og-image.jpg`;
  const canonicalUrl = path ? `${getSiteUrl()}${path}` : getSiteUrl();

  return `
    <title>${escapeHtml(defaultTitle)}</title>
    <meta name="description" content="${escapeHtml(defaultDescription)}" />

    <!-- Open Graph -->
    <meta property="og:title" content="${escapeHtml(defaultTitle)}" />
    <meta property="og:description" content="${escapeHtml(defaultDescription)}" />
    <meta property="og:image" content="${escapeHtml(defaultImage)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(defaultTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(defaultDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(defaultImage)}" />
    <meta name="twitter:site" content="${twitterHandle}" />

    <!-- Canonical -->
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <!-- Mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  `.trim();
}

/**
 * Get site URL from environment or default
 */
function getSiteUrl(): string {
  // In a real implementation, this would come from environment variables
  // For now, we'll use a placeholder
  return typeof window !== 'undefined'
    ? window.location.origin
    : 'https://visaitinerary.example.com';
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Define meta props type
 */
export interface MetaProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
}