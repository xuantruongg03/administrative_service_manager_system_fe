import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { BsFillGrid1X2Fill, BsListUl, BsTrash3Fill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { MdFileDownload, MdMoreVert, MdRemoveRedEye } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import LoadingMini from "../components/LoadingMini";
import PreviewFile from "../components/PreviewFile";
import YNModel from "../components/YNModel";
import useDebounce from "../hooks/useDebounce";
import useDeleteMultipleBusinessLicense from "../hooks/useDeleteMultipleBusinessLicense";
import useRemoveLicense from "../hooks/useRemoveLicense";
import useUpdateBusinessLicense from "../hooks/useUpdateBusinessLicense";
import { BusinessLicenseDataApi } from "../interfaces/api";
import businessLicenseService from "../services/businessLicense";
import { CONSTANTS } from "../utils/constants";
import Loading from "./Loading";

const getBusinessLicenseReq = async (params: {
    page: number;
    limit: number;
    keyword: string;
}) => {
    const response = await businessLicenseService.getAllBusinessLicense(params);
    return response;
};

function BusinessLicense() {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [layoutType, setLayoutType] = useState<"grid" | "list">("list");
    const [data, setData] = useState<BusinessLicenseDataApi[]>([]);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [tempFileId, setTempFileId] = useState<string>("");
    const [openYNModel, setOpenYNModel] = useState<boolean>(false);
    const [openYNModelDeleteMultiple, setOpenYNModelDeleteMultiple] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");
    const [previewFile, setPreviewFile] = useState<{
        file: string;
        type: string;
    } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const debouncedKeyword = useDebounce(keyword, 1000);
    const [selectedItemId, setSelectedItemId] = useState<string>("");

    //Queries
    const {
        data: dataBusinessLicense,
        isLoading,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["businessLicense", debouncedKeyword],
        queryFn: ({ pageParam = 1 }) =>
            getBusinessLicenseReq({
                page: pageParam,
                limit: CONSTANTS.LIMIT_BUSINESS_LICENSE,
                keyword: debouncedKeyword,
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage?.data.isLastPage) {
                return undefined;
            }
            return lastPage?.data.currentPage + 1;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
    });

    //Functions
    const handleLayoutType = (type: "grid" | "list") => {
        setLayoutType(type);
        setOpenMenuId(null);
    };

    const handlePreview = (file: string, type: string) => {
        setPreviewFile({ file, type });
    };

    const closePreview = () => {
        setPreviewFile(null);
    };

    const handleDelete = (id: string) => {
        setSelectedItemId(id);
        setOpenYNModel(true);
    };

    const handleDeleteMultiple = () => {
        if (selectedItems.length === 0) {
            toast.error("Vui lòng chọn tài liệu để xóa");
            return;
        }
        setOpenYNModelDeleteMultiple(true);
    };

    const handleDownload = (id: string) => {
        const link = document.createElement("a");
        const item = data.find((item) => item.id === id);
        if (!item) return;
        link.href = import.meta.env.VITE_API_URL + "/uploads/" + item.file;
        link.download = item.name || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleItemSelection = (id: string) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id],
        );
    };

    const toggleAllSelection = () => {
        if (selectedItems.length === data?.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(
                data?.map((item: BusinessLicenseDataApi) => item.id),
            );
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleDeleteConfirm = () => {
        removeLicense({ id: selectedItemId }).then(() => {
            toast.success("Xóa tài liệu thành công");
            setOpenYNModel(false);
            queryClient.invalidateQueries({ queryKey: ["businessLicense"] });
        });
    };

    const handleDeleteMultipleConfirm = () => {
        deleteMultipleBusinessLicense({ licenseIds: selectedItems }).then(() => {
            toast.success("Xóa tài liệu thành công");
            setOpenYNModelDeleteMultiple(false);
            queryClient.invalidateQueries({ queryKey: ["businessLicense"] });
        });
    };

    const handleUpdate = (id: string) => {
        if (fileRef.current) {
            fileRef.current.click();
        }
        setTempFileId(id);
    };

    const handleUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateBusinessLicense({ file, id: tempFileId }).then(() => {
                toast.success("Cập nhật tài liệu thành công");
                queryClient.invalidateQueries({
                    queryKey: ["businessLicense"],
                });
                setTempFileId("");
                if (fileRef.current) {
                    fileRef.current.value = "";
                }
                setOpenMenuId(null);
            });
        }
    };

    //Hooks
    const { removeLicense, isPending: isPendingRemoveLicense } =
        useRemoveLicense();
    const { updateBusinessLicense, isPending: isPendingUpdateLicense } =
        useUpdateBusinessLicense();
    const { deleteMultipleBusinessLicense, isPending: isPendingDeleteMultipleLicense } =
        useDeleteMultipleBusinessLicense();

    useEffect(() => {
        if (dataBusinessLicense) {
            setData(
                dataBusinessLicense.pages.flatMap((page) => page.data.data),
            );
            setIsLastPage(
                dataBusinessLicense.pages[dataBusinessLicense.pages.length - 1]
                    ?.data.isLastPage,
            );
        }
    }, [dataBusinessLicense, debouncedKeyword]);

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenuId(null);
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleMenuClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="container px-4 w-full">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl md:text-2xl font-bold hover:cursor-pointer">
                    Tài liệu
                </h1>
            </div>
            <div className="mb-4 flex flex-col md:flex-row gap-3 md:gap-5 items-center">
                <div className="flex items-center gap-2 w-full md:w-[30rem]">
                    <div className="w-full">
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
                </div>
                <div className="hidden md:block h-8 w-px bg-gray-300"></div>
                <div className="flex flex-row items-center gap-4 justify-between w-full">
                    <div className="flex items-center gap-4">
                        {isPendingDeleteMultipleLicense ? <LoadingMini />: (
                            <BsTrash3Fill
                            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                onClick={handleDeleteMultiple}
                            />
                        )}
                        <FaCircleInfo className="cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                        <IoMdMore className="cursor-pointer size-6 hover:text-gray-700 transition-colors duration-200" />
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center overflow-hidden rounded-full shadow-custom border border-gray-300 relative w-56">
                            <button
                                className={`${
                                    layoutType === "list" &&
                                    "text-white transition-all duration-500 ease-in-out"
                                } w-28 rounded-full py-1.5 text-sm h-full z-20 transition flex text-gray-500 items-center text-center justify-center hover:opacity-75`}
                                onClick={() => handleLayoutType("list")}
                            >
                                <BsListUl className="size-5" />
                                <span className="ml-2">
                                    List
                                </span>
                            </button>
                            <button
                                className={`absolute transition-all duration-500 ease-in-out w-28 bg-gradient-to-r shadow-sm h-8 rounded-full ${
                                    layoutType === "list"
                                        ? "left-0 from-medhealth-blue-search to-medhealth-blue"
                                        : "left-28 from-medhealth-blue to-medhealth-blue-search"
                                }`}
                            ></button>
                            <button
                                className={`${
                                    layoutType === "grid" &&
                                    "text-white transition-all duration-500 ease-in-out"
                                } w-28 rounded-full py-1.5 text-sm h-full z-20 transition flex text-gray-500 items-center text-center justify-center hover:opacity-75`}
                                onClick={() => handleLayoutType("grid")}
                            >
                                <BsFillGrid1X2Fill className="size-4" />
                                <span className="ml-2">
                                    Grid
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? <Loading /> : (
            <InfiniteScroll
                next={fetchNextPage}
                hasMore={!isLastPage}
                loader={<Loading />}
                dataLength={data?.length || 0}
            >
                {layoutType === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {data?.map((item: BusinessLicenseDataApi) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center justify-center border border-gray-200 h-36 md:h-48">
                                    <PreviewFile
                                        typePreview="mini"
                                        file={import.meta.env.VITE_API_URL + "/uploads/" + item.file}
                                        type={item.type}
                                    />
                                </div>
                                <div className="px-3 py-2 md:px-4 md:py-3 bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3
                                            className="text-xs md:text-sm font-semibold text-gray-700 truncate"
                                            title={item.name}
                                        >
                                            {item.name.length > 20
                                                ? item.name.substring(0, 20) +
                                                  "..."
                                                : item.name}
                                        </h3>
                                        <div className="relative" ref={menuRef}>
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-full"
                                                onClick={(e) =>
                                                    handleMenuClick(e, item.id)
                                                }
                                            >
                                                <MdMoreVert className="h-5 w-5" />
                                            </button>
                                            {openMenuId === item.id && (
                                                <div
                                                    className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-9999"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <div
                                                        className="py-1"
                                                        role="menu"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleDownload(
                                                                    item.id.toString(),
                                                                )
                                                            }
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        >
                                                            Tải xuống
                                                        </button>
                                                        <button
                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleDelete(
                                                                    item.id,
                                                                );
                                                            }}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 truncate mb-1 md:mb-2" title={item.company}>
                                        {item.company}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate mb-1 md:mb-2" title={item.address}>
                                        {item.address}
                                    </p>
                                    <div className="bg-gray-50">
                                        <p className="text-xs text-gray-500 mb-1">
                                            {dayjs(item.updated_at).format(
                                                CONSTANTS.DATE_DEFAULT_FORMAT,
                                            )}
                                        </p>
                                        <div className="flex justify-end mt-3">
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm leading-normal">
                                    <th className="py-2 px-3 md:py-3 md:px-6 text-left w-12">
                                        <input
                                            type="checkbox"
                                            className="size-4 cursor-pointer hover:text-medhealth-blue transition-colors duration-200"
                                            onChange={toggleAllSelection}
                                            checked={
                                                selectedItems.length ===
                                                data?.length && data?.length > 0
                                            }
                                        />
                                    </th>
                                    <th className="py-2 px-3 md:py-3 md:px-6 text-left">
                                        Tên
                                    </th>
                                    <th className="py-2 px-3 md:py-3 md:px-6 text-left hidden md:table-cell">
                                        Doanh nghiệp
                                    </th>
                                    <th className="py-2 px-3 md:py-3 md:px-6 text-left hidden lg:table-cell">
                                        Ngày sửa đổi
                                    </th>
                                    <th className="py-2 px-3 md:py-3 md:px-6 text-left hidden xl:table-cell">
                                        Kích thước
                                    </th>
                                    <th className="py-2 px-3 md:py-3 md:px-6 text-center w-1/12"></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-xs md:text-sm font-light">
                                {data?.map((item: BusinessLicenseDataApi) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-2 px-3 md:py-3 md:px-6 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(
                                                    item.id,
                                                )}
                                                onChange={() =>
                                                    toggleItemSelection(item.id)
                                                }
                                                className="size-4"
                                            />
                                        </td>
                                        <td className="py-2 px-3 md:py-3 md:px-6 text-left whitespace-normal">
                                            <div className="font-medium text-gray-900 break-words">
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 md:py-3 md:px-6 text-left hidden md:table-cell">
                                            <div className="text-gray-600 break-words">
                                                {item.company}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 md:py-3 md:px-6 text-left hidden lg:table-cell">
                                            <div className="text-gray-600">
                                                {dayjs(item.updated_at).format(
                                                    CONSTANTS.DATE_DEFAULT_FORMAT,
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 md:py-3 md:px-6 text-left hidden xl:table-cell">
                                            <div className="text-gray-600">
                                                {item.size}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 md:py-3 md:px-6 text-center">
                                            <div className="flex item-center justify-center space-x-2 md:space-x-3">
                                                <button
                                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                                    onClick={() =>
                                                        handlePreview(
                                                            item.file,
                                                            item.type,
                                                        )
                                                    }
                                                >
                                                    <MdRemoveRedEye />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDownload(item.id)
                                                    }
                                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                                >
                                                    <MdFileDownload />
                                                </button>
                                                <div
                                                    className="relative"
                                                    ref={menuRef}
                                                >
                                                    <button
                                                        className="p-2 hover:bg-gray-100 rounded-full"
                                                        onClick={(e) =>
                                                            handleMenuClick(
                                                                e,
                                                                item.id,
                                                            )
                                                        }
                                                    >
                                                        <MdMoreVert className="h-5 w-5" />
                                                    </button>
                                                    {openMenuId === item.id && (
                                                        <div
                                                            className="fixed right-16 md:right-16 mt-2 min-w-36 bg-white rounded-md shadow-lg z-10000"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <div className="py-1">
                                                                <button
                                                                    onClick={() => {
                                                                        handleUpdate(
                                                                            item.id,
                                                                        );
                                                                    }}
                                                                    disabled={
                                                                        isPendingUpdateLicense
                                                                    }
                                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    {isPendingUpdateLicense
                                                                        ? "Đang cập nhật..."
                                                                        : "Thay thế"}
                                                                </button>
                                                                <input
                                                                    type="file"
                                                                    ref={
                                                                        fileRef
                                                                    }
                                                                    accept={
                                                                        CONSTANTS.ACCEPT_FILE
                                                                    }
                                                                    className="hidden"
                                                                    onChange={
                                                                        handleUpdateFile
                                                                    }
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        handleDelete(
                                                                            item.id,
                                                                        );
                                                                    }}
                                                                    disabled={
                                                                        isPendingRemoveLicense
                                                                    }
                                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    {isPendingRemoveLicense
                                                                        ? "Đang xóa..."
                                                                        : "Xóa"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </InfiniteScroll>
            )}
            {previewFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10001 p-4">
                    <div className="p-4 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                        <PreviewFile
                            typePreview="full"
                            file={import.meta.env.VITE_API_URL + "/uploads/" + previewFile.file}
                            type={previewFile.type}
                            closePreview={closePreview}
                        />
                    </div>
                </div>
            )}
            <YNModel
                isOpen={openYNModel}
                onClose={() => setOpenYNModel(false)}
                onConfirm={handleDeleteConfirm}
                label="Xóa tài liệu"
                description="Bạn có chắc chắn muốn xóa tài liệu này không?"
                yesLabel="Xóa"
                noLabel="Hủy"
            />

            <YNModel
                isOpen={openYNModelDeleteMultiple}
                onClose={() => setOpenYNModelDeleteMultiple(false)}
                onConfirm={handleDeleteMultipleConfirm}
                label="Xóa tài liệu"
                description="Bạn có chắc chắn muốn xóa tài liệu này không?"
                yesLabel="Xóa"
                noLabel="Hủy"
            />
        </div>
    );
}

export default BusinessLicense;
