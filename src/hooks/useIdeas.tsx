
import { useQuery } from '@tanstack/react-query';
import { getIdeas } from '~/api/ideas';

export const QK_IDEAS = 'ideas';

export function useIdeas() {
  const res = useQuery([QK_IDEAS], () => getIdeas(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}