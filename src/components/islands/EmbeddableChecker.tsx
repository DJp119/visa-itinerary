import { useEffect, useState } from 'react';

interface VisaCheckResult {
  destination: string;
  requirement: string;
  stayDays?: number;
  fee?: { amount: number; currency: string };
}

/**
 * Embeddable visa checker widget
 * This component is designed to be embedded in external websites
 * It receives configuration via data attributes and initializes accordingly
 */
export default function EmbeddableChecker() {
  // Read configuration from data attributes (set by the embedding page)
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState<string>('#0c66e4');
  const [result, setResult] = useState<VisaCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Initialize from data attributes when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get config from a container element or global config
      const container = document.querySelector('.visaitinerary-widget');
      if (container) {
        const dataOrigin = container.getAttribute('data-default-origin') || '';
        const dataDestination = container.getAttribute('data-default-destination') || '';
        const dataTheme = container.getAttribute('data-theme') as 'light' | 'dark' || 'light';
        const dataColor = container.getAttribute('data-primary-color') || '#0c66e4';

        setOrigin(dataOrigin.toUpperCase());
        setDestination(dataDestination.toUpperCase());
        setTheme(dataTheme);
        setPrimaryColor(dataColor);
      }

      // Also check for global config
      if ((window as any).VisaItineraryWidgetConfig) {
        const config = (window as any).VisaItineraryWidgetConfig;
        if (config.origin) setOrigin(config.origin.toUpperCase());
        if (config.destination) setDestination(config.destination.toUpperCase());
        if (config.theme) setTheme(config.theme);
        if (config.primaryColor) setPrimaryColor(config.primaryColor);
      }
    }
  }, []);

  // Mock data - in a real implementation, this would call an API
  const mockVisaData: Record<string, Record<string, VisaCheckResult>> = {
    USA: {
      CAN: { destination: 'Canada', requirement: 'Visa-free', stayDays: 180 },
      DEU: { destination: 'Germany', requirement: 'Visa-free', stayDays: 90 },
      FRA: { destination: 'France', requirement: 'Visa-free', stayDays: 90 },
      AUS: { destination: 'Australia', requirement: 'e-Visa', fee: { amount: 20, currency: 'AUD'} },
      JPN: { destination: 'Japan', requirement: 'Visa-free', stayDays: 90 },
      GBR: { destination: 'United Kingdom', requirement: 'Visa-free', stayDays: 180 }
    },
    CAN: {
      USA: { destination: 'United States', requirement: 'Visa-free', stayDays: 180 },
      FRA: { destination: 'France', requirement: 'Visa-free', stayDays: 90 },
      DEU: { destination: 'Germany', requirement: 'Visa-free', stayDays: 90 },
      AUS: { destination: 'Australia', requirement: 'e-Visa', fee: { amount: 25, currency: 'AUD'} }
    },
    DEU: {
      USA: { destination: 'United States', requirement: 'Visa-free', stayDays: 90 },
      FRA: { destination: 'France', requirement: 'Visa-free', stayDays: 90 },
      CAN: { destination: 'Canada', requirement: 'Visa-free', stayDays: 180 },
      GBR: { destination: 'United Kingdom', requirement: 'Visa-free', stayDays: 90 }
    }
  };

  const checkVisaRequirements = async () => {
    if (!origin || !destination) {
      setError('Please provide both origin and destination country codes');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Look up in mock data
      const originData = mockVisaData[origin];
      if (originData && originData[destination]) {
        setResult(originData[destination]);
      } else {
        // Default to visa required if not found in our mock data
        setResult({
          destination: destination,
          requirement: 'Visa required (check with embassy)',
          stayDays: undefined,
          fee: undefined
        });
      }
    } catch (err) {
      setError('Failed to check visa requirements. Please try again later.');
      console.error('Visa check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-check when we have both origin and destination
  useEffect(() => {
    if (origin && destination && !isLoading && !result) {
      checkVisaRequirements();
    }
  }, [origin, destination, isLoading, result]);

  // Handle manual check
  const handleCheck = () => {
    setShowForm(false);
    checkVisaRequirements();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const originInput = form.elements.namedItem('origin') as HTMLInputElement;
    const destinationInput = form.elements.namedItem('destination') as HTMLInputElement;

    if (originInput && destinationInput) {
      setOrigin(originInput.value.toUpperCase().trim());
      setDestination(destinationInput.value.toUpperCase().trim());
      setShowForm(false);
      checkVisaRequirements();
    }
  };

  // Handle reset
  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setResult(null);
    setError(null);
    setShowForm(true);
  };

  // If we don't have initial config, show the form to get it
  useEffect(() => {
    if (!origin && !destination) {
      setShowForm(true);
    }
  }, [origin, destination]);

  // Base styles that will be customized by props
  const getWidgetStyles = () => ({
    '--widget-bg': theme === 'dark' ? '#1a1a1a' : '#ffffff',
    '--widget-text': theme === 'dark' ? '#e0e0e0' : '#1a1a1a',
    '--widget-muted': theme === 'dark' ? '#888888' : '#666666',
    '--widget-primary': primaryColor,
    '--widget-border': theme === 'dark' ? '#444444' : '#e0e0e0',
    '--widget-radius': '8px',
    '--widget-shadow': '0 2px 8px rgba(0,0,0,0.1)',
    '--widget-font': 'system-ui, sans-serif'
  });

  if (showForm) {
    return (
      <div className="visa-widget-form" style={getWidgetStyles()}>
        <div className="p-4 text-center">
          <h3 className="mb-4 font-bold" style={{ color: 'var(--widget-text)' }}>
            Visa Checker Widget
          </h3>
          <p className="mb-4" style={{ color: 'var(--widget-muted)' }}>
            Please select your origin and destination countries to check visa requirements
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--widget-text)' }}>
                Origin Country (Passport)
              </label>
              <input
                type="text"
                name="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase().substring(0, 3))}
                className="w-full px-3 py-2 rounded border border-gray-300 bg-transparent text-sm focus:outline-none focus:ring-2 focus-ring-primary-500/20"
                placeholder="e.g., USA, CAN, DEU"
                maxLength={3}
                style={{
                  color: 'var(--widget-text)',
                  backgroundColor: 'var(--widget-bg)',
                  borderColor: 'var(--widget-border)'
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--widget-text)' }}>
                Destination Country
              </label>
              <input
                type="text"
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase().substring(0, 3))}
                className="w-full px-3 py-2 rounded border border-gray-300 bg-transparent text-sm focus:outline-none focus:ring-2 focus-ring-primary-500/20"
                placeholder="e.g., FRA, JPN, AUS"
                maxLength={3}
                style={{
                  color: 'var(--widget-text)',
                  backgroundColor: 'var(--widget-bg)',
                  borderColor: 'var(--widget-border)'
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white px-4 py-2 rounded font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Visa'}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm text-danger-600" style={{ color: 'var(--widget-text)' }}>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading && !result) {
    return (
      <div className="visa-widget-loading" style={getWidgetStyles()}>
        <div className="p-6 text-center">
          <div className="mb-4">
            {/* Simple loading spinner */}
            <div className="h-5 w-5 border-2 border-t-2 border-primary-500 rounded-full animate-spin"
                 style={{ borderColor: 'var(--widget-primary)' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--widget-text)' }}>
            Checking visa requirements...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !result) {
    return (
      <div className="visa-widget-error" style={getWidgetStyles()}>
        <div className="p-6 text-center">
          <div className="mb-4">
          </div>
          <p className="mb-3 text-lg font-medium" style={{ color: 'var(--widget-text)' }}>
            Unable to Check Requirements
          </p>
          <p className="mb-4" style={{ color: 'var(--widget-muted)' }}>
            {error}
          </p>
          <button
            onClick={handleReset}
            className="bg-primary-500 text-white px-4 py-2 rounded font-medium hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show result
  if (result) {
    const getRequirementClass = () => {
      if (result.requirement.toLowerCase().includes('visa-free')) return 'text-success-600';
      if (result.requirement.toLowerCase().includes('visa required')) return 'text-danger-600';
      return 'text-warning-600';
    };

    return (
      <div className="visa-widget-result" style={getWidgetStyles()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-primary-500/20 rounded-lg">
            </div>
            <div>
              <h3 className="mb-1 font-semibold" style={{ color: 'var(--widget-text)' }}>
                Visa Check Result
              </h3>
              <p className="text-sm" style={{ color: 'var(--widget-muted)' }}>
                {origin} → {destination}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium w-1/3" style={{ color: 'var(--widget-text)' }}>
                Requirement:
              </span>
              <span className={`font-semibold ${getRequirementClass()}`} style={{ color: 'var(--widget-text)' }}>
                {result.requirement}
              </span>
            </div>

            {result.stayDays && (
              <div className="flex">
                <span className="font-medium w-1/3" style={{ color: 'var(--widget-text)' }}>
                  Stay Duration:
                </span>
                <span className="font-normal" style={{ color: 'var(--widget-text)' }}>
                  {result.stayDays} days
                </span>
              </div>
            )}

            {result.fee && (
              <div className="flex">
                <span className="font-medium w-1/3" style={{ color: 'var(--widget-text)' }}>
                  Fee:
                </span>
                <span className="font-normal" style={{ color: 'var(--widget-text)' }}>
                  {result.fee.amount} {result.fee.currency}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-border/50">
            <p className="text-xs text-center" style={{ color: 'var(--widget-muted)' }}>
              Powered by <a href="https://visaitinerary.example.com"
                            className="text-primary-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--widget-primary)' }}>
                Visa Itinerary
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback empty state
  return (
    <div className="visa-widget-empty" style={getWidgetStyles()}>
      <div className="p-6 text-center">
        <h3 className="mb-3 font-bold" style={{ color: 'var(--widget-text)' }}>
          Visa Checker Widget
        </h3>
        <p className="text-sm" style={{ color: 'var(--widget-muted)' }}>
          Configure the widget to check visa requirements
        </p>
      </div>
    </div>
  );
}