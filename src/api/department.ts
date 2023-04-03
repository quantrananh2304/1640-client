import { sendGet, sendPost } from '~/utils/axios';

export const getDepartments = (params: any) => sendGet('/admin/department/list', params);
export const createDepartment = (params: any) => sendPost('/admin/department/create', params);
