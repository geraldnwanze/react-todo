import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/mainlayout";
import Login from "./components/pages/auth/Login";
import RegisterEmail from "./components/pages/auth/RegisterEmail";

const MyRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth/login" />
    },
    {
        path: "/auth",
        element: <MainLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register-email",
                element: <RegisterEmail />
            }
        ]
    }
]);

export default MyRoutes;