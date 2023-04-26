import { ROUTES } from "~/routes";
import { getCookie, removeCookie, setCookie } from "./cookie";
import history from './history';
import { hoursToMilliseconds } from "date-fns";
import { message } from "antd";
import { UserRole } from "./constant";

export const getFileName = (path: string) => {
  const index = path.lastIndexOf('/');
  return path.substring(index + 1);
};

interface IHandleLogin {
  accessToken?: string;
  expiresOn?: Date | null;
  callbackUrl?: string;
  userName: any;
  userRole: any;
}

export const handleLogin = ({ accessToken, expiresOn, callbackUrl, userName, userRole }: IHandleLogin) => {
  if (typeof window === 'undefined' || !accessToken) return;
  const expires = expiresOn ? +new Date(expiresOn) : 9999;
  setCookie('token', accessToken, {
    expires,
  });

  setCookie('userName', userName, {
    expires,
  });

  if (getCookie('token')) {
    if (userRole === UserRole.Admin) {
      history.push(callbackUrl ?? ROUTES.DashBoard);
    } else {
      history.push(ROUTES.Ideas);
    }
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
