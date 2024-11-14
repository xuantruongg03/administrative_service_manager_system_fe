import axiosClient from "../apis/axiosClients"

const getLicenseType = async () => {
    const response = await axiosClient.get("/license-types");
    return response;
}

const licenseTypeService = {
    getLicenseType
}

export default licenseTypeService;
