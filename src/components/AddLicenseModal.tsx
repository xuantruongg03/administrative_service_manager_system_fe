import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import useUploadLicenses from "../hooks/useUploadLicenses";
import { AddLicenseModalProps } from "../interfaces/props";
import Loading from "../pages/Loading";
import licenseTypeService from "../services/licenseType";

const getLicenseTypeReq = async () => {
    const response = await licenseTypeService.getLicenseType();
    console.log("🚀 ~ getLicenseTypeReq ~ response:", response);
    return response;
};

function AddLicenseModal(props: AddLicenseModalProps) {
    const { show, onHide, businessId } = props;
    const [typeLicense, setTypeLicense] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { uploadLicenses, isPending } = useUploadLicenses();
    const queryClient = useQueryClient();

    const { data: licenseTypeData, isLoading } = useQuery({
        queryKey: ["license-type"],
        queryFn: getLicenseTypeReq,
        enabled: show,
    });

    const handleUploadLicense = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const onSubmit = async () => {
        if (typeLicense === "") {
            toast.error("Vui lòng chọn loại giấy phép");
            return;
        }
        if (!file) {
            toast.error("Vui lòng tải lên file");
            return;
        }
        await uploadLicenses({
            file: file,
            id: businessId,
            type: typeLicense,
        }).then(() => {
            onHide();
            toast.success("Thêm giấy phép thành công");
            queryClient.invalidateQueries({ queryKey: ["getBusinessById"] });
        });
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
                                    {file ? (
                                        <div className="flex items-center justify-between w-full gap-2">
                                            <span
                                                className="text-sm truncate hover:text-clip"
                                                title={file.name}
                                            >
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => {
                                                    setFile(null);
                                                }}
                                            >
                                                ×
                                            </button>
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
                                                Tải lên{" "}
                                                {typeLicense.toLowerCase()}
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
        </>
    );
}

export default AddLicenseModal;
