'use client';

import React, {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState,
} from 'react';
import {
  getThemeStorage, getSystemTheme, setRootTheme, setThemeStorage, removeRootTheme,
} from './helpers';
import { TrueThemeProviderProps, UseTrueThemeProps } from './types';

const TrueThemeContext = createContext<UseTrueThemeProps | undefined>(undefined);

const getDefaultTheme = (
  theme: string | undefined,
  storageKey: string,
  isCookieStorage: boolean,
) => getThemeStorage(storageKey, isCookieStorage) ?? theme ?? getSystemTheme();

function TrueTheme(props: TrueThemeProviderProps) {
  const {
    defalutTheme,
    attribute = 'class',
    storageKey = 'theme-mode',
    isCookieStorage = false,
    children,
  } = props;

  const [theme, setTheme] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    const useTheme = getDefaultTheme(defalutTheme, storageKey, isCookieStorage);
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

  const providerValue = useMemo<UseTrueThemeProps>(() => ({ theme, setTheme: updateTheme }), [theme]);
  return (
    <TrueThemeContext.Provider value={providerValue}>
      {children}
    </TrueThemeContext.Provider>
  );
}

export function ThemesProvider(props: TrueThemeProviderProps) {
  const { children } = props;
  const context = useContext(TrueThemeContext);

  if (context) {
    return children;
  }

  return <TrueTheme {...props} />;
}

export const useTheme = () => {
  const context = useContext(TrueThemeContext);
  if (!context) {
    throw new Error('useTheme must be used with TrueThemeProvider');
  }

  return context;
};
