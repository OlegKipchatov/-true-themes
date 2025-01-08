import { useCallback } from 'react';

import type { ThemeProviderProps } from '../package/src';
import { ThemeProvider, useTheme } from '../package/src';

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
  }, []);

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
