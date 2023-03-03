import { sendGet, sendPost, sendPut } from '~/utils/axios';

export const getCategories = (params: any) => sendGet('/category/list', params);
export const createCategory = (params: any) => sendPost('/category/create', params);
// export const updateCategory = (params: any) => sendPut('/category/create', params);
export const inactiveCategory = (categoryId: any) => sendPut(`/category/${categoryId}/deactivate`);
