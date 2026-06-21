import type { EmbassyInfo } from '@/lib/schemas';
import embassies from '@/data/fixtures/embassies.json';

export interface EmbassyRepository {
  getEmbassyInfoByCountryId(countryId: string): Promise<EmbassyInfo[]>;
  getEmbassyInfoBySlug(slug: string): Promise<EmbassyInfo[]>;
  searchEmbassyInfo(query: string): Promise<EmbassyInfo[]>;
  getEmbassiesByCountryId(countryId: string): Promise<EmbassyInfo[]>;
}

// Fixture-based implementation
export class FixtureEmbassyRepository implements EmbassyRepository {
  private embassyInfo: EmbassyInfo[] = embassies as EmbassyInfo[];



  

  async getEmbassyInfoByCountryId(countryId: string): Promise<EmbassyInfo[]> {
    return [...this.embassyInfo.filter(embassy => embassy.countryId === countryId)];
  }

  async getEmbassyInfoBySlug(slug: string): Promise<EmbassyInfo[]> {
    // Embassies don't typically have slugs, but we'll implement for completeness
    return [...this.embassyInfo.filter(embassy => embassy.slug === slug)];
  }

  async searchEmbassyInfo(query: string): Promise<EmbassyInfo[]> {
    const lowerQuery = query.toLowerCase();
    return this.embassyInfo.filter(embassy =>
      embassy.name.toLowerCase().includes(lowerQuery) ||
      embassy.location.toLowerCase().includes(lowerQuery) ||
      embassy.address.toLowerCase().includes(lowerQuery)
    );
  }

  async getEmbassiesByCountryId(countryId: string): Promise<EmbassyInfo[]> {
    return [...this.embassyInfo.filter(embassy => embassy.countryId === countryId)];
  }
}