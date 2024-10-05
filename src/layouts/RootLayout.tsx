import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function RootLayout() {
    return (
        <div className="h-screen">
            <Header />
            <div className="flex h-full w-full">
                <SideBar />
                <div className="mt-24 px-5 rounded-lg overflow-hidden w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default RootLayout;
