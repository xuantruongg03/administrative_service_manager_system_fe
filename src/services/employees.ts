import { uploadFile } from "../apis/axiosClients";

const createEmployees = async (params: { file: File, businessCode: string }) => {
    const response = await uploadFile(params.file, `/employees/create-by-excel?businessCode=${params.businessCode}`);
    return response;
}

const employeesService = {
    createEmployees,
}


export default employeesService;
