import { z } from 'zod';

export const countrySchema = z.object({
  id: z.string(),
  slug: z.string(),
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
});

export type Country = z.infer<typeof countrySchema>;