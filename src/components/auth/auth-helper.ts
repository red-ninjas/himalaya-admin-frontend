import { isServer } from '../utils/common-utils';

export const AUTH_COOKIE_NAME = 'auth-token';

export const extractAuthToken = async () => {
  let token: string | undefined = undefined;
  if (isServer) {
    const { cookies: serverCookies } = await import('next/headers');
    token = serverCookies().get(AUTH_COOKIE_NAME)?.value;
  } else {
    const { default: clientCookies } = await import('cookie-cutter');
    token = clientCookies.get(AUTH_COOKIE_NAME);
  }

  return token;
};

export const setCookieAuthToken = async (value: string | undefined) => {
  if (isServer) {
    const { cookies: serverCookies } = await import('next/headers');
    if (value !== undefined) {
      serverCookies().set(AUTH_COOKIE_NAME, value);
    } else {
      serverCookies().delete(AUTH_COOKIE_NAME);
    }
  } else {
    const { default: clientCookies } = await import('cookie-cutter');
    if (value !== undefined) {
      clientCookies.set(AUTH_COOKIE_NAME, value);
    } else {
      clientCookies.set(AUTH_COOKIE_NAME, undefined, {
        expires: new Date(0),
      });

      document.cookie = 'auth-token=undefined';
    }
  }
};
