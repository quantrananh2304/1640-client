import { sendGet, sendPost, sendPut } from '~/utils/axios';

export const getDepartments = (params: any) => sendGet('/admin/department/list', params);
