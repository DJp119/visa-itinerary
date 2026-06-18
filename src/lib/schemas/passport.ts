import { z } from 'zod';

export const passportSchema = z.object({
  id: z.string(),
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
});

export type Passport = z.infer<typeof passportSchema>;