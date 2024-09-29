import { Link } from "react-router-dom";
import icon404 from "../assets/404.svg";

function NotFound() {
    return (
        <>
            <div className="overflow-hidden relative h-screen bg-gray-50">
                <div className="flex flex-col gap-12 items-center justify-center h-screen relative bg-transparent">
                    <div className="flex gap-[45px] justify-center items-center self-stretch relative w-full h-[476px] bg-transparent">
                        <img src={icon404} alt="404" />
                    </div>
                    <div className="flex items-center justify-center w-full ">
                        <div className="flex flex-col justify-center w-full items-center relative bg-transparent">
                            <div className="flex flex-col justify-center gap-2.5 items-start relative bg-transparent">
                                <h1 className="text-center font-bold leading-[62px] w-full text-5xl text-gray-900">
                                    Page not found
                                </h1>
                                <p className="text-center leading-6 text-base text-gray-500">
                                    Oops! Looks like you followed a bad link. If
                                    you think this is a problem with us, please
                                    tell us.
                                </p>
                            </div>
                            <Link to="/" className="overflow-hidden rounded-xl px-[17px] py-[9px] mt-5 flex gap-0 justify-center items-center relative bg-[#0e9f6e]">
                                <span className="font-semibold leading-[21px] text-sm text-white">
                                    Go back home
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
