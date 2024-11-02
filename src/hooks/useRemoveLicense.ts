import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const removeLicenseReq = async (params: { licenseId: string }) => {
    const response = await businessLicenseService.removeLicense(params);
    return response;
}

const useRemoveLicense = () => {
    const { mutateAsync: removeLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { licenseId: string }) => removeLicenseReq(params),
    })

    return { removeLicense, isPending, isSuccess };
}

export default useRemoveLicense;