import { z } from 'zod';

export const customsGuideSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  countryId: z.string(),
  slug: z.string(),
  region: z.string(),
  verifiedAt: z.string().datetime(),
  sourceAttribution: z.string().url().optional(),
});

export type CustomsGuide = z.infer<typeof customsGuideSchema>;

// For backward compatibility, CustomsRegulation refers to CustomsGuide
export type CustomsRegulation = CustomsGuide;