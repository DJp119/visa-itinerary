import type { JsonLdProps } from '@/types/seo';

/**
 * Generate JSON-LD structured data
 */
export function generateJsonLd(props: JsonLdProps): string {
  const { type, ...data } = props;

  // Remove undefined values
  const cleanedData: Record<string, any> = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      cleanedData[key] = data[key];
    }
  });

  const jsonLdObject = {
    "@context": "https://schema.org",
    "@type": type,
    ...cleanedData
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonLdObject, null, 2)}</script>`;
}

/**
 * Define JSON-LD props type
 */
export interface JsonLdProps {
  type: string;
  [key: string]: any;
}

/**
 * Predefined JSON-LD generators for common types
 */
export const jsonLdGenerators = {
  /**
   * Website JSON-LD for homepage
   */
  website: (props: {
    name: string;
    url: string;
    description?: string;
    publisherName?: string;
    publisherLogo?: string;
  }) => ({
    type: 'WebSite',
    name: props.name,
    url: props.url,
    description: props.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${props.url}/search?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    ...(props.publisherName && {
      publisher: {
        "@type": "Organization",
        name: props.publisherName,
        logo: props.publisherLogo || {
          "@type": "ImageObject",
          url: props.publisherLogo
        }
      }
    })
  }),

  /**
   * BreadcrumbList JSON-LD
   */
  breadcrumbList: (props: {
    items: Array<{ name: string; url: string; position: number }>;
  }) => ({
    type: 'BreadcrumbList',
    itemListElement: props.items.map(item => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.url
    }))
  }),

  /**
   * FAQPage JSON-LD
   */
  faqPage: (props: {
    question: string;
    answer: string;
  }) => ({
    type: 'FAQPage',
    mainEntity: [{
      "@type": "Question",
      name: props.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: props.answer
      }
    }]
  }),

  /**
   * ItemList JSON-LD for directories/rankings
   */
  itemList: (props: {
    name: string;
    itemListElement: Array<{ name: string; url: string; position: number }>;
  }) => ({
    type: 'ItemList',
    name: props.name,
    itemListElement: props.itemListElement.map(item => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.url
    }))
  }),

  /**
   * Article JSON-LD for guides
   */
  article: (props: {
    headline: string;
    description?: string;
    image?: string;
    authorName?: string;
    publisherName?: string;
    publisherLogo?: string;
    datePublished?: string;
    dateModified?: string;
  }) => ({
    type: 'Article',
    headline: props.headline,
    description: props.description,
    image: props.image,
    author: props.authorName ? {
      "@type": "Person",
      name: props.authorName
    } : undefined,
    publisher: props.publisherName ? {
      "@type": "Organization",
      name: props.publisherName,
      logo: props.publisherLogo ? {
        "@type": "ImageObject",
        url: props.publisherLogo
      } : undefined
    } : undefined,
    datePublished: props.datePublished,
    dateModified: props.dateModified
  }),

  /**
   * Organization JSON-LD
   */
  organization: (props: {
    name: string;
    url?: string;
    logo?: string;
    sameAs?: string[];
    contactPoint?: Array<{
      "@type": "ContactPoint";
      telephone: string;
      contactType: string;
      areaServed?: string;
      availableLanguage?: string[];
    }>;
  }) => ({
    type: 'Organization',
    name: props.name,
    url: props.url,
    logo: props.logo,
    sameAs: props.sameAs,
    contactPoint: props.contactPoint
  })
};