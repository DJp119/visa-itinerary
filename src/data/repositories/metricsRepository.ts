import type { OpenMetric } from '@/lib/schemas';
import metrics from '@/data/fixtures/metrics.json';

export interface MetricsRepository {
  getOpenMetrics(): Promise<OpenMetric[]>;
}

// Fixture-based implementation
export class FixtureMetricsRepository implements MetricsRepository {
  private metrics: OpenMetric[] = metrics as OpenMetric[];



  

  async getOpenMetrics(): Promise<OpenMetric[]> {
    return [...this.metrics];
  }
}