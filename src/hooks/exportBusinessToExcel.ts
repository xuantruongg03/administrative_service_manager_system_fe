import { useMutation } from "@tanstack/react-query";
import businessService from "../services/business";

const exportBusinessToExcel = async () => {
    const response = await businessService.exportBusinessToExcel();
    return response;
};

const useExportBusinessToExcel = () => {
    const { isPending, mutateAsync: exportBusinessToExcelMutation } = useMutation({
        mutationFn: async () => exportBusinessToExcel(),
        onSuccess: ({ buffer, fileName }) => {
            try {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error creating or downloading file:', error);
            }
        },        
        onError: (error) => {
            console.error('Error downloading file:', error);
        },
    });

    return {
        isPending,
        exportBusinessToExcelMutation,
    };
};

export default useExportBusinessToExcel;