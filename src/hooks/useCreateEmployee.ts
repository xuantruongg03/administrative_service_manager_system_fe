import { useMutation } from "@tanstack/react-query";
import employeesService from "../services/employees";
import { EmployeeDataApi } from "../interfaces/api";

const createEmployeeReq = async (params: { data: EmployeeDataApi, businessCode: string }) => {
    const response = await employeesService.createEmployee(params);
    return response;
}

const useCreateEmployee = () => {
    const { mutateAsync: createEmployee, isPending, isSuccess } = useMutation({
        mutationFn: (params: { data: EmployeeDataApi, businessCode: string }) => createEmployeeReq(params),
    })

    return { createEmployee, isPending, isSuccess };
}

export default useCreateEmployee;