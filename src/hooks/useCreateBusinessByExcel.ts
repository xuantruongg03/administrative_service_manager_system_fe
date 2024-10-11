import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";

const addBusinessByExcel = async (params: {file: File}) => {
    const response = await businessService.addBusinessByExcel(params);
    return response;
};

const useCreateBusinessByExcel = () => {
   const {isPending, mutateAsync: createBusinessByExcelMutation} = useMutation({
    mutationFn: (params: {file: File}) => addBusinessByExcel(params),
   })
   return {isPending, createBusinessByExcelMutation};
};

export default useCreateBusinessByExcel;
