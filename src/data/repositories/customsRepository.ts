import type { CustomsRegulation } from '@/lib/schemas';
import customsRegulations from '@/data/fixtures/customs-regulations.json';

export interface CustomsRepository {
  getCustomsRegulationByCountryId(countryId: string): Promise<CustomsRegulation | null>;
  getCustomsRegulationBySlug(slug: string): Promise<CustomsRegulation | null>;
  searchCustomsRegulations(query: string): Promise<CustomsRegulation[]>;
  getCustomsRegulationsByRegion(region: string): Promise<CustomsRegulation[]>;
}

// Fixture-based implementation
export class FixtureCustomsRepository implements CustomsRepository {
  private customsRegulations: CustomsRegulation[] = customsRegulations as CustomsRegulation[];



  

  async getCustomsRegulationByCountryId(countryId: string): Promise<CustomsRegulation | null> {
    return this.customsRegulations.find(regulation => regulation.countryId === countryId) || null;
  }

  async getCustomsRegulationBySlug(slug: string): Promise<CustomsRegulation | null> {
    return this.customsRegulations.find(regulation => regulation.slug === slug) || null;
  }

  async searchCustomsRegulations(query: string): Promise<CustomsRegulation[]> {
    const lowerQuery = query.toLowerCase();
    return this.customsRegulations.filter(regulation =>
      regulation.title.toLowerCase().includes(lowerQuery) ||
      regulation.description.toLowerCase().includes(lowerQuery) ||
      regulation.content.toLowerCase().includes(lowerQuery)
    );
  }

  async getCustomsRegulationsByRegion(region: string): Promise<CustomsRegulation[]> {
    return this.customsRegulations.filter(regulation => regulation.region === region);
  }
}