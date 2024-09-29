import { Navigate, Outlet } from "react-router-dom";
import {CONSTANTS} from "../utils/constants";
import { useSelector } from "react-redux";
import RootState from "../interfaces/rootState";

function Auth() {
    const isLogin = useSelector((state: RootState) => state.login);
    return isLogin ? <Outlet /> : <Navigate to={CONSTANTS.PATH.LOGIN_PATH} />;
}

export default Auth;
