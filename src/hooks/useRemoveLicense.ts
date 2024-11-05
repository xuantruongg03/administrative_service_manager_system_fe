import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const removeLicenseReq = async (params: { id: string }) => {
    const response = await businessLicenseService.removeLicenses(params);
    return response;
}

const useRemoveLicense = () => {
    const { mutateAsync: removeLicense, isPending, isSuccess } = useMutation({
        mutationFn: (params: { id: string }) => removeLicenseReq(params),
    })

    return { removeLicense, isPending, isSuccess };
}

export default useRemoveLicense;