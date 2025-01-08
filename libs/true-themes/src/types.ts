import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type UseThemeProps = {
  /**
   * Current theme
   */
  theme: string | undefined,
  /**
   * Function for update current theme
   */
  setTheme: Dispatch<SetStateAction<string | undefined>>
}

/**
 * @default ```json
 * {
 *  "attribute": "class",
 *  "storageKey": "theme-mode",
 *  "isCookieStorage": false
 * }
 * ```
*/
export type ThemeProviderProps = {
  /**
   * Set default theme for application
   */
  defaultTheme?: string,
  /**
   * Set theme name to attribute. If set 'class' theme will added to class list documentElement.
   * Example: `attribute='data-theme-mode'`
   */
  attribute?: string,
  /**
   * Key for storage
   */
  storageKey?: string,
  /**
   * Flag for use cookie storage instead local storage
   */
  isCookieStorage?: boolean,
  /**
   * Flag for use cookie storage instead local storage
   */
  children: ReactNode,
};
