import { defineCollection, z } from 'astro:content';

// Define schemas for each collection
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const faqCollection = defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number().default(0),
  }),
});

const legalCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    content: z.string(),
    category: z.enum(['privacy', 'terms', 'disclaimer']),
    version: z.string(),
    lastUpdated: z.date(),
  }),
});

const pricingCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    interval: z.enum(['monthly', 'yearly', 'lifetime']),
    features: z.array(z.string()),
    popular: z.boolean().default(false),
    recommended: z.boolean().default(false),
  }),
});

const countryCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    iso2: z.string().length(2),
    iso3: z.string().length(3),
    region: z.string(),
    subregion: z.string().optional(),
    capital: z.string(),
    population: z.number(),
    area: z.number().optional(),
    currencyCode: z.string().length(3),
    currencyName: z.string(),
    languages: z.array(z.string()),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    heroImage: z.string().optional(),
    passportImage: z.string().optional(),
    verifiedAt: z.string().datetime(),
    sourceAttribution: z.string().url().optional(),
  }),
});

const visaCollection = defineCollection({
  schema: z.object({
    destinationCountryId: z.string(),
    passportCountryId: z.string(),
    kind: z.enum(['tourist', 'transit', 'digital-nomad']),
    requirement: z.enum([
      'visa-free',
      'visa-on-arrival',
      'evisa',
      'sticker-visa',
      'visa-refused',
      'not-available',
    ]),
    stayDays: z.number().optional(),
    processingDays: z.object({
      min: z.number(),
      max: z.number(),
    }).optional(),
    fee: z.object({
      amount: z.number(),
      currencyCode: z.string().length(3),
    }).optional(),
    applicationUrl: z.string().url().optional(),
    conditions: z.array(z.string()),
    documents: z.array(z.string()),
    sourceUrls: z.array(z.string().url()),
    verifiedAt: z.string().datetime(),
    confidence: z.enum(['official', 'partner', 'community-review', 'unknown']),
  }),
});

const passportCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    iso2: z.string().length(2),
    iso3: z.string().length(3),
    region: z.string(),
    population: z.number(),
    verifiedAt: z.string().datetime(),
    sourceAttribution: z.string().url().optional(),
    ranking: z.number().optional(),
    visaFreeCount: z.number().optional(),
    visaOnArrivalCount: z.number().optional(),
    eVisaCount: z.number().optional(),
  }),
});

const travelCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    region: z.string(),
    safetyStatus: z.enum([
      'normal',
      'stay-alert',
      'reconsider',
      'avoid-travel',
      'unknown',
    ]),
    verifiedAt: z.string().datetime(),
    sourceAttribution: z.string().url().optional(),
  }),
});

const customsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    countryId: z.string(),
    verifiedAt: z.string().datetime(),
    sourceAttribution: z.string().url().optional(),
  }),
});

const healthCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    countryId: z.string(),
    verifiedAt: z.string().datetime(),
    sourceAttribution: z.string().url().optional(),
  }),
});

const embassyCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    countryId: z.string(),
    city: z.string(),
    address: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().url().optional(),
    verifiedAt: z.string().datetime(),
    sourceAttribution: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  faq: faqCollection,
  legal: legalCollection,
  pricing: pricingCollection,
  country: countryCollection,
  visa: visaCollection,
  passport: passportCollection,
  travel: travelCollection,
  customs: customsCollection,
  health: healthCollection,
  embassy: embassyCollection,
};