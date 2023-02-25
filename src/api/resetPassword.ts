import { sendPost, sendPut } from "~/utils/axios";

export const getResetPasswordCode = (params: any) => sendPut('/auth/request-reset-password', params)
export const resetPassword = (code: any, params: any) => sendPut(`/auth/reset-password/${code}`, params)
