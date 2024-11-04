import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaRegCopy } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { InforBusinessPopupProps } from "../interfaces";
import { BusinessDataApiRequest, EmployeeInfo } from "../interfaces/api";
import Loading from "../pages/Loading";
import businessService from "../services/business";
import employeesService from "../services/employees";
import { CONSTANTS } from "../utils/constants";
import { formatDate, formatVND } from "../utils/format";
import Pagination from "./Pagination";

const getBusinessById = async (id: string) => {
    const response = await businessService.getBusinessById(id);
    return response;
}

const getEmployeesByBusinessId = async (businessId: string, page: number, limit: number) => {
    const response = await employeesService.getEmployees({ businessId, page, limit });
    return response;
}

function InforBusinessPopup(props: InforBusinessPopupProps) {
    const [isCopied, setIsCopied] = useState("");
    const [infoBusiness, setInfoBusiness] = useState<BusinessDataApiRequest>();
    const [page, setPage] = useState(CONSTANTS.PAGE_DEFAULT);
    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery({
        queryKey: ["InfoBusiness", props.id],
        queryFn: () => getBusinessById(props.id),
        enabled: !!props.id
    })

    const { data: employeesData } = useQuery({
        queryKey: ["employees", props.id, page],
        queryFn: () => getEmployeesByBusinessId(props.id, page, CONSTANTS.LIMIT_EMPLOYEES),
        enabled: !!props.id
    })
    
    const handleClose = () => {
        props.onClose();
    };

    const handleCopyIdentity = (identity: string, id: string) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(identity)
                .then(() => {
                    setIsCopied(id);
                    setTimeout(() => {
                        setIsCopied("");
                    }, 3000);
                })
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = identity;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setIsCopied(id);
                setTimeout(() => {
                    setIsCopied("");
                }, 3000);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    useEffect(() => {
        if (data) {
            setInfoBusiness(data.data);
        }
    }, [data]);

    // Prefetch next page
    useEffect(() => {
        if (!employeesData?.data?.isLastPage) {
            const nextPage = page + 1;
            queryClient.prefetchQuery({
                queryKey: ["employees", props.id, nextPage],
                queryFn: () =>
                    getEmployeesByBusinessId(props.id, nextPage, CONSTANTS.LIMIT_EMPLOYEES),
            });
        }
    }, [employeesData, queryClient, page, props.id]);

    if (!props.isOpen) return null;

    if (isLoading) return <Loading />

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10001 bg-black bg-opacity-50 transition-opacity duration-300 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[1200px] h-[90vh] relative transform transition-all animate-zoom-in duration-300 overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-2 sm:pb-3 mb-4 sm:mb-3">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Thông tin chi tiết
                        </h2>
                        <button onClick={handleClose}>
                            <MdClose size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                        <div className="w-full lg:w-2/5">
                            {infoBusiness && Object.entries(infoBusiness)
                            .filter(([key]) => key !== "employee" && key !== "status" && key !== "number_of_employees" && key !== "id")
                            .map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between py-2 border-b border-gray-200"
                                    >
                                        <span className="text-xs sm:min-w-[70px] sm:text-sm font-semibold text-gray-700">
                                            {key === "code"
                                                ? "Mã số doanh nghiệp"
                                                : key === "name_vietnamese"
                                                ? "Tên doanh nghiệp"
                                                : key === "name_acronym"
                                                ? "Tên viết tắt"
                                                : key === "name_english"
                                                ? "Tên tiếng Anh"
                                                : key === "address"
                                                ? "Địa chỉ"
                                                : key === "phone"
                                                ? "Số điện thoại"
                                                : key === "email"
                                                ? "Email"
                                                : key === "website"
                                                ? "Website"
                                                : key === "fax"
                                                ? "Fax"
                                                : key === "chartered_capital"
                                                ? "Vốn điều lệ"
                                                : key === "type_of_organization"
                                                ? "Loại hình doanh nghiệp"
                                                : key === "legal_representative"
                                                ? "Người đại diện pháp luật"
                                                : key === "owner"
                                                ? "Chủ sở hữu"
                                                : key === "licenses"
                                                ? "Giấy phép"
                                                : key === "created_at"
                                                ? "Ngày thành lập"
                                                : `${
                                                      key
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      key.slice(1)
                                                  }`}
                                            :
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600">
                                            {value ? (
                                                key === "chartered_capital" ? (
                                                    `${formatVND(
                                                        Number(value),
                                                    ).toLocaleString()} VNĐ`
                                                ) 
                                                : key === "address" ? (
                                                    <span className="text-right w-full block">{String(value)}</span>
                                                ) : key === "created_at" ? (
                                                    formatDate(value.toString())
                                                ) : key === "legal_representative" || key === "owner" ? (
                                                    <span className="text-right w-full block">{value.name}</span>
                                                ) : key === "licenses" ? (
                                                    <span className="text-right w-full block">
                                                        {Array.isArray(value) && value.map((license: {name: string}) => license.name.split("-")[1]).join(", ")}
                                                    </span>
                                                ) : typeof value === 'object' ? (
                                                    JSON.stringify(value)
                                                ) : (
                                                    <span className="text-right w-full block">{String(value)}</span>
                                                )
                                            ) : (
                                                <FaMinus className="text-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                ),
                            )}
                            
                        </div>
                        <div className="w-full lg:w-3/5 mt-4 lg:mt-0">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-700">
                                Danh sách nhân viên
                            </h3>
                            <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                                <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto custom-scrollbar">
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse min-w-[600px]">
                                            <thead className="sticky top-0 bg-gray-200">
                                                <tr>
                                                    <th className="border-b border-gray-300 p-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                        Tên
                                                    </th>
                                                    <th className="border-b border-gray-300 p-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                        Chức vụ
                                                    </th>
                                                    <th className="border-b border-gray-300 p-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                        Căn cước
                                                    </th>
                                                    <th className="border-b border-gray-300 p-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                        Ngày vào làm
                                                    </th>
                                                    <th className="border-b border-gray-300 p-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                        Số điện thoại
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeesData?.data?.data?.length ? (
                                                    <>
                                                    {employeesData.data.data.map(
                                                        (employee: EmployeeInfo, index: number) => (
                                                            <tr
                                                                key={index}
                                                                className={`${
                                                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                                } hover:bg-gray-100 transition-colors duration-200`}
                                                            >
                                                                <td className="border-b border-gray-200 p-3 text-sm text-gray-700 font-medium">
                                                                    {employee.name}
                                                                </td>
                                                                <td className="border-b border-gray-200 p-3 text-sm text-gray-600">
                                                                    {employee.position}
                                                                </td>
                                                                <td className="border-b border-gray-200 p-3 text-sm text-gray-600">
                                                                    <div className="flex items-center space-x-2">
                                                                        <span>{employee.citizen_id}</span>
                                                                        <button
                                                                            className={`p-1.5 rounded-full transition-colors duration-200 ${
                                                                                isCopied === employee.id 
                                                                                ? "bg-green-100 text-green-600" 
                                                                                : "hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                                                                            }`}
                                                                            onClick={() => handleCopyIdentity(employee.citizen_id, employee.id)}
                                                                            title={isCopied === employee.id ? "Đã sao chép" : "Sao chép"}
                                                                        >
                                                                            {isCopied === employee.id 
                                                                                ? <FaCheck className="w-3.5 h-3.5" />
                                                                                : <FaRegCopy className="w-3.5 h-3.5" />
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="border-b border-gray-200 p-3 text-sm text-gray-600">
                                                                    {formatDate(employee.start_date)}
                                                                </td>
                                                                <td className="border-b border-gray-200 p-3 text-sm text-gray-600">
                                                                    {employee.phone}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                    </>
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="text-center py-4 text-gray-500">
                                                            Không có nhân viên nào
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <Pagination
                                totalPage={employeesData?.data?.totalPages}
                                currentPage={page}
                                onNextPage={() => setPage(page + 1)}
                                onPrevPage={() => setPage(page - 1)}
                                isLast={employeesData?.data?.isLastPage}
                                totalRecords={employeesData?.data?.totalRecords}
                                recordsPerPage={CONSTANTS.LIMIT_EMPLOYEES}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforBusinessPopup;
