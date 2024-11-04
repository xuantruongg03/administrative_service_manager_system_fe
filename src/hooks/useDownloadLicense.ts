import { useMutation } from "@tanstack/react-query";
import businessLicenseService from "../services/businessLicense";

const downloadLicenseReq = async (params: {filename: string}) => {
    const response = await businessLicenseService.downloadBusinessLicense(params);
    return response;
};

const useDownloadLicense = () => {
    const { isPending, mutateAsync: downloadLicense } = useMutation({
        mutationFn: (params: {filename: string}) => downloadLicenseReq(params),
    });

    return { isPending, downloadLicense };
};

export default useDownloadLicense;
