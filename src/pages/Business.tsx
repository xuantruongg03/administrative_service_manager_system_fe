import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Column } from "primereact/column";
import { TreeNode } from "primereact/treenode";
import { TreeTable } from "primereact/treetable";
import { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import {
    FaEdit,
    FaEye,
    FaFileUpload
} from "react-icons/fa";
import { FaCircleInfo, FaFileArrowDown } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { PiFireExtinguisherDuotone, PiSecurityCamera } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InforBusinessPopup from "../components/InforBusinessPopup";
import LoadingMini from "../components/LoadingMini";
import Pagination from "../components/Pagination";
import YNModel from "../components/YNModel";
import useCreateBusinessByExcel from "../hooks/useCreateBusinessByExcel";
import useDebounce from "../hooks/useDebounce";
import useDeleteBusiness from "../hooks/useDeleteBusiness";
import useExportBusinessToExcel from "../hooks/useExportBusinessToExcel";
import { BusinessDataApi } from "../interfaces";
import businessService from "../services/business";
import FileUploadButton from "../ui/FileUploadButton";
import { CONSTANTS } from "../utils/constants";
import { formatDate } from "../utils/format";
import Loading from "./Loading";
import { Menu } from '@headlessui/react'
import useDeleteAllBusiness from "../hooks/useDeleteAllBusiness";

const getBusiness = async (params: {
    page: number;
    limit: number;
    keyword: string;
}) => {
    const response = await businessService.getBusiness(params);
    return response;
};

export default function Business() {
    const [nodes, setNodes] = useState<BusinessDataApi[]>([]);
    const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [idBusiness, setIdBusiness] = useState<string>("");
    const [page, setPage] = useState<number>(CONSTANTS.PAGE_DEFAULT);
    const [keyword, setKeyword] = useState<string>("");
    const debouncedKeyword = useDebounce(keyword, 1000);
    const [isYNModelOpen, setIsYNModelOpen] = useState(false);
    const [isShowConfirmDeleteAll, setIsShowConfirmDeleteAll] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["businesses", page, debouncedKeyword],
        queryFn: () =>
            getBusiness({
                page,
                limit: CONSTANTS.LIMIT_BUSINESS,
                keyword: debouncedKeyword,
            }),
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        setPage(CONSTANTS.PAGE_DEFAULT);
    };

    const {
        isPending: isPendingExportBusinessToExcel,
        exportBusinessToExcelMutation,
    } = useExportBusinessToExcel();

    const { mutateAsync: deleteBusinessMutation } = useDeleteBusiness();

    const {
        isPending: isPendingCreateBusinessByExcel,
        createBusinessByExcelMutation,
    } = useCreateBusinessByExcel();

    const handleExportBusiness = () => {
        exportBusinessToExcelMutation();
    };

    const handleFileSelect = async (file: File) => {
        await createBusinessByExcelMutation({ file });
        queryClient.invalidateQueries({ queryKey: ["businesses"] });
    };

    const handleViewBusiness = (data: string) => {
        setIsPopupOpen(true);
        setIdBusiness(data);
    };

    const handleCheckboxChange = (rowKey: string) => {
        if (selectedBusiness.includes(rowKey)) {
            setSelectedBusiness(
                selectedBusiness.filter((code) => code !== rowKey),
            );
        } else {
            setSelectedBusiness([...selectedBusiness, rowKey]);
        }
    };

    const handleSelectAllBusiness = () => {
        if (selectedBusiness.length === nodes?.length) {
            setSelectedBusiness([]);
        } else {
            setSelectedBusiness(nodes.map((node) => node.id));
        }
    };

    const handleDeleteBusiness = () => {
        if (selectedBusiness.length === 0) {
            toast.error("Vui lòng chọn doanh nghiệp để xóa");
            return;
        }
        setIsYNModelOpen(true);
    };

    const handleDeleteBusinessConfirm = async () => {
        await deleteBusinessMutation(selectedBusiness).then(() => {
            queryClient.invalidateQueries({ queryKey: ["businesses"] });
            setSelectedBusiness([]);
            setIsYNModelOpen(false);
            toast.success("Xóa tất cả doanh nghiệp thành công");
        });
    };

    const handleDeleteAll = () => {
        setIsShowConfirmDeleteAll(true);
    };

    const { mutateAsync: deleteAllBusinessMutation } = useDeleteAllBusiness();

    const handleDeleteAllConfirm = async () => {
        await deleteAllBusinessMutation().then(() => {
            queryClient.invalidateQueries({ queryKey: ["businesses"] });
            setSelectedBusiness([]);
            setIsShowConfirmDeleteAll(false);
            toast.success("Xóa tất cả doanh nghiệp thành công");
        });
    };

    // Prefetch next page
    useEffect(() => {
        if (!data?.isLastPage) {
            const nextPage = page + 1;
            queryClient.prefetchQuery({
                queryKey: ["businesses", nextPage, debouncedKeyword],
                queryFn: () =>
                    getBusiness({
                        page: nextPage,
                        limit: CONSTANTS.LIMIT_BUSINESS,
                        keyword: debouncedKeyword,
                    }),
            });
        }
        setNodes(data?.data || []);
    }, [data, queryClient, page, debouncedKeyword]);

    return (
        <div className="card bg-white h-full flex flex-col">
            <div className="flex flex-col space-y-4 mb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                        Danh sách doanh nghiệp
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full">
                        <div className="w-full md:w-[24rem] ">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-0"
                                    value={keyword}
                                    onChange={handleSearch}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
                        <div className="flex items-center gap-4 md:gap-6 justify-between md:w-full">
                            <div className="flex items-center gap-4">
                                <BsTrash3Fill
                                    className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                    onClick={handleDeleteBusiness}
                                />
                                <FaCircleInfo className="cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                                <div className="relative">
                                    <Menu>
                                        <Menu.Button className="flex items-center">
                                            <IoMdMore className="cursor-pointer size-6 hover:text-gray-700 transition-colors duration-200" />
                                        </Menu.Button>
                                        <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                                                            onClick={handleDeleteAll}
                                                        >
                                                            <BsTrash3Fill className="size-4" />
                                                            Xóa tất cả
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {isPendingCreateBusinessByExcel ? (
                                    <FileUploadButton
                                        onFileSelect={handleFileSelect}
                                        icon={<LoadingMini />}
                                        label="Nhập"
                                        accept=".xlsx, .xls"
                                        disabled={
                                            isPendingCreateBusinessByExcel
                                        }
                                    />
                                ) : (
                                    <>
                                        <FileUploadButton
                                            onFileSelect={handleFileSelect}
                                            icon={
                                                <FaFileUpload className="text-gray-600" />
                                            }
                                            label="Nhập"
                                            accept=".xlsx, .xls"
                                        />
                                    </>
                                )}
                                <button
                                    className={`flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${
                                        isPendingExportBusinessToExcel
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    onClick={handleExportBusiness}
                                    disabled={isPendingExportBusinessToExcel}
                                >
                                    {isPendingExportBusinessToExcel ? (
                                        <LoadingMini />
                                    ) : (
                                        <FaFileArrowDown className="text-gray-600" />
                                    )}
                                    <span className="text-sm font-medium text-gray-700">
                                        Xuất
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-x-auto custom-scrollbar">
                        <TreeTable
                            value={nodes as TreeNode[]}
                            tableStyle={{ minWidth: "50rem" }}
                            className="min-w-full divide-y divide-gray-200"
                            selectionMode="checkbox"
                        >
                            <Column
                                headerStyle={{ width: "3rem" }}
                                header={
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox size-4 text-blue-600"
                                            checked={
                                                selectedBusiness.length ===
                                                nodes?.length
                                            }
                                            onChange={handleSelectAllBusiness}
                                        />
                                    </div>
                                }
                                bodyStyle={{ textAlign: "center" }}
                                body={(rowData) => (
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox size-4 text-blue-600"
                                            checked={
                                                selectedBusiness.includes(
                                                    rowData.id,
                                                ) || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    rowData.id,
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            />
                            <Column
                                field="code"
                                header="Mã số DN"
                                headerClassName="px-4 py-2 md:px-6 w-[120px] md:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={rowData.code}
                                    >
                                        {rowData.code}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="created_at"
                                header="Ngày ĐK"
                                headerClassName="px-4 py-2 md:px-6 w-[130px] md:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={formatDate(rowData.created_at)}
                                    >
                                        {formatDate(rowData.created_at)}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="name_vietnamese"
                                header="Tên doanh nghiệp"
                                headerClassName="px-4 py-2 md:px-6 md:py-2 text-left text-xs w-[220px] font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={rowData.name_vietnamese}
                                    >
                                        {rowData.name_vietnamese}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="address"
                                header="Địa chỉ"
                                headerClassName="px-4 py-2 md:px-6 md:py-2 text-left w-[250px] text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={rowData.address}
                                    >
                                        {rowData.address}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="phone"
                                header="Số điện thoại"
                                headerClassName="px-4 py-2 md:px-6 w-[120px] md:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={rowData.phone}
                                    >
                                        {rowData.phone}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="status"
                                header="Trạng thái"
                                headerClassName="px-4 py-2 md:px-6 w-[120px] md:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 w-[120px] md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div
                                        className={`flex items-center overflow-hidden text-ellipsis whitespace-nowra px-0 ${
                                            rowData.status === "active"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        <span
                                            className={`w-2 h-2 mr-2 rounded-full ${
                                                rowData.status === "active"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        ></span>
                                        <span className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowra">
                                            {rowData.status === "active"
                                                ? "Hoạt động"
                                                : "Ngừng hoạt động"}
                                        </span>
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="licenses"
                                header="Giấy phép"
                                headerClassName="px-4 py-2 md:px-6 w-[110px] md:py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div className="flex items-center justify-center gap-2">
                                        <MdOutlineBusinessCenter title="Giấy phép kinh doanh" className={`size-4 ${rowData.licenses?.includes("Giấy phép kinh doanh") ? "text-sky-600" : "text-gray-600"}`} />
                                        <PiSecurityCamera title="Giấy phép ANTT" className={`size-4 ${rowData.licenses?.includes("Giấy phép ANTT") ? "text-green-600" : "text-gray-600"}`} />
                                        <PiFireExtinguisherDuotone title="Giấy phép PCCC" className={`size-4 ${rowData.licenses?.includes("Giấy phép PCCC") ? "text-red-600" : "text-gray-600"}`} />
                                        {(() => {
                                            const licenses = rowData.licenses;
                                            if (licenses.length > 3) {
                                                return <>...</>;
                                            }
                                        })()}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="action"
                                header="Hành động"
                                headerClassName="px-4 py-2 md:px-6 w-[100px] md:py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                bodyClassName="px-4 py-2 w-[100px] md:px-6 md:py-2 whitespace-nowrap text-sm text-gray-900"
                                body={(rowData) => (
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            className="text-blue-500 "
                                            onClick={() =>
                                                handleViewBusiness(rowData.id)
                                            }
                                        >
                                            <FaEye className="text-gray-600 size-4 hover:text-blue-600" />
                                        </button>
                                        <Link
                                            to={
                                                CONSTANTS.PATH
                                                    .EDIT_BUSINESS_PATH +
                                                rowData.id
                                            }
                                            className="text-blue-500 "
                                        >
                                            <FaEdit className="text-gray-600 size-4 hover:text-green-600" />
                                        </Link>
                                    </div>
                                )}
                            ></Column>
                        </TreeTable>
                    </div>
                    <Pagination
                            currentPage={page}
                            totalPage={data?.totalPages || 1}
                            recordsPerPage={CONSTANTS.LIMIT_BUSINESS}
                            totalRecords={data?.totalRecords}
                            onNextPage={() => setPage(page + 1)}
                            onPrevPage={() => setPage(page - 1)}
                            isLast={data?.isLastPage}
                        />
                </div>
            )}
            <InforBusinessPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                id={idBusiness}
            />
            <YNModel
                isOpen={isYNModelOpen}
                onClose={() => setIsYNModelOpen(false)}
                onConfirm={handleDeleteBusinessConfirm}
                label="Xóa doanh nghiệp"
                description="Bạn có chắc chắn muốn xóa doanh nghiệp này không?"
                yesLabel="Xóa"
                noLabel="Hủy"
            />
            <YNModel
                isOpen={isShowConfirmDeleteAll}
                onClose={() => setIsShowConfirmDeleteAll(false)}
                onConfirm={handleDeleteAllConfirm}
                label="Xóa tất cả doanh nghiệp"
                description="Bạn có chắc chắn muốn xóa tất cả doanh nghiệp không?"
                yesLabel="Xóa"
                noLabel="Hủy"
            />
        </div>
    );
}
