import { ROUTES } from "~/routes";
import { getCookie, setCookie } from "./cookie";
import history from './history';


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
  const expires = expiresOn ? +new Date(expiresOn) : 9999;
  setCookie('token', accessToken, {
    expires,
  });
  if (getCookie('token')) {
    history.push(callbackUrl ?? ROUTES.Ideas);
    // window.location.reload();
  }
};