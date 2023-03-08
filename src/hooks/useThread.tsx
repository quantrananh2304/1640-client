
import { useQuery } from '@tanstack/react-query';
import { getThreads } from '~/api/threads';

export const QK_THREAD = 'thread';

export function useThread(params: any) {
  const res = useQuery([QK_THREAD, {params}], () => getThreads(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}