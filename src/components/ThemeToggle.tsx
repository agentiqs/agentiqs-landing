
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('docs-theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme on mount and when isDark changes
    const html = document.documentElement;
    console.log('Applying theme:', isDark ? 'dark' : 'light');
    console.log('HTML element before:', html.classList.toString());
    
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    console.log('HTML element after:', html.classList.toString());
    
    // Save to localStorage
    localStorage.setItem('docs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle clicked, current isDark:', isDark);
    setIsDark(!isDark);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0 text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-white hover:bg-gray-800 dark:hover:bg-gray-800"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
