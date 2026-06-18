/**
 * URL route builders for Visa Itinerary
 * Generates consistent paths for all route families
 */

/**
 * Build a URL path with proper encoding
 */
export function buildPath(base: string, params: Record<string, string | number | boolean | undefined>): string {
  if (!params || Object.keys(params).length === 0) {
    return base;
  }

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

/**
 * Generate static paths for country-based routes
 */
export function getCountryStaticPaths() {
  // This would typically be populated from your data source
  // For now, we'll return common country slugs
  return [
    { params: { country: 'usa' } },
    { params: { country: 'can' } },
    { params: { country: 'deu' } },
    { params: { country: 'fra' } },
    { params: { country: 'jpn' } }
  ];
}

/**
 * Route builders for different sections
 */
export const routes = {
  // Public marketing and product routes
  home: () => '/',
  about: () => '/about',
  contact: () => '/contact',
  pricing: () => '/pricing',
  login: () => '/login',
  open: () => '/open',
  integrate: () => '/integrate',
  widget: () => '/widget',
  previewVisa: () => '/preview/visa',

  // Visa routes
  visaHub: () => '/visa',
  visaTouristDirectory: () => '/visa/tourist',
  visaTransitDirectory: () => '/visa/transit',
  visaDigitalNomadDirectory: () => '/visa/digital-nomad',
  visaExemptions: () => '/visa/exemptions',
  visaPolicies: () => '/visa/policies',
  visaPowerful: () => '/visa/powerful',
  visaRankings: (filter?: string) => buildPath('/visa/rankings', { filter }),
  visaTravel: (visaSlug: string, filter?: string) =>
    buildPath(`/visa/travel/${visaSlug}`, { filter }),
  visaQuestions: () => '/visa/questions',

  // Passport routes
  passportHub: () => '/passport',
  passportRankings: (filter?: string) => buildPath('/passport/rankings', { filter }),
  passportFreedom: () => '/passport/freedom',

  // Travel routes
  travelHub: () => '/travel',
  travelAdvice: () => '/travel/advice',
  travelEmbassies: () => '/travel/embassies',
  travelInformation: () => '/travel/information',

  // Country routes
  countryTouristList: (country: string) => `/${country}/tourist`,
  countryTransitList: (country: string) => `/${country}/transit`,
  countryDigitalNomadList: (country: string) => `/${country}/digital-nomad`,
  countryTouristVisaDetail: (country: string, origin?: string) =>
    origin ? `/${country}/tourist-visa/${origin}` : `/${country}/tourist-visa`,
  countryTransitVisaDetail: (country: string, origin?: string) =>
    origin ? `/${country}/transit-visa/${origin}` : `/${country}/transit-visa`,
  countryDigitalNomadVisaDetail: (country: string, origin?: string) =>
    origin ? `/${country}/digital-nomad-visa/${origin}` : `/${country}/digital-nomad-visa`,
  countryTouristVisaQuestions: (country: string) => `/${country}/tourist-visa/questions`,
  countryVisaExemptionDetail: (country: string) => `/${country}/tourist-visa/visa-exemption`,
  countryPassportDetail: (country: string) => `/${country}/passport`,
  countryVisaGuide: (country: string) => `/${country}/visa`,
  countryVisaPolicy: (country: string, filter?: string) =>
    buildPath(`/${country}/visa-policy`, { filter }),
  countryVisaRequirements: (country: string, origin?: string, filter?: string) => {
    let base = `/${country}/visa-requirements`;
    if (origin) {
      base += `/${origin}`;
    }
    return buildPath(base, { filter });
  },
  countryTravelGuide: (country: string) => `/${country}/travel`,
  countryTravelAdvice: (country: string, filter?: string) =>
    buildPath(`/${country}/travel/advice`, { filter }),
  countryTravelAlert: (country: string, filter?: string) =>
    buildPath(`/${country}/travel/alert`, { filter }),
  countryTravelOpen: (country: string, filter?: string) =>
    buildPath(`/${country}/travel/open`, { filter }),
  countryTravelRestrictions: (country: string, filter?: string) =>
    buildPath(`/${country}/travel/restrictions`, { filter }),
  countryEmbassyList: (country: string, filter?: string) =>
    buildPath(`/${country}/embassy`, { filter }),
  countryCustomsDetail: (country: string, filter?: string) =>
    buildPath(`/${country}/customs`, { filter }),
  countryHealthDetail: (country: string) => `/${country}/health`,

  // User routes
  userProfile: () => '/user/profile',
  userSubscription: () => '/user/subscription'
};