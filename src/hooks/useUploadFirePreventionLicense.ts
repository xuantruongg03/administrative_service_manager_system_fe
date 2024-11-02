import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const uploadFirePreventionLicenseReq = async (params: { file: File, id: string }) => {
    const response = await businessLicenseService.uploadFirePreventionLicense(params);
    return response;
}

const useUploadFirePreventionLicense = () => {
    const { mutateAsync: uploadFirePreventionLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { file: File, id: string }) => uploadFirePreventionLicenseReq(params),
    })

    return { uploadFirePreventionLicense, isPending, isSuccess };
}

export default useUploadFirePreventionLicense;