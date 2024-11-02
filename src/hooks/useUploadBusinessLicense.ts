import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const uploadBusinessLicenseReq = async (params: { file: File, id: string }) => {
    const response = await businessLicenseService.uploadBusinessLicense(params);
    return response;
}

const useUploadBusinessLicense = () => {
    const { mutateAsync: uploadBusinessLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { file: File, id: string }) => uploadBusinessLicenseReq(params),
    })

    return { uploadBusinessLicense, isPending, isSuccess };
}

export default useUploadBusinessLicense;