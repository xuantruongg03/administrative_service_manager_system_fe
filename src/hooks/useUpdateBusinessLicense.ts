import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const updateBusinessLicenseReq = async (params: { file: File, id: string }) => {
    const response = await businessLicenseService.updateBusinessLicense(params);
    return response;
}

const useUpdateBusinessLicense = () => {
    const { mutateAsync: updateBusinessLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { file: File, id: string }) => updateBusinessLicenseReq(params),
    })

    return { updateBusinessLicense, isPending, isSuccess };
}

export default useUpdateBusinessLicense;