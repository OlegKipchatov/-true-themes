import { Dispatch, ReactNode, SetStateAction } from 'react';

/**
 * @param [theme] - Current theme
 * @param [setTheme] - Function for update current theme
 */
export type UseTrueThemeProps = {
  theme: string | undefined,
  setTheme: Dispatch<SetStateAction<string | undefined>>
}

/**
 * @param [defalutTheme] - Set default theme for application
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
export type TrueThemeProviderProps = {
  defalutTheme?: string,
  attribute?: string,
  storageKey?: string,
  isCookieStorage?: boolean,
  children: ReactNode,
};
