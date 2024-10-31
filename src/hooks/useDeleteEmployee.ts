import { useMutation } from "@tanstack/react-query";
import employeesService from "../services/employees";

const deleteEmployee = async (id: string) => {
    const response = await employeesService.deleteEmployee({ id });
    return response;
};

const useDeleteEmployee = () => {
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (params: string) => deleteEmployee(params),
    });
    return { isPending, mutateAsync };
};

export default useDeleteEmployee;
