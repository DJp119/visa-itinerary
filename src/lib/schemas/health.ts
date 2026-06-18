import { z } from 'zod';

export const healthGuideSchema = z.object({
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

export type HealthGuide = z.infer<typeof healthGuideSchema>;

// For backward compatibility, HealthAdvice refers to HealthGuide
export type HealthAdvice = HealthGuide;