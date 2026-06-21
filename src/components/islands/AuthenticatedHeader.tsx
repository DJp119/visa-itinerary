import React from 'react';
import { useAuth, AuthProvider } from '@/lib/auth';

interface Props {
  currentPath: string;
}

function AuthenticatedHeaderContent({ currentPath }: Props) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex-shrink-0 flex items-center space-x-3">
          <a href="/" className="text-primary-500 hover:text-primary-600 font-bold text-xl">
            Visa Itinerary
          </a>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="/user/profile" className={`${user && currentPath === '/user/profile' ? 'text-foreground' : 'text-foreground/70'} hover:text-foreground transition-colors px-3 py-1 rounded text-sm`}>
            Profile
          </a>
          <a href="/user/subscription" className={`${user && currentPath === '/user/subscription' ? 'text-foreground' : 'text-foreground/70'} hover:text-foreground transition-colors px-3 py-1 rounded text-sm`}>
            Subscription
          </a>
          <a href="/dashboard" className={`${user && currentPath.startsWith('/dashboard') ? 'text-foreground' : 'text-foreground/70'} hover:text-foreground transition-colors px-3 py-1 rounded text-sm`}>
            Dashboard
          </a>
        </nav>
        <div className="flex-shrink-0 flex items-center space-x-3">
          {user && (
            <div className="relative">
              <button
                onClick={handleLogout}
                className="btn-outline px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function AuthenticatedHeader(props: Props) {
  return (
    <AuthProvider>
      <AuthenticatedHeaderContent {...props} />
    </AuthProvider>
  );
}
