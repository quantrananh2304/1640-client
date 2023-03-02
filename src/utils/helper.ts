import { ROUTES } from "~/routes";
import { getCookie, removeCookie, setCookie } from "./cookie";
import history from './history';
import { hoursToMilliseconds } from "date-fns";
import { message } from "antd";

export const getFileName = (path: string) => {
  const index = path.lastIndexOf('/');
  return path.substring(index + 1);
};

interface IHandleLogin {
  accessToken?: string;
  expiresOn?: Date | null;
  callbackUrl?: string;
}

export const handleLogin = ({ accessToken, expiresOn, callbackUrl }: IHandleLogin) => {
  if (typeof window === 'undefined' || !accessToken) return;
  const expires = expiresOn ? +new Date(expiresOn) : hoursToMilliseconds(5);
  setCookie('token', accessToken, {
    expires,
  });
  if (expires) {
    setTimeout(() => {
      message.warning('Your token has expired, please log in again!')
      setTimeout(() => {
        history.push(ROUTES.Login)
      }, 2000);
      removeCookie('token');
    }, expires);
  }
  if (getCookie('token')) {
    history.push(callbackUrl ?? ROUTES.Ideas);
    // window.location.reload();
  }
};

export const handleLogout = (callbackUrl = ROUTES.Ideas) => {
  removeCookie('token');
  removeCookie('refreshToken');
  localStorage.clear();
  if (callbackUrl) {
    history.push(callbackUrl);
  }
};
