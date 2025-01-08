import { useCallback } from 'react';

import type { ThemeProviderProps } from 'true-themes';
import { ThemeProvider, useTheme } from 'true-themes';

import classes from './true-theme.module.css';

export default {
  title: 'ThemesProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  args: {
    attribute: 'theme',
  },
};

const ThemeComponent = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return (
    <div
      className={classes['theme-component']}
    >
      {theme}
      <button
        type="button"
        onClick={handleClick}
      >
        Change theme
      </button>
    </div>
  );
};

export const Overview = (args: ThemeProviderProps) => (
  <ThemeProvider {...args}>
    <ThemeComponent />
  </ThemeProvider>
);
