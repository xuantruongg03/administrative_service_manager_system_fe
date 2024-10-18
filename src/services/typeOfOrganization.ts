import axiosClient from "../apis/axiosClients"

const getTypeOfOrganization = async () => {
    const response = await axiosClient.get("/type-of-organizations");
    return response;
}

const typeOfOrganizationService = {
    getTypeOfOrganization
}

export default typeOfOrganizationService;
