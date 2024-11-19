import axiosClient, { downloadFile, uploadFile } from "../apis/axiosClients";
import { BusinessDataApiRequest } from "../interfaces/api";

const getBusiness = async (params: { page: number, limit: number, keyword: string }) => {
    const response = await axiosClient.get(`/businesses?page=${params.page}&limit=${params.limit}&keyword=${params.keyword}`);
    return response.data;
};

const addBusinessByExcel = async (params: { file: File }) => {
    const response = await uploadFile(params.file, '/businesses/create-business-by-excel');
    return response;
};

const exportBusinessToExcel = async () => {
    const response = await downloadFile(import.meta.env.VITE_API_URL + '/businesses/export-excel', 'businesses.xlsx');
    return response;
};

const deleteBusiness = async (codes: string[]) => {
    const response = await axiosClient.delete('/businesses', { data: codes });
    return response;
}

const getBusinessById = async (id: string) => {
    const response = await axiosClient.get(`/businesses/${id}`);
    return response;
}

const updateBusiness = async (params: {id: string, data: BusinessDataApiRequest}) => {
    const response = await axiosClient.patch(`/businesses/${params.id}`, params.data);
    return response;
}

const getBusinessMap = async (params: { page: number, limit: number, search: { street: string; type: string } }) => {
    const response = await axiosClient.get(`/businesses/map?page=${params.page}&limit=${params.limit}&street=${params.search.street}&type=${params.search.type}`);
    return response;
}

const getMapMarker = async () => {
    const response = await axiosClient.get('/businesses/map-marker');
    return response;
}

const businessService = {
    getBusiness,
    addBusinessByExcel,
    exportBusinessToExcel,
    deleteBusiness,
    getBusinessById,
    updateBusiness,
    getBusinessMap,
    getMapMarker,
}

export default businessService;

