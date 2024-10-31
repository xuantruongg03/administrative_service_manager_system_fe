import axiosClient, { uploadFile } from "../apis/axiosClients";
import { EmployeeDataApi } from "../interfaces/api";

const createEmployees = async (params: { file: File, businessCode: string }) => {
    const response = await uploadFile(params.file, `/employees/create-by-excel?businessCode=${params.businessCode}`);
    return response;
}

const getEmployees = async (params: { businessCode: string, page: number, limit: number }) => {
    const response = await axiosClient.get(`/employees/employee-info/${params.businessCode}?page=${params.page}&limit=${params.limit}`);
    return response;
}

const createEmployee = async (params: { data: EmployeeDataApi, businessCode: string }) => {
    const response = await axiosClient.post(`/employees/create/${params.businessCode}`, params.data);
    return response;
}

const deleteEmployee = async (params: { id: string }) => {
    const response = await axiosClient.delete(`/employees/${params.id}`);
    return response;
}

const updateEmployee = async (params: { data: EmployeeDataApi, citizen_id: string, businessCode: string }) => {
    const response = await axiosClient.put(`/employees/${params.businessCode}/${params.citizen_id}`, params.data);
    return response;
}

const employeesService = {
    createEmployees,
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee
}


export default employeesService;
