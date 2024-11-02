import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const uploadSecurityLicenseReq = async (params: { file: File, id: string }) => {
    const response = await businessLicenseService.uploadSecurityLicense(params);
    return response;
}

const useUploadSecurityLicense = () => {
    const { mutateAsync: uploadSecurityLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { file: File, id: string }) => uploadSecurityLicenseReq(params),
    })

    return { uploadSecurityLicense, isPending, isSuccess };
}

export default useUploadSecurityLicense;