import { useEffect, useRef, useState } from "react";
import { BsFillGrid1X2Fill, BsListUl, BsTrash3Fill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { MdFileDownload, MdMoreVert, MdRemoveRedEye } from "react-icons/md";
import PreviewFile from "../components/PreviewFile";

const data = [
    {
        id: 1,
        name: "tai_lieu_1.pdf",
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        type: "pdf",
        size: "100KB",
        status: "active",
        company: "Công ty 1",
        address: "Địa chỉ 1",
    },
    {
        id: 2,
        name: "tai_lieu_2.jpeg",
        file: "https://jcpmediaroom.com/wp-content/uploads/2021/10/giay-phep-kinh-doanh.jpeg",
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        type: "image",
        size: "100KB",
        status: "active",
        company: "Công ty 2",
        address: "Địa chỉ 2",
    },
];

function Documents() {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [layoutType, setLayoutType] = useState<"grid" | "list">("list");
    const [previewFile, setPreviewFile] = useState<{
        file: string;
        type: string;
    } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

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

    const handleDelete = (id: number) => {
        console.log(id);
    };

    const handleDownload = (id: number) => {
        const link = document.createElement("a");
        link.href = data[id].file;
        link.download = data[id].name || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleItemSelection = (id: number) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id],
        );
    };

    const toggleAllSelection = () => {
        if (selectedItems.length === data.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(data.map((item) => item.id));
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpenMenuId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl md:text-2xl font-bold hover:cursor-pointer">
                    Tài liệu
                </h1>
            </div>
            <div className="mb-4 flex flex-row gap-3 md:gap-5 items-center">
                <div className="flex items-center gap-2 w-full md:w-32">
                    <input
                        type="checkbox"
                        className="size-4 cursor-pointer"
                        onChange={toggleAllSelection}
                        checked={selectedItems.length === data.length}
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Chọn tất cả
                    </span>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex flex-row items-center gap-4 justify-between w-full">
                    <div className="flex items-center gap-4">
                        <BsTrash3Fill className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
                        <FaCircleInfo className="cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                        <IoMdMore className="cursor-pointer size-6 hover:text-gray-700 transition-colors duration-200" />
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center overflow-hidden rounded-full shadow-custom border border-gray-300 relative w-20 md:w-56">
                            <button
                                className={`${
                                    layoutType === "list" &&
                                    "text-white transition-all duration-500 ease-in-out"
                                } w-10 md:w-28 rounded-full py-1.5 text-sm h-full z-20 transition flex text-gray-500 items-center text-center justify-center hover:opacity-75`}
                                onClick={() => handleLayoutType("list")}
                            >
                                <BsListUl className="size-5" />
                                <span className="hidden md:inline ml-2">List</span>
                            </button>
                            <button
                                className={`absolute transition-all duration-500 ease-in-out w-10 md:w-28 bg-gradient-to-r shadow-sm h-8 rounded-full ${
                                    layoutType === "list"
                                        ? "left-0 from-medhealth-blue-search to-medhealth-blue"
                                        : "left-10 md:left-28 from-medhealth-blue to-medhealth-blue-search"
                                }`}
                            ></button>
                            <button
                                className={`${
                                    layoutType === "grid" &&
                                    "text-white transition-all duration-500 ease-in-out"
                                } w-10 md:w-28 rounded-full py-1.5 text-sm h-full z-20 transition flex text-gray-500 items-center text-center justify-center hover:opacity-75`}
                                onClick={() => handleLayoutType("grid")}
                            >
                                <BsFillGrid1X2Fill className="size-4" />
                                <span className="hidden md:inline ml-2">Grid</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {layoutType === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-center h-36 md:h-48">
                                <PreviewFile
                                    typePreview="mini"
                                    file={item.file}
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
                                            ? item.name.substring(0, 20) + "..."
                                            : item.name}
                                    </h3>
                                    <div className="relative" ref={menuRef}>
                                        <MdMoreVert
                                            className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300"
                                            onClick={() => toggleMenu(item.id)}
                                        />
                                        {openMenuId === item.id && (
                                            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() =>
                                                            handlePreview(
                                                                item.file,
                                                                item.type,
                                                            )
                                                        }
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Xem chi tiết
                                                    </button>
                                                    <a
                                                        href={item.file}
                                                        download
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Tải xuống
                                                    </a>
                                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 truncate mb-1 md:mb-2">
                                    {item.company}
                                </p>
                                <p className="text-xs text-gray-500 truncate mb-1 md:mb-2">
                                    {item.address}
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500">
                                        {item.created_at}
                                    </p>
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                        {item.type}
                                    </span>
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
                                <th className="py-2 px-3 md:py-3 md:px-6 text-left w-12"></th>
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
                            {data.map((item) => (
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
                                            {item.created_at}
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
                                                    handleDownload(item.id - 1)
                                                }
                                                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                            >
                                                <MdFileDownload />
                                            </button>
                                            <div
                                                className="relative"
                                                ref={menuRef}
                                            >
                                                <MdMoreVert
                                                    className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300"
                                                    onClick={() =>
                                                        toggleMenu(item.id)
                                                    }
                                                />
                                                {openMenuId === item.id && (
                                                    <div className="fixed right-4 md:right-16 mt-2 min-w-36 bg-white rounded-md shadow-lg z-50">
                                                        <div className="py-1">
                                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                                Thay thế
                                                            </button>
                                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                                Đánh dấu
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id,
                                                                    )
                                                                }
                                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                            >
                                                                Xóa
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
            {previewFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="p-4 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                        <PreviewFile
                            typePreview="full"
                            file={previewFile.file}
                            type={previewFile.type}
                            closePreview={closePreview}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Documents;
