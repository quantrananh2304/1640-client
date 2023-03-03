
import { useQuery } from '@tanstack/react-query';
import { getIdeas } from '~/api/ideas';

export const QK_IDEAS = 'ideas/list';

export function useIdeas(params: any) {
  const res = useQuery([QK_IDEAS, {params}], () => getIdeas(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}