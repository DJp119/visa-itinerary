import type { Country } from '@/lib/schemas';
import countries from '@/data/fixtures/countries.json';

export interface CountryRepository {
  getAllCountries(): Promise<Country[]>;
  getCountryById(id: string): Promise<Country | null>;
  getCountryBySlug(slug: string): Promise<Country | null>;
  searchCountries(query: string): Promise<Country[]>;
  getCountriesByRegion(region: string): Promise<Country[]>;
}

// Fixture-based implementation
export class FixtureCountryRepository implements CountryRepository {
  private countries: Country[] = countries as Country[];



  

  async getAllCountries(): Promise<Country[]> {
    return [...this.countries];
  }

  async getCountryById(id: string): Promise<Country | null> {
    return this.countries.find(country => country.id === id) || null;
  }

  async getCountryBySlug(slug: string): Promise<Country | null> {
    return this.countries.find(country => country.slug === slug) || null;
  }

  async searchCountries(query: string): Promise<Country[]> {
    const lowerQuery = query.toLowerCase();
    return this.countries.filter(country =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.shortName.toLowerCase().includes(lowerQuery) ||
      country.iso2.toLowerCase().includes(lowerQuery) ||
      country.iso3.toLowerCase().includes(lowerQuery)
    );
  }

  async getCountriesByRegion(region: string): Promise<Country[]> {
    return this.countries.filter(country => country.region === region);
  }
}