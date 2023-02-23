import { sendPost } from "~/utils/axios";

export const createAccount = (params: any) => sendPost('/admin/auth/signup', params);