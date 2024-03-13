'use client';

import React, {
  createContext, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState,
} from 'react';

import Cookies from 'js-cookie';

/**
 * @param [theme] - Current theme
 * @param [setTheme] - Function for update current theme
 */
type UseTrueThemeProps = {
  theme: string | undefined,
  setTheme: React.Dispatch<React.SetStateAction<string | undefined>>
}

/**
 * @param [defalutTheme] - Set default theme for app.
 * @param [attribute] - Set theme name to attribute. If set 'class' theme will added to class list documentElement.
 * Exmaple: `attribute='data-theme-mode'`
 * @param [storageKey] - Key for storage
 * @param [isCookieStorage] - Flag for use cookie storage instead local storage
 * @default ```json
 * {
 *  "attribute": "class",
 *  "storageKey": "theme-mode",
 *  "isCookieStorage": false
 * }
 * ```
*/
type TrueThemeProps = {
  defalutTheme?: string,
  attribute?: string,
  storageKey?: string,
  isCookieStorage?: boolean,
  children: ReactNode,
};

export const TrueThemeContext = createContext<UseTrueThemeProps | undefined>(undefined);

const MEDIA_QUERY = '(prefers-color-scheme: dark)';
const getSystemTheme = () => {
  const isSystemDark = window.matchMedia(MEDIA_QUERY);

  return isSystemDark ? 'dark' : 'light';
};

const setRootTheme = (attribute: string, theme: string) => {
  if (attribute === 'class') {
    document.documentElement.classList.toggle(theme, true);
  } else {
    document.documentElement.setAttribute(attribute, theme);
  }
};

const removeRootTheme = (attribute: string, theme: string) => {
  if (attribute === 'class') {
    document.documentElement.classList.toggle(theme, false);
  } else {
    document.documentElement.removeAttribute(attribute);
  }
};

const setThemeStorage = (storageKey: string, theme: string, isCookieStorage: boolean) => {
  if (isCookieStorage) {
    const cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getMonth() + 6);
    Cookies.set(storageKey, theme, { expires: cookieDate });
  } else {
    window.localStorage.setItem(storageKey, theme);
  }
};

const getThemeStorage = (storageKey: string, isCookieStorage: boolean) => {
  if (isCookieStorage) {
    return Cookies.get(storageKey);
  }

  return window.localStorage.getItem(storageKey);
};

const getDefaultTheme = (
  theme: string | undefined,
  storageKey: string,
  isCookieStorage: boolean,
) => getThemeStorage(storageKey, isCookieStorage) ?? theme ?? getSystemTheme();

function TrueTheme(props: TrueThemeProps) {
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

export function TrueThemeProvider(props: TrueThemeProps) {
  const { children } = props;
  const context = useContext(TrueThemeContext);

  if (context) {
    return children;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TrueTheme {...props} />;
}

export const useTrueTheme = () => {
  const context = useContext(TrueThemeContext);
  if (!context) {
    throw new Error('useTrueTheme must be used with TrueThemeProvider');
  }

  return context;
};
