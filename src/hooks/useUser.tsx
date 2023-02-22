import { useQuery } from '@tanstack/react-query';
import { setLogin } from '~/api/login';

export const QK_LOGIN = 'login';

export function useUser(params: any) {
  const res = useQuery([QK_LOGIN, {params}], () => setLogin(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}