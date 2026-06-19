import { z } from 'zod';

export const embassySchema = z.object({
  id: z.string(),
  name: z.string(),
  countryId: z.string(),
  slug: z.string(),
  city: z.string(),
  location: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().url().optional(),
  verifiedAt: z.string().datetime(),
  sourceAttribution: z.string().url().optional(),
});

export type Embassy = z.infer<typeof embassySchema>;