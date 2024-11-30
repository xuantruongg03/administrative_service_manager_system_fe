import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";

const updateLatLonReq = async (params: { latitude: number, longitude: number, businessId: string }) => {
    const response = await businessService.updateLatLon(params);
    return response;
}

const useUpdateLatLon = () => {
    const { mutateAsync: updateLatLon, isPending } = useMutation({
        mutationFn: (params: { latitude: number, longitude: number, businessId: string }) => updateLatLonReq(params),
    })

    return { updateLatLon, isPending };
}

export default useUpdateLatLon;