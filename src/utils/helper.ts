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
  userName: any;
}

export const handleLogin = ({ accessToken, expiresOn, callbackUrl, userName }: IHandleLogin) => {
  if (typeof window === 'undefined' || !accessToken) return;
  const expires = expiresOn ? +new Date(expiresOn) : hoursToMilliseconds(5);
  setCookie('token', accessToken, {
    expires,
  });

  setCookie('userName', userName, {
    expires,
  });

  if (getCookie('token')) {
    history.push(callbackUrl ?? ROUTES.Ideas);
    // window.location.reload();
  }
};

export const handleLogout = (callbackUrl = ROUTES.Ideas) => {
  removeCookie('token');
  removeCookie('refreshToken');
  removeCookie('userName');
  localStorage.clear();
  if (callbackUrl) {
    history.push(callbackUrl);
  }
};
