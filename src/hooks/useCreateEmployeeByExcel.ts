import { useMutation } from "@tanstack/react-query";
import employeesService from "../services/employees";

const createEmployeesReq = async (params: { file: File, businessId: string }) => {
    const response = await employeesService.createEmployees(params);
    return response;
}

const useCreateEmployeeByExcel = () => {
    const { mutateAsync: createEmployees, isPending } = useMutation({
        mutationFn: (params: { file: File, businessId: string }) => createEmployeesReq(params),
    })

    return { createEmployees, isPending };
}

export default useCreateEmployeeByExcel;
