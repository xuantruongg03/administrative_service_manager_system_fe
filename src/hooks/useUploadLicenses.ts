import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const uploadLicensesReq = async (params: { file: File, id: string, type: string }) => {
    const response = await businessLicenseService.uploadLicenses(params);
    return response;
}

const useUploadLicenses = () => {
    const { mutateAsync: uploadLicenses, isPending, isSuccess } = useMutation({
        mutationFn: (params: { file: File, id: string, type: string }) => uploadLicensesReq(params),
    })

    return { uploadLicenses, isPending, isSuccess };
}

export default useUploadLicenses;