'use client';

import React, {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState,
} from 'react';
import {
  getThemeStorage, getSystemTheme, setRootTheme, setThemeStorage, removeRootTheme,
} from './helpers';
import type { ThemeProviderProps, UseThemeProps } from './types';

const TrueThemeContext = createContext<UseThemeProps | undefined>(undefined);

const getDefaultTheme = (
  theme: string | undefined,
  storageKey: string,
  isCookieStorage: boolean,
) => getThemeStorage(storageKey, isCookieStorage) ?? theme ?? getSystemTheme();

const TrueTheme = (props: ThemeProviderProps) => {
  const {
    defaultTheme,
    attribute = 'class',
    storageKey = 'theme-mode',
    isCookieStorage = false,
    children,
  } = props;

  const [theme, setTheme] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    const useTheme = getDefaultTheme(defaultTheme, storageKey, isCookieStorage);
    setTheme(useTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      setRootTheme(attribute, theme);
      setThemeStorage(storageKey, theme, isCookieStorage);
    }
  }, [theme]);

  const updateTheme = useCallback((value: React.SetStateAction<string | undefined>) => {
    setTheme((prevTheme) => {
      if (prevTheme) {
        removeRootTheme(attribute, prevTheme);
      }

      if (value instanceof Function) {
        return value(prevTheme);
      }

      return value;
    });
  }, []);

  const providerValue = useMemo<UseThemeProps>(() => ({ theme, setTheme: updateTheme }), [theme]);
  return (
    <TrueThemeContext.Provider value={providerValue}>
      {children}
    </TrueThemeContext.Provider>
  );
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const context = useContext(TrueThemeContext);

  if (context) {
    return children;
  }

  return <TrueTheme {...props} />;
};

export const useTheme = () => {
  const context = useContext(TrueThemeContext);
  if (!context) {
    throw new Error('useTheme must be used with ThemesProvider');
  }

  return context;
};

export type { ThemeProviderProps, UseThemeProps };
