import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import useUploadLicenses from "../hooks/useUploadLicenses";
import { AddLicenseModalProps } from "../interfaces/props";
import Loading from "../pages/Loading";
import licenseTypeService from "../services/licenseType";

const getLicenseTypeReq = async () => {
    const response = await licenseTypeService.getLicenseType();
    return response;
};

function AddLicenseModal(props: AddLicenseModalProps) {
    const { show, onHide, businessId } = props;
    const [typeLicense, setTypeLicense] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

    const { uploadLicenses, isPending } = useUploadLicenses();
    const queryClient = useQueryClient();

    const { data: licenseTypeData, isLoading } = useQuery({
        queryKey: ["license-type"],
        queryFn: getLicenseTypeReq,
        enabled: show,
    });

    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const handleUploadLicense = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const filesArray = Array.from(selectedFiles);
            setFiles(filesArray);
            
            const urls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
        URL.revokeObjectURL(previewUrls[index]);
        setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    };

    const onSubmit = async () => {
        if (typeLicense === "") {
            toast.error("Vui lòng chọn loại giấy phép");
            return;
        }
        if (files.length === 0) {
            toast.error("Vui lòng tải lên file");
            return;
        }

        // Upload files sequentially
        for (const file of files) {
            try {
                await uploadLicenses({
                    file: file,
                    id: businessId,
                    type: typeLicense,
                });
            } catch (error) {
                console.log(error);
                toast.error(`Lỗi khi tải lên file ${file.name}`);
                continue;
            }
        }
        
        onHide();
        toast.success("Thêm giấy phép thành công");
        queryClient.invalidateQueries({ queryKey: ["getBusinessById"] });
    };

    if (isLoading && show) {
        return <Loading />;
    }

    return (
        <>
            {show && (
                <div className="fixed inset-0 z-10001 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full relative animate-zoom-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Thêm giấy phép
                        </h2>
                        <form className="">
                            <div className="mb-4">
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Loại giấy phép
                                </label>
                                <select
                                    id="type"
                                    className="w-full p-2.5 focus:outline-none border border-gray-300 rounded-md"
                                    onChange={(e) =>
                                        setTypeLicense(e.target.value)
                                    }
                                >
                                    <option value="">Chọn loại giấy phép</option>
                                    {licenseTypeData?.data?.map(
                                        (item: {
                                            id: string;
                                            name: string;
                                        }) => (
                                            <>
                                                {item.name !==
                                                    "Giấy phép kinh doanh" &&
                                                    item.name !==
                                                        "Giấy phép PCCC" &&
                                                    item.name !==
                                                        "Giấy phép ANTT" && (
                                                        <option value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    )}
                                            </>
                                        ),
                                    )}
                                </select>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleUploadLicense}
                                    ref={fileRef}
                                />
                                <label
                                    htmlFor="file"
                                    className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer w-full"
                                >
                                    {files.length > 0 ? (
                                        <div className="flex flex-col w-full gap-2">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between w-full gap-2 group">
                                                    <div className="flex items-center gap-2 flex-1 text-sm truncate hover:text-clip">
                                                        <span
                                                            className="text-sm truncate hover:text-clip"
                                                            title={file.name}
                                                        >
                                                            {file.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {file.type.startsWith('image/') && (
                                                            <button
                                                                type="button"
                                                                className="text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setSelectedPreview(previewUrls[index]);
                                                                }}
                                                            >
                                                                <FiEye className="size-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleRemoveFile(index);
                                                            }}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            className="flex items-center gap-2"
                                            onClick={() =>
                                                fileRef.current?.click()
                                            }
                                        >
                                            <FiUpload className="size-4 flex-shrink-0" />
                                            <span className="text-sm">
                                                Tải lên
                                            </span>
                                        </div>
                                    )}
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onHide}
                                    className="mr-2 px-4 py-2 text-sm font-medium focus:border-none text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={isPending}
                                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                        isPending
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {isPending
                                        ? "Đang tạo..."
                                        : "Thêm giấy phép"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedPreview && (
                <div 
                    className="fixed inset-0 z-[10002] bg-black bg-opacity-75 flex items-center justify-center"
                    onClick={() => setSelectedPreview(null)}
                >
                    <div className="max-w-[90vw] max-h-[90vh]">
                        <img 
                            src={selectedPreview} 
                            alt="Preview" 
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default AddLicenseModal;
