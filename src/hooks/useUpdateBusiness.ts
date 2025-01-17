import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";
import { BusinessDataApiRequest } from "../interfaces/api";

const updateBusinessReq = async (params: {id: string, data: BusinessDataApiRequest}) => {
    const response = await businessService.updateBusiness(params);
    return response;
};

const useUpdateBusiness = () => {
    const { isPending, mutateAsync: updateBusiness } = useMutation({
        mutationFn: (params: {id: string, data: BusinessDataApiRequest}) => updateBusinessReq(params),
    });

    return { isPending, updateBusiness };
};

export default useUpdateBusiness;
