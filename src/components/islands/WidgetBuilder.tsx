import { useState } from 'react';

interface VisaCheckResult {
  destination: string;
  requirement: string;
  stayDays?: number;
  fee?: { amount: number; currency: string };
}

/**
 * Interactive widget builder for creating custom visa checkers
 * This is a React island that allows users to configure and preview widgets
 */
export default function WidgetBuilder() {
  const [passportCountry, setPassportCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<VisaCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in a real implementation, this would come from an API or repository
  const mockVisaData: Record<string, Record<string, VisaCheckResult>> = {
    USA: {
      CAN: { destination: 'Canada', requirement: 'Visa-free', stayDays: 180 },
      DEU: { destination: 'Germany', requirement: 'Visa-free', stayDays: 90 },
      AUS: { destination: 'Australia', requirement: 'e-Visa', fee: { amount: 20, currency: 'AUD'} }
    },
    CAN: {
      USA: { destination: 'United States', requirement: 'Visa-free', stayDays: 180 },
      FRA: { destination: 'France', requirement: 'Visa-free', stayDays: 90 },
      JPN: { destination: 'Japan', requirement: 'Visa-free', stayDays: 90 }
    }
  };

  const handleCheckVisa = async () => {
    if (!passportCountry || !destinationCountry) return;

    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock lookup
    const passportData = mockVisaData[passportCountry.toUpperCase()];
    if (passportData && passportData[destinationCountry.toUpperCase()]) {
      setResult(passportData[destinationCountry.toUpperCase()]);
    } else {
      setResult({
        destination: destinationCountry,
        requirement: 'Visa required',
        stayDays: undefined,
        fee: undefined
      });
    }

    setShowResult(true);
    setIsLoading(false);
  };

  const handleReset = () => {
    setPassportCountry('');
    setDestinationCountry('');
    setShowResult(false);
    setResult(null);
  };

  return (
    <div class="space-y-6">
      <div class="bg-background/50 rounded-lg p-6 border border-border/50">
        <h3 class="text-xl font-bold mb-4 text-center">
          Visa Checker Widget Builder
        </h3>
        <p class="text-center text-foreground/60 mb-6">
          Build and preview your custom visa checker widget
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              Passport Country (Origin)
            </label>
            <input
              type="text"
              value={passportCountry}
              onChange={(e) => setPassportCountry(e.target.value.toUpperCase().substring(0, 3))}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/80 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter country code (e.g., USA, CAN, DEU)"
              maxLength={3}
              disabled={isLoading}
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              Destination Country
            </label>
            <input
              type="text"
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value.toUpperCase().substring(0, 3))}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/80 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter country code (e.g., FRA, JPN, AUS)"
              maxLength={3}
              disabled={isLoading}
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCheckVisa}
              disabled={isLoading || !passportCountry || !destinationCountry}
              className="flex-1 bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              {isLoading ? 'Checking...' : 'Check Visa'}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-background/50 text-primary-foreground py-3 rounded-lg border border-border hover:bg-background/100 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {showResult && result && (
          <div class="mt-6 p-4 bg-background/50 rounded-lg border border-border/50">
            <h4 class="text-lg font-bold mb-3 text-foreground">
              Visa Requirement Result
            </h4>
            <div class="space-y-2 text-sm">
              <div class="flex">
                <span class="font-medium w-1/3">From:</span>
                <span>{passportCountry}</span>
              </div>
              <div class="flex">
                <span class="font-medium w-1/3">To:</span>
                <span>{destinationCountry}</span>
              </div>
              <div class="flex">
                <span class="font-medium w-1/3">Requirement:</span>
                <span class={`font-semibold ${result.requirement === 'Visa-free' ? 'text-success-600' : result.requirement === 'Visa required' ? 'text-danger-600' : 'text-warning-600'}`}>
                  {result.requirement}
                </span>
              </div>
              {result.stayDays && (
                <div class="flex">
                  <span class="font-medium w-1/3">Stay Duration:</span>
                  <span>{result.stayDays} days</span>
                </div>
              )}
              {result.fee && (
                <div class="flex">
                  <span class="font-medium w-1/3">Fee:</span>
                  <span>{result.fee.amount} {result.fee.currency}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div class="bg-background/50 rounded-lg p-6 border border-border/50">
        <h3 class="text-xl font-bold mb-4 text-center">
          Usage Instructions
        </h3>
        <ol class="space-y-3 text-foreground/60 list-decimal pl-5">
          <li class="mb-2">
            Configure the widget above with your desired default values
          </li>
          <li class="mb-2">
            Copy the embed code below
          </li>
          <li>
            Paste it into your website's HTML where you want the widget to appear
          </li>
        </ol>

        <div class="mt-4">
          <p class="font-medium text-foreground mb-2">Embed Code:</p>
          <div class="bg-background/80/50 p-3 rounded-lg font-mono text-sm overflow-auto">
            &lt;!-- Visa Itinerary Widget --&gt;
            &lt;div class="visaitinerary-widget"
                 data-widget-type="visa-checker"
                 data-default-origin="{passportCountry || 'USA'}"
                 data-default-destination="{destinationCountry || 'CAN'}"
            &gt;&lt;/div&gt;
            &lt;script src="https://widget.visaitinerary.example.com/loader.js" defer&gt;&lt;/script&gt;
          </div>
          <button class="mt-2 w-full bg-primary-500 text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                  onClick={() => navigator.clipboard.writeText(`
&lt;!-- Visa Itinerary Widget --&gt;
&lt;div class="visaitinerary-widget"
     data-widget-type="visa-checker"
     data-default-origin="${passportCountry || 'USA'}"
     data-default-destination="${destinationCountry || 'CAN'}"
&gt;&lt;/div&gt;
&lt;script src="https://widget.visaitinerary.example.com/loader.js" defer&gt;&lt;/script&gt;
                  `).then(() => alert('Embed code copied to clipboard!'))}>
            Copy Embed Code
          </button>
        </div>
      </div>
    </div>
  );
}