import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ThemeSelectorProps {
  className?: string;
}

export default function ThemeSelector({ className }: ThemeSelectorProps = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
      document.documentElement.classList.remove('dark');
      if (systemTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Update theme when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md hover:bg-background/100 transition-colors ${className}`}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-foreground" />
      )}
    </button>
  );
}