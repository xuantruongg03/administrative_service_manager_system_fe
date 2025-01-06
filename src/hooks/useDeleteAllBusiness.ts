import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";

const deleteAllBusiness = async () => {
    const response = await businessService.deleteAllBusiness();
    return response;
};

const useDeleteAllBusiness = () => {
    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => deleteAllBusiness(),
    });
    return { isPending, mutateAsync };
};

export default useDeleteAllBusiness;
