import { sendGet, sendPost } from '~/utils/axios';

export const getDepartments = (params: any) => sendGet('/department/list', params);
export const createDepartment = (params: any) => sendPost('/admin/department/create', params);