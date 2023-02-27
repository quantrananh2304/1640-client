import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '~/api/account';

export const QK_ACCOUNT = 'account';

export function useAccounts(params: any) {
  const res = useQuery([QK_ACCOUNT, {params}], () => getAccounts(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}