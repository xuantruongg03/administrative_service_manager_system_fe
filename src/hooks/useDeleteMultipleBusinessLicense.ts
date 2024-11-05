import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const deleteMultipleBusinessLicenseReq = async (params: { licenseIds: string[] }) => {
    const response = await businessLicenseService.deleteMultipleBusinessLicense(params);
    return response;
}

const useDeleteMultipleBusinessLicense = () => {
    const { mutateAsync: deleteMultipleBusinessLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { licenseIds: string[] }) => deleteMultipleBusinessLicenseReq(params),
    })

    return { deleteMultipleBusinessLicense, isPending, isSuccess };
}

export default useDeleteMultipleBusinessLicense;