import { useState } from "react";
import { FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { IoBusinessSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { CONSTANTS } from "../utils/constants";
import { IoDocumentText } from "react-icons/io5";
import { IoIosHelpBuoy } from "react-icons/io";
import { GrHelpBook } from "react-icons/gr";

const bar = [
    {
        id: 1,
        path: CONSTANTS.PATH.ROOT_PATH,
        title: "Doanh nghiệp",
        icon: <IoBusinessSharp className="size-5 my-5" />,
    },
    {
        id: 2,
        path: "/map",
        title: "Bản đồ",
        icon: <FaMapMarkerAlt className="size-5 my-5" />,
    },
    {
        id: 3,
        path: CONSTANTS.PATH.ATTACHMENTS_DOCUMENTS_PATH,
        title: "Tài liệu",
        icon: <IoDocumentText className="size-5 my-5" />,
    },
];

function Sidebar() {
    const baseUrl = useLocation();
    const [isShowBar, setIsShowBar] = useState(false);

    return (
        <>
            <div className="flex h-full z-50">
                <div className="flex flex-col items-center w-16 h-full overflow-hidden bg-medhealth-dialog-blue rounded py-3 z-50">
                    <div className="flex items-center justify-center">
                        <div
                            onClick={() => setIsShowBar(!isShowBar)}
                            className="flex items-center justify-center w-12 h-12 cursor-pointer hover:text-white rounded-lg hover:bg-medhealth-blue mb-1"
                        >
                            <FaBars className="size-5" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between h-full mt-3">
                        {bar.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center justify-center w-12 h-12 mt-2 hover:text-white hover:bg-medhealth-blue rounded-lg ${
                                    item.path === baseUrl.pathname
                                        ? "bg-medhealth-blue text-white"
                                        : ""
                                }`}
                            >
                                {item.icon}
                            </Link>
                        ))}
                        <div className="flex-grow"></div>
                        <div className="w-10 h-0.5 bg-gray-300 my-3"></div>
                        <Link
                            to={CONSTANTS.PATH.DOCS_PATH}
                            className={`flex items-center justify-center w-12 h-12 mt-2 hover:text-white hover:bg-medhealth-blue rounded-lg ${
                                CONSTANTS.PATH.DOCS_PATH === baseUrl.pathname
                                    ? "bg-medhealth-blue text-white"
                                    : ""
                            }`}
                        >
                            <GrHelpBook className="size-5 my-5" />
                        </Link>
                        <Link
                            to={CONSTANTS.PATH.DOCS_PATH}
                            className={`flex items-center justify-center w-12 h-12 mt-2 hover:text-white hover:bg-medhealth-blue rounded-lg ${
                                CONSTANTS.PATH.DOCS_PATH === baseUrl.pathname
                                    ? "bg-medhealth-blue text-white"
                                    : ""
                            }`}
                        >
                            <IoIosHelpBuoy className="size-5 my-5" />
                        </Link>
                    </div>
                </div>
                <div
                    className={`flex flex-col items-center h-full overflow-hidden rounded py-16 transition-all duration-500 ease-in-out ${
                        isShowBar ? "w-40" : "w-0"
                    }`}
                >
                    <div className="w-full px-2">
                        <div className="flex flex-col items-center w-full mt-3 ">
                            {bar.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`flex items-center w-36 overflow-hidden h-12 px-3 mt-2 rounded-lg hover:text-white hover:bg-medhealth-blue ${
                                        item.path === baseUrl.pathname
                                            ? "bg-medhealth-blue text-white"
                                            : ""
                                    }`}
                                >
                                    <span className="ml-2 text-sm font-medium">
                                        {item.title}
                                    </span>
                                </Link>
                            ))}
                            <div className="flex-grow"></div>
                            <Link
                                to={CONSTANTS.PATH.DOCS_PATH}
                                className={`flex items-center w-36 overflow-hidden h-12 px-3 mt-2 rounded-lg hover:text-white hover:bg-medhealth-blue ${
                                    CONSTANTS.PATH.DOCS_PATH ===
                                    baseUrl.pathname
                                        ? "bg-medhealth-blue text-white"
                                        : ""
                                }`}
                            >
                                <span className="ml-2 text-sm font-medium">
                                    Tài liệu
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
