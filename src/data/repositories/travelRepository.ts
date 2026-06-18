import type { TravelContent, TravelAdvice, TravelAlert, TravelOpenStatus, TravelRestriction } from '@/lib/schemas';

export interface TravelRepository {
  getTravelGuideByCountryId(countryId: string): Promise<TravelGuide | null>;
  getTravelGuideBySlug(slug: string): Promise<TravelGuide | null>;
  searchTravelGuides(query: string): Promise<TravelGuide[]>;
  getTravelGuidesByRegion(region: string): Promise<TravelGuide[]>;

  getTravelContentByCountryIdAndType(countryId: string, type: string): Promise<TravelContent[]>;
  getTravelAdviceByCountryId(countryId: string): Promise<TravelAdvice[]>;
  getTravelAlertByCountryId(countryId: string): Promise<TravelAlert[]>;
  getTravelOpenStatusByCountryId(countryId: string): Promise<TravelOpenStatus | null>;
  getTravelRestrictionByCountryId(countryId: string): Promise<TravelRestriction[]>;
}

// Fixture-based implementation
export class FixtureTravelRepository implements TravelRepository {
  private travelContent: TravelContent[] = [];

  constructor() {
    // Load fixtures
    this.loadFixtures();
  }

  private async loadFixtures() {
    try {
      const response = await fetch('/data/fixtures/travel-content.json');
      this.travelContent = await response.json();
    } catch (error) {
      console.error('Failed to load travel content fixtures:', error);
      // Fallback to empty array
      this.travelContent = [];
    }
  }

  async getTravelGuideByCountryId(countryId: string): Promise<TravelGuide | null> {
    const content = await this.getTravelContentByCountryIdAndType(countryId, 'guide');
    return content.length > 0 ? (content[0] as TravelGuide) : null;
  }

  async getTravelGuideBySlug(slug: string): Promise<TravelGuide | null> {
    return this.travelContent.find(content => content.slug === slug && content.contentType === 'guide') as TravelGuide | null;
  }

  async searchTravelGuides(query: string): Promise<TravelGuide[]> {
    const lowerQuery = query.toLowerCase();
    const guides = this.travelContent.filter(content =>
      content.contentType === 'guide' &&
      (content.title.toLowerCase().includes(lowerQuery) ||
       content.description.toLowerCase().includes(lowerQuery) ||
       content.content.toLowerCase().includes(lowerQuery))
    );
    return guides as TravelGuide[];
  }

  async getTravelGuidesByRegion(region: string): Promise<TravelGuide[]> {
    const guides = this.travelContent.filter(content =>
      content.contentType === 'guide' &&
      content.region === region
    );
    return guides as TravelGuide[];
  }

  async getTravelContentByCountryIdAndType(countryId: string, type: string): Promise<TravelContent[]> {
    return this.travelContent.filter(content =>
      content.countryId === countryId &&
      content.contentType === type
    );
  }

  async getTravelAdviceByCountryId(countryId: string): Promise<TravelAdvice[]> {
    const advice = await this.getTravelContentByCountryIdAndType(countryId, 'advice');
    return advice as TravelAdvice[];
  }

  async getTravelAlertByCountryId(countryId: string): Promise<TravelAlert[]> {
    const alerts = await this.getTravelContentByCountryIdAndType(countryId, 'alert');
    return alerts as TravelAlert[];
  }

  async getTravelOpenStatusByCountryId(countryId: string): Promise<TravelOpenStatus | null> {
    const statuses = await this.getTravelContentByCountryIdAndType(countryId, 'open');
    return statuses.length > 0 ? (statuses[0] as TravelOpenStatus) : null;
  }

  async getTravelRestrictionByCountryId(countryId: string): Promise<TravelRestriction[]> {
    const restrictions = await this.getTravelContentByCountryIdAndType(countryId, 'restriction');
    return restrictions as TravelRestriction[];
  }
}