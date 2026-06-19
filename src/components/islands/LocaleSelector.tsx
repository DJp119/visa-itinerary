import { Globe } from 'lucide-react';
import { useState } from 'react';

interface LocaleSelectorProps {
  className?: string;
}

export default function LocaleSelector({ className }: LocaleSelectorProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const toggleLocaleMenu = () => setIsOpen(!isOpen);
  const closeLocaleMenu = () => setIsOpen(false);
  const selectLocale = (locale: typeof locales[number]) => {
    // TODO: Implement actual locale switching
    alert(`Switching to ${locale.name} (not implemented yet)`);
    closeLocaleMenu();
  };

  return (
    <div className="relative">
      {/* Locale Trigger */}
      <button
        onClick={toggleLocaleMenu}
        className={`flex items-center space-x-2 p-2 rounded-md hover:bg-background/100 transition-colors ${className}`}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-foreground" />
        <span className="hidden md:block text-sm font-medium text-foreground/80">
          English
        </span>
      </button>

      {/* Locale Menu */}
      <div className={`absolute right-0 mt-2 w-48 origin-top-right ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } transition-opacity transition-transform duration-200 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 p-2 z-40 shadow-lg`}>
        <div className="space-y-1">
          {locales.map(locale => (
            <button
              key={locale.code}
              onClick={() => selectLocale(locale)}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background/100 transition-colors w-full text-left"
            >
              <span>{locale.flag}</span>
              <span className="flex-1">{locale.name}</span>
              <span className="text-xs text-foreground/50">
                ({locale.code})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}