import { z } from 'zod';

export const visaKindSchema = z.enum(['tourist', 'transit', 'digital-nomad']);
export type VisaKind = z.infer<typeof visaKindSchema>;

export const requirementKindSchema = z.enum([
  'visa-free',
  'visa-on-arrival',
  'evisa',
  'sticker-visa',
  'visa-refused',
  'not-available',
]);
export type RequirementKind = z.infer<typeof requirementKindSchema>;

export const confidenceSchema = z.enum([
  'official',
  'partner',
  'community-review',
  'unknown',
]);
export type Confidence = z.infer<typeof confidenceSchema>;

export const visaRequirementSchema = z.object({
  id: z.string(),
  destinationCountryId: z.string(),
  passportCountryId: z.string(),
  kind: visaKindSchema,
  requirement: requirementKindSchema,
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
  confidence: confidenceSchema,
});

export type VisaRequirement = z.infer<typeof visaRequirementSchema>;

// Visa Policy Schema
export const visaPolicySchema = z.object({
  id: z.string(),
  countryId: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  // Policy sections
  entryRequirements: z.array(z.object({
    title: z.string(),
    description: z.string(),
    requirements: z.array(z.string()),
    documents: z.array(z.string()),
  })),
  visaTypes: z.array(z.object({
    type: z.string(), // tourist, business, student, work, etc.
    description: z.string(),
    requirements: z.array(z.string()),
    process: z.array(z.string()),
    fees: z.array(z.object({
      amount: z.number(),
      currencyCode: z.string().length(3),
      description: z.string(),
    })),
    processingTime: z.object({
      min: z.number(),
      max: z.number(),
    }).optional(),
  })),
  immigrationRules: z.array(z.object({
    title: z.string(),
    description: z.string(),
    rules: z.array(z.string()),
  })),
  // Additional info
  visaFreeCountries: z.array(z.string()).optional(), // Countries whose citizens can visit visa-free
  visaOnArrivalCountries: z.array(z.string()).optional(), // Countries eligible for visa on arrival
  electronicTravelAuthorization: z.boolean().optional(), // e.g., ESTA, eTA
  verifiedAt: z.string().datetime(),
  sourceAttribution: z.string().url().optional(),
  confidence: confidenceSchema,
});

export type VisaPolicy = z.infer<typeof visaPolicySchema>;