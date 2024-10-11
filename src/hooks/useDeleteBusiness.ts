import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";

const deleteBusiness = async (ids: string[]) => {
    const response = await businessService.deleteBusiness(ids);
    return response;
};

const useDeleteBusiness = () => {
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (params: string[]) => deleteBusiness(params),
    });
    return { isPending, mutateAsync };
};

export default useDeleteBusiness;
