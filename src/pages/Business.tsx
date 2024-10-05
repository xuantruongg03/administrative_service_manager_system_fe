import { Column } from "primereact/column";
import { TreeNode } from "primereact/treenode";
import { TreeTable } from "primereact/treetable";
import { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";
import { FaCircleInfo, FaFileArrowDown } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { NodeService } from "../services/NodeServices";
import FileUploadButton from "../ui/FileUploadButton";

export default function Business() {
    const [nodes, setNodes] = useState<TreeNode[]>([]);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState("");

    const handleFileSelect = (file: File) => {
        console.log(file);
    };

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card bg-white">
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
                                <BsTrash3Fill className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
                                <FaCircleInfo className="cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                                <IoMdMore className="cursor-pointer size-6 hover:text-gray-700 transition-colors duration-200" />
                            </div>
                            <div className="flex items-center gap-4">
                                <FileUploadButton
                                    onFileSelect={handleFileSelect}
                                    icon={
                                        <FaFileUpload className="text-gray-600" />
                                    }
                                    label="Nhập"
                                    accept=".xlsx, .xls"
                                />
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                />
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                                    <FaFileArrowDown className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Xuất
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
                <TreeTable
                    value={nodes}
                    tableStyle={{ minWidth: "50rem" }}
                    className="min-w-full divide-y divide-gray-200"
                    selectionMode="checkbox"
                    selectionKeys={selectedNodeKeys}
                >
                    <Column
                        field="code"
                        header="Mã số DN"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="registerDate"
                        header="Ngày ĐK"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="name"
                        header="Tên doanh nghiệp"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="shortName"
                        header="Tên viết tắt"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="address"
                        header="Địa chỉ"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="phoneNumber"
                        header="Số điện thoại"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="registeredCapital"
                        header="Vốn điều lệ (VNĐ)"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="size"
                        header="Quy mô"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                    ></Column>
                    <Column
                        field="type"
                        header="Trạng thái"
                        headerClassName="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                        bodyClassName="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900"
                        body={(rowData) => (
                            <div
                                className={`flex items-center px-0 ${
                                    rowData.data.type === "Hoạt động"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 mr-2 rounded-full ${
                                        rowData.data.type === "Hoạt động"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                ></span>
                                <span className="text-sm font-medium">
                                    {rowData.data.type}
                                </span>
                            </div>
                        )}
                    ></Column>
                </TreeTable>
            </div>
        </div>
    );
}
