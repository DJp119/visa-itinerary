import { z } from 'zod';

export const travelSafetyStatusSchema = z.enum([
  'normal',
  'stay-alert',
  'reconsider',
  'avoid-travel',
  'unknown',
]);
export type TravelSafetyStatus = z.infer<typeof travelSafetyStatusSchema>;

export const travelContentTypeSchema = z.enum([
  'guide',
  'advice',
  'alert',
  'open',
  'restriction'
]);
export type TravelContentType = z.infer<typeof travelContentTypeSchema>;

export const travelContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  region: z.string(),
  safetyStatus: travelSafetyStatusSchema.optional(),
  contentType: travelContentTypeSchema,
  verifiedAt: z.string().datetime(),
  sourceAttribution: z.string().url().optional(),
});

export type TravelContent = z.infer<typeof travelContentSchema>;

export const travelGuideSchema = travelContentSchema.extend({
  // Guide-specific fields could go here
});
export type TravelGuide = z.infer<typeof travelGuideSchema>;

export const travelAdviceSchema = travelContentSchema.extend({
  // Advice-specific fields could go here
});
export type TravelAdvice = z.infer<typeof travelAdviceSchema>;

export const travelAlertSchema = travelContentSchema.extend({
  // Alert-specific fields could go here
});
export type TravelAlert = z.infer<typeof travelAlertSchema>;

export const travelOpenStatusSchema = travelContentSchema.extend({
  // Open status-specific fields could go here
});
export type TravelOpenStatus = z.infer<typeof travelOpenStatusSchema>;

export const travelRestrictionSchema = travelContentSchema.extend({
  // Restriction-specific fields could go here
});
export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;