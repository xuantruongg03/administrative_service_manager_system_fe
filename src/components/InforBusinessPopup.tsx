import { FaCheck, FaMinus, FaRegCopy } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { InforBusinessPopupProps } from "../interfaces";
import { formatVND } from "../utils/format";
import { useState } from "react";

const businessInfo = {
    name: "Công ty TNHH ABC",
    acronym: "CTTNHHABC",
    nameEn: "ABC Company",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phone: "0987654321",
    email: "abc@gmail.com",
    website: "",
    fax: "",
    charteredCapital: 1000000000,
    typeOfOrganization: "Công ty TNHH",
    legalRepresentative: "Nguyễn Văn A",
    employeeCount: 100,
    establishmentDate: "01/01/2010",
};

const employeeInfo = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        position: "Giám đốc",
        identity: "123123123123",
        joinDate: "01/01/2010",
        phone: "0987654321",
    },
    {
        id: 2,
        name: "Trần Thị B",
        position: "Trưởng phòng",
        identity: "123123123123",
        joinDate: "15/03/2012",
        phone: "0987654321",
    },
    {
        id: 3,
        name: "Lê Văn C",
        position: "Nhân viên",
        identity: "123123123123",
        joinDate: "10/07/2015",
        phone: "0987654321",
    },

];

function InforBusinessPopup(props: InforBusinessPopupProps) {
    const [isCopied, setIsCopied] = useState(-1);
    
    const handleClose = () => {
        props.onClose();
    };

    const handleCopyIdentity = (identity: string, id: number) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(identity)
                .then(() => {
                    setIsCopied(id);
                    setTimeout(() => {
                        setIsCopied(-1);
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
                    setIsCopied(-1);
                }, 3000);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[1200px] h-[90vh] relative transform transition-all animate-zoom-in duration-300 overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-2 sm:pb-4 mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Thông tin chi tiết
                        </h2>
                        <button onClick={handleClose}>
                            <MdClose size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                        <div className="w-full lg:w-2/5">
                            {Object.entries(businessInfo).map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between py-2 border-b border-gray-200"
                                    >
                                        <span className="text-xs sm:text-sm font-semibold text-gray-700">
                                            {key === "lastYearRevenue"
                                                ? "Doanh thu năm trước"
                                                : key === "name"
                                                ? "Tên doanh nghiệp"
                                                : key === "acronym"
                                                ? "Tên viết tắt"
                                                : key === "nameEn"
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
                                                : key === "charteredCapital"
                                                ? "Vốn điều lệ"
                                                : key === "typeOfOrganization"
                                                ? "Loại hình doanh nghiệp"
                                                : key === "legalRepresentative"
                                                ? "Người đại diện pháp luật"
                                                : key === "employeeCount"
                                                ? "Số nhân viên"
                                                : key === "establishmentDate"
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
                                                key === "charteredCapital" ? (
                                                    `${formatVND(
                                                        Number(value),
                                                    ).toLocaleString()} VNĐ`
                                                ) : (
                                                    value
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
                                <div className="max-h-[300px] sm:max-h-[400px] lg:max-h-[460px] overflow-y-auto custom-scrollbar">
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
                                                {employeeInfo.map(
                                                    (employee, index) => (
                                                        <tr
                                                            key={index}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "bg-white"
                                                                    : "bg-gray-100"
                                                            }
                                                        >
                                                            <td className="border-b border-gray-200 p-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                                                {employee.name}
                                                            </td>
                                                            <td className="border-b border-gray-200 p-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                                                {employee.position}
                                                            </td>
                                                            <td className="border-b border-gray-200 p-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap flex items-center">
                                                                {employee.identity}
                                                                <button
                                                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                                                    onClick={() => handleCopyIdentity(employee.identity, employee.id)}
                                                                >
                                                                {isCopied === employee.id ? <FaCheck className="text-green-500" /> : <FaRegCopy />}
                                                                </button>
                                                            </td>
                                                            <td className="border-b border-gray-200 p-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                                                {employee.joinDate}
                                                            </td>
                                                            <td className="border-b border-gray-200 p-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                                                {employee.phone}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforBusinessPopup;
