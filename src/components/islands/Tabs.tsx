import { useState } from 'react';

interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  defaultIndex?: number;
}

export default function Tabs({
  className,
  tabs,
  value,
  onChange,
  defaultIndex = 0
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Check if the initial value matches any tab
    const matchingTab = tabs.find(tab => tab.value === value);
    if (matchingTab) {
      return value;
    }
    // Fallback to defaultIndex or first tab
    return tabs[defaultIndex]?.value || tabs[0]?.value || '';
  });

  // Update active tab when value prop changes (if controlled)
  // Note: In a more sophisticated implementation, you'd handle controlled vs uncontrolled

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    onChange(tabValue);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-border/50 mb-4">
        <div className="flex border-b-transparent">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`flex-1 px-4 py-3 text-sm font-medium text-center transition-colors border-b-2 ${
                activeTab === tab.value
                  ? 'border-primary-500 text-primary-500'
                  : 'text-foreground/50 hover:text-foreground hover:bg-background/50'
              }`}
            >
              {tab.icon && (
                <span className="mr-2 h-4 w-4 flex-shrink-0">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6 mt-4">
        {tabs.map(tab => (
          <div
            key={tab.value}
            className={`hidden ${activeTab === tab.value ? 'block' : ''}`}>
            {/* Content will be injected by parent component */}
          </div>
        ))}
      </div>
    </div>
  );
}