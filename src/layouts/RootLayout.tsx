import Header from "../components/Header";
import SideBar from "../components/SideBar";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="h-screen">
                <Header />
                <div className="flex h-full w-full">
                    <SideBar />
                    <div className="mt-20 px-5 rounded-lg overflow-hidden w-full">
                        {children}
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div>
        </>
    );
}

export default RootLayout;
