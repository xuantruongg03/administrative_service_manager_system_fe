import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
    return (
        <div className="h-screen">
            <Header />
            <div className="flex h-full w-full">
                <div className="hidden md:block">
                    <SideBar />
                </div>
                <div className="mt-24 md:ml-16 px-5 rounded-lg custom-scrollbar w-full">
                    <Outlet />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RootLayout;
