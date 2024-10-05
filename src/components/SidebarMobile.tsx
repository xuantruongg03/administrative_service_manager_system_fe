import { Sidebar } from "primereact/sidebar";
import { SidebarMobileProps } from "../interfaces";
import { FaChartPie, FaMapMarkerAlt } from "react-icons/fa";
import { IoBusinessSharp, IoDocumentText } from "react-icons/io5";
import { CONSTANTS } from "../utils/constants";
import { Link } from "react-router-dom";
import { IoIosHelpBuoy } from "react-icons/io";
import { GrHelpBook } from "react-icons/gr";

const bar = [
    {
        id: 1,
        path: CONSTANTS.PATH.ROOT_PATH,
        title: "Thống kê",
        icon: <FaChartPie className="size-5 my-5" />,
    },
    {
        id: 2,
        path: CONSTANTS.PATH.BUSINESS_PATH,
        title: "Doanh nghiệp",
        icon: <IoBusinessSharp className="size-5 my-5" />,
    },
    {
        id: 3,
        path: CONSTANTS.PATH.MAP_PATH,
        title: "Bản đồ",
        icon: <FaMapMarkerAlt className="size-5 my-5" />,
    },
    {
        id: 4,
        path: CONSTANTS.PATH.ATTACHMENTS_DOCUMENTS_PATH,
        title: "Tài liệu",
        icon: <IoDocumentText className="size-5 my-5" />,
    },
];

export default function SidebarMobile(props: SidebarMobileProps) {
    return (
        <div className="card flex justify-end">
            <Sidebar visible={props.isOpen} onHide={() => props.onClose()} icons={<div className="my-5 mx-5"/>}>
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        {bar.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className="flex items-center p-4 h-12 hover:bg-medhealth-blue hover:text-white transition-colors duration-300"
                                onClick={props.onClose}
                            >
                                <span className="mr-4">{item.icon}</span>
                                <span className="text-sm">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-auto border-t border-gray-200">
                        <Link
                            to={CONSTANTS.PATH.DOCS_PATH}
                            className="flex items-center p-4 hover:bg-medhealth-blue hover:text-white transition-colors duration-300"
                            onClick={props.onClose}
                        >
                            <span className="mr-4">
                                <GrHelpBook className="size-5" />
                            </span>
                            <span className="text-sm">Tài liệu hướng dẫn</span>
                        </Link>
                        <Link
                            to={CONSTANTS.PATH.ROOT_PATH}
                            className="flex items-center p-4 hover:bg-medhealth-blue hover:text-white transition-colors duration-300"
                            onClick={props.onClose}
                        >
                            <span className="mr-4">
                                <IoIosHelpBuoy className="size-5" />
                            </span>
                            <span className="text-sm">Hỗ trợ</span>
                        </Link>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}
