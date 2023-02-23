import { sendGet, sendPut } from "~/utils/axios";

export const getUserInfo = () => sendGet('/user/profile');
export const updateUserInfo = (userId: any, params: any) => sendPut(`/user/${userId}/update`, params);