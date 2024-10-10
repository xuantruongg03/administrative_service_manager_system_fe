import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";

const addBusinessByExcel = async (params: {file: File}) => {
    const response = await businessService.addBusinessByExcel(params);
    return response;
};

const useCreateBusinessByExcel = () => {
   const {isPending, mutateAsync: createBusinessByExcelMutation} = useMutation({
    mutationFn: addBusinessByExcel,
   })
   return {isPending, createBusinessByExcelMutation};
};

export default useCreateBusinessByExcel;
