import axiosClient, { uploadFile } from "../apis/axiosClients";
import { EmployeeDataApi } from "../interfaces/api";

const createEmployees = async (params: { file: File, businessId: string }) => {
    const response = await uploadFile(params.file, `/employees/create-by-excel?businessId=${params.businessId}`);
    return response;
}

const getEmployees = async (params: { businessId: string, page: number, limit: number }) => {
    const response = await axiosClient.get(`/employees/employee-info/${params.businessId}?page=${params.page}&limit=${params.limit}`);
    return response;
}

const createEmployee = async (params: { data: EmployeeDataApi, businessId: string }) => {
    const response = await axiosClient.post(`/employees/create/${params.businessId}`, params.data);
    return response;
}

const deleteEmployee = async (params: { id: string }) => {
    const response = await axiosClient.delete(`/employees/${params.id}`);
    return response;
}

const updateEmployee = async (params: { data: EmployeeDataApi, citizen_id: string, businessId: string }) => {
    const response = await axiosClient.put(`/employees/${params.businessId}/${params.citizen_id}`, params.data);
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
