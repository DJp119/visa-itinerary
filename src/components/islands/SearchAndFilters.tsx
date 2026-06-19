import { Search, Sliders, X } from 'lucide-react';
import { useState } from 'react';

interface SearchAndFiltersProps {
  className?: string;
  onSearch: (searchTerm: string) => void;
  onFiltersChange: (filters: {
    region: string;
    visaType: string;
    difficulty: string;
  }) => void;
}

export default function SearchAndFilters({
  className,
  onSearch,
  onFiltersChange
}: SearchAndFiltersProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: 'all',
    visaType: 'all',
    difficulty: 'all'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'north-america', label: 'North America' },
    { value: 'south-america', label: 'South America' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const visaTypes = [
    { value: 'all', label: 'All Visa Types' },
    { value: 'tourist', label: 'Tourist' },
    { value: 'business', label: 'Business' },
    { value: 'student', label: 'Student' },
    { value: 'work', label: 'Work' },
    { value: 'transit', label: 'Transit' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Difficulty Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'difficult', label: 'Difficult' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFiltersChange = () => {
    onFiltersChange(filters);
    setIsFiltersOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      region: 'all',
      visaType: 'all',
      difficulty: 'all'
    });
    onFiltersChange({
      region: 'all',
      visaType: 'all',
      difficulty: 'all'
    });
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSearch(searchTerm);
            }
          }}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
          placeholder="Search countries, visa requirements..."
        />
        {searchTerm.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50 hover:text-foreground transition-colors p-1 rounded-hover"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </form>

      {/* Filters Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-background/80 hover:bg-background/100 transition-colors border border-border/50"
        >
          <Sliders className="h-4 w-4 text-foreground" />
          <span className="text-sm font-medium text-foreground">
            Filters
          </span>
        </button>

        <button
          onClick={resetFilters}
          className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors p-1"
        >
          Reset
        </button>
      </div>

      {/* Filters Drawer */}
      <div className={`fixed inset-0 z-40 flex items-end ${
        isFiltersOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-out bg-background/95 backdrop-blur-sm border-l border-border/50`}>
        <div className="relative w-full max-w-xs p-6 space-y-6">
          {/* Close Button */}
          <button
            onClick={() => setIsFiltersOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-background/100 transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5 text-foreground/60 hover:text-foreground" />
          </button>

          {/* Filters Title */}
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Filters
          </h3>

          {/* Region Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Region
            </label>
            <div className="space-y-2">
              {regions.map(region => (
                <label
                  key={region.value}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-background/100 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={filters.region === region.value}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, region: e.target.value }));
                    }}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="flex-1 text-sm font-medium text-foreground">{region.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Visa Type Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Visa Type
            </label>
            <div className="space-y-2">
              {visaTypes.map(visaType => (
                <label
                  key={visaType.value}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-background/100 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={filters.visaType === visaType.value}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, visaType: e.target.value }));
                    }}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="flex-1 text-sm font-medium text-foreground">{visaType.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Difficulty Level
            </label>
            <div className="space-y-2">
              {difficulties.map(difficulty => (
                <label
                  key={difficulty.value}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-background/100 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={filters.difficulty === difficulty.value}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, difficulty: e.target.value }));
                    }}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="flex-1 text-sm font-medium text-foreground">{difficulty.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            <button
              onClick={handleFiltersChange}
              className="w-full bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}