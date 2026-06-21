import type { HealthAdvice } from '@/lib/schemas';
import healthAdvice from '@/data/fixtures/health-advice.json';

export interface HealthRepository {
  getHealthAdviceByCountryId(countryId: string): Promise<HealthAdvice | null>;
  getHealthAdviceBySlug(slug: string): Promise<HealthAdvice | null>;
  searchHealthAdvice(query: string): Promise<HealthAdvice[]>;
  getHealthAdviceByRegion(region: string): Promise<HealthAdvice[]>;
}

// Fixture-based implementation
export class FixtureHealthRepository implements HealthRepository {
  private healthAdvice: HealthAdvice[] = healthAdvice as HealthAdvice[];

  async getHealthAdviceByCountryId(countryId: string): Promise<HealthAdvice | null> {
    return this.healthAdvice.find(advice => advice.countryId === countryId) || null;
  }

  async getHealthAdviceBySlug(slug: string): Promise<HealthAdvice | null> {
    return this.healthAdvice.find(advice => advice.slug === slug) || null;
  }

  async searchHealthAdvice(query: string): Promise<HealthAdvice[]> {
    const lowerQuery = query.toLowerCase();
    return this.healthAdvice.filter(advice =>
      advice.title.toLowerCase().includes(lowerQuery) ||
      advice.description.toLowerCase().includes(lowerQuery) ||
      advice.content.toLowerCase().includes(lowerQuery)
    );
  }

  async getHealthAdviceByRegion(region: string): Promise<HealthAdvice[]> {
    return this.healthAdvice.filter(advice => advice.region === region);
  }
}