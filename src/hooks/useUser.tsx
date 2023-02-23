import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '~/api/user';

export const QK_USER = 'user';

export function useUser() {
  const res = useQuery([QK_USER], () => getUserInfo(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}