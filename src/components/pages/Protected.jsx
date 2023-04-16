import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import { Navigate } from "react-router-dom";

function Protected() {
    const { isAuth } = useContext(AuthContext);

    return isAuth ? <MainLayout /> : <Navigate to='/auth/login' />;
}

export default Protected;