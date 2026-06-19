import { z } from 'zod';

export const openMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
  // Optional fields for more detailed metrics
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  trend: z.enum(['up', 'down', 'neutral']).optional(),
  trendPercentage: z.number().optional(),
});

export type OpenMetric = z.infer<typeof openMetricSchema>;

export const metricsResponseSchema = z.array(openMetricSchema);
export type MetricsResponse = z.infer<typeof metricsResponseSchema>;