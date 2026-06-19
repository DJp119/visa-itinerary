import { Google, Github } from 'lucide-react';
import { useState } from 'react';

interface LoginProvidersProps {
  className?: string;
  onGoogleLogin: () => void;
  onGithubLogin: () => void;
  onEmailLogin: () => void;
}

export default function LoginProviders({
  className,
  onGoogleLogin,
  onGithubLogin,
  onEmailLogin
}: LoginProvidersProps = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await onGoogleLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await onGithubLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setIsLoading(true);
    try {
      await onEmailLogin();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="flex items-center">
        <div className="w-0 flex-1 ht-px bg-border/50" />
        <span className="px-3 text-sm text-foreground/50">
          Or continue with
        </span>
        <div className="w-0 flex-1 ht-px bg-border/50" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`w-full flex items-center justify-start px-4 py-3 rounded-lg border border-border/50 bg-background/80 hover:bg-background/100 transition-colors font-medium text-sm ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <Google className="h-4 w-4 mr-3 text-red-500" />
          <span className="flex-1">Continue with Google</span>
          {isLoading && (
            <svg className="h-4 w-4 ml-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9h.582M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        {/* GitHub Login */}
        <button
          onClick={handleGithubLogin}
          disabled={isLoading}
          className={`w-full flex items-center justify-start px-4 py-3 rounded-lg border border-border/50 bg-background/80 hover:bg-background/100 transition-colors font-medium text-sm ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <Github className="h-4 w-4 mr-3 text-foreground/500" />
          <span className="flex-1">Continue with GitHub</span>
          {isLoading && (
            <svg className="h-4 w-4 ml-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9h.582M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={handleEmailLogin}
          className="w-full bg-transparent border border-primary-500 text-primary-500 px-4 py-2 rounded-md hover:bg-primary-50 transition-colors"
        >
          Sign in with Email
        </button>
      </div>
    </div>
  );
}