import type { GetStaticPaths } from 'astro';
import { getCountryStaticPaths } from './routes';

/**
 * Generate getStaticPaths function for country-based routes
 * This simulates what you would do with actual data from repositories
 */
export async function getCountryPaths(): Promise<GetStaticPaths['paths']> {
  try {
    // In a real implementation, you'd fetch from your repository
    // For now, we'll use the static helper
    return getCountryStaticPaths();
  } catch (error) {
    console.error('Error generating country paths:', error);
    return [];
  }
}

/**
 * Generate getStaticPaths for visa detail routes
 */
export async function getVisaDetailPaths(): Promise<GetStaticPaths['paths']> {
  // This would combine countries and visa types
  // For MVP, we'll return a few sample paths
  try {
    const countries = ['usa', 'can', 'deu', 'fra', 'jpn'];
    const visaTypes = ['tourist', 'transit', 'digital-nomad'];
    const paths: GetStaticPaths['paths'] = [];

    for (const country of countries) {
      for (const visaType of visaTypes) {
        paths.push({
          params: { country, visa: visaType }
        });
      }
    }

    return paths;
  } catch (error) {
    console.error('Error generating visa detail paths:', error);
    return [];
  }
}

/**
 * Generate getStaticPaths for passport detail routes
 */
export async function getPassportDetailPaths(): Promise<GetStaticPaths['paths']> {
  try {
    // In a real implementation, you'd fetch from your repository
    const countries = ['usa', 'can', 'deu', 'fra', 'jpn'];
    return countries.map(country => ({
      params: { country }
    }));
  } catch (error) {
    console.error('Error generating passport detail paths:', error);
    return [];
  }
}