
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '~/api/categories';
import { getIdeas } from '~/api/ideas';

export const QK_CATEGORY = 'categories';

export function useCategories() {
  const res = useQuery([QK_CATEGORY], () => getCategories(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}