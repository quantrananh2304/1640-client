import { sendGet, sendPost, sendPut } from '~/utils/axios';

export const getIdeas = (params: any) => sendGet('/idea/list', params);
export const setIdea = (params: any) => sendPost('/idea/create', params);
export const getIdeaDetail = (params: any) => sendGet(`/idea`, params)
export const updateAction = (ideaId: string, action: string) => sendPut(`/idea/${ideaId}/like-dislike/${action}`);
export const setComment = (ideaId: string, params: any) => sendPut(`/idea/${ideaId}/comment`, params);
export const viewIdea = (ideaId: string) => sendPut(`/idea/${ideaId}/view`);

