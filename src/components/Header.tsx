import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";
import logo from "../assets/icon-login.png";
import userAvatar from "../assets/user.png";
import { CONSTANTS } from "../utils/constants";

function Header() {
    // const [isShowLogout, setIsShowLogout] = useState(false);
    // const ref = useRef("header");

    // const { isPending, logout } = useLogoutMutation();

    // const handleConfirmLogout = () => {
    //     const token = localStorage.getItem(CONSTANTS.NAME_TOKEN);
    //     logout({
    //         token: token,
    //     });
    // };

    return (
        <header className=" flex items-center justify-between w-full h-20 z-50 pl-9 fixed">
            <div className="w-full justify-between px-5 float-end items-center flex relative">
                <div>
                    <Link
                        to={CONSTANTS.PATH.ROOT_PATH}
                        className="flex items-center justify-center w-full px-3 my-3"
                    >
                        <img src={logo} alt="Logo" className="size-10" />
                        <span className="ml-2 mt-2 font-bold aclonica-regular text-medhealth-button-blue-200">
                            MedHealth
                        </span>
                    </Link>
                </div>
                <div className={``}>
                    <Avatar
                        image={userAvatar}
                        size="large"
                        shape="circle"
                        // className="size-10"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
