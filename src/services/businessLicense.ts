import axiosClient, { uploadFile } from "../apis/axiosClients";

const uploadLicenses = async (params: { file: File, id: string, type: string }) => {
    const response = await uploadFile(params.file, `/bussiness-licenses/${params.type}/${params.id}/upload`);
    return response;
}

// const uploadBusinessLicense = async (params: { file: File, id: string }) => {
//     const response = await uploadFile(params.file, `/bussiness-licenses/business-license/${params.id}/upload`);
//     return response;
// }

// const uploadSecurityLicense = async (params: { file: File, id: string }) => {
//     const response = await uploadFile(params.file, `/bussiness-licenses/security-license/${params.id}/upload`);
//     return response;
// }

// const uploadFirePreventionLicense = async (params: { file: File, id: string }) => {
//     const response = await uploadFile(params.file, `/bussiness-licenses/fire-prevention-license/${params.id}/upload`);
//     return response;
// }

const removeLicenses = async (params: { id: string }) => {
    const response = await axiosClient.delete(`/bussiness-licenses/${params.id}`);
    return response;
}

const getAllBusinessLicense = async (params: { page: number, limit: number, keyword: string }) => {
    const response = await axiosClient.get(`/bussiness-licenses?page=${params.page}&limit=${params.limit}&keyword=${params.keyword}`);
    return response;
}

const updateBusinessLicense = async (params: { file: File, id: string }) => {
    const response = await uploadFile(params.file, `/bussiness-licenses/${params.id}`, "PATCH");
    return response;
}

const downloadBusinessLicense = async (params: { filename: string }) => {
    const response = await axiosClient.get(`/uploads/${params.filename}`);
    return response;
}

const deleteMultipleBusinessLicense = async (params: { licenseIds: string[] }) => {
    const response = await axiosClient.delete(`/bussiness-licenses/multiple`, { data: { licenseIds: params.licenseIds } });
    return response;
}

const businessLicenseService = {
    // uploadBusinessLicense,
    // uploadSecurityLicense,
    // uploadFirePreventionLicense,
    removeLicenses,
    getAllBusinessLicense,
    updateBusinessLicense,
    downloadBusinessLicense,
    deleteMultipleBusinessLicense,
    uploadLicenses
}

export default businessLicenseService;


