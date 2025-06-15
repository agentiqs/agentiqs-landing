
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('docs-theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    console.log('Applying theme:', isDark ? 'dark' : 'light');
    console.log('HTML element before:', html.classList.toString());
    console.log('HTML dataset before:', html.dataset);
    
    if (isDark) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
    }
    
    console.log('HTML element after:', html.classList.toString());
    console.log('HTML dataset after:', html.dataset);
    
    localStorage.setItem('docs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle clicked, current isDark:', isDark);
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center gap-2">
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
      {/* DEBUG: Show current theme state */}
      <span className="text-xs bg-blue-500 dark:bg-yellow-500 px-2 py-1 rounded">
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </div>
  );
};

export default ThemeToggle;
