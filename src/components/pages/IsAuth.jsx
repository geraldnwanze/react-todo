import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function IsAuth() {
    const { isAuth } = useContext(AuthContext);
    
    return isAuth ? <Navigate to='/tasks' /> : <MainLayout />;
}

export default IsAuth;