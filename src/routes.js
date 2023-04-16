import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/pages/auth/LoginPage";
import RegisterEmailPage from "./components/pages/auth/RegisterEmailPage";
import TaskPage from "./components/pages/tasks/TaskPage";
import TaskSearchPage from "./components/pages/tasks/TaskSearchPage";
import Protected from "./components/pages/Protected";
import IsAuth from "./components/pages/IsAuth";

function useMyRouter() {
    
    const MyRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/auth/login" />
        },
        {
            path: "/auth",
            element: <IsAuth />,
            children: [
                {
                    path: "/auth/login",
                    element: <LoginPage />
                },
                {
                    path: "/auth/register-email",
                    element: <RegisterEmailPage />,
                }
            ]
        },
        {
            path: "/tasks",
            element: <Protected />,
            children: [
                {
                    path: "",
                    element: <TaskPage />
                },
                {
                    path: "search",
                    element: <TaskSearchPage />
                }
            ]
        }
    ]);

    return { MyRoutes };
}

export default useMyRouter;