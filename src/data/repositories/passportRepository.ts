import type { Passport } from '@/lib/schemas';
import passports from '@/data/fixtures/passports.json';

export interface PassportRepository {
  getAllPassports(): Promise<Passport[]>;
  getPassportById(id: string): Promise<Passport | null>;
  getPassportBySlug(slug: string): Promise<Passport | null>;
  searchPassports(query: string): Promise<Passport[]>;
  getTopRankedPassports(limit: number): Promise<Passport[]>;
}

// Fixture-based implementation
export class FixturePassportRepository implements PassportRepository {
  private passports: Passport[] = passports as Passport[];



  

  async getAllPassports(): Promise<Passport[]> {
    return [...this.passports];
  }

  async getPassportById(id: string): Promise<Passport | null> {
    return this.passports.find(passport => passport.id === id) || null;
  }

  async getPassportBySlug(slug: string): Promise<Passport | null> {
    // Assuming slug is the same as id for passports
    return this.passports.find(passport => passport.id === slug) || null;
  }

  async searchPassports(query: string): Promise<Passport[]> {
    const lowerQuery = query.toLowerCase();
    return this.passports.filter(passport =>
      passport.name.toLowerCase().includes(lowerQuery) ||
      passport.shortName.toLowerCase().includes(lowerQuery) ||
      passport.iso2.toLowerCase().includes(lowerQuery) ||
      passport.iso3.toLowerCase().includes(lowerQuery)
    );
  }

  async getTopRankedPassports(limit: number): Promise<Passport[]> {
    return [...this.passports]
      .filter(passport => passport.ranking !== null)
      .sort((a, b) => (a.ranking || 999) - (b.ranking || 999))
      .slice(0, limit);
  }
}