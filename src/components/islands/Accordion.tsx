import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  className?: string;
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({
  className,
  items,
  allowMultiple = false
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const isOpen = (title: string) => openItems.includes(title);
  const toggleItem = (title: string) => {
    setOpenItems(prev => {
      if (allowMultiple) {
        if (isOpen(title)) {
          return prev.filter(t => t !== title);
        } else {
          return [...prev, title];
        }
      } else {
        if (isOpen(title)) {
          return []; // Close if already open (in single mode)
        } else {
          return [title]; // Open selected, close others
        }
      }
    });
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border border-border/50 rounded-lg overflow-hidden">
          {/* Accordion Header */}
          <div
            onClick={() => toggleItem(item.title)}
            className="flex items-center justify-between px-5 py-4 cursor-pointer bg-background/50 hover:bg-background/100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {item.icon && (
                <span className="h-4 w-4 flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <h3 className="text-sm font-medium text-foreground">
                {item.title}
              </h3>
            </div>
            <div className="h-4 w-4 flex-shrink-0 transition-transform duration-200">
              {isOpen(item.title) ? (
                <ChevronUp className="text-foreground/50" />
              ) : (
                <ChevronDown className="text-foreground/50" />
              )}
            </div>
          </div>

          {/* Accordion Content */}
          <div className={`overflow-hidden transition-all duration-300 ease-out ${
            isOpen(item.title) ? 'block' : 'hidden'
          }`}>
            <div className="px-5 py-4 text-sm text-foreground/60">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}