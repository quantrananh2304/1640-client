
import { useQuery } from '@tanstack/react-query';
import { getIdeaDetail, getIdeas } from '~/api/ideas';

export const QK_IDEAS = 'ideas/list';
export const QK_IDEA_DETAIL = 'ideas/detail';

export function useIdeas(params: any) {
  const res = useQuery([QK_IDEAS, {params}], () => getIdeas(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}

export function useDetailIdea(params: any) {
  const res = useQuery([QK_IDEA_DETAIL, {params}], () => getIdeaDetail(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}