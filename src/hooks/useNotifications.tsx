import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '~/api/notification';

export const QK_NOTI = 'notification';

export function useNotification(params: any) {
  const res = useQuery([QK_NOTI, {params}], () => getNotifications(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}