import { sendGet, sendPost } from "~/utils/axios";

export const createAccount = (params: any) => sendPost('/admin/auth/signup', params);
export const getAccounts = (params: any) => sendGet('/admin/user/list', params);
