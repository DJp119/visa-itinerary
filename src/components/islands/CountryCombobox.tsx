import { MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CountryComboboxProps {
  className?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: Array<{ value: string; label: string; flag?: string }>;
}

export default function CountryCombobox({
  className,
  label,
  placeholder = 'Select a country',
  value,
  onChange,
  options = []
}: CountryComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Default options if none provided
  const defaultOptions = [
    { value: 'usa', label: 'United States', flag: '🇺🇸' },
    { value: 'can', label: 'Canada', flag: '🇨🇦' },
    { value: 'mex', label: 'Mexico', flag: '🇲🇽' },
    { value: 'gb', label: 'United Kingdom', flag: '🇬🇧' },
    { value: 'de', label: 'Germany', flag: '🇩🇪' },
    { value: 'fr', label: 'France', flag: '🇫🇷' },
    { value: 'jp', label: 'Japan', flag: '🇯🇵' },
    { value: 'au', label: 'Australia', flag: '🇦🇺' }
  ];

  const availableOptions = options.length > 0 ? options : defaultOptions;
  const filteredOptions = availableOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const selectOption = (option: typeof availableOptions[number]) => {
    setSearchTerm(option.label);
    setFormValue(option.value);
    onChange(option.value);
    closeDropdown();
  };

  const [formValue, setFormValue] = useState(value);

  // Update form value when prop changes
  // Note: In a real implementation, you might want to handle this differently
  // depending on whether the component is controlled or uncontrolled

  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor="country-combobox" className="mb-2 block text-sm font-medium text-foreground/70">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // Find matching option
            const match = availableOptions.find(opt =>
              opt.label.toLowerCase() === e.target.value.toLowerCase() ||
              opt.value.toLowerCase() === e.target.value.toLowerCase()
            );
            if (match) {
              onChange(match.value);
            }
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Close dropdown after a short delay to allow click events
            setTimeout(() => closeDropdown(), 200);
          }}
          className={`w-full pl-10 pr-10 py-3 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40`}
          placeholder={placeholder}
        />
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Options Dropdown */}
      {isOpen && (
        <div className={`absolute left-0 right-0 mt-2 w-56 origin-top-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } transition-opacity transition-transform duration-200 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 p-2 z-40 shadow-lg max-h-60 overflow-y-auto`}>
          <div className="space-y-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => selectOption(option)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background/100 transition-colors w-full text-left cursor-pointer"
                >
                  <span className="flex-shrink-0">{option.flag}</span>
                  <span className="flex-1">{option.label}</span>
                  <span className="text-xs text-foreground/50">
                    ({option.value})
                  </span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-foreground/50 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}