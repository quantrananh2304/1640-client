
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '~/api/department';

export const QK_DEPARTMENT = 'department';

export function useDepartment(params: any) {
  const res = useQuery([QK_DEPARTMENT, {params}], () => getDepartments(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}