import { sendGet } from "~/utils/axios";


export const getInfoDashboard = () => sendGet('/admin/idea/dashboard');