import { useQuery } from '@tanstack/react-query';
import { getToken } from '~/api/login';

export const QK_IDEAS = 'ideas';

export function useUser() {
  const res = useQuery([QK_IDEAS], () => getToken(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}