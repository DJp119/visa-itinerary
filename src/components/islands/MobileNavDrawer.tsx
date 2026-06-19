import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface MobileNavDrawerProps {
  className?: string;
}

export default function MobileNavDrawer({ className }: MobileNavDrawerProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-md hover:bg-background/100 transition-colors"
        aria-label="Open mobile navigation"
      >
        <Menu className="h-4 w-4 text-foreground" />
      </button>

      {/* Mobile Nav Drawer */}
      <div className={`fixed inset-0 z-40 flex items-end md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-out bg-background/95 backdrop-blur-sm border-l border-border/50`}>
        <div className="relative w-full max-w-xs p-6 space-y-6">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-background/100 transition-colors"
            aria-label="Close mobile navigation"
          >
            <X className="h-5 w-5 text-foreground/60 hover:text-foreground" />
          </button>

          {/* Nav Links */}
          <nav className="space-y-4">
            <a href="/user/profile" className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isOpen ? 'text-primary-500 bg-primary-50' : 'text-foreground/70 hover:text-foreground'
            } transition-colors`}>
              Profile
            </a>
            <a href="/user/subscription" className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isOpen ? 'text-primary-500 bg-primary-50' : 'text-foreground/70 hover:text-foreground'
            } transition-colors`}>
              Subscription
            </a>
            <a href="/dashboard" className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isOpen ? 'text-primary-500 bg-primary-50' : 'text-foreground/70 hover:text-foreground'
            } transition-colors`}>
              Dashboard
            </a>
            <a href="/visa" className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isOpen ? 'text-primary-500 bg-primary-50' : 'text-foreground/70 hover:text-foreground'
            } transition-colors`}>
              Visa Requirements
            </a>
            <a href="/passport" className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isOpen ? 'text-primary-500 bg-primary-50' : 'text-foreground/70 hover:text-foreground'
            } transition-colors`}>
              Passport Index
            </a>
            <a href="/travel" className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isOpen ? 'text-primary-500 bg-primary-50' : 'text-foreground/70 hover:text-foreground'
            } transition-colors`}>
              Travel Guide
            </a>
          </nav>

          {/* Divider */}
          <div className="h-px my-4 bg-border/50"></div>

          {/* Auth Section */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                // TODO: Trigger login modal
                alert('Login functionality coming soon');
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-background/80 hover:bg-background/100 transition-colors border border-border/50 text-left"
            >
              <div className="flex-1 text-sm font-medium text-foreground">
                Sign in to your account
              </div>
              <div className="flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-xs bg-primary-100 text-primary-800">
                  Sign In
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                // TODO: Trigger signup modal
                alert('Sign up functionality coming soon');
              }}
              className="w-full bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}