import axiosClient, { downloadFile, uploadFile } from "../apis/axiosClients";

const getBusiness = async (params: {page: number, limit: number}) => {
    const response = await axiosClient.get(`/businesses?page=${params.page}&limit=${params.limit}`);
    return response.data;
};

const addBusinessByExcel = async (params: {file: File}) => {
    const response = await uploadFile(params.file, '/businesses/create-business-by-excel');
    return response;
};

const exportBusinessToExcel = async () => {
    const response = await downloadFile(import.meta.env.VITE_API_URL + '/businesses/export-excel', 'businesses.xlsx');
    // const response = await downloadFile('/businesses/export-excel', 'businesses.xlsx');
    return response;
};

const businessService = {
    getBusiness,
    addBusinessByExcel,
    exportBusinessToExcel
}

export default businessService;

