import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Simple navigation instead of using tanstack router for simplicity in Astro pages unless available
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Sign in to Visa Itinerary
          </h2>
          <p className="text-lg text-foreground/60">
            Access personalized visa recommendations, document generation, and application tracking
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/80 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/80 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-border rounded"
              />
              <span className="ml-2 text-foreground/60">
                Remember me
              </span>
            </label>
            <a href="/forgot-password" className="text-primary-500 hover:text-primary-600 transition-colors">
              Forgot password?
            </a>
          </div>

          {error && (
            <p className="text-sm text-destroy-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-foreground/50">
          Don't have an account?
          <a href="/register" className="text-primary-500 hover:text-primary-600 transition-colors ml-1">
            Sign up
          </a>
        </div>

        <div className="border-t border-border/50 pt-6 mt-6 text-center text-sm text-foreground/40">
          Or continue with
        </div>

        <div className="space-y-4 mt-6">
          <button
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-border bg-background/80 hover:bg-background/100 transition-colors"
          >
            Continue with Google
          </button>

          <button
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-border bg-background/80 hover:bg-background/100 transition-colors"
          >
            Continue with Apple
          </button>
        </div>
      </div>
    </section>
  );
}
