import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiUpload } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import useCreateEmployeeByExcel from "../hooks/useCreateEmployeeByExcel";
import { EmployeeModalProps } from "../interfaces";
import { EmployeeDataApi } from "../interfaces/api";
import employeesService from "../services/employees";
import { formatDate } from "../utils/format";
import AddEmployeeModal from "./AddEmployeeModal";
import LoadingMini from "./LoadingMini";
import Pagination from "./Pagination";
import { CONSTANTS } from "../utils/constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import useDeleteEmployee from "../hooks/useDeleteEmployee";
import EditEmployeeModal from "./EditEmployeeModal";
import { useDispatch } from "react-redux";

const getEmployeesReq = async (
    businessCode: string,
    page: number,
    limit: number,
) => {
    const response = await employeesService.getEmployees({
        businessCode,
        page,
        limit,
    });
    console.log(response);
    return response;
};

function EmployeeModal(props: EmployeeModalProps) {
    const [isShowModalAddEmployee, setIsShowModalAddEmployee] = useState(false);
    const [isShowModalEditEmployee, setIsShowModalEditEmployee] = useState(false);
    const [page, setPage] = useState(CONSTANTS.PAGE_DEFAULT);
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const { show, onHide, businessCode } = props;
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data, isPending } = useQuery({
        queryKey: ["employees", businessCode, page],
        queryFn: () =>
            getEmployeesReq(businessCode, page, CONSTANTS.LIMIT_BUSINESS),
        enabled: show,
    });

    //Hooks
    const { createEmployees, isPending: isPendingCreateEmployees } =
        useCreateEmployeeByExcel();
    const {
        isPending: isPendingDeleteEmployee,
        mutateAsync: mutateAsyncDeleteEmployee,
    } = useDeleteEmployee();

    useEffect(() => {
        if (!data?.data?.isLastPage) {
            const nextPage = page + 1;
            queryClient.prefetchQuery({
                queryKey: ["employees", businessCode, nextPage],
                queryFn: () =>
                    getEmployeesReq(
                        businessCode,
                        nextPage,
                        CONSTANTS.LIMIT_BUSINESS,
                    ),
            });
        }
    }, [data, queryClient, page, businessCode]);
    //Functions
    const handleShowModalAddEmployee = () => {
        setIsShowModalAddEmployee(true);
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            await createEmployees({ file, businessCode });
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success("Thêm nhân viên thành công");
        }
    };

    const handleChooseFileUpload = () => {
        fileUploadRef.current?.click();
    };

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Đã copy vào clipboard");
    };

    const handleDeleteEmployee = async (id: string) => {
        await mutateAsyncDeleteEmployee(id);
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast.success("Xóa nhân viên thành công");
    };

    const handleShowModalEditEmployee = (employee: EmployeeDataApi) => {
        setIsShowModalEditEmployee(true);
        dispatch({
            type: "EDIT_EMPLOYEE",
            payload: employee,
        });
    };

    if (isPending) return <LoadingMini />;

    return (
        <>
            {show && (
                <div>
                    <div className="fixed inset-0 z-10001 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 md:p-8 w-full max-w-4xl h-[84vh] overflow-y-auto relative animate-zoom-in">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Danh sách nhân viên
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleShowModalAddEmployee}
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-md flex items-center gap-1"
                                        >
                                            <FiPlus className="size-5" />
                                            <span className="hidden md:inline text-sm">
                                                Thêm nhân viên
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleChooseFileUpload}
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-md flex items-center gap-1"
                                            disabled={isPendingCreateEmployees}
                                        >
                                            {isPendingCreateEmployees ? (
                                                <LoadingMini />
                                            ) : (
                                                <>
                                                    <FiUpload className="size-5" />
                                                    <span className="hidden md:inline text-sm">
                                                        Tải lên danh sách
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            className="hidden"
                                            id="fileUpload"
                                            onChange={handleFileUpload}
                                            ref={fileUploadRef}
                                        />
                                    </div>
                                    <button
                                        onClick={onHide}
                                        className="text-gray-500 hover:text-gray-700 p-1 rounded-md"
                                        aria-label="Close modal"
                                    >
                                        <svg
                                            className="h-5 w-5 md:h-6 md:w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col h-[calc(100%-60px)]">
                                <div className="flex-grow min-h-[calc(100%-80px)]">
                                    <div className="min-w-full">
                                        {data?.data?.data?.length > 0 ? (
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            className="px-3 w-40 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            title="CCCD/CMND"
                                                        >
                                                            CCCD/CMND
                                                        </th>
                                                        <th
                                                            className="px-3 min-w-32 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            title="Họ tên"
                                                        >
                                                            Họ tên
                                                        </th>
                                                        <th
                                                            className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            title="Vị trí"
                                                        >
                                                            Vị trí
                                                        </th>
                                                        <th
                                                            className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            title="Số điện thoại"
                                                        >
                                                            Số điện thoại
                                                        </th>
                                                        <th
                                                            className="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            title="Ngày vào làm"
                                                        >
                                                            Ngày vào làm
                                                        </th>
                                                        <th
                                                            className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            title="Hành động"
                                                        >
                                                            Hành động
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {data?.data?.data?.map(
                                                        (
                                                            employee: EmployeeDataApi,
                                                        ) => (
                                                            <tr
                                                                key={
                                                                    employee.citizen_id
                                                                }
                                                            >
                                                                <td className="px-3 w-40 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                                                                    <div className="flex items-center gap-1">
                                                                        <span
                                                                            className="truncate max-w-[120px] md:max-w-[160px]"
                                                                            title={
                                                                                employee.citizen_id
                                                                            }
                                                                        >
                                                                            {
                                                                                employee.citizen_id
                                                                            }
                                                                        </span>
                                                                        <MdOutlineContentCopy
                                                                            onClick={() =>
                                                                                handleCopyText(
                                                                                    employee.citizen_id,
                                                                                )
                                                                            }
                                                                            className="size-4 cursor-pointer hover:text-gray-500 flex-shrink-0"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 min-w-32 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                                                                    <div
                                                                        className="truncate max-w-[120px] md:max-w-[200px]"
                                                                        title={
                                                                            employee.name
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.name
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                                                                    <div
                                                                        className="truncate max-w-[100px] md:max-w-[160px]"
                                                                        title={
                                                                            employee.position
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.position
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                                                                    <div
                                                                        className="truncate max-w-[100px] md:max-w-[120px]"
                                                                        title={
                                                                            employee.phone
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.phone
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                                                                    <div
                                                                        className="truncate max-w-[120px]"
                                                                        title={formatDate(
                                                                            employee.start_date,
                                                                        )}
                                                                    >
                                                                        {formatDate(
                                                                            employee.start_date,
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    <div className="flex items-center justify-center gap-3">
                                                                        <button className="text-gray-600 hover:text-green-600">
                                                                            <FaEdit className="size-4" onClick={() => handleShowModalEditEmployee(employee)} />
                                                                        </button>
                                                                        <button
                                                                            className={`text-gray-600 hover:text-red-600 ${
                                                                                isPendingDeleteEmployee
                                                                                    ? "cursor-not-allowed"
                                                                                    : ""
                                                                            }`}
                                                                            disabled={
                                                                                isPendingDeleteEmployee
                                                                            }
                                                                            onClick={() =>
                                                                                handleDeleteEmployee(
                                                                                    employee.citizen_id,
                                                                                )
                                                                            }
                                                                        >
                                                                            {isPendingDeleteEmployee ? (
                                                                                <LoadingMini />
                                                                            ) : (
                                                                                <FaTrash className="size-4" />
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-10">
                                                <p className="text-gray-500 text-lg">
                                                    Không có dữ liệu nhân viên
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto pt-4">
                                    <Pagination
                                        currentPage={page}
                                        totalPage={data?.data?.totalPages || 1}
                                        recordsPerPage={
                                            CONSTANTS.LIMIT_BUSINESS
                                        }
                                        totalRecords={data?.data?.totalRecords}
                                        onNextPage={() => setPage(page + 1)}
                                        onPrevPage={() => setPage(page - 1)}
                                        isLast={data?.data?.isLastPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddEmployeeModal
                        show={isShowModalAddEmployee}
                        onHide={() => setIsShowModalAddEmployee(false)}
                        businessCode={businessCode}
                    />
                    <EditEmployeeModal
                        show={isShowModalEditEmployee}
                        onHide={() => setIsShowModalEditEmployee(false)}
                        businessCode={businessCode}
                    />
                </div>
            )}
        </>
    );
}

export default EmployeeModal;
