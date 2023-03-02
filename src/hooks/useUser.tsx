import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '~/api/user';

export const QK_USER = 'user';

export function useUser(enable: boolean) {
  const res = useQuery([QK_USER], () => getUserInfo(), {
    enabled: enable,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}