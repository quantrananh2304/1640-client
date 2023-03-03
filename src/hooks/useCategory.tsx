
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '~/api/categories';

export const QK_CATEGORY = 'categories';

export function useCategories(params: any) {
  const res = useQuery([QK_CATEGORY, {params}], () => getCategories(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}