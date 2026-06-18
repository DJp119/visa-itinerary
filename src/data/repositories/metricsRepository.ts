import type { OpenMetric } from '@/lib/schemas';

export interface MetricsRepository {
  getOpenMetrics(): Promise<OpenMetric[]>;
}

// Fixture-based implementation
export class FixtureMetricsRepository implements MetricsRepository {
  private metrics: OpenMetric[] = [];

  constructor() {
    // Load fixtures
    this.loadFixtures();
  }

  private async loadFixtures() {
    try {
      const response = await fetch('/data/fixtures/metrics.json');
      this.metrics = await response.json();
    } catch (error) {
      console.error('Failed to load metrics fixtures:', error);
      // Fallback to default metrics
      this.metrics = [
        { label: 'Users Served', value: '2.4M+', icon: '👥' },
        { label: 'Visa Queries Processed', value: '18M+', icon: '🔍' },
        { label: 'Documents Generated', value: '560K+', icon: '📄' },
        { label: 'Applications Tracked', value: '120K+', icon: '📋' },
        { label: 'Countries Covered', value: '195', icon: '🌐' },
        { label: 'Avg. Response Time', value: '1.2s', icon: '⚡' },
        { label: 'Data Accuracy', value: '99.8%', icon: '🎯' },
        { label: 'User Satisfaction', value: '4.8/5', icon: '😊' }
      ];
    }
  }

  async getOpenMetrics(): Promise<OpenMetric[]> {
    return [...this.metrics];
  }
}