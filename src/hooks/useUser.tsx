import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '~/api/user';

export const QK_USER = 'user';

export function useUser(token?: string) {
  const res = useQuery([QK_USER], () => getUserInfo(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}