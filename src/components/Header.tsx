import { Avatar } from "primereact/avatar";
import { useState } from "react";
import { HiBell } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import userAvatar from "../assets/user.png";
import { CONSTANTS } from "../utils/constants";

function Header() {
    const [showAlert, setShowAlert] = useState(false);

    return (
        <header className=" flex items-center justify-between w-full h-20 z-50 pl-9 fixed border-b border-gray-200 shadow-sm">
            <div className="w-full justify-between px-5 float-end items-center flex relative">
                <div>
                    <Link
                        to={CONSTANTS.PATH.ROOT_PATH}
                        className="flex items-center justify-center w-full px-3 my-3 ml-2"
                    >
                        <img src={logo} alt="Logo" className="size-20" />
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            className={`p-2 rounded-full hover:bg-medhealth-blue-search hover:text-white transition-colors duration-300 ${
                                showAlert
                                    ? "bg-medhealth-blue-search text-white"
                                    : "text-medhealth-button-blue-200"
                            }`}
                            onClick={() => setShowAlert(!showAlert)}
                        >
                            <div className="relative">
                                <HiBell className="size-6" />
                                {!showAlert && (
                                    <div className="absolute right-0.5 top-0.5 bg-red-500 w-2 h-2 rounded-full" />
                                )}
                            </div>
                        </button>
                        {showAlert && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
                                <h1 className="text-lg font-bold text-gray-800 px-4 py-2">
                                    Thông báo
                                </h1>
                                <div className="pb-3">
                                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                                        <p className="text-sm font-medium text-gray-800">
                                            New notification
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            You have a new message
                                        </p>
                                    </div>
                                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                                        <p className="text-sm font-medium text-gray-800">
                                            Reminder
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Meeting in 30 minutes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Avatar image={userAvatar} size="large" shape="circle" />
                </div>
            </div>
        </header>
    );
}

export default Header;
