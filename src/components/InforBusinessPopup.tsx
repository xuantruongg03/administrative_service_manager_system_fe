import { MdClose } from "react-icons/md";
import { InforBusinessPopupProps } from "../interfaces";
import { FaMinus } from "react-icons/fa";
import { formatVND } from "../utils/format";

function InforBusinessPopup(props: InforBusinessPopupProps) {
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
        { name: "Nguyễn Văn A", position: "Giám đốc", department: "Ban giám đốc", joinDate: "01/01/2010" },
        { name: "Trần Thị B", position: "Trưởng phòng", department: "Nhân sự", joinDate: "15/03/2012" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
        { name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/07/2015" },
    ];

    const handleClose = () => {
        props.onClose();
    };

    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[1200px] h-[90vh] relative transform transition-all animate-zoom-in duration-300 overflow-hidden">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <MdClose size={24} />
                </button>
                <div className="p-8 h-full">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                        Thông tin chi tiết doanh nghiệp
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/5">
                            {Object.entries(businessInfo).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200">
                                    <strong className="text-base text-gray-700">
                                        {key === 'lastYearRevenue' ? 'Doanh thu năm trước' : 
                                        key === 'name' ? 'Tên doanh nghiệp' : 
                                        key === 'acronym' ? 'Tên viết tắt' : 
                                        key === 'nameEn' ? 'Tên tiếng Anh' : 
                                        key === 'address' ? 'Địa chỉ' : 
                                        key === 'phone' ? 'Số điện thoại' : 
                                        key === 'email' ? 'Email' : 
                                        key === 'website' ? 'Website' : 
                                        key === 'fax' ? 'Fax' : 
                                        key === 'charteredCapital' ? 'Vốn điều lệ' : 
                                        key === 'typeOfOrganization' ? 'Loại hình doanh nghiệp' : 
                                        key === 'legalRepresentative' ? 'Người đại diện pháp luật' : 
                                        key === 'employeeCount' ? 'Số nhân viên' : 
                                        key === 'establishmentDate' ? 'Ngày thành lập' : 
                                         `${key.charAt(0).toUpperCase() + key.slice(1)}`}:
                                    </strong>
                                    <span className="text-sm text-gray-600">
                                        {value ? (key === 'charteredCapital' ? `${formatVND(Number(value)).toLocaleString()} VNĐ` : value) : (<FaMinus className="text-gray-400" />)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full lg:w-3/5">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Danh sách nhân viên</h3>
                            <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                                <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
                                    <table className="w-full border-collapse">
                                        <thead className="sticky top-0 bg-gray-200">
                                            <tr>
                                                <th className="border-b border-gray-300 p-2 text-left text-sm font-semibold text-gray-700">Tên</th>
                                                <th className="border-b border-gray-300 p-2 text-left text-sm font-semibold text-gray-700">Chức vụ</th>
                                                <th className="border-b border-gray-300 p-2 text-left text-sm font-semibold text-gray-700">Phòng ban</th>
                                                <th className="border-b border-gray-300 p-2 text-left text-sm font-semibold text-gray-700">Ngày vào làm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeInfo.map((employee, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                                    <td className="border-b border-gray-200 p-2 text-sm text-gray-600">{employee.name}</td>
                                                    <td className="border-b border-gray-200 p-2 text-sm text-gray-600">{employee.position}</td>
                                                    <td className="border-b border-gray-200 p-2 text-sm text-gray-600">{employee.department}</td>
                                                    <td className="border-b border-gray-200 p-2 text-sm text-gray-600">{employee.joinDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
