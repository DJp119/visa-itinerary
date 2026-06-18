import { CreditCard, RefreshCw, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  color?: string;
}

interface SubscriptionManagerProps {
  className?: string;
  currentPlan: SubscriptionPlan;
  onPlanChange: (planId: string) => void;
  onBillingChange: (interval: 'monthly' | 'yearly') => void;
  availablePlans: SubscriptionPlan[];
}

export default function SubscriptionManager({
  className,
  currentPlan,
  onPlanChange,
  onBillingChange,
  availablePlans
}: SubscriptionManagerProps) {
  const [isPlanMenuOpen, setIsPlanMenuOpen] = useState(false);
  const [isBillingMenuOpen, setIsBillingMenuOpen] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(currentPlan.interval);

  const togglePlanMenu = () => setIsPlanMenuOpen(!isPlanMenuOpen);
  const closePlanMenu = () => setIsPlanMenuOpen(false);
  const selectPlan = (plan: SubscriptionPlan) => {
    onPlanChange(plan.id);
    closePlanMenu();
  };

  const toggleBillingMenu = () => setIsBillingMenuOpen(!isBillingMenuOpen);
  const closeBillingMenu = () => setIsBillingMenuOpen(false);
  const selectBillingInterval = (interval: 'monthly' | 'yearly') => {
    setCurrentInterval(interval);
    onBillingChange(interval);
    closeBillingMenu();
  };

  // Format price based on interval
  const formatPrice = (price: number, interval: 'monthly' | 'yearly') => {
    if (interval === 'yearly') {
      // Assume yearly price is 10x monthly for display (2 months free)
      const monthlyPrice = price;
      const yearlyPrice = monthlyPrice * 10;
      return {
        display: `${yearlyPrice.toFixed(2)}/yr`,
        monthly: monthlyPrice.toFixed(2)
      };
    } else {
      return {
        display: `${price.toFixed(2)}/mo`,
        monthly: price.toFixed(2)
      };
    }
  };

  return (
    <div className={`w-full space-y-6 bg-background/50 rounded-lg p-6 border border-border/50 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <CreditCard className="h-5 w-5 flex-shrink-0 text-primary-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Subscription Management
            </h3>
            <p className="text-sm text-foreground/50">
              View and manage your Visa Itinerary subscription
            </p>
          </div>
        </div>
      </div>

      {/* Current Plan */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Current Plan
        </h3>
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center bg-primary-500/20 text-primary-500">
            </div>
          <div className="ml-4">
            <h4 className="font-semibold text-foreground">
              {currentPlan.name}
              {currentPlan.popular && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-primary-500 text-primary-foreground">
                  Popular
                </span>
              )}
            </h4>
            <p className="text-sm text-foreground/50">
              {formatPrice(currentPlan.price, currentInterval).display}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground mb-2">
            Features
          </p>
          <ul className="space-y-1 text-foreground/60 list-disc pl-5">
            {currentPlan.features.map((feature, index) => (
              <li key={index}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Change Plan
        </div>
        <div className="space-y-4">
          {availablePlans.map(plan => (
            <div
              key={plan.id}
              onClick={() => selectPlan(plan)}
              className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-background/100 transition-colors ${
                plan.id === currentPlan.id
                  ? 'border-primary-500 bg-primary-50'
                  : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center bg-primary-500/20 text-primary-500">
                  </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {plan.name}
                    {plan.popular && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-primary-500 text-primary-foreground">
                        Popular
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-foreground/50 mb-2">
                    {formatPrice(plan.price, currentInterval).display}
                  </p>
                  <p className="text-xs text-foreground/50">
                    {plan.features.slice(0, 3).map(f => (
                      <span key={f} className="mr-1">
                        • {f}
                      </span>
                    ))}
                    {plan.features.length > 3 && '...'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Cycle */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Billing Cycle
        </div>
        <div className="border border-border/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-4 w-4 text-primary-500" />
              <div>
                <p className="font-medium text-foreground">
                  Renewal Date
                </p>
                <p className="text-sm text-foreground/50">
                  July 15, 2026
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleBillingMenu}
                className={`flex h-9 w-20 items-center justify-between px-3 rounded-full text-xs font-medium transition-colors ${
                  currentInterval === 'monthly'
                    ? 'bg-primary-500 text-primary-foreground'
                    : 'bg-background/50 text-foreground'
                }`}
              >
                <span className="translate-x-0 ${
                  currentInterval === 'monthly' ? 'translate-x-0' : 'translate-x-full'
                }">
                  Monthly
                </span>
                <span className="translate-x-0 ${
                  currentInterval === 'yearly' ? 'translate-x-0' : 'translate-x-full'
                }">
                  Yearly
                </span>
              </button>
              {/* Hidden radio buttons for accessibility */}
              <div className="absolute left-0 top-0 w-full h-full opacity-0">
                <input
                  type="radio"
                  value="monthly"
                  checked={currentInterval === 'monthly'}
                  onChange={() => selectBillingInterval('monthly')}
                  aria-label="Monthly billing"
                />
                <input
                  type="radio"
                  value="yearly"
                  checked={currentInterval === 'yearly'}
                  onChange={() => selectBillingInterval('yearly')}
                  aria-label="Yearly billing"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Billing Menu */}
        {isBillingMenuOpen && (
          <div className="mt-2 w-24 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 p-2 z-20">
            <div className="space-y-1">
              <button
                onClick={() => selectBillingInterval('monthly')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentInterval === 'monthly'
                    ? 'bg-primary-50 text-primary-500'
                    : 'hover:bg-background/100'
                }`}
              >
                Monthly
                {currentInterval === 'monthly' && (
                  <span className="ml-auto h-4 w-4">
                    {/* Checkmark */}
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
              <button
                onClick={() => selectBillingInterval('yearly')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentInterval === 'yearly'
                    ? 'bg-primary-50 text-primary-500'
                    : 'hover:bg-background/100'
                }`}
              >
                Yearly
                {currentInterval === 'yearly' && (
                  <span className="ml-auto h-4 w-4">
                    {/* Checkmark */}
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Notifications
        </div>
        <div className="border border-border/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="h-4 w-4 text-primary-500" />
              <div>
                <p className="font-medium text-foreground">
                  Renewal Reminders
                </p>
                <p className="text-sm text-foreground/50">
                  Get notified 3 days before renewal
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="flex h-6 w-11 items-center px-3 bg-background/50 rounded-full" >
                {/* Switch thumb */}
                <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full shadow-md transform transition duration-200"
                  style={{ transform: 'translateX(6px)' }}>
                </div>
              </div>
              {/* Hidden checkbox for accessibility */}
              <input type="checkbox" className="absolute left-0 top-0 w-full h-full opacity-0" checked={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button
          onClick={() => {
            // TODO: Implement update payment method
            alert('Update payment method functionality coming soon');
          }}
          className="w-full bg-transparent border border-primary-500 text-primary-500 px-4 py-2 rounded-md hover:bg-primary-50 transition-colors"
        >
          Update Payment Method
        </button>

        <button
          onClick={() => {
            // TODO: Implement cancel subscription
            if (window.confirm('Are you sure you want to cancel your subscription? This action cannot be undone.')) {
              alert('Subscription cancelled successfully');
            }
          }}
          className="w-full bg-transparent border border-danger-500 text-danger-500 py-2 rounded-md hover:bg-danger-50 transition-colors"
        >
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}