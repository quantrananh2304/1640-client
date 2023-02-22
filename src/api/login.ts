import { sendPost } from "~/utils/axios";

export const setLogin = (params: any) => sendPost('/auth/login', params);
