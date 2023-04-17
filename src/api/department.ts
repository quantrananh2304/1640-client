import { sendGet, sendPost, sendPut } from "~/utils/axios";

export const getDepartments = (params: any) =>
  sendGet("/department/list", params);
export const createDepartment = (params: any) =>
  sendPost("/admin/department/create", params);
export const toggleDepartmentStatus = (departmentId: string, action: string) =>
  sendPut(`/admin/department/${departmentId}/toggle/${action}`);
