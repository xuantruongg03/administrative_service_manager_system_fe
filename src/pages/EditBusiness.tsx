import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import AddEmployeeModal from "../components/AddEmployeeModal";

const employee = [
    {
        name: "Nguyễn Văn A",
        position: "Giám đốc",
        id_card: "123123123123",
        phone_number: "0987654321",
    },
    {
        name: "Trần Thị B",
        position: "Trưởng phòng",
        id_card: "123123123123",
        phone_number: "0123456789",
    },
];

const type_business = [
    {
        name: "Công ty TNHH",
        code: "CtyTNHH",
    },
    {
        name: "Công ty Cổ phần",
        code: "CtyCP",
    },
];

function EditBusiness() {
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 rounded-lg shadow-md">
                {/* Edit business information */}
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                        Thông tin doanh nghiệp
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label
                                htmlFor="businessName"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tên doanh nghiệp
                            </label>
                            <InputText
                                id="businessName"
                                name="businessName"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="businessCode"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mã số doanh nghiệp
                            </label>
                            <InputText
                                id="businessCode"
                                name="businessCode"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="taxCode"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mã số thuế
                            </label>
                            <InputText
                                id="taxCode"
                                name="taxCode"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Địa chỉ
                            </label>
                            <InputText
                                id="address"
                                name="address"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Số điện thoại
                            </label>
                            <InputText
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <InputText
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="website"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Website
                            </label>
                            <InputText
                                id="website"
                                name="website"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="legalRepresentative"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Người đại diện pháp luật
                            </label>
                            <InputText
                                id="legalRepresentative"
                                name="legalRepresentative"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="registrationDate"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Ngày đăng ký
                            </label>
                            <InputText
                                type="date"
                                id="registrationDate"
                                name="registrationDate"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="businessType"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Loại hình doanh nghiệp
                            </label>
                            <Dropdown
                                id="businessType"
                                name="businessType"
                                options={type_business}
                                style={{ width: "100%" }}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Chọn loại hình doanh nghiệp"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="businessField"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Lĩnh vực kinh doanh
                            </label>
                            <InputText
                                id="businessField"
                                name="businessField"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="numberOfEmployees"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Số lượng nhân viên
                            </label>
                            <InputText
                                type="number"
                                id="numberOfEmployees"
                                name="numberOfEmployees"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="charterCapital"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Vốn điều lệ
                            </label>
                            <InputText
                                type="number"
                                id="charterCapital"
                                name="charterCapital"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            >
                                Cập nhật thông tin
                            </button>
                        </div>
                    </form>
                </div>

                {/* Employee management */}
                <div className="bg-white p-6 rounded-lg shadow-sm md:w-1/2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                            Nhân viên
                        </h2>
                        <div className="flex space-x-2">
                            {/* <Tooltip target=".custom-tooltip-btn-add" position="top" /> */}
                            <button
                                className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center custom-tooltip-btn-add"
                                // data-pr-tooltip="Thêm nhân viên"
                                onClick={() => setShowAddEmployeeModal(true)}
                            >
                                <FaPlus className="" />
                            </button>
                            {/* <Tooltip target=".custom-tooltip-btn-upload" position="top" /> */}
                            <label
                                htmlFor="upload-employees"
                                className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center cursor-pointer custom-tooltip-btn-upload"
                                // data-pr-tooltip="Tải lên nhân viên"
                            >
                                <LuUpload />
                            </label>
                            <input
                                id="upload-employees"
                                type="file"
                                className="hidden"
                                accept=".csv,.xlsx,.xls"
                                onChange={(e) => {
                                    console.log(e.target.files);
                                }}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        Tên nhân viên
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        Vị trí
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        Căn cước
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        Số điện thoại
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employee.map((employee, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {employee.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {employee.position}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {employee.id_card}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {employee.phone_number}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 focus:outline-none">
                                                Sửa
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 focus:outline-none">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddEmployeeModal
                show={showAddEmployeeModal}
                onHide={() => setShowAddEmployeeModal(false)}
            />
        </>
    );
}

export default EditBusiness;
