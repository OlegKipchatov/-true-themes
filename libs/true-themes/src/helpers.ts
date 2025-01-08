import Cookies from 'js-cookie';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const getSystemTheme = () => {
  const isSystemDark = window.matchMedia(MEDIA_QUERY);

  return isSystemDark ? 'dark' : 'light';
};

export const setRootTheme = (attribute: string, theme: string) => {
  if (attribute === 'class') {
    document.documentElement.classList.toggle(theme, true);
  } else {
    document.documentElement.setAttribute(attribute, theme);
  }
};

export const removeRootTheme = (attribute: string, theme: string) => {
  if (attribute === 'class') {
    document.documentElement.classList.toggle(theme, false);
  } else {
    document.documentElement.removeAttribute(attribute);
  }
};

export const setThemeStorage = (storageKey: string, theme: string, isCookieStorage: boolean) => {
  if (isCookieStorage) {
    const cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getMonth() + 6);
    Cookies.set(storageKey, theme, { expires: cookieDate });
  } else {
    window.localStorage.setItem(storageKey, theme);
  }
};

export const getThemeStorage = (storageKey: string, isCookieStorage: boolean) => {
  if (isCookieStorage) {
    return Cookies.get(storageKey);
  }

  return window.localStorage.getItem(storageKey);
};
