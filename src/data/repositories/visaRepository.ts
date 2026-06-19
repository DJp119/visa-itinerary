import type { VisaRequirement, VisaPolicy } from '@/lib/schemas';

export interface VisaRepository {
  getVisaRequirements(passportCountryId: string, destinationCountryId: string, kind?: 'tourist' | 'transit' | 'digital-nomad'): Promise<VisaRequirement[]>;
  getVisaRequirementsByPassport(passportCountryId: string): Promise<VisaRequirement[]>;
  getVisaRequirementsByDestination(destinationCountryId: string): Promise<VisaRequirement[]>;
  getVisaPolicyByCountryId(countryId: string): Promise<VisaPolicy | null>;
  searchVisaRequirements(params: {
    passportCountryId?: string;
    destinationCountryId?: string;
    kind?: 'tourist' | 'transit' | 'digital-nomad';
    requirement?: 'visa-free' | 'visa-on-arrival' | 'evisa' | 'sticker-visa' | 'visa-refused' | 'not-available';
  }): Promise<VisaRequirement[]>;
}

// Fixture-based implementation
export class FixtureVisaRepository implements VisaRepository {
  private visaRequirements: VisaRequirement[] = [];
  private visaPolicies: VisaPolicy[] = [];

  constructor() {
    // Load fixtures
    this.loadFixtures();
  }

  private async loadFixtures() {
    try {
      // Load visa requirements
      const requirementsResponse = await fetch('/data/fixtures/visa-requirements.json');
      this.visaRequirements = await requirementsResponse.json();

      // Load visa policies
      const policiesResponse = await fetch('/data/fixtures/visa-policies.json');
      this.visaPolicies = await policiesResponse.json();
    } catch (error) {
      console.error('Failed to load visa fixtures:', error);
      // Fallback to empty arrays
      this.visaRequirements = [];
      this.visaPolicies = [];
    }
  }

  async getVisaRequirements(passportCountryId: string, destinationCountryId: string, kind?: 'tourist' | 'transit' | 'digital-nomad'): Promise<VisaRequirement[]> {
    let filtered = this.visaRequirements.filter(req =>
      req.passportCountryId === passportCountryId &&
      req.destinationCountryId === destinationCountryId
    );

    if (kind) {
      filtered = filtered.filter(req => req.kind === kind);
    }

    return [...filtered];
  }

  async getVisaRequirementsByPassport(passportCountryId: string): Promise<VisaRequirement[]> {
    return [...this.visaRequirements.filter(req => req.passportCountryId === passportCountryId)];
  }

  async getVisaRequirementsByDestination(destinationCountryId: string): Promise<VisaRequirement[]> {
    return [...this.visaRequirements.filter(req => req.destinationCountryId === destinationCountryId)];
  }

  async getVisaPolicyByCountryId(countryId: string): Promise<VisaPolicy | null> {
    return this.visaPolicies.find(policy => policy.countryId === countryId) || null;
  }

  async searchVisaRequirements(params: {
    passportCountryId?: string;
    destinationCountryId?: string;
    kind?: 'tourist' | 'transit' | 'digital-nomad';
    requirement?: 'visa-free' | 'visa-on-arrival' | 'evisa' | 'sticker-visa' | 'visa-refused' | 'not-available';
  }): Promise<VisaRequirement[]> {
    let filtered = [...this.visaRequirements];

    if (params.passportCountryId) {
      filtered = filtered.filter(req => req.passportCountryId === params.passportCountryId);
    }

    if (params.destinationCountryId) {
      filtered = filtered.filter(req => req.destinationCountryId === params.destinationCountryId);
    }

    if (params.kind) {
      filtered = filtered.filter(req => req.kind === params.kind);
    }

    if (params.requirement) {
      filtered = filtered.filter(req => req.requirement === params.requirement);
    }

    return filtered;
  }
}