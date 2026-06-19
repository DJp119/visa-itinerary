import { Search, MapPin, Plane } from 'lucide-react';
import { useState } from 'react';

interface DiscoveryFormProps {
  className?: string;
  onSearch?: (formData: {
    origin: string;
    destination: string;
    purpose: string;
  }) => void;
}

export default function DiscoveryForm({
  className,
  onSearch
}: DiscoveryFormProps = {}) {
  const [formData, setFormData] = useState({
    origin: 'USA',
    destination: '',
    purpose: 'tourist'
  });

  const [isOriginFocused, setIsOriginFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(formData);
    }
  };

  const purposes = [
    { value: 'tourist', label: 'Tourism', icon: <MapPin className="h-4 w-4 text-primary-500" /> },
    { value: 'transit', label: 'Transit', icon: <Plane className="h-4 w-4 text-primary-500" /> },
    { value: 'digital-nomad', label: 'Digital Nomad', icon: <MapPin className="h-4 w-4 text-primary-500" /> }
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full space-y-4 bg-background/50 rounded-lg p-6 border border-border/50 ${className}`}
    >
      <div className="space-y-3">
        <label htmlFor="origin" className="text-sm font-medium text-foreground/70">
          Origin Country
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
          <input
            id="origin"
            type="text"
            value={formData.origin}
            onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
            onFocus={() => setIsOriginFocused(true)}
            onBlur={() => setIsOriginFocused(false)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40 ${isOriginFocused ? 'border-primary-500' : ''}`}
            placeholder="Enter your country"
            required
          />
        </div>
        {isOriginFocused && (
          <p className="mt-1 text-sm text-foreground/50">
            Where are you traveling from?
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="destination" className="text-sm font-medium text-foreground/70">
          Destination Country
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
          <input
            id="destination"
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            onFocus={() => setIsDestinationFocused(true)}
            onBlur={() => setIsDestinationFocused(false)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40 ${isDestinationFocused ? 'border-primary-500' : ''}`}
            placeholder="Enter destination country"
            required
          />
        </div>
        {isDestinationFocused && (
          <p className="mt-1 text-sm text-foreground/50">
            Where are you traveling to?
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="purpose" className="text-sm font-medium text-foreground/70">
          Purpose of Visit
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4">
            {purposes.find(p => p.value === formData.purpose)?.icon}
          </div>
          <select
            id="purpose"
            value={formData.purpose}
            onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value as string }))}
            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40`}
          >
            {purposes.map(purpose => (
              <option key={purpose.value} value={purpose.value}>
                {purpose.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plane className="h-4 w-4" />
          <span>Check Visa Requirements</span>
        </button>
      </div>
    </form>
  );
}