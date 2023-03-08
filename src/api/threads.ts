import { sendGet, sendPost, sendPut } from '~/utils/axios';

export const getThreads = (params: any) => sendGet('/thread/list', params);
export const createThread = (params: any) => sendPost('/admin/thread/create', params);
