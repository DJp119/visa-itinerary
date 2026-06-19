import type { CustomsRegulation } from '@/lib/schemas';

export interface CustomsRepository {
  getCustomsRegulationByCountryId(countryId: string): Promise<CustomsRegulation | null>;
  getCustomsRegulationBySlug(slug: string): Promise<CustomsRegulation | null>;
  searchCustomsRegulations(query: string): Promise<CustomsRegulation[]>;
  getCustomsRegulationsByRegion(region: string): Promise<CustomsRegulation[]>;
}

// Fixture-based implementation
export class FixtureCustomsRepository implements CustomsRepository {
  private customsRegulations: CustomsRegulation[] = [];

  constructor() {
    // Load fixtures
    this.loadFixtures();
  }

  private async loadFixtures() {
    try {
      const response = await fetch('/data/fixtures/customs-regulations.json');
      this.customsRegulations = await response.json();
    } catch (error) {
      console.error('Failed to load customs regulation fixtures:', error);
      // Fallback to empty array
      this.customsRegulations = [];
    }
  }

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