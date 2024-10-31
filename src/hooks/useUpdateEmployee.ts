import { useMutation } from "@tanstack/react-query";
import employeesService from "../services/employees";
import { EmployeeDataApi } from "../interfaces/api";

const updateEmployeeReq = async (params: { data: EmployeeDataApi, citizen_id: string, businessCode: string }) => {
    const response = await employeesService.updateEmployee(params);
    return response;
}

const useUpdateEmployee = () => {
    const { mutateAsync: updateEmployee, isPending } = useMutation({
        mutationFn: (params: { data: EmployeeDataApi, citizen_id: string, businessCode: string }) => updateEmployeeReq(params),
    })

    return { updateEmployee, isPending };
}

export default useUpdateEmployee;